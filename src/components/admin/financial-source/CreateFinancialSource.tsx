import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import { Link, navigate } from "gatsby";
import Input from "../../atoms/inputs/Input";
import Button from "../../atoms/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Title from "../../atoms/titles/Title";
import Select from "../../atoms/inputs/Select";
// import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import useLocalStorage from "@/lib/useLocalStorage";

interface FormData {
    period: string;
    source: string;
    title_en: string;
    title_fr: string;
    description_en: string;
    description_fr: string;
    amount: string;


}

const CreateFinancialSource: React.FC = () => {
    const [language, setLanguage] = useState<string>("en");
    const [formData, setFormData] = useLocalStorage("blog-info", {
        period: "",
        source: "",
        title_en: "",
        title_fr: "",
        description_en: "",
        description_fr: "",
        amount: "",

    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Separate state for different language content items


    const handleLanguageChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        if (
            (lang === "en" && (formData.description_fr || formData.year)) ||
            (lang === "fr" && (formData.description_en || formData.year))
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
                const created = await createFinancialSource();

                if (created) {
                    navigate(`/admin/financial-source/${created.slug}?lang=${lang}`);
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
            if (!formData.description_en) {
                newErrors.description_en = "Description is required.";
            }
            if (!formData.title_en) {
                newErrors.title_en = "Title is required.";
            }

        } else {
            if (!formData.description_fr) {
                newErrors.description_fr = "La description est requise.";
            }
            if (!formData.year) {
                newErrors.year = "L'année est requise";
            }

        }
        if (!formData.period) {
            newErrors.period = "period est requise";
        }
        if (!formData.source) {
            newErrors.source = "source est requise";
        }
        if (!formData.amount) {
            newErrors.amount = "amount est requise";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function createFinancialSource(): Promise<{ slug: string } | null> {
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
            const response = await axios.post("/api/financial-source", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Swal.fire("Success", "FinancialSource created successfully", "success");
            setFormData({
                period: "",
                source: "",
                title_en: "",
                title_fr: "",
                description_en: "",
                description_fr: "",
                amount: "",

            });
            setErrors({}); // Clear any previous errors
            toast.success("FinancialSource created successfully");
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

        const created = await createFinancialSource();

        if (created) navigate("/admin/financial-source");
    };



    return (
        <div className="h-[calc(100vh-80px)] flex flex-col p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Link className="" to="/admin/financial-source">
                        <ArrowLeftIcon className="h-5 w-5" />
                    </Link>
                    <Title>Create New Financial Source</Title>
                </div>
                <Select divClassNames="!flex-row items-center gap-2" label="Language:" name="language" value={language} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </Select>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col grow">


                <Input
                    label="Periode"
                    type="text"
                    name="period"
                    value={formData.period}
                    onChange={handleChange}
                />
                        {errors.period && <div className="text-red-500 text-sm">{errors.period}</div>}
                <Input
                    label="Source"
                    type="text"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                />
                       {errors.source && <div className="text-red-500 text-sm">{errors.source}</div>}
                {language === "en" && (
                    <>

                        <Input
                            label="Title"
                            type="string"
                            name="title_en"
                            value={formData.title_en}
                            onChange={handleChange}
                        />
                               {errors.title_en && <div className="text-red-500 text-sm">{errors.title_en}</div>}
                        <Input
                            label="Description"
                            type="string"
                            name="description_en"
                            value={formData.description_en}
                            onChange={handleChange}
                        />
       {errors.description_en && <div className="text-red-500 text-sm">{errors.description_en}</div>}
                    </>
                )}
                {language === "fr" && (
                    <>
                        <Input
                            label="Title"
                            type="string"
                            name="title_fr"
                            value={formData.title_en}
                            onChange={handleChange}
                        />
                               {errors.title_fr && <div className="text-red-500 text-sm">{errors.title_fr}</div>}
                        <Input
                            label="Description"
                            type="string"
                            name="description_fr"
                            value={formData.description_en}
                            onChange={handleChange}
                        />
                               {errors.description_fr && <div className="text-red-500 text-sm">{errors.description_fr}</div>}
                    </>
                )}


                <Input
                    label="Amount"
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    step="0.001"
                    min="0"
                    max="9999.999"
                />
       {errors.amount && <div className="text-red-500 text-sm">{errors.amount}</div>}
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <div className="w-fit mx-auto">
                  Loading...
                        </div>
                    ) : (
                        "Create Financial Source"
                    )}
                </Button>
            </form>
        </div>
    );
};

export default CreateFinancialSource;
