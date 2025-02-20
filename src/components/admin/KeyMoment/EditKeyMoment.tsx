import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../atoms/inputs/Input";
import Button from "../../atoms/Button";
import Swal from "sweetalert2";
import { Link, navigate } from "gatsby";
import Title from "../../atoms/titles/Title";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Select from "../../atoms/inputs/Select";


const EditKeyMoment = ({ location, params }: { location: any; params: any }) => {
    const searchParams = new URLSearchParams(location?.search);
    const paramLang = searchParams.get("lang");

    const [slug, setSlug] = useState<string | null>(null);
    const [language, setLanguage] = useState<string>(paramLang === "fr" ? "fr" : "en");
    const [formData, setFormData] = useState({

        event_description_en: "",
        event_description_fr: "",
        year: "",
    });


    useEffect(() => {
        const slugParam = params.slug;
        setSlug(slugParam);
    }, [location]);

    useEffect(() => {
        const fetchKeyMoment = async () => {
            if (!slug) return;
            try {
                const response = await axios.get(`/api/key-moments/${slug}`);
                const keyMoment: any = response.data;


                // Set form data
                setFormData({
                    event_description_en: keyMoment.event_description_en ?? "",
                    event_description_fr: keyMoment.event_description_fr ?? "",
                    year: keyMoment.year ?? "",
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



        // pick the right array of items




        try {
            const response = await axios.post(`/api/key-moments/${slug}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.status === 200) {
                Swal.fire("Success", "key moment updated successfully", "success");
                navigate("/admin/key-moment");
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            Swal.fire("Error", "Failed to update key Moment.", "error");
        }
    };

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Link to="/admin/posts">
                        <ArrowLeftIcon className="h-6 w-6" />
                    </Link>
                    <Title>Edit Post</Title>
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

         









                <Button type="submit">Update key moment</Button>
            </form>
        </div>
    );
};

export default EditKeyMoment;
