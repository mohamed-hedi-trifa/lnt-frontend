import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import { Link, navigate } from "gatsby";
import ItemsList from "../ItemsList";
import Input from "../../atoms/inputs/Input";
import Textarea from "../../atoms/inputs/Textarea";
import Button from "../../atoms/Button";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import Title from "../../atoms/titles/Title";
import Select from "../../atoms/inputs/Select";
// import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import useLocalStorage from "@/lib/useLocalStorage";

interface FormData {
    name_en: string;
    name_fr: string;
    description_fr: string;
    description_en: string;
    place_en: string;
    place_fr: string;
    date: string;
}

const CreatePreviousEvent: React.FC = () => {
    const [language, setLanguage] = useState<string>("en");
    const [formData, setFormData] = useLocalStorage("edition-info", {
        name_en: "",
        name_fr: "",
        description_fr: "",
        description_en: "",

        place_en: "",
        place_fr: "",

        date: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);




    const handleLanguageChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        if (
            (lang === "en" && (!formData.name_en || !formData.description_en || !formData.place_en)) ||
            (lang === "fr" && (!formData.name_fr  || !formData.description_fr || !formData.place_fr ))
        ) {
            const result = await Swal.fire({
                title: "You have unsaved changes",
                text: `Do you want to save changes before switching language?`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                cancelButtonText: `Cancel`,
                denyButtonText: "Continute without saving",
            });

            if (result.isConfirmed) {
                const created = await createPreviousEvent();

                if (created) navigate(`/admin//previous-event/${created.slug}?lang=${lang}`);
            } else if (result.isDenied) {
                setLanguage(lang);
            }
        } else {
            setLanguage(e.target.value);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };





    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
    

    
        // Validate language-specific fields
        if (language === "en") {
            if (!formData.name_en) {
                newErrors.name_en = "Name is required.";
            }
            if (!formData.description_en) {
                newErrors.description_en = "Description is required.";
            }
            if (!formData.place_en) {
                newErrors.place_en = "Place f is required.";
            }
        } else {
            if (!formData.name_fr) {
                newErrors.name_fr = "Name is required.";
            }
            if (!formData.description_fr) {
                newErrors.description_fr = "Description 1 is required.";
            }
            if (!formData.place_fr) {
                newErrors.place_fr = "Place is required.";
            }
        }
        if (!formData.date) {
            newErrors.date = "Date is required.";
        }

    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    

    async function createPreviousEvent(): Promise<{ slug: string } | null> {
   
        if (!validateForm()) {
            return null;
        }     

        const formDataToSend = new FormData();
        

        // Append all form fields to FormData
        for (const key in formData) {
            formDataToSend.append(key, formData[key as keyof FormData]);
        }


        setIsLoading(true);
        try {
            const response = await axios.post("/api/previous-event", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });


            // Swal.fire("Success", "Post created successfully", "success");
            setFormData({
                name_en: "",
                name_fr: "",
                description_fr: "",
                description_en: "",
        
                place_en: "",
                place_fr: "",
        
                date: "",
            });
       
            setErrors({});
            toast.success("Event created successfully");
            return response.data;
        } catch (error) {
            let msg = "An error occurred while creating the event. Please try again.";
            if (error instanceof AxiosError) {
                msg = error?.response?.data?.message;
            }
            setErrors((prevErrors) => ({
                ...prevErrors,
                apiError: msg,
            })); // Set API error message
        } finally {
            setIsLoading(false);
        }

        return null;
    }

    const handleSubmit = async (e: FormEvent) => {

 
        e.preventDefault();
 
        const created = await createPreviousEvent();
      
        if (created) navigate("/admin/previous-event");
    };




    return (
        <div className="h-[calc(100vh-80px)] flex flex-col p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Link className="" to="/admin/previous-event">
                        <ArrowLeftIcon className="h-5 w-5" />
                    </Link>
                    <Title>Create New Previous Event</Title>
                </div>
                <Select divClassNames="!flex-row items-center gap-2" label="Language:" name="language" value={language} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </Select>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col grow space-y-4">
 

                {language === "en" && (
                    <>
                        <Input label="Name" type="text" name="name_en" value={formData.name_en} onChange={handleChange} />
                        {errors.name_en && <div className="text-red-500 text-sm">{errors.name_en}</div>}


  

                        <Textarea label="Description" name="description_en" value={formData.description_en} onChange={handleChange} />
                        {errors.description_en && <div className="text-red-500 text-sm">{errors.description_en}</div>}

                        <Textarea label="Place" name="place_en" value={formData.place_en} onChange={handleChange} />
                        {errors.place_en && <div className="text-red-500 text-sm">{errors.place_en}</div>}
                    </>
                )}

                {language === "fr" && (
                    <>
                        <Input label="Nom" type="text" name="name_fr" value={formData.name_fr} onChange={handleChange} />
                        {errors.name_fr && <div className="text-red-500 text-sm">{errors.name_fr}</div>}


                   
                        <Textarea label="Description " name="description_fr" value={formData.description_fr} onChange={handleChange} />
                        {errors.description_fr && <div className="text-red-500 text-sm">{errors.description_fr}</div>}
                        
  

                        <Textarea label="Place" name="place_fr" value={formData.place_fr} onChange={handleChange} />
                        {errors.place_fr && <div className="text-red-500 text-sm">{errors.place_fr}</div>}
                    </>
                )}

                {/* Start & End Dates */}
                <Input label="Date" type="datetime-local" name="date" value={formData.date} onChange={handleChange} />
                {errors.date && <div className="text-red-500 text-sm">{errors.date}</div>}








                {errors.apiError && <div className="text-red-500 text-sm">{errors.apiError}</div>}


                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <div className="w-fit mx-auto">
                              Loading...
                        </div>
                    ) : (
                        "Create Previous Event"
                    )}
                </Button>
            </form>

        </div>
    );
};

export default CreatePreviousEvent;
