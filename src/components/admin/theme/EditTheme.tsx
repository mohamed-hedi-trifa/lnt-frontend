import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../atoms/inputs/Input";
import Button from "../../atoms/Button";
import Swal from "sweetalert2";
import { Link, navigate } from "gatsby";
import Title from "../../atoms/titles/Title";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Select from "../../atoms/inputs/Select";


const EditTheme = ({ location, params }: { location: any; params: any }) => {
    const searchParams = new URLSearchParams(location?.search);
    const paramLang = searchParams.get("lang");
    const [image, setImage] = useState<File | null>(null);
    const [slug, setSlug] = useState<string | null>(null);
    const [language, setLanguage] = useState<string>(paramLang === "fr" ? "fr" : "en");
    const [formData, setFormData] = useState({

        name_fr: "",
        name_en: "",
    });


    useEffect(() => {
        const slugParam = params.slug;
        setSlug(slugParam);
    }, [location]);

    useEffect(() => {
        const fetchTheme = async () => {
            if (!slug) return;
            try {
                const response = await axios.get(`/api/theme/${slug}`);
                const theme: any = response.data;


                // Set form data
                setFormData({
                    name_fr: theme.name_fr ?? "",
                    name_en: theme.name_en ?? "",
                });


                if (!["en", "fr"].includes(paramLang || "")) {
                    setLanguage(theme.name_en ? "en" : "fr");
                }
            } catch (error) {
                console.error("Error fetching blog post:", error);
            }
        };

        fetchTheme();
    }, [slug, paramLang]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setImage(e.target.files[0]);
        }
    };
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
        if (image) {
            formDataToSend.append("image", image);
        }







        try {
            const response = await axios.post(`/api/theme/${slug}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.status === 200) {
                Swal.fire("Success", "Theme updated successfully", "success");
                navigate("/admin/theme");
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            Swal.fire("Error", "Failed to update Theme.", "error");
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

                {language === "en" && (
                    <>


                        <Input
                            label="Event Name"
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
                            label="Event Name"
                            type="string"
                            name="name_fr"
                            value={formData.name_fr}
                            onChange={handleChange}
                        />
                    </>
                )}



                <Input label="Image" type="file" name="image" onChange={handleImageChange} />







                <Button type="submit">Update Theme</Button>
            </form>
        </div>
    );
};

export default EditTheme;
