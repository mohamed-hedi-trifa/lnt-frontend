import React, { useState, useEffect } from "react";
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

const UpdatePreviousEdition = ({ location, params }: { location: any; params: any }) => {

    const searchParams = new URLSearchParams(location?.search);
    const paramLang = searchParams.get("lang");

    const [slug, setSlug] = useState<string | null>(null);
    const [language, setLanguage] = useState<string>(paramLang === "fr" ? "fr" : "en");
    const [formData, setFormData] = useState({

        year: "",
        name_en: "",
        name_fr: "",
        slug: "",
        description_en: "",
        description_fr: "",
        card_description_en: "",
        card_description_fr: "",
        place_en: "",
        place_fr: "",
        start_date: "",
        end_date: "",
    });

    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        const slugParam = params.slug;
        setSlug(slugParam);
    }, [location]);

    useEffect(() => {
        const fetchPreviousEdition = async () => {
            if (!slug) return;
            try {
                const response = await axios.get(`/api/previous-editions/${slug}`);
                const edition: any = response.data;
                // Sort content items by order


                // Set form data
                setFormData({
                    name_en: edition.name_en ?? "",
                    name_fr: edition.name_fr ?? "",
                    description_en: edition.description_en ?? "",
                    description_fr: edition.description_fr ?? "",
                    card_description_en: edition.card_description_en ?? "",
                    card_description_fr: edition.card_description_fr ?? "",
                    place_en: edition.place_en ?? "",
                    place_fr: edition.place_fr ?? "",
                    year: edition.year ?? "",
                    start_date: edition.start_date ?? "",
                    end_date: edition.end_date ?? ""
                });








            } catch (error) {
                console.error("Error fetching previous-editions:", error);
            }
        };

        fetchPreviousEdition();
    }, [slug, paramLang]);



    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setImage(e.target.files[0]);
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

        if (image) {
            formDataToSend.append("image", image);
        }



        try {
            const response = await axios.post(`/api/previous-editions/${slug}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.status === 200) {
                Swal.fire("Success", "Previous Edition updated successfully", "success");
                navigate("/admin/previous-editions");
            }
        } catch (error) {

            Swal.fire("Error", "Failed to update edition.", "error");
        }
    };



    return (
        <div className="h-[calc(100vh-80px)] flex flex-col p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Link to="/admin/previous-editions">
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

            <form onSubmit={handleSubmit} className="flex flex-col grow">


                <Input
                    label="Year"
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                />


                {/* Start Date */}
                <Input
                    label="Start Date"
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                />


                {/* End Date */}
                <Input
                    label="End Date"
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                />


                {/* English Fields */}
                {language === "en" && (
                    <>
                        <Input
                            label="Name"
                            type="text"
                            name="name_en"
                            value={formData.name_en}
                            onChange={handleChange}
                        />


                        <Textarea
                            label="Description"
                            name="description_en"
                            value={formData.description_en}
                            onChange={handleChange}
                        />
                        <Textarea
                            label="Card Description"
                            name="card_description_en"
                            value={formData.card_description_en}
                            onChange={handleChange}
                        />

                        <Input
                            label="Place"
                            type="text"
                            name="place_en"
                            value={formData.place_en}
                            onChange={handleChange}
                        />

                    </>
                )}

                {/* French Fields */}
                {language === "fr" && (
                    <>
                        <Input
                            label="Nom"
                            type="text"
                            name="name_fr"
                            value={formData.name_fr}
                            onChange={handleChange}
                        />

                        <Textarea
                            label="Description"
                            name="description_fr"
                            value={formData.description_fr}
                            onChange={handleChange}
                        />

                        <Textarea
                            label="Description de la Carte"
                            name="card_description_fr"
                            value={formData.card_description_fr}
                            onChange={handleChange}
                        />

                        <Input
                            label="Lieu"
                            type="text"
                            name="place_fr"
                            value={formData.place_fr}
                            onChange={handleChange}
                        />

                    </>
                )}



                <Input label="Image" type="file" name="image" onChange={handleImageChange} />
                <Button type="submit">Update Edition</Button>
            </form>
        </div>
    );
};

export default UpdatePreviousEdition;
