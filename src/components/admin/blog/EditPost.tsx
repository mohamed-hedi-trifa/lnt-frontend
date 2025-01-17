import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../atoms/inputs/Input";
import Textarea from "../../atoms/inputs/Textarea";
import Button from "../../atoms/Button";
import Swal from "sweetalert2";
import { Link, navigate } from "gatsby";
import Title from "../../atoms/titles/Title";
import { arrayMove } from "react-sortable-hoc";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import Select from "../../atoms/inputs/Select";
import ItemsList from "./ItemsList";

const EditPost = ({ location, params }: { location: any; params: any }) => {
  const searchParams = new URLSearchParams(location?.search);
  const paramLang = searchParams.get("lang");

  const [slug, setSlug] = useState(null);
  const [language, setLanguage] = useState(paramLang === "fr" ? "fr" : "en");
  const [formData, setFormData] = useState({
    title_en: "",
    title_fr: "",
    summary_en: "",
    summary_fr: "",
  });
  const [englishItems, setEnglishItems] = useState<any[]>([]);
  const [frenshItems, setFrenshItems] = useState<any[]>([]);
  const [image, setImage] = useState(null); // Separate state for the image

  useEffect(() => {
    const slugParam = params.slug;
    setSlug(slugParam);
  }, [location]);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${slug}`);
        const blogPost: any = response.data;
        blogPost.content_items.sort((a: any, b: any) => a.order - b.order);

        setFormData({
          title_en: blogPost.title_en,
          title_fr: blogPost.title_fr,
          summary_en: blogPost.summary_en,
          summary_fr: blogPost.summary_fr,
        });

        const parsedContentItems = blogPost.content_items.map((item: any) => {
          if (item.type === "list") {
            return { ...item, content: JSON.parse(item.content) };
          }
          return item;
        });

        setEnglishItems([...parsedContentItems].filter((item) => item.language === "en"));
        setFrenshItems([...parsedContentItems].filter((item) => item.language === "fr"));
        if (!["en", "fr"].includes(paramLang || "")) setLanguage(blogPost.title_en ? "en" : "fr");
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    if (slug) fetchBlogPost();
  }, [slug]);

  const handleLanguageChange = (e: any) => {
    setLanguage(e.target.value);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]); // Store the file object
  };

  const handleItemContentChange = (itemIndex: number, event: any) => {
    const updatedItems = language == "en" ? [...englishItems] : [...frenshItems];

    if (updatedItems[itemIndex].type === "image" || updatedItems[itemIndex].type === "pdf") {
      const file = event?.target?.files[0]; // Get the selected file

      if (file) {
        const reader = new FileReader();

        // Update file name immediately
        updatedItems[itemIndex].file = file;

        // Use FileReader to preview the image
        reader.onload = (e: any) => {
          updatedItems[itemIndex].file_path = e.target.result; // Set the preview URL (base64 string)
          language == "en" ? setEnglishItems([...updatedItems]) : setFrenshItems([...updatedItems]);
        };

        reader.readAsDataURL(file); // Read the file and trigger onload
      }
    } else {
      updatedItems[itemIndex].content = event.target.value;
      language == "en" ? setEnglishItems([...updatedItems]) : setFrenshItems([...updatedItems]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("_method", "PUT"); // Laravel needs this for PUT request with formData

    // Append all form fields to FormData
    for (const key in formData) {
      formDataToSend.append(key, (formData as any)[key] ? (formData as any)[key] : "");
    }

    if (image) {
      formDataToSend.append("image", image); // Append the image file if it exists
    }

    const selectedItems = language === "en" ? englishItems : frenshItems;

    selectedItems.forEach((item, index) => {
      formDataToSend.append(`items[${index}][id]`, item.id ? item.id : "");
      formDataToSend.append(`items[${index}][type]`, item.type);
      formDataToSend.append(`items[${index}][language]`, item.language);
      formDataToSend.append(`items[${index}][order]`, item.order);

      if (item.type === "list") {
        item.content.forEach((listItem: any, listIndex: number) => {
          formDataToSend.append(`items[${index}][content][${listIndex}][text]`, listItem.text);
          if (listItem.image) {
            formDataToSend.append(`items[${index}][content][${listIndex}][image]`, listItem.image);
          }
          if (listItem.imageFile) {
            formDataToSend.append(`items[${index}][content][${listIndex}][imageFile]`, listItem.imageFile);
          }
        });
      } else {
        formDataToSend.append(`items[${index}][content]`, item.content);
      }

      // Append the file if it's an image or PDF
      if (item.file) {
        formDataToSend.append(`items[${index}][file]`, item.file); // Dynamic field name for file
      }
    });

    console.log(formDataToSend);
    try {
      const response = await axios.post(`/api/posts/${slug}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        Swal.fire("Success", "Blog updated successfully", "success");
        navigate("/admin/posts");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const addNewItem = (type: string) => {
    const newItem = {
      order: language == "en" ? englishItems.length : frenshItems.length,
      content: type === "list" ? [{ text: "", image: "" }] : "",
      type,
      language: language,
    };
    const updatedItems = language == "en" ? [...englishItems] : [...frenshItems];
    updatedItems.push(newItem);

    language == "en" ? setEnglishItems([...updatedItems]) : setFrenshItems([...updatedItems]);
  };

  const onItemsSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const updatedItems = arrayMove(language == "en" ? [...englishItems] : [...frenshItems], oldIndex, newIndex).map((item, idx) => {
      return { ...item, order: idx };
    });

    language == "en" ? setEnglishItems([...updatedItems]) : setFrenshItems([...updatedItems]);
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Link className="" to="/admin/posts">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <Title>Edit Post</Title>
        </div>
        <Select divClassNames="!flex-row items-center gap-2" label="Language:" name="language" value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="fr">Frensh</option>
        </Select>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col grow">
        {language === "en" && (
          <>
            <Input label="title" type="text" name="title_en" value={formData.title_en || ""} onChange={handleChange} />
            <Textarea label="summary" name="summary_en" value={formData.summary_en || ""} onChange={handleChange} />
          </>
        )}
        {language === "fr" && (
          <>
            <Input label="title" type="text" name="title_fr" value={formData.title_fr || ""} onChange={handleChange} />
            <Textarea label="summary" name="summary_fr" value={formData.summary_fr || ""} onChange={handleChange} />
          </>
        )}

        <div className="text-sm text-slate-500 font-medium mb-2">Content</div>
        {(language == "en" && englishItems.length) || (language == "fr" && frenshItems.length) ? (
          <ItemsList
            useDragHandle
            onSortEnd={onItemsSortEnd}
            handleItemContentChange={handleItemContentChange}
            items={language == "en" ? englishItems : language == "fr" ? frenshItems : nlItems}
            setItems={language == "en" ? setEnglishItems : language == "fr" ? setFrenshItems : setNlItems}
            language={language}
            key={language}
          />
        ) : (
          <div className="shadow p-4">There is no content currently, add new content by clicking one of the buttons below</div>
        )}

        <div className="mt-4 px-8 flex justify-between">
          <section className="flex gap-2">
            <div className=" mb-1 ">
              <Button type="button" customClassnames=" !py-1 !px-3 !text-xs !flex justify-center items-center  " onClick={() => addNewItem("title")}>
                <PlusIcon className="h-4 w-4" />
                Title
              </Button>
            </div>
            <div className=" mb-1 ">
              <Button type="button" customClassnames=" !py-1 !px-3 !text-xs !flex justify-center items-center " onClick={() => addNewItem("text")}>
                <PlusIcon className="h-4 w-4" />
                Text
              </Button>
            </div>
            <div className=" mb-1 ">
              <Button type="button" customClassnames="bg-primary !py-1 !px-3 !text-xs !flex justify-center items-center " onClick={() => addNewItem("list")}>
                <PlusIcon className="h-4 w-4" />
                List
              </Button>
            </div>
            <div className=" mb-1 ">
              <Button type="button" customClassnames="bg-primary !py-1 !px-3 !text-xs !flex justify-center items-center " onClick={() => addNewItem("image")}>
                <PlusIcon className="h-4 w-4" />
                Image
              </Button>
            </div>
            <div className=" mb-1 ">
              <Button type="button" customClassnames="bg-primary !py-1 !px-3 !text-xs !flex justify-center items-center " onClick={() => addNewItem("pdf")}>
                <PlusIcon className="h-4 w-4" />
                Pdf
              </Button>
            </div>
          </section>
        </div>

        <Input label="image" type="file" name="image" onChange={handleImageChange} />
        <Button type="submit">Update Blog</Button>
      </form>
    </div>
  );
};

export default EditPost;
