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
    name_en: string;
    name_fr: string;

}

const CreateTheme: React.FC = () => {
    const [language, setLanguage] = useState<string>("en");
    const [formData, setFormData] = useLocalStorage("blog-info", {
        name_en: "",
        name_fr: "",


    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Separate state for different language content items


    const handleLanguageChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        if (
            (lang === "en" && (formData.name_fr)) ||
            (lang === "fr" && (formData.name_en))
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
                const created = await createTheme();

                if (created) {
                    navigate(`/admin/theme/${created.slug}?lang=${lang}`);
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
            if (!formData.name_en) {
                newErrors.name_en = "name_en is required.";
            }


        } else {
            if (!formData.name_fr) {
                newErrors.name_fr = "name_fr est requise.";
            }


        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function createTheme(): Promise<{ slug: string } | null> {
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
            const response = await axios.post("/api/theme", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Swal.fire("Success", "Theme created successfully", "success");
            setFormData({
                name_en: "",
                name_fr: "",
            });
            setErrors({}); // Clear any previous errors
            toast.success("Theme created successfully");
            return response.data;
        } catch (error) {
            let msg = "An error occurred while creating the theme. Please try again.";
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

        const created = await createTheme();

        if (created) navigate("/admin/theme");
    };



    return (
        <div className="h-[calc(100vh-80px)] flex flex-col p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Link className="" to="/admin/theme">
                        <ArrowLeftIcon className="h-5 w-5" />
                    </Link>
                    <Title>Create New Theme</Title>
                </div>
                <Select divClassNames="!flex-row items-center gap-2" label="Language:" name="language" value={language} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </Select>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col grow">


           
                {language === "en" && (
                    <>


                        <Input
                            label="Event Description"
                            type="string"
                            name="name_en"
                            value={formData.name_en}
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
                        "Create Theme"
                    )}
                </Button>
            </form>
        </div>
    );
};

export default CreateTheme;
