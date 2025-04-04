import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import { Link, navigate } from "gatsby";
import ItemsList from "./ItemsList";
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
    position_en: string;
    position_fr: string;
    job_en: string,
    job_fr: string,
    type: string;


}

const CreateMember: React.FC = () => {
    const [language, setLanguage] = useState<string>("en");
    const [formData, setFormData] = useLocalStorage("blog-info", {
        name: "",
        position_en: "",
        position_fr: "",
        job_en: "",
        job_fr: "",
        type: "AMCP",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const [image, setImage] = useState<File | null>(null); // Separate state for the main image

    const handleLanguageChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        if (
            (lang === "en" && (formData.position_fr || formData.job_fr)) ||
            (lang === "fr" && (formData.position_en || formData.job_en))
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
                const created = await createMember();

                if (created) navigate(`/admin/team-members/${created.slug}?lang=${lang}`);
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
        if (!formData.name) {
            newErrors.name = "Name is required.";
        }
        if (formData.type !== "AMCP") {
            if (language === "en") {
                if (!formData.position_en) {
                    newErrors.position_en = "Position is required.";
                }
                if (!formData.job_en) {
                    newErrors.job_en = "Job is required.";
                }
            } else {
                if (!formData.position_fr) {
                    newErrors.position_fr = "Position is required.";
                }
                if (!formData.job_fr) {
                    newErrors.job_fr = "Job is required.";
                }
            }
        } else {
            if (language === "en") {

                if (!formData.job_en) {
                    newErrors.summary_en = "Job is required.";
                }

            } else {

                if (!formData.job_fr) {
                    newErrors.summary_fr = "Job is required.";
                }

            }
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function createMember(): Promise<{ slug: string } | null> {
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
            const response = await axios.post("/api/team-members", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });


            setFormData({
                name: "",
                position_en: "",
                position_fr: "",
                job_en: "",
                job_fr: "",
                type: "normal",
            });
            setErrors({});
            toast.success("Member created successfully");
            return response.data;
        } catch (error) {
            let msg = "An error occurred while creating the member. Please try again.";
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

        const created = await createMember();

        if (created) navigate("/admin/team-members");
    };



    return (
        <div className="h-[calc(100vh-80px)] flex flex-col p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Link className="" to="/admin/team-members">
                        <ArrowLeftIcon className="h-5 w-5" />
                    </Link>
                    <Title>Create New Member</Title>
                </div>
                <Select divClassNames="!flex-row items-center gap-2" label="Language:" name="language" value={language} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </Select>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col grow">

                <Input
                    label="Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.title_en && <div className="text-red-500 text-sm">{errors.title_en}</div>}

                {language === "en" && (
                    <>
                        <Input
                            label="Job"
                            type="text"
                            name="job_en"
                            value={formData.job_en}
                            onChange={handleChange}
                        />
                        {errors.job_en && <div className="text-red-500 text-sm">{errors.job_en}</div>}


                    </>
                )}
                {language === "fr" && (
                    <>
                        <Input
                            label="Job"
                            type="text"
                            name="job_fr"
                            value={formData.job_fr}
                            onChange={handleChange}
                        />
                        {errors.job_fr && <div className="text-red-500 text-sm">{errors.job_fr}</div>}
                    </>
                )}



                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-500">Type</label>
                    <div className="mt-2 flex space-x-4">
                        {["AMCP", "normal"].map((type) => (
                            <label
                                key={type}
                                className={`flex items-center p-2 border rounded cursor-pointer duration-200 ${formData.type === type ? "bg-indigo-100 hover:bg-indigo-200" : "bg-white hover:bg-slate-100"
                                    }`}
                            >
                                <input
                                    id={type}
                                    name="type"
                                    type="radio"
                                    value={type}
                                    checked={formData.type === type}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 outline-none"
                                />
                                <p className="ml-3 block text-sm font-medium text-gray-700 capitalize">{type}</p>
                            </label>
                        ))}
                    </div>
                </div>

                {formData.type !== "AMCP" && (
                    <>
                        {language === "fr" && (
                            <Input
                                label="Position"
                                type="text"
                                name="position_fr"
                                value={formData.position_fr}
                                onChange={handleChange}
                            />
                        )}

                        {language === "en" && (
                            <Input
                                label="Position"
                                type="text"
                                name="position_en"
                                value={formData.position_en}
                                onChange={handleChange}
                            />
                        )}
                    </>
                )}
                <Input label="Image" type="file" name="image" onChange={handleImageChange} />
                <p className="   text-red-500 p-2 mx-2">Please note that all Team Members' photos must have the same dimensions</p>
                <Button type="submit" disabled={isLoading} >
                    {isLoading ? (
                        <div className="w-fit mx-auto">
                              Loading...
                        </div>
                    ) : (
                        "Add Member"
                    )}
                </Button>
            </form>
        </div>
    );
};

export default CreateMember;
