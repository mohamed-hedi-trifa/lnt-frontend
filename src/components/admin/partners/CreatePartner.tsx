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
import ReactLoading from "react-loading";
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




const CreatePartner: React.FC = () => {
    const [language, setLanguage] = useState<string>("en");
    const [formData, setFormData] = useLocalStorage("event-info", {

        name: "",
        isAmcp: "0",
        isGeneral: "0",
        description_fr: "",
        description_en: "",
        facebookLink: "",
        websiteLink: "",
        linkedInLink: "",
        instagramLink: ""
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);



    const [image, setImage] = useState<File | null>(null);

    const handleLanguageChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        if (
            (lang === "en" && (formData.title_fr || frenchItems.length > 0)) ||
            (lang === "fr" && (formData.title_en || englishItems.length > 0))
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
                const created = await createPartener();

                if (created) navigate(`/admin/partners/${created.slug}?lang=${lang}`);
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

        if (language === "en") {


            if (!formData.name) {
                newErrors.name = "Name is required.";
            }
            if (!formData.description_en) {
                newErrors.summary_en = "Summary is required.";
            }

        } else {
            if (!formData.name) {
                newErrors.title_fr = "Title is required.";
            }
            if (!formData.description_fr) {
                newErrors.summary_fr = "Summary is required.";
            }

        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function createPartener(): Promise<{ slug: string } | null> {
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
            const response = await axios.post("/api/create-partner", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setFormData({
                name: "",
                isAmcp: "0",
                isGeneral: "0",
                description_fr: "",
                description_en: "",
                facebookLink: "",
                websiteLink: "",
                linkedInLink: "",
                instagramLink: ""


            });

            setErrors({}); // Clear any previous errors
            toast.success("Partner created successfully");
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

        const created = await createPartener();

        if (created) navigate("/admin/partners");
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
                    <Link className="" to="/admin/events">
                        <ArrowLeftIcon className="h-5 w-5" />
                    </Link>
                    <Title>Create New Partner</Title>
                </div>
                <Select divClassNames="!flex-row items-center gap-2" label="Language:" name="language" value={language} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </Select>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col grow">

                {language === "en" && (
                    <>
                        <Input label="Name" type="text" name="name" value={formData.name} onChange={handleChange} />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

                        <Input label="Description" type="text" name="description_en" value={formData.description_en} onChange={handleChange} />
                        {errors.description_en && <div className="text-red-500 text-sm">{errors.description_en}</div>}

                        <Input label="Facebook Link" type="url" name="facebookLink" value={formData.facebookLink} onChange={handleChange} />
                        {errors.facebookLink && <div className="text-red-500 text-sm">{errors.facebookLink}</div>}

                        <Input label="Website Link" type="url" name="websiteLink" value={formData.websiteLink} onChange={handleChange} />
                        {errors.websiteLink && <div className="text-red-500 text-sm">{errors.websiteLink}</div>}

                        <Input label="LinkedIn Link" type="url" name="linkedInLink" value={formData.linkedInLink} onChange={handleChange} />
                        {errors.linkedInLink && <div className="text-red-500 text-sm">{errors.linkedInLink}</div>}

                        <Input label="Instagram Link" type="url" name="instagramLink" value={formData.instagramLink} onChange={handleChange} />
                        {errors.instagramLink && <div className="text-red-500 text-sm">{errors.instagramLink}</div>}
                    </>
                )}

                {language === "fr" && (
                    <>
                        <Input label="Nom" type="text" name="name" value={formData.name} onChange={handleChange} />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

                        <Input label="Description" type="text" name="description_fr" value={formData.description_fr} onChange={handleChange} />
                        {errors.description_fr && <div className="text-red-500 text-sm">{errors.description_fr}</div>}

                        <Input label="Facebook Link" type="url" name="facebookLink" value={formData.facebookLink} onChange={handleChange} />
                        {errors.facebookLink && <div className="text-red-500 text-sm">{errors.facebookLink}</div>}

                        <Input label="Website Link" type="url" name="websiteLink" value={formData.websiteLink} onChange={handleChange} />
                        {errors.websiteLink && <div className="text-red-500 text-sm">{errors.websiteLink}</div>}

                        <Input label="LinkedIn Link" type="url" name="linkedInLink" value={formData.linkedInLink} onChange={handleChange} />
                        {errors.linkedInLink && <div className="text-red-500 text-sm">{errors.linkedInLink}</div>}

                        <Input label="Instagram Link" type="url" name="instagramLink" value={formData.instagramLink} onChange={handleChange} />
                        {errors.instagramLink && <div className="text-red-500 text-sm">{errors.instagramLink}</div>}
                    </>
                )}

                {/* Fields for isAmcp and isGeneral */}
                <div className="flex gap-4 mt-4">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isAmcp"
                            checked={formData.isAmcp === 1}
                            onChange={(e) => handleCheckboxChange(e, "isAmcp")}
                            className="mr-2"
                        />
                        <label>AMCP</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isGeneral"
                            checked={formData.isGeneral === 1}
                            onChange={(e) => handleCheckboxChange(e, "isGeneral")}
                            className="mr-2"
                        />
                        <label>General</label>
                    </div>
                </div>

                <Input label="Image" type="file" name="image" onChange={handleImageChange} />
                {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <div className="w-fit mx-auto">
                            <ReactLoading type="spinningBubbles" color="white" height={25} width={25} />
                        </div>
                    ) : (
                        "Create Partner"
                    )}
                </Button>
            </form>

        </div>
    );
};

export default CreatePartner;
