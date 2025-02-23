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

const EditPartner = ({ location, params }: { location: any; params: any }) => {

    const searchParams = new URLSearchParams(location?.search);
    const paramLang = searchParams.get("lang");

    const [slug, setSlug] = useState<string | null>(null);
    const [language, setLanguage] = useState<string>(paramLang === "fr" ? "fr" : "en");
    const [formData, setFormData] = useState({

        name: "",
        isAmcp: "",
        isGeneral: "",
        description_fr: "",
        description_en: "",
        facebookLink: "",
        websiteLink: "",
        linkedInLink: "",
        instagramLink: ""
    });

    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        const slugParam = params.slug;
        setSlug(slugParam);
    }, [location]);

    useEffect(() => {
        const fetchPartner = async () => {
            if (!slug) return;
            try {
                const response = await axios.get(`/api/partner/${slug}`);
                const partner: any = response.data;
                // Sort content items by order


                // Set form data
                setFormData({
                    name: partner.name ?? "",
                    isAmcp: partner.isAmcp ?? "",
                    isGeneral: partner.isGeneral ?? "",
                    description_fr: partner.description_fr ?? "",
                    description_en: partner.description_en ?? "",
                    facebookLink: partner.facebookLink ?? "",
                    websiteLink: partner.websiteLink ?? "",
                    linkedInLink: partner.linkedInLink ?? "",
                    instagramLink: partner.instagramLink ?? "",


                });








            } catch (error) {
                console.error("Error fetching Partner:", error);
            }
        };

        fetchPartner();
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
            const response = await axios.post(`/api/update-partner/${slug}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.status === 200) {
                Swal.fire("Success", "Partner updated successfully", "success");
                navigate("/admin/partners");
            }
        } catch (error) {
            console.error("Error updating partner:", error);
            Swal.fire("Error", "Failed to update Partner.", "error");
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {

        const value = e.target.checked ? '1' : '0';
   

        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [fieldName]: value,
        }));
    };
    

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Link to="/admin/partners">
                        <ArrowLeftIcon className="h-6 w-6" />
                    </Link>
                    <Title>Edit Partner</Title>
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
                        <Input label="Name" type="text" name="name" value={formData.name} onChange={handleChange} />

                        <Input label="Description" type="text" name="description_en" value={formData.description_en} onChange={handleChange} />

                        <Input label="Facebook Link" type="url" name="facebookLink" value={formData.facebookLink} onChange={handleChange} />

                        <Input label="Website Link" type="url" name="websiteLink" value={formData.websiteLink} onChange={handleChange} />

                        <Input label="LinkedIn Link" type="url" name="linkedInLink" value={formData.linkedInLink} onChange={handleChange} />

                        <Input label="Instagram Link" type="url" name="instagramLink" value={formData.instagramLink} onChange={handleChange} />
                    </>
                )}

                {language === "fr" && (
                    <>
                        <Input label="Nom" type="text" name="name" value={formData.name} onChange={handleChange} />

                        <Input label="Description" type="text" name="description_fr" value={formData.description_fr} onChange={handleChange} />

                        <Input label="Facebook Link" type="url" name="facebookLink" value={formData.facebookLink} onChange={handleChange} />

                        <Input label="Website Link" type="url" name="websiteLink" value={formData.websiteLink} onChange={handleChange} />

                        <Input label="LinkedIn Link" type="url" name="linkedInLink" value={formData.linkedInLink} onChange={handleChange} />

                        <Input label="Instagram Link" type="url" name="instagramLink" value={formData.instagramLink} onChange={handleChange} />
                    </>
                )}

                {/* Fields for isAmcp and isGeneral */}
                <div className="flex gap-4 mt-4">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isAmcp"
                            checked={formData.isAmcp == "1"}
                            onChange={(e) => handleCheckboxChange(e, "isAmcp")}
                            className="mr-2"
                        />
                        <label>AMCP</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isGeneral"
                            checked={formData.isGeneral == "1"}
                            onChange={(e) => handleCheckboxChange(e, "isGeneral")}
                            className="mr-2"
                        />
                        <label>General</label>
                    </div>
                </div>



                <Input label="Image" type="file" name="image" onChange={handleImageChange} />
                <Button type="submit">Update Partner</Button>
            </form>
        </div>
    );
};

export default EditPartner;
