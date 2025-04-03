import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import { Link, navigate } from "gatsby";
import Input from "../../atoms/inputs/Input";
import Textarea from "../../atoms/inputs/Textarea";
import Button from "../../atoms/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Title from "../../atoms/titles/Title";
import Select from "../../atoms/inputs/Select";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import useLocalStorage from "@/lib/useLocalStorage";

interface FormData {
    year: string;
    name_en: string;
    name_fr: string;
    image_affiche1?: File | null;
    titre_affiche1_fr: string;
    titre_affiche1_en: string;
    desciption_affich1_en: string;
    desciption_affich1_fr: string;

    image_affiche2?: File | null;
    titre_affiche2_fr: string;
    titre_affiche2_en: string;
    desciption_affich2_en: string;
    desciption_affich2_fr: string;

    start_date: string;
    end_date: string;
}

const CreateEdition: React.FC = () => {
    const [language, setLanguage] = useState<string>("en");
    const [formData, setFormData] = useLocalStorage("edition-info", {
        year: "",
        name_en: "",
        name_fr: "",
        image_affiche1: null,
        titre_affiche1_fr: "",
        titre_affiche1_en: "",
        desciption_affich1_en: "",
        desciption_affich1_fr: "",

        image_affiche2: null,
        titre_affiche2_fr: "",
        titre_affiche2_en: "",
        desciption_affich2_en: "",
        desciption_affich2_fr: "",

        start_date: "",
        end_date: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const [images, setImages] = useState<{ [key: string]: File | null }>({});

    const handleLanguageChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        if (
            (lang === "en" && (!formData.name_en || !formData.titre_affiche1_en || !formData.desciption_affich1_en || !formData.titre_affiche2_en || !formData.desciption_affich2_en)) ||
            (lang === "fr" && (!formData.name_fr || !formData.titre_affiche1_fr || !formData.desciption_affich1_fr || !formData.titre_affiche2_fr || !formData.desciption_affich2_fr))
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
                const created = await createEdition();
                // @ts-ignore
                if (created) navigate(`/admin/edition/${created.slug}?lang=${lang}`);
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

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (e.target.files) {
            setImages((prevImages) => ({
                ...prevImages,
                [fieldName]: e?.target?.files[0]
            }));
        }
    };



    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
    
        // Validate year
        if (!formData.year) {
            newErrors.year = "Year is required.";
        }
    
        // Validate language-specific fields
        if (language === "en") {
            if (!formData.name_en) {
                newErrors.name_en = "Name is required.";
            }
            if (!formData.titre_affiche1_en) {
                newErrors.titre_affiche1_en = "Title for Affiche 1 is required.";
            }
            if (!formData.desciption_affich1_en) {
                newErrors.desciption_affich1_en = "Description for Affiche 1 is required.";
            }
            if (!formData.titre_affiche2_en) {
                newErrors.titre_affiche2_en = "Title for Affiche 2 is required.";
            }
            if (!formData.desciption_affich2_en) {
                newErrors.desciption_affich2_en = "Description for Affiche 2 is required.";
            }
        } else {
            if (!formData.name_fr) {
                newErrors.name_fr = "Nom est requis.";
            }
            if (!formData.titre_affiche1_fr) {
                newErrors.titre_affiche1_fr = "Titre pour Affiche 1 est requis.";
            }
            if (!formData.desciption_affich1_fr) {
                newErrors.desciption_affich1_fr = "Description pour Affiche 1 est requise.";
            }
            if (!formData.titre_affiche2_fr) {
                newErrors.titre_affiche2_fr = "Titre pour Affiche 2 est requis.";
            }
            if (!formData.desciption_affich2_fr) {
                newErrors.desciption_affich2_fr = "Description pour Affiche 2 est requise.";
            }
        }
    
        // Validate start & end dates
        if (!formData.start_date) {
            newErrors.start_date = "Start date is required.";
        }
        if (!formData.end_date) {
            newErrors.end_date = "End date is required.";
        } else if (formData.start_date && formData.end_date < formData.start_date) {
            newErrors.end_date = "End date must be after or equal to the start date.";
        }
    
        // Validate images
        // if (!formData.image_affiche1) {
        //     newErrors.image_affiche1 = "Image for Affiche 1 is required.";
        // }
        // if (!formData.image_affiche2) {
        //     newErrors.image_affiche2 = "Image for Affiche 2 is required.";
        // }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    

    async function createEdition(): Promise<{ slug: string } | null> {
      
        if (!validateForm()) {
            return null;
        }     
       
        const formDataToSend = new FormData();

        // Append all form fields to FormData
        for (const key in formData) {
            formDataToSend.append(key, formData[key as keyof FormData]);
        }


        Object.keys(images).forEach((key) => {
            if (images[key]) {
                formDataToSend.append(key, images[key] as File); // Append each image with its respective field name
            }
        });

    

        setIsLoading(true);
        try {
            const response = await axios.post("/api/edition", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Swal.fire("Success", "Post created successfully", "success");
            setFormData({
                year: "",
                name_en: "",
                name_fr: "",
                image_affiche1: null,
                titre_affiche1_fr: "",
                titre_affiche1_en: "",
                desciption_affich1_en: "",
                desciption_affich1_fr: "",

                image_affiche2: null,
                titre_affiche2_fr: "",
                titre_affiche2_en: "",
                desciption_affich2_en: "",
                desciption_affich2_fr: "",

                start_date: "",
                end_date: "",
            });
            setErrors({});
            toast.success("Edition created successfully");
            return response.data;
        } catch (error) {
            let msg = "An error occurred while creating the edtion. Please try again.";
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

        const created = await createEdition();
//@ts-ignore
        if (created) navigate("/admin/edition");
    };




    return (
        <div className="h-[calc(100vh-80px)] flex flex-col p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Link className="" to="/admin/edition">
                        <ArrowLeftIcon className="h-5 w-5" />
                    </Link>
                    <Title>Create New Edition</Title>
                </div>
                <Select divClassNames="!flex-row items-center gap-2" label="Language:" name="language" value={language} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </Select>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col grow space-y-4">
                {/* Year */}
                <Input label="Year" type="number" name="year" value={formData.year} onChange={handleChange} />
                {errors.year && <div className="text-red-500 text-sm">{errors.year}</div>}

                {/* Language-Specific Inputs */}
                {language === "en" && (
                    <>
                        <Input label="Name" type="text" name="name_en" value={formData.name_en} onChange={handleChange} />
                        {errors.name_en && <div className="text-red-500 text-sm">{errors.name_en}</div>}


                        <Input label="Image Affiche 1" type="file" name="image_affiche1" onChange={(e) => handleImageChange(e, 'image_affiche1')} />
                        {errors.image_affiche1 && <div className="text-red-500 text-sm">{errors.image_affiche1}</div>}

                        <Input label="Titre Affiche 1" type="text" name="titre_affiche1_en" value={formData.titre_affiche1_en} onChange={handleChange} />
                        {errors.titre_affiche1_en && <div className="text-red-500 text-sm">{errors.titre_affiche1_en}</div>}

                        <Textarea label="Description Affiche 1" name="desciption_affich1_en" value={formData.desciption_affich1_en} onChange={handleChange} />
                        {errors.desciption_affich1_en && <div className="text-red-500 text-sm">{errors.desciption_affich1_en}</div>}

                        <Input label="Image Affiche 2" type="file" name="image_affiche2" onChange={(e) => handleImageChange(e, 'image_affiche2')} />
                        {errors.image_affiche2 && <div className="text-red-500 text-sm">{errors.image_affiche2}</div>}

                        <Input label="Title Affiche 2" type="text" name="titre_affiche2_en" value={formData.titre_affiche2_en} onChange={handleChange} />
                        {errors.titre_affiche2_en && <div className="text-red-500 text-sm">{errors.titre_affiche2_en}</div>}

                        <Textarea label="Description Affiche 2" name="desciption_affich2_en" value={formData.desciption_affich2_en} onChange={handleChange} />
                        {errors.desciption_affich2_en && <div className="text-red-500 text-sm">{errors.desciption_affich2_en}</div>}
                    </>
                )}

                {language === "fr" && (
                    <>
                        <Input label="Nom" type="text" name="name_fr" value={formData.name_fr} onChange={handleChange} />
                        {errors.name_fr && <div className="text-red-500 text-sm">{errors.name_fr}</div>}


                        <Input label="Image Affiche 1" type="file" name="image_affiche1" onChange={(e) => handleImageChange(e, 'image_affiche1')} />
                        {errors.image_affiche1 && <div className="text-red-500 text-sm">{errors.image_affiche1}</div>}

                        <Input label="Titre Affiche 1" type="text" name="titre_affiche1_fr" value={formData.titre_affiche1_fr} onChange={handleChange} />
                        {errors.titre_affiche1_fr && <div className="text-red-500 text-sm">{errors.titre_affiche1_fr}</div>}

                        <Textarea label="Description Affiche 1" name="desciption_affich1_fr" value={formData.desciption_affich1_fr} onChange={handleChange} />
                        {errors.desciption_affich1_fr && <div className="text-red-500 text-sm">{errors.desciption_affich1_fr}</div>}
                        
                        <Input label="Image Affiche 2" type="file" name="image_affiche2" onChange={(e) => handleImageChange(e, 'image_affiche2')} />
                        {errors.image_affiche2 && <div className="text-red-500 text-sm">{errors.image_affiche2}</div>}

                        <Input label="Titre Affiche 2" type="text" name="titre_affiche2_fr" value={formData.titre_affiche2_fr} onChange={handleChange} />
                        {errors.titre_affiche2_fr && <div className="text-red-500 text-sm">{errors.titre_affiche2_fr}</div>}

                        <Textarea label="Description Affiche 2" name="desciption_affich2_fr" value={formData.desciption_affich2_fr} onChange={handleChange} />
                        {errors.desciption_affich2_fr && <div className="text-red-500 text-sm">{errors.desciption_affich2_fr}</div>}
                    </>
                )}

                {/* Start & End Dates */}
                <Input label="Start Date" type="date" name="start_date" value={formData.start_date} onChange={handleChange} />
                {errors.start_date && <div className="text-red-500 text-sm">{errors.start_date}</div>}

                <Input label="End Date" type="date" name="end_date" value={formData.end_date} onChange={handleChange} />
                {errors.end_date && <div className="text-red-500 text-sm">{errors.end_date}</div>}







                {errors.apiError && <div className="text-red-500 text-sm">{errors.apiError}</div>}


                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <div className="w-fit mx-auto">
                            <ReactLoading type="spinningBubbles" color="white" height={25} width={25} />
                        </div>
                    ) : (
                        "Create Edition"
                    )}
                </Button>
            </form>

        </div>
    );
};

export default CreateEdition;
