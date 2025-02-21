import React, { useState, useEffect, ChangeEvent } from "react";
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

const EditEdition = ({ location, params }: { location: any; params: any }) => {
  const searchParams = new URLSearchParams(location?.search);
  const paramLang = searchParams.get("lang");

  const [slug, setSlug] = useState<string | null>(null);
      const [images, setImages] = useState<{ [key: string]: File | null }>({});
  const [language, setLanguage] = useState<string>(paramLang === "fr" ? "fr" : "en");
   const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({


    year: "",
    name_en: "",
    name_fr: "",
    image_affiche1: "",
    titre_affiche1_fr: "",
    titre_affiche1_en: "",
    desciption_affich1_en: "",
    desciption_affich1_fr: "",

    image_affiche2: "",
    titre_affiche2_fr: "",
    titre_affiche2_en: "",
    desciption_affich2_en: "",
    desciption_affich2_fr: "",

    start_date: "",
    end_date: "",
    status: "",
  });
 

  useEffect(() => {
    const slugParam = params.slug;
    setSlug(slugParam);
  }, [location]);

  useEffect(() => {
    const fetchEdition = async () => {
      if (!slug) return;
      try {
        const response = await axios.get(`/api/edition/${slug}`);
        const edition: any = response.data;
    

        // Set form data
        setFormData({
            year: edition.year ?? "",
            name_en: edition.name_en ?? "",
            name_fr: edition.name_fr ?? "",
            image_affiche1: edition.image_affiche1 ?? "",
            titre_affiche1_fr: edition.titre_affiche1_fr ?? "",
            titre_affiche1_en: edition.titre_affiche1_en ?? "",
            desciption_affich1_en: edition.desciption_affich1_en ?? "",
            desciption_affich1_fr: edition.desciption_affich1_fr ?? "",
            image_affiche2: edition.image_affiche2 ?? "",
            titre_affiche2_fr: edition.titre_affiche2_fr ?? "",
            titre_affiche2_en: edition.titre_affiche2_en ?? "",
            desciption_affich2_en: edition.desciption_affich2_en ?? "",
            desciption_affich2_fr: edition.desciption_affich2_fr ?? "",
            start_date: edition.start_date ?? "",
            end_date: edition.end_date ?? "",
            status: edition.status ?? ""




        });





        // If paramLang is invalid, fallback to whichever is populated
        if (!["en", "fr"].includes(paramLang || "")) {
          setLanguage(edition.name_en ? "en" : "fr");
        }
      } catch (error) {
        console.error("Error fetching blog edition:", error);
      }
    };

    fetchEdition();
  }, [slug, paramLang]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (e.target.files) {
            setImages((prevImages) => ({
                ...prevImages,
                [fieldName]: e.target.files[0], // Store the file for the respective field
            }));
        }
    };





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build form data
    const formDataToSend = new FormData();
    formDataToSend.append("_method", "PUT");
    
    for (const key in formData) {
        formDataToSend.append(key, formData[key as keyof typeof formData] || "");
    }
    
    Object.entries(images).forEach(([key, file]) => {
      if (file instanceof File) {
        formDataToSend.append(key, file);
      }
    });
    

    // pick the right array of items


        console.log(formDataToSend);
    try {
      const response = await axios.post(`/api/edition/${slug}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        Swal.fire("Success", "Edition updated successfully", "success");
        navigate("/admin/edition");
      }
    } catch (error) {
      console.error("Error updating edition:", error);
      Swal.fire("Error", "Failed to update Edition.", "error");
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Link to="/admin/edition">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <Title>Edit Edition</Title>
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

      <form onSubmit={handleSubmit} className="flex flex-col grow space-y-4">
                {/* Year */}
                <Input label="Year" type="text" name="year" value={formData.year} onChange={handleChange} />

                {/* Language-Specific Inputs */}
                {language === "en" && (
                    <>
                        <Input label="Name" type="text" name="name_en" value={formData.name_en} onChange={handleChange} />


                        <Input label="Image Affiche 1" type="file" name="image_affiche1" onChange={(e) => handleImageChange(e, 'image_affiche1')} />

                        <Input label="Titre Affiche 1" type="text" name="titre_affiche1_en" value={formData.titre_affiche1_en} onChange={handleChange} />

                        <Textarea label="Description Affiche 1" name="desciption_affich1_en" value={formData.desciption_affich1_en} onChange={handleChange} />

                        <Input label="Image Affiche 2" type="file" name="image_affiche2" onChange={(e) => handleImageChange(e, 'image_affiche2')} />

                        <Input label="Title Affiche 2" type="text" name="titre_affiche2_en" value={formData.titre_affiche2_en} onChange={handleChange} />

                        <Textarea label="Description Affiche 2" name="desciption_affich2_en" value={formData.desciption_affich2_en} onChange={handleChange} />
                    </>
                )}

                {language === "fr" && (
                    <>
                        <Input label="Nom" type="text" name="name_fr" value={formData.name_fr} onChange={handleChange} />


                        <Input label="Image Affiche 1" type="file" name="image_affiche1" onChange={(e) => handleImageChange(e, 'image_affiche1')} />

                        <Input label="Titre Affiche 1" type="text" name="titre_affiche1_fr" value={formData.titre_affiche1_fr} onChange={handleChange} />

                        <Textarea label="Description Affiche 1" name="desciption_affich1_fr" value={formData.desciption_affich1_fr} onChange={handleChange} />
                        
                        <Input label="Image Affiche 2" type="file" name="image_affiche2" onChange={(e) => handleImageChange(e, 'image_affiche2')} />

                        <Input label="Titre Affiche 2" type="text" name="titre_affiche2_fr" value={formData.titre_affiche2_fr} onChange={handleChange} />

                        <Textarea label="Description Affiche 2" name="desciption_affich2_fr" value={formData.desciption_affich2_fr} onChange={handleChange} />
                    </>
                )}

                {/* Start & End Dates */}
                <Input label="Start Date" type="date" name="start_date" value={formData.start_date} onChange={handleChange} />

                <Input label="End Date" type="date" name="end_date" value={formData.end_date} onChange={handleChange} />


                <Select
                    name="status"
                    label="Status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                    <option value="hidden">Hidden</option>
                    <option value="visible">Visible</option>
                </Select>






                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <div className="w-fit mx-auto">
                            <ReactLoading type="spinningBubbles" color="white" height={25} width={25} />
                        </div>
                    ) : (
                        "Create Edition"
                    )}
                </Button>
            </form>
    </div>
  );
};

export default EditEdition;
