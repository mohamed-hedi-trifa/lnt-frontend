import React, { useState, useEffect, ChangeEvent } from "react";
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

const EditFinancialReport = ({ location, params }: { location: any; params: any }) => {

    const searchParams = new URLSearchParams(location?.search);
    const paramLang = searchParams.get("lang");

    const [slug, setSlug] = useState<string | null>(null);
    const [language, setLanguage] = useState<string>(paramLang === "fr" ? "fr" : "en");

    const [formData, setFormData] = useState({

        title: "",
        date: "",

    });
    const [pdf_link, setPdf_link] = useState<File | null>(null);

    useEffect(() => {
        const slugParam = params.slug;
        setSlug(slugParam);
    }, [location]);

    useEffect(() => {
        const fetchFinancialReport = async () => {
            if (!slug) return;
            try {
                const response = await axios.get(`/api/financial-report/${slug}`);
                const financialReport: any = response.data;


                setFormData({
                    title: financialReport.title ?? "",
                    date: financialReport.date ?? "",

                });








            } catch (error) {
                console.error("Error fetching Financial Report:", error);
            }
        };

        fetchFinancialReport();
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

        if (pdf_link) {
            formDataToSend.append("pdf_link", pdf_link); // Append the main pdf_link file
        }



        try {
            const response = await axios.post(`/api/financial-report/${slug}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.status === 200) {
                Swal.fire("Success", "Partner updated successfully", "success");
                navigate("/admin/financial-report");
            }
        } catch (error) {
            console.error("Error updating financial report:", error);
            Swal.fire("Error", "Failed to update Financial reprot.", "error");
        }
    };




    const handlePdfLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPdf_link(e.target.files[0]); // Store the file object
        }
    };
    return (
        <div className="h-[calc(100vh-80px)] flex flex-col p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Link to="/admin/financial-report">
                        <ArrowLeftIcon className="h-6 w-6" />
                    </Link>
                    <Title>Edit Financial Report</Title>
                </div>

            </div>

            <form onSubmit={handleSubmit} className="flex flex-col grow">



                <Input label="Title" type="text" name="title" value={formData.title} onChange={handleChange} />

                <Input label="Date" type="date" name="date" value={formData.date} onChange={handleChange} />

                <Input label="pdf" type="file" name="pdf_link" onChange={handlePdfLinkChange} />

                <Button type="submit">Update Financial Report</Button>
            </form>
        </div>
    );
};

export default EditFinancialReport;
