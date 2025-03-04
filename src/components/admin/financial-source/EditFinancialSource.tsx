import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../atoms/inputs/Input";
import Button from "../../atoms/Button";
import Swal from "sweetalert2";
import { Link, navigate } from "gatsby";
import Title from "../../atoms/titles/Title";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Select from "../../atoms/inputs/Select";


const EditFinancialSource = ({ location, params }: { location: any; params: any }) => {
    const searchParams = new URLSearchParams(location?.search);
    const paramLang = searchParams.get("lang");

    const [slug, setSlug] = useState<string | null>(null);
    const [language, setLanguage] = useState<string>(paramLang === "fr" ? "fr" : "en");
    const [formData, setFormData] = useState({

        period: "",
        source: "",
        title_en: "",
        title_fr: "",
        description_en: "",
        description_fr: "",
        amount: "",
    });


    useEffect(() => {
        const slugParam = params.slug;
        setSlug(slugParam);
    }, [location]);

    useEffect(() => {
        const fetchKeyMoment = async () => {
            if (!slug) return;
            try {
                const response = await axios.get(`/api/financial-source/${slug}`);
                const keyMoment: any = response.data;


                // Set form data
                setFormData({
                    period: keyMoment.period ?? "",
                    source: keyMoment.source ?? "",
                    title_en: keyMoment.title_en ?? "",
                    description_en: keyMoment.description_en ?? "",
                    description_fr: keyMoment.description_fr ?? "",
                    amount: keyMoment.amount ?? "",
                    title_fr: keyMoment.title_fr ?? "",

                });


                if (!["en", "fr"].includes(paramLang || "")) {
                    setLanguage(keyMoment.title_en ? "en" : "fr");
                }
            } catch (error) {
                console.error("Error fetching blog post:", error);
            }
        };

        fetchKeyMoment();
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
            const response = await axios.post(`/api/financial-source/${slug}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.status === 200) {
                Swal.fire("Success", "Financial source updated successfully", "success");
                navigate("/admin/key-moment");
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            Swal.fire("Error", "Failed to update Financial source.", "error");
        }
    };

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Link to="/admin/financial-source">
                        <ArrowLeftIcon className="h-6 w-6" />
                    </Link>
                    <Title>Edit Financial Source</Title>
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
                <Input
                    label="Periode"
                    type="text"
                    name="period"
                    value={formData.period}
                    onChange={handleChange}
                />
                <Input
                    label="Source"
                    type="text"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                />
                {language === "en" && (
                    <>

                        <Input
                            label="Title"
                            type="string"
                            name="title_en"
                            value={formData.title_en}
                            onChange={handleChange}
                        />
                        <Input
                            label="Description"
                            type="string"
                            name="description_en"
                            value={formData.description_en}
                            onChange={handleChange}
                        />

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
                        <Input
                            label="Description"
                            type="string"
                            name="description_fr"
                            value={formData.description_en}
                            onChange={handleChange}
                        />
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








                <Button type="submit">Update Financial source</Button>
            </form>
        </div>
    );
};

export default EditFinancialSource;
