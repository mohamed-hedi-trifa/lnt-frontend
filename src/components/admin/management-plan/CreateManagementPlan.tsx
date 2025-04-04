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

interface FormData {
    title: string;

}




const CreateManagementPlan: React.FC = () => {
    const [language, setLanguage] = useState<string>("en");
    const [formData, setFormData] = useLocalStorage("financial-info", {

        title: "",


    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);



    const [pdf_link, setPdf_link] = useState<File | null>(null);

    const handleLanguageChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;

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
            const created = await createManagementPlan();

            if (created) navigate(`/admin/management-plan/${created.slug}?lang=${lang}`);
        } else if (result.isDenied) {
            setLanguage(lang);
        }

    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePdfLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPdf_link(e.target.files[0]); // Store the file object
        }
    };



    

    async function createManagementPlan(): Promise<{ slug: string } | null> {
    

        const formDataToSend = new FormData();

       
        for (const key in formData) {
            formDataToSend.append(key, formData[key as keyof FormData]);
        }

        if (pdf_link) {
            formDataToSend.append("pdf_link", pdf_link);
        }


        setIsLoading(true);
        try {
            const response = await axios.post("/api/management-plan", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setFormData({
                title: "",
            
            });

            setErrors({}); // Clear any previous errors
            toast.success("Financial report created successfully");
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

        const created = await createManagementPlan();

        if (created) navigate("/admin/management-plan");
    };





    return (
        <div className="h-[calc(100vh-80px)] flex flex-col p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Link className="" to="/admin/events">
                        <ArrowLeftIcon className="h-5 w-5" />
                    </Link>
                    <Title>Create New management plan</Title>
                </div>

            </div>
            <form onSubmit={handleSubmit} className="flex flex-col grow">


                <Input label="Title" type="text" name="title" value={formData.title} onChange={handleChange} />
                {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}



                <Input label="pdf" type="file" name="pdf_link"   accept="application/pdf"  onChange={handlePdfLinkChange} />
                {errors.pdf_link && <div className="text-red-500 text-sm">{errors.pdf_link}</div>}

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <div className="w-fit mx-auto">
                              Loading...
                        </div>
                    ) : (
                        "Create Financial report"
                    )}
                </Button>
            </form>

        </div>
    );
};

export default CreateManagementPlan;
