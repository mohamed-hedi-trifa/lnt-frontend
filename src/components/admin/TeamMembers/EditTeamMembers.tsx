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
import ItemsList from "./ItemsList";
// ...
import { v4 as uuidv4 } from "uuid";

const EditTeamMembers = ({ location, params }: { location: any; params: any }) => {
    const searchParams = new URLSearchParams(location?.search);
    const paramLang = searchParams.get("lang");


    const [slug, setSlug] = useState<string | null>(null);
    const [language, setLanguage] = useState<string>(paramLang === "fr" ? "fr" : "en");
    const [formData, setFormData] = useState({
        name: "",
        position_en: "",
        position_fr: "",
        job_en: "",
        job_fr: "",
        type: "",
    });
    const [englishItems, setEnglishItems] = useState<any[]>([]);
    const [frenshItems, setFrenshItems] = useState<any[]>([]);
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        const slugParam = params.slug;
        setSlug(slugParam);
    }, [location]);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            if (!slug) return;
            try {
                const response = await axios.get(`/api/team-members/${slug}`);

                const teamMembers: any = response.data;


                // Set form data
                setFormData({
                    name: teamMembers.name ?? "",
                    position_en: teamMembers.position_en ?? "",
                    position_fr: teamMembers.position_fr ?? "",
                    job_en: teamMembers.job_en ?? "",
                    job_fr: teamMembers.job_fr || "",
                    type: teamMembers.type ?? "",
                });







                if (!["en", "fr"].includes(paramLang || "")) {
                    setLanguage(teamMembers.position_en ? "en" : "fr");
                    setLanguage(teamMembers.job_en ? "en" : "fr");
                }
            } catch (error) {
                console.error("Error fetching team member:", error);
            }
        };

        fetchTeamMembers();
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

    const handleItemContentChange = (itemIndex: number, event: any) => {
        // choose the correct array
        const updatedItems = language === "en" ? [...englishItems] : [...frenshItems];
        const item = updatedItems[itemIndex];

        // handle image/pdf
        if (item.type === "image" || item.type === "pdf") {
            const file = event.target.files?.[0];
            if (file) {
                item.file = file;
                const reader = new FileReader();
                reader.onload = (evt: any) => {
                    item.file_path = evt.target.result; // preview
                    if (language === "en") {
                        setEnglishItems([...updatedItems]);
                    } else {
                        setFrenshItems([...updatedItems]);
                    }
                };
                reader.readAsDataURL(file);
            }
        } else {
            // text, title, etc.
            item.content = event.target.value;
            if (language === "en") {
                setEnglishItems([...updatedItems]);
            } else {
                setFrenshItems([...updatedItems]);
            }
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
            const response = await axios.post(`/api/team-members/${slug}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.status === 200) {
                Swal.fire("Success", "member updated successfully", "success");
                navigate("/admin/team-members");
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            Swal.fire("Error", "Failed to update member.", "error");
        }
    };

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Link to="/admin/team-members">
                        <ArrowLeftIcon className="h-6 w-6" />
                    </Link>
                    <Title>Edit team members</Title>
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
                {/* Language-based Input Fields */}

                {language === "en" && (
                    <>
                        <Input
                            label="Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <Input
                            label="Job"
                            type="text"
                            name="job_en"
                            value={formData.job_en}
                            onChange={handleChange}
                        />
                    </>
                )}
                {language === "fr" && (
                    <>
                        <Input
                            label="Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <Input
                            label="Job"
                            type="text"
                            name="job_fr"
                            value={formData.job_fr}
                            onChange={handleChange}
                        />
                    </>
                )}

                {/* Radio Buttons for "type" */}
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

                {/* Conditional Position Field for AMCP Members */}
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
                <Button type="submit">Update Member</Button>
            </form>

        </div>
    );
};

export default EditTeamMembers;
