import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import { Link, navigate } from "gatsby";
import Input from "../../atoms/inputs/Input";
import Button from "../../atoms/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Title from "../../atoms/titles/Title";
import Select from "../../atoms/inputs/Select";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import useLocalStorage from "@/lib/useLocalStorage";

interface FormData {
    event_description_en: string;
    event_description_fr: string;
    year: string;

}

const CreateKeyMoment: React.FC = () => {
    const [language, setLanguage] = useState<string>("en");
    const [formData, setFormData] = useLocalStorage("blog-info", {
        event_description_en: "",
        event_description_fr: "",
        year: "",

    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Separate state for different language content items


    const handleLanguageChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        if (
            (lang === "en" && (formData.event_description_fr || formData.year)) ||
            (lang === "fr" && (formData.event_description_en || formData.year))
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
                const created = await createKeyMoment();

                if (created) {
                    navigate(`/admin/key-moment/${created.slug}?lang=${lang}`);
                }
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

        if (language === "en") {
            if (!formData.event_description_en) {
                newErrors.event_description_en = "Description is required.";
            }
            if (!formData.year) {
                newErrors.year = "Year is required.";
            }

        } else {
            if (!formData.event_description_fr) {
                newErrors.event_description_fr = "La description est requise.";
            }
            if (!formData.year) {
                newErrors.year = "L'année est requise";
            }
   
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function createKeyMoment(): Promise<{ slug: string } | null> {
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
            const response = await axios.post("/api/key-moments", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Swal.fire("Success", "KeyMoment created successfully", "success");
            setFormData({
                event_description_en: "",
                event_description_fr: "",
                year: "",
     
            });
            setErrors({}); // Clear any previous errors
            toast.success("KeyMoment created successfully");
            return response.data;
        } catch (error) {
            let msg = "An error occurred while creating the key moment. Please try again.";
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

        const created = await createKeyMoment();

        if (created) navigate("/admin/key-moment");
    };



    return (
        <div className="h-[calc(100vh-80px)] flex flex-col p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Link className="" to="/admin/key-moment">
                        <ArrowLeftIcon className="h-5 w-5" />
                    </Link>
                    <Title>Create New KeyMoment</Title>
                </div>
                <Select divClassNames="!flex-row items-center gap-2" label="Language:" name="language" value={language} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </Select>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col grow">
  

<Input
                    label="Year"
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                />
                {language === "en" && (
                    <>


                        <Input
                            label="Event Description"
                            type="string"
                            name="event_description_en"
                            value={formData.event_description_en}
                            onChange={handleChange}
                        />

                    </>
                )}
                {language === "fr" && (
                    <>
                        <Input
                            label="Event Description"
                            type="string"
                            name="event_description_fr"
                            value={formData.event_description_fr}
                            onChange={handleChange}
                        />
                    </>
                )}
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <div className="w-fit mx-auto">
                            <ReactLoading type="spinningBubbles" color="white" height={25} width={25} />
                        </div>
                    ) : (
                        "Create Blog"
                    )}
                </Button>
            </form>
        </div>
    );
};

export default CreateKeyMoment;
