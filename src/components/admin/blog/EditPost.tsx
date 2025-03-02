import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../atoms/inputs/Input";
import Textarea from "../../atoms/inputs/Textarea";
import Button from "../../atoms/Button";
import Swal from "sweetalert2";
import { Link, navigate } from "gatsby";
import Title from "../../atoms/titles/Title";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import Select from "../../atoms/inputs/Select";
// ✅ Use your dnd-kit ItemsList
import ItemsList from "../ItemsList";
// ...
import { v4 as uuidv4 } from "uuid";

const EditPost = ({ location, params }: { location: any; params: any }) => {
  const searchParams = new URLSearchParams(location?.search);
  const paramLang = searchParams.get("lang");

  const [slug, setSlug] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>(paramLang === "fr" ? "fr" : "en");
  const [formData, setFormData] = useState({
    title_en: "",
    title_fr: "",
    subtitle_en: "",
    subtitle_fr: "",
    summary_en: "",
    summary_fr: "",
    type: "marin",
  });
  const [englishItems, setEnglishItems] = useState<any[]>([]);
  const [frenshItems, setFrenshItems] = useState<any[]>([]);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const slugParam = params.slug;
    setSlug(slugParam);
  }, [location]);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return;
      try {
        const response = await axios.get(`/api/posts/${slug}`);
        const blogPost: any = response.data;
        // Sort content items by order
        blogPost.content_items.sort((a: any, b: any) => a.order - b.order);

        // Set form data
        setFormData({
          title_en: blogPost.title_en ?? "",
          title_fr: blogPost.title_fr ?? "",
          subtitle_en: blogPost.subtitle_en ?? "",
          subtitle_fr: blogPost.subtitle_fr ?? "",
          summary_en: blogPost.summary_en ?? "",
          summary_fr: blogPost.summary_fr ?? "",
          type: blogPost.type || "marin",
        });

        // parse any JSON content
        const parsedContentItems = blogPost.content_items.map((item: any) => {
          if (item.type === "list") {
            return { ...item, content: JSON.parse(item.content) };
          }
          return item;
        });

        // separate by language
        setEnglishItems(
          parsedContentItems
            .filter((item: any) => item.language === "en")
            .map((item: any, index: number) => ({
              ...item,
              // ensure each item has an ID
              id: item.id ? String(item.id) : uuidv4(), 
              order: index
            }))
        );
        setFrenshItems(
          parsedContentItems
            .filter((item: any) => item.language === "fr")
            .map((item: any, index: number) => ({
              ...item,
              id: item.id ? String(item.id) : uuidv4(),
              order: index
            }))
        );

        // If paramLang is invalid, fallback to whichever is populated
        if (!["en", "fr"].includes(paramLang || "")) {
          setLanguage(blogPost.title_en ? "en" : "fr");
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    fetchBlogPost();
  }, [slug, paramLang]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleItemContentChange = (itemIndex: number, event: any) => {
    // choose the correct array
    const updatedItems = language === "en" ? [...englishItems] : [...frenshItems];
    const item = updatedItems[itemIndex];

    // handle image/pdf
    if (item.type === "image" || item.type === "pdf") {
      const file = event.target.files?.[0];
      if (file) {
        item.file = file;
        const reader = new FileReader();
        reader.onload = (evt: any) => {
          item.file_path = evt.target.result; // preview
          if (language === "en") {
            setEnglishItems([...updatedItems]);
          } else {
            setFrenshItems([...updatedItems]);
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      // text, title, etc.
      item.content = event.target.value;
      if (language === "en") {
        setEnglishItems([...updatedItems]);
      } else {
        setFrenshItems([...updatedItems]);
      }
    }
  };

  // "Add new content item" logic
  const addNewItem = (type: string) => {
    const updatedItems = language === "en" ? [...englishItems] : [...frenshItems];
    const newItem = {
      id: uuidv4(),
      order: updatedItems.length,
      content: type === "list" ? [{ text: "", image: "" }] : "",
      type,
      language,
    };
    updatedItems.push(newItem);
    language === "en" ? setEnglishItems(updatedItems) : setFrenshItems(updatedItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build form data
    const formDataToSend = new FormData();
    formDataToSend.append("_method", "PUT");

    for (const key in formData) {
      formDataToSend.append(key, formData[key as keyof typeof formData] || "");
    }

    if (image) {
      formDataToSend.append("image", image);
    }

    // pick the right array of items
    const selectedItems = language === "en" ? englishItems : frenshItems;

    selectedItems.forEach((item, index) => {
      formDataToSend.append(`items[${index}][id]`, item.id ? String(item.id) : "");
      formDataToSend.append(`items[${index}][type]`, item.type);
      formDataToSend.append(`items[${index}][language]`, item.language);
      formDataToSend.append(`items[${index}][order]`, item.order.toString());

      if (item.type === "list") {
        item.content.forEach((listItem: any, listIndex: number) => {
          formDataToSend.append(`items[${index}][content][${listIndex}][text]`, listItem.text);
          if (listItem.image) {
            formDataToSend.append(`items[${index}][content][${listIndex}][image]`, listItem.image);
          }
          if (listItem.imageFile) {
            formDataToSend.append(
              `items[${index}][content][${listIndex}][imageFile]`,
              listItem.imageFile
            );
          }
        });
      } else {
        formDataToSend.append(`items[${index}][content]`, item.content);
      }

      if (item.file) {
        formDataToSend.append(`items[${index}][file]`, item.file);
      }
    });

    try {
      const response = await axios.post(`/api/posts/${slug}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        Swal.fire("Success", "Blog updated successfully", "success");
        navigate("/admin/posts");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      Swal.fire("Error", "Failed to update blog.", "error");
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Link to="/admin/posts">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <Title>Edit Post</Title>
        </div>
        <Select
          divClassNames="!flex-row items-center gap-2"
          label="Language:"
          name="language"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="fr">French</option>
        </Select>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col grow">
        {language === "en" && (
          <>
            <Input
              label="Title"
              type="text"
              name="title_en"
              value={formData.title_en}
              onChange={handleChange}
            />
              <Textarea
                label="Subtitle"
                name="subtitle_en"
                value={formData.subtitle_en}
                onChange={handleChange}
              />
            <Textarea
              label="Summary"
              name="summary_en"
              value={formData.summary_en}
              onChange={handleChange}
            />
          </>
        )}
        {language === "fr" && (
          <>
            <Input
              label="Title"
              type="text"
              name="title_fr"
              value={formData.title_fr}
              onChange={handleChange}
            />
            <Textarea
              label="Subtitle"
              name="subtitle_fr"
              value={formData.subtitle_fr}
              onChange={handleChange}
            />
            <Textarea
              label="Summary"
              name="summary_fr"
              value={formData.summary_fr}
              onChange={handleChange}
            />
          </>
        )}

        {/* Radio Buttons for "type" */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-500">Type</label>
          <div className="mt-2 flex space-x-4">
            <label
              className={`flex items-center p-2 border rounded cursor-pointer duration-200 ${
                formData.type === "marin" ? "bg-indigo-100 hover:bg-indigo-200" : "bg-white hover:bg-slate-100"
              }`}
            >
              <input
                id="marin"
                name="type"
                type="radio"
                value="marin"
                checked={formData.type === "marin"}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 outline-none"
              />
              <p className="ml-3 block text-sm font-medium text-gray-700">Marin</p>
            </label>
            <label
              className={`flex items-center p-2 border rounded cursor-pointer duration-200 ${
                formData.type === "terrestre"
                  ? "bg-indigo-100 hover:bg-indigo-200"
                  : "bg-white hover:bg-slate-100"
              }`}
            >
              <input
                id="terrestre"
                name="type"
                type="radio"
                value="terrestre"
                checked={formData.type === "terrestre"}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 outline-none"
              />
              <p className="ml-3 block text-sm font-medium text-gray-700">Terrestre</p>
            </label>
          </div>
        </div>

        <div className="text-sm text-slate-500 font-medium mb-2">Content</div>

        {(language === "en" && englishItems.length) || (language === "fr" && frenshItems.length) ? (
          <ItemsList
            handleItemContentChange={handleItemContentChange}
            items={language === "en" ? englishItems : frenshItems}
            setItems={language === "en" ? setEnglishItems : setFrenshItems} language={language}
            key={language} 
            route = "/api/content-items"
                    />
        ) : (
          <div className="shadow p-4">
            There is no content currently, add new content by clicking one of the buttons below
          </div>
        )}

        <div className="mt-4 px-8 flex justify-between">
          <section className="flex gap-2">
            {/* Add New Item Buttons */}
            <Button
              type="button"
              customClassnames="!py-1 !px-3 !text-xs !flex justify-center items-center"
              onClick={() => addNewItem("title")}
            >
              <PlusIcon className="h-4 w-4" />
              Title
            </Button>
            <Button
              type="button"
              customClassnames="!py-1 !px-3 !text-xs !flex justify-center items-center"
              onClick={() => addNewItem("text")}
            >
              <PlusIcon className="h-4 w-4" />
              Text
            </Button>
            <Button
              type="button"
              customClassnames="!py-1 !px-3 !text-xs !flex justify-center items-center"
              onClick={() => addNewItem("list")}
            >
              <PlusIcon className="h-4 w-4" />
              List
            </Button>
            <Button
              type="button"
              customClassnames="!py-1 !px-3 !text-xs !flex justify-center items-center"
              onClick={() => addNewItem("image")}
            >
              <PlusIcon className="h-4 w-4" />
              Image
            </Button>
            <Button
              type="button"
              customClassnames="!py-1 !px-3 !text-xs !flex justify-center items-center"
              onClick={() => addNewItem("pdf")}
            >
              <PlusIcon className="h-4 w-4" />
              Pdf
            </Button>
          </section>
        </div>

        <Input label="Image" type="file" name="image" onChange={handleImageChange} />
        <Button type="submit">Update Blog</Button>
      </form>
    </div>
  );
};

export default EditPost;
