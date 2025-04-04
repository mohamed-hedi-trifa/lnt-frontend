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


const UpdatePreiousEvent = ({ location, params }: { location: any; params: any }) => {
  const searchParams = new URLSearchParams(location?.search);
  const paramLang = searchParams.get("lang");

  const [slug, setSlug] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>(paramLang === "fr" ? "fr" : "en");
   const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name_en: "",
    name_fr: "",
    description_fr: "",
    description_en: "",

    place_en: "",
    place_fr: "",

    date: "",
});

  useEffect(() => {
    const slugParam = params.slug;
    setSlug(slugParam);
  }, [location]);

  useEffect(() => {
    const fetchPreviousEvent = async () => {
      if (!slug) return;
      try {
        const response = await axios.get(`/api/previous-event/${slug}`);
        const previousEvent: any = response.data;
    

        // Set form data
        setFormData({
            name_en: previousEvent.name_en ?? "",
            name_fr: previousEvent.name_fr ?? "",


            description_fr: previousEvent.description_fr ?? "",
            description_en: previousEvent.description_en ?? "",

            place_en: previousEvent.place_en ?? "",
            place_fr: previousEvent.place_fr ?? "",
            date: previousEvent.date ?? ""

        });





        // If paramLang is invalid, fallback to whichever is populated
        if (!["en", "fr"].includes(paramLang || "")) {
          setLanguage(previousEvent.name_en ? "en" : "fr");
        }
      } catch (error) {
        console.error("Error fetching blog previous Event:", error);
      }
    };

    fetchPreviousEvent();
  }, [slug, paramLang]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };







  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build form data
    const formDataToSend = new FormData();
    formDataToSend.append("_method", "PUT");
    
    for (const key in formData) {
        formDataToSend.append(key, formData[key as keyof typeof formData] || "");
    }


  
    try {
      const response = await axios.post(`/api/previous-event/${slug}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        Swal.fire("Success", "Event updated successfully", "success");
        navigate("/admin/previous-event");
      }
    } catch (error) {
      console.error("Error updating previous-event:", error);
      Swal.fire("Error", "Failed to update previous-event.", "error");
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Link to="/admin/previous-event">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <Title>Edit Previous Event</Title>
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
        


      {language === "en" && (
                    <>
                        <Input label="Name" type="text" name="name_en" value={formData.name_en} onChange={handleChange} />


  

                        <Textarea label="Description" name="description_en" value={formData.description_en} onChange={handleChange} />

                        <Textarea label="Place" name="place_en" value={formData.place_en} onChange={handleChange} />
                    </>
                )}

                {language === "fr" && (
                    <>
                        <Input label="Nom" type="text" name="name_fr" value={formData.name_fr} onChange={handleChange} />


                   
                        <Textarea label="Description " name="description_fr" value={formData.description_fr} onChange={handleChange} />
                        
  

                        <Textarea label="Place" name="place_fr" value={formData.place_fr} onChange={handleChange} />
                    </>
                )}

                {/* Start & End Dates */}
                <Input label="Date" type="datetime" name="date" value={formData.date} onChange={handleChange} />



                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <div className="w-fit mx-auto">
                              Loading...
                        </div>
                    ) : (
                        "Update Previous Event"
                    )}
                </Button>
            </form>
    </div>
  );
};

export default UpdatePreiousEvent;
