import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, navigate } from "gatsby";
import ItemsList from "./ItemsList";
import { arrayMove } from "react-sortable-hoc";
import Input from "../../Input";
import Textarea from "../../Textarea";
import Button from "../../Button";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import Title from "../../Title";
import Select from "../../Select";

interface FormData {
  title_en: string;
  title_fr: string;
  summary_en: string;
  summary_fr: string;
}

const CreatePost: React.FC = () => {
  const [language, setLanguage] = useState<string>("en");
  const [formData, setFormData] = useState<FormData>({
    title_en: "",
    title_fr: "",
    summary_en: "",
    summary_fr: "",
  });

  // Separate state for different language content items
  const [englishItems, setEnglishItems] = useState<any[]>([]);
  const [frenchItems, setFrenchItems] = useState<any[]>([]);
  const [image, setImage] = useState<File | null>(null); // Separate state for the main image

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]); // Store the file object
    }
  };

  const handleItemContentChange = (itemIndex: number, event: any) => {
    const updatedItems = language === "en" ? [...englishItems] : [...frenchItems];

    if (updatedItems[itemIndex].type === "image" || updatedItems[itemIndex].type === "pdf") {
      const file = event?.target?.files?.[0]; // Get the selected file

      if (file) {
        const reader = new FileReader();

        // Update file name immediately
        updatedItems[itemIndex].file = file;

        // Use FileReader to preview the image
        reader.onload = (e) => {
          updatedItems[itemIndex].file_path = e.target?.result; // Set the preview URL (base64 string)
          language === "en" ? setEnglishItems([...updatedItems]) : setFrenchItems([...updatedItems]);
        };

        reader.readAsDataURL(file); // Read the file and trigger onload
      }
    } else {
      updatedItems[itemIndex].content = event.target.value;
      language === "en" ? setEnglishItems([...updatedItems]) : setFrenchItems([...updatedItems]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append all form fields to FormData
    for (const key in formData) {
      formDataToSend.append(key, formData[key as keyof FormData]);
    }

    if (image) {
      formDataToSend.append("image", image); // Append the main image file
    }

    const selectedItems = language === "en" ? englishItems : frenchItems;

    selectedItems.forEach((item, index) => {
      formDataToSend.append(`items[${index}][type]`, item.type);
      formDataToSend.append(`items[${index}][content]`, item.content);
      formDataToSend.append(`items[${index}][language]`, item.language);
      formDataToSend.append(`items[${index}][order]`, item.order);

      // Append the file if it's an image or PDF
      if (item.file) {
        formDataToSend.append(`items[${index}][file]`, item.file); // Dynamic field name for file
      }
    });

    try {
      const response = await axios.post("/api/posts", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        Swal.fire("Success", "Post created successfully", "success");
        navigate("/admin/blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const addNewItem = (type: string) => {
    const newItem = {
      order: language === "en" ? englishItems.length : frenchItems.length,
      content: "",
      type,
      language: language,
    };

    const updatedItems = language === "en" ? [...englishItems] : [...frenchItems];
    updatedItems.push(newItem);

    language === "en" ? setEnglishItems([...updatedItems]) : setFrenchItems([...updatedItems]);
  };

  const onItemsSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const updatedItems = language === "en" ? [...englishItems] : [...frenchItems];

    const sortedItems = arrayMove(updatedItems, oldIndex, newIndex).map((item, idx) => {
      return { ...item, order: idx };
    });

    language === "en" ? setEnglishItems([...sortedItems]) : setFrenchItems([...sortedItems]);
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Link className="" to="/admin/posts">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <Title>Create New Post</Title>
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
          <Input
            label="Title"
            type="text"
            name="title_en"
            value={formData.title_en}
            onChange={handleChange}
          />
        )}
        {language === "fr" && (
          <Input
            label="Title"
            type="text"
            name="title_fr"
            value={formData.title_fr}
            onChange={handleChange}
          />
        )}
        {language === "en" && (
          <Textarea
            label="Summary"
            name="summary_en"
            value={formData.summary_en}
            onChange={handleChange}
          />
        )}
        {language === "fr" && (
          <Textarea
            label="Summary"
            name="summary_fr"
            value={formData.summary_fr}
            onChange={handleChange}
          />
        )}

        <div className="text-slate-500 text-sm font-medium mb-2">Content</div>

        {((language === "en" && englishItems.length) || (language === "fr" && frenchItems.length)) ? (
          <ItemsList
            useDragHandle
            onSortEnd={onItemsSortEnd}
            handleItemContentChange={handleItemContentChange}
            items={language === "en" ? englishItems : frenchItems}
            setItems={language === "en" ? setEnglishItems : setFrenchItems}
            language={language}
            key={language}
          />
        ) : (
          <div className="shadow p-4">
            There is no content currently, add new content by clicking one of the buttons below
          </div>
        )}

        <div className="mt-4 px-8 flex justify-between">
          <section className="flex gap-2">
            <div className="mb-1">
              <Button
                type="button"
                customClassnames="!py-1 !px-3 !text-xs !flex justify-center items-center"
                onClick={() => addNewItem("title")}
              >
                <PlusIcon className="h-4 w-4" />
                Title
              </Button>
            </div>
            <div className="mb-1">
              <Button
                type="button"
                customClassnames="!py-1 !px-3 !text-xs !flex justify-center items-center"
                onClick={() => addNewItem("text")}
              >
                <PlusIcon className="h-4 w-4" />
                Text
              </Button>
            </div>
            <div className="mb-1">
              <Button
                type="button"
                customClassnames="!py-1 !px-3 !text-xs !flex justify-center items-center"
                onClick={() => addNewItem("image")}
              >
                <PlusIcon className="h-4 w-4" />
                Image
              </Button>
            </div>
            <div className="mb-1">
              <Button
                type="button"
                customClassnames="!py-1 !px-3 !text-xs !flex justify-center items-center"
                onClick={() => addNewItem("pdf")}
              >
                <PlusIcon className="h-4 w-4" />
                PDF
              </Button>
            </div>
          </section>
        </div>

        <Input label="Image" type="file" name="image" onChange={handleImageChange} />
        <Button type="submit">Create Blog</Button>
      </form>
    </div>
  );
};

export default CreatePost;
