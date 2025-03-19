import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import { Link, navigate } from "gatsby";

import Input from "@/components/atoms/inputs/Input";
import Button from "@/components/atoms/Button";
import Title from "@/components/atoms/titles/Title";

import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";

import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import useLocalStorage from "@/lib/useLocalStorage";

interface FormData {
    title_en: string;
    title_fr: string;
    description_en: string;
    description_fr: string;
}





export default function CreateResearchKnowledge({ location, params }: { location: any; params: any }) {
    const [language, setLanguage] = useState<string>("en");
    const [formData, setFormData] = useLocalStorage("researchKnowledge-info", {

        title_en: "",
        title_fr: "",
        description_en: "",
        description_fr: "",

    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);



    const [pdf_link, setPdf_link] = useState<File | null>(null);

    const handleLanguageChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;

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
            const created = await createResearchKnowledge();

            if (created) navigate(`/admin/species/manage-species/${params.slug}/research-knowledge/?lang=${lang}`);
        } else if (result.isDenied) {
            setLanguage(lang);
        }

    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePdfLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPdf_link(e.target.files[0]); // Store the file object
        }
    };



    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (language === "en") {


            if (!formData.title_en) {
                newErrors.title_en = "Title is required.";
            }
            if (!formData.description_en) {
                newErrors.description_en = "Description is required.";
            }

        } else {
            if (!formData.title_fr) {
                newErrors.title_fr = "Title is required.";
            }
            if (!formData.description_fr) {
                newErrors.description_fr = "Description is required.";
            }

        }

        if (!pdf_link) {
            newErrors.pdf_link = "PDF is required.";
        } else if (!pdf_link.type.includes('pdf')) {
            newErrors.pdf_link = "File must be a PDF.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function createResearchKnowledge(): Promise<{ slug: string } | null> {
        if (!validateForm()) {
            return null;
        }


        const formDataToSend = new FormData();


        for (const key in formData) {
            formDataToSend.append(key, formData[key as keyof FormData]);
        }

        if (pdf_link) {
            formDataToSend.append("pdf_link", pdf_link);
        }


        setIsLoading(true);
        try {
            const response = await axios.post(`/api/research-knowledge/${params.slug}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setFormData({
                title_en: "",
                title_fr: "",
                description_en: "",
                description_fr: "",
            });

            setErrors({}); // Clear any previous errors
            toast.success("Research Knowledge created successfully");
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

        const created = await createResearchKnowledge();

        if (created) navigate(`/admin/species/manage-species/${params.slug}/research-knowledge/`);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        // Get the current value of the checkbox (true/false)
        const value = e.target.checked ? 1 : 0;
        console.log(value)

        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [fieldName]: value,
        }));
    };




    return (
        <div className="h-[calc(100vh-80px)] flex flex-col p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Link className="" to={`/admin/species/manage-species/${params.slug}/research-knowledge/`}>
                        <ArrowLeftIcon className="h-5 w-5" />
                    </Link>
                    <Title>Create New Research Knowledge</Title>
                </div>

            </div>
            <form onSubmit={handleSubmit} className="flex flex-col grow">
                {language === "en" && (
                    <>
                        <Input label="Title" type="text" name="title_en" value={formData.title_en} onChange={handleChange} />
                        {errors.title_en && <div className="text-red-500 text-sm">{errors.title_en}</div>}

                        <Input label="Description" type="text" name="description_en" value={formData.description_en} onChange={handleChange} />
                        {errors.description_en && <div className="text-red-500 text-sm">{errors.description_en}</div>}

                    </>
                )}
                {language === "fr" && (
                    <>
                        <Input label="Title" type="text" name="title_fr" value={formData.title_fr} onChange={handleChange} />
                        {errors.title_fr && <div className="text-red-500 text-sm">{errors.title_fr}</div>}

                        <Input label="Description" type="text" name="description_fr" value={formData.description_fr} onChange={handleChange} />
                        {errors.description_fr && <div className="text-red-500 text-sm">{errors.description_fr}</div>}

                    </>
                )}




                <Input
                    label="PDF"
                    type="file"
                    name="pdf_link"
                    accept="application/pdf" // Restrict to PDF files
                    onChange={handlePdfLinkChange} // Your custom change handler
                />
                {errors.pdf_link && <div className="text-red-500 text-sm">{errors.pdf_link}</div>}

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <div className="w-fit mx-auto">
                            <ReactLoading type="spinningBubbles" color="white" height={25} width={25} />
                        </div>
                    ) : (
                        "Create Research Knowledge"
                    )}
                </Button>
            </form>

        </div>
    );
};

