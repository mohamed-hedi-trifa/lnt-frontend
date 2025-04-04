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
import { v4 as uuidv4 } from "uuid";

interface FormData {
    name: string;
    isAmcp: number;
    isGeneral: number;
    description_fr: string;
    description_en: string;
    facebookLink: string;
    websiteLink: string;
    linkedInLink: string;
    instagramLink: string;
}




const CreatePreviousEdition: React.FC = () => {
    const [language, setLanguage] = useState<string>("en");
    const [formData, setFormData] = useLocalStorage("previous-edition-info", {

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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);



    const [image, setImage] = useState<File | null>(null);

    const handleLanguageChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        if (
            (lang === "en" && (
                formData.name_en ||
                formData.description_en ||
                formData.card_description_en ||
                formData.place_en
            )) ||
            (lang === "fr" && (
                formData.name_fr ||
                formData.description_fr ||
                formData.card_description_fr ||
                formData.place_fr
            ))
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
                const created = await createPreviousEdition();

                if (created) navigate(`/admin/previous-editions/${created.slug}?lang=${lang}`);
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

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]); // Store the file object
        }
    };



    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.year) {
            newErrors.year = "Year is required.";
        }

        if (!formData.start_date) {
            newErrors.start_date = "Start date is required.";
        }

        if (!formData.end_date) {
            newErrors.end_date = "End date is required.";
        }

        if (language === "en") {
            if (!formData.name_en) {
                newErrors.name_en = "Name is required.";
            }
            if (!formData.description_en) {
                newErrors.description_en = "Description is required.";
            }
            if (!formData.card_description_en) {
                newErrors.card_description_en = "Card description is required.";
            }
            if (!formData.place_en) {
                newErrors.place_en = "Place is required.";
            }
        } else {
            if (!formData.name_fr) {
                newErrors.name_fr = "Name is required.";
            }
            if (!formData.description_fr) {
                newErrors.description_fr = "Description is required.";
            }
            if (!formData.card_description_fr) {
                newErrors.card_description_fr = "Card description is required.";
            }
            if (!formData.place_fr) {
                newErrors.place_fr = "Place is required.";
            }
        }



        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function createPreviousEdition(): Promise<{ slug: string } | null> {
        if (!validateForm()) {
            return null;
        }

        const formDataToSend = new FormData();

        // Append all form fields to FormData
        for (const key in formData) {
            formDataToSend.append(key, formData[key as keyof FormData]);
        }

        if (image) {
            formDataToSend.append("image", image); // Append the main image file
        }


        setIsLoading(true);
        try {
            const response = await axios.post("/api/previous-editions", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setFormData({
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

            setErrors({}); // Clear any previous errors
            toast.success("Edition created successfully");
            return response.data;
        } catch (error) {
            let msg = "An error occurred while creating the edition. Please try again.";
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

        const created = await createPreviousEdition();

        if (created) navigate("/admin/previous-editions");
    };






    return (
        <div className="h-[calc(100vh-80px)] flex flex-col p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Link className="" to="/admin/events">
                        <ArrowLeftIcon className="h-5 w-5" />
                    </Link>
                    <Title>Create New Previous Edition</Title>
                </div>
                <Select divClassNames="!flex-row items-center gap-2" label="Language:" name="language" value={language} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </Select>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col grow space-y-4">
                {/* Year */}
                <Input
                    label="Year"
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                />
                {errors.year && <div className="text-red-500 text-sm">{errors.year}</div>}

                {/* Start Date */}
                <Input
                    label="Start Date"
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                />
                {errors.start_date && <div className="text-red-500 text-sm">{errors.start_date}</div>}

                {/* End Date */}
                <Input
                    label="End Date"
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                />
                {errors.end_date && <div className="text-red-500 text-sm">{errors.end_date}</div>}

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
                        {errors.name_en && <div className="text-red-500 text-sm">{errors.name_en}</div>}

                        <Textarea
                            label="Description"
                            name="description_en"
                            value={formData.description_en}
                            onChange={handleChange}
                        />
                        {errors.description_en && <div className="text-red-500 text-sm">{errors.description_en}</div>}

                        <Textarea
                            label="Card Description"
                            name="card_description_en"
                            value={formData.card_description_en}
                            onChange={handleChange}
                        />
                        {errors.card_description_en && <div className="text-red-500 text-sm">{errors.card_description_en}</div>}

                        <Input
                            label="Place"
                            type="text"
                            name="place_en"
                            value={formData.place_en}
                            onChange={handleChange}
                        />
                        {errors.place_en && <div className="text-red-500 text-sm">{errors.place_en}</div>}
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
                        {errors.name_fr && <div className="text-red-500 text-sm">{errors.name_fr}</div>}

                        <Textarea
                            label="Description"
                            name="description_fr"
                            value={formData.description_fr}
                            onChange={handleChange}
                        />
                        {errors.description_fr && <div className="text-red-500 text-sm">{errors.description_fr}</div>}

                        <Textarea
                            label="Description de la Carte"
                            name="card_description_fr"
                            value={formData.card_description_fr}
                            onChange={handleChange}
                        />
                        {errors.card_description_fr && <div className="text-red-500 text-sm">{errors.card_description_fr}</div>}

                        <Input
                            label="Lieu"
                            type="text"
                            name="place_fr"
                            value={formData.place_fr}
                            onChange={handleChange}
                        />
                        {errors.place_fr && <div className="text-red-500 text-sm">{errors.place_fr}</div>}
                    </>
                )}

                {/* Image Upload */}
                <Input
                    label="Image"
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                />
                {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}

                {/* Submit Button */}
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <div className="w-fit mx-auto">
                              Loading...
                        </div>
                    ) : (
                        "Create Edition"
                    )}
                </Button>
            </form>


        </div>
    );
};

export default CreatePreviousEdition;
