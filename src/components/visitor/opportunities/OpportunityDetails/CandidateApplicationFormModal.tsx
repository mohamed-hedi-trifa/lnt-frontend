import React, { useState } from "react";

import UploadIcon from "@/assets/icons/UploadIcon";
import InputFieldOpportunity from "../InputFieldOpportunity";
import SelectFieldOpportunity from "../SelectFieldOpportunity";
import ModalOppourtunity from "@/components/ModalOppourtunity";
import useLocalStorage from "@/lib/useLocalStorage";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

interface FormData {
    first_name: string;
    last_name: string;
    birth_day: number;
    birth_month: number;
    birth_year: number;
    email: string;
    phone: string;
    address: string;
    opportunity_type: string;
}

export default function CandidateApplicationFormModal({ show, hide, opportunity }: { show: boolean, hide: () => void, opportunity: any }) {


    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useLocalStorage<FormData>("submit-application", {
        first_name: "",
        last_name: "",
        birth_day: 0,
        birth_month: 0,
        birth_year: 0,
        email: "",
        phone: "",
        address: "",
        opportunity_type: opportunity.type,
    });


    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [cvFileName, setCvFileName] = useState<string>('');
    const [motivation_letter, setMotivation_letter] = useState<File | null>(null);
    const [motivationLetterFileName, setMotivationLetterFileName] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCvFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) {
                setErrors({ ...errors, cvFile: "Le fichier ne doit pas dépasser 5 Mo." });
                return;
            }
            setCvFile(file);
            setCvFileName(file.name);
        }
    };

    const handleMotivationLetterFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) {
                setErrors({ ...errors, motivation_letter: "Le fichier ne doit pas dépasser 5 Mo." });
                return;
            }
            setMotivation_letter(file);
            setMotivationLetterFileName(file.name);
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.first_name) newErrors.first_name = "Le nom est requis.";
        if (!formData.last_name) newErrors.last_name = "Le prénom est requis.";
        if (!formData.birth_day || !formData.birth_month || !formData.birth_year) newErrors.birth_date = "La date de naissance est requise.";
        if (!formData.email) newErrors.email = "L'adresse e-mail est requise.";
        if (!formData.phone) newErrors.phone = "Le numéro de téléphone est requis.";
        if (!formData.address) newErrors.address = "L'adresse est requise.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formDataToSend = new FormData();

        // Append all form fields to FormData
        for (const key in formData) {
            formDataToSend.append(key, formData[key as keyof FormData].toString());
        }

        if (cvFile) {
            formDataToSend.append("cv_file", cvFile);
        }
        if (motivation_letter) {
            formDataToSend.append("motivation_letter", motivation_letter);
        }

        setIsLoading(true);
        try {
            const response = await axios.post("/api/submit-application", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Reset form and state
            setFormData({
                first_name: "",
                last_name: "",
                birth_day: 0,
                birth_month: 0,
                birth_year: 0,
                email: "",
                phone: "",
                address: "",
                opportunity_type: opportunity.type,

            });
            setCvFile(null);
            setMotivation_letter(null);
            setErrors({});

            toast.success("Votre demande a été envoyée avec succès !");
            setIsSuccess(true);
        } catch (error) {
            let msg = "Une erreur s'est produite lors de l'envoi de la demande. Veuillez réessayer.";
            if (error instanceof AxiosError) {
                msg = error?.response?.data?.message || msg;
            }
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ModalOppourtunity title="Soumettez Votre Candidature" show={show} hide={hide}>
            {!isSuccess ? (
                <div className="bg-white px-6 rounded-lg shadow-lg w-full max-h-[calc(100vh-60px)] overflow-y-auto relative">

                    <div className="flex items-start flex-col mt-4 gap-5">
                        <h1 className="font-semibold text-lg">
                            Informations Personnelles
                        </h1>

                        <div className="flex gap-6">

                            <InputFieldOpportunity onChange={handleChange} label="first_name" value={formData.first_name} id="first_name" name="first_name" required width="200px" />
                            {errors.first_name && <div className="text-red-500 text-sm">{errors.first_name}</div>}
                            <InputFieldOpportunity onChange={handleChange} label="last_name" value={formData.last_name} id="last_name" name="last_name" required width="200px" />
                            {errors.last_name && <div className="text-red-500 text-sm">{errors.last_name}</div>}
                        </div>

                        <div className="flex flex-col items-start gap-1">
                            <label className="font-semibold text-sm">
                                Date de naissance <span className="text-[#FF0000]">*</span>
                            </label>
                            <div className="flex gap-5">
                                {/* Day Select */}
                                <SelectFieldOpportunity onChange={handleChange}
                                    id="day"
                                    name="day"
                                    required
                                    value={formData.birth_day}
                                    options={Array.from({ length: 31 }, (_, i) => (i + 1).toString())} // Days 1-31
                                    placeholder="Jours"
                                    width="100px"
                                />

                                {/* Month Select */}
                                <SelectFieldOpportunity onChange={handleChange}
                                    id="month"
                                    name="month"
                                    required
                                    value={formData.birth_month}
                                    options={[
                                        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
                                    ]}
                                    placeholder="Mois"
                                    width="100px"
                                />

                                {/* Year Select */}
                                <SelectFieldOpportunity onChange={handleChange}
                                    id="year"
                                    name="year"
                                    value={formData.birth_year}
                                    required
                                    options={Array.from({ length: 30 }, (_, i) => (2023 + i).toString())} // Years from 2023 to 2052
                                    placeholder="Années"
                                    width="100px"
                                />
                            </div>
                            {errors.birth_date && <div className="text-red-500 text-sm">{errors.birth_date}</div>}

                        </div>

                        <div className="flex gap-6">

                            <InputFieldOpportunity onChange={handleChange} value={formData.email} label="Adresse e-mail" id="email" name="email" type="email" required width="500px" />
                            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                        </div>

                        <div className="flex gap-6">

                            <InputFieldOpportunity onChange={handleChange} value={formData.phone} label="Numéro de téléphone" id="phone" name="phone" type="tel" required width="500px" />
                            {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                        </div>

                        <div className="flex gap-6">

                            <InputFieldOpportunity onChange={handleChange} value={formData.address} label="Adresse" id="address" name="address" required width="500px" />
                            {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
                        </div>
                    </div>



                    <hr className="border-t-2 border-black mt-5" />
                    <div className="flex items-start flex-col mt-4">
                        <h1 className="font-semibold text-lg mb-2">
                            Documents à Joindre
                        </h1>

                        <p className=" text-start">
                            Veuillez ajouter votre CV et, si possible, une lettre de motivation pour compléter votre demande.
                        </p>

                        <p>
                            <span className="font-semibold underline"> Formats acceptés</span> : PDF, taille maximale 5 Mo
                        </p>

                        <div className="flex flex-col items-start gap-2 mt-2">
                            <label className="font-semibold text-sm">
                                Joindre votre CV <span className="text-[#FF0000]">*</span>
                            </label>

                            <div className="relative w-full max-w-sm">
                                <label className="flex items-center gap-2 cursor-pointer border border-gray-300 px-4 py-2 rounded-lg bg-[#F8F8FD]  border-dashed ">


                                    <UploadIcon />
                                    <span className="text-gray-700 ml-2 font-medium">Ajouter mon CV</span>
                                    <input type="file" className="hidden" />
                                </label>
                            </div>


                        </div>

                        <div className="flex flex-col items-start gap-2 mt-2">
                            <label className="font-semibold text-sm">
                                Joindre votre  Lettre de Motivation
                            </label>

                            <div className="relative w-full max-w-sm">
                                <label className="flex items-center gap-2 cursor-pointer border border-gray-300 px-4 py-2 rounded-lg bg-[#F8F8FD]  border-dashed ">


                                    <UploadIcon />
                                    <span className="text-gray-700 ml-2 font-medium">Ajouter ma lettre de motivation</span>
                                    <input type="file" className="hidden" />
                                </label>
                            </div>


                        </div>


                    </div>
                    <hr className="border-t-2 border-black mt-5" />
                    <div className="w-full mt-4 flex flex-col gap-4">
                        <button
                            className="bg-[#0270A0] text-white py-2 px-4 rounded-lg font-semibold w-full"
                            onClick={() => setIsSuccess(true)}
                        >
                            Envoyer la demande
                        </button>

                        <p className="text-start">En envoyant la demande, vous confirmez que vous acceptez nos

                            <span className="underline mx-1 text-[#0077B6] ">Conditions d'utilisation </span>

                            et notre
                            <span className="underline mx-1 text-[#0077B6]">Politique de confidentialité</span>
                        </p>

                    </div>
                </div>
            ) : (

                <div className="bg-[#feefef] p-6 rounded-lg shadow-lg w-[500px] flex flex-col gap-3 justify-between items-center">
                    <div className="flex flex-col justify-between items-center gap-2">

                        <img src="/icons/folderIcon.png" alt="" width={45} />
                        <p className="font-semibold text-lg"><span className="text-[#0270A0]">Merci</span> pour votre demande !</p>
                    </div>

                    <div className="text-sm flex flex-col gap-2 px-4">
                        <p>
                            Merci pour votre intérêt pour le poste de Coordinateur pour MedFund Co-Management Agreement. Nous avons bien reçu votre dossier et allons l'examiner avec attention                        </p>
                        <p>
                            En attendant, n'hésitez pas à explorer nos autres opportunités ou à
                            <span className="underline text-[#0077B6] mx-1">nous contacter</span>
                            pour toute question supplémentaire.
                        </p>
                    </div>

                    <button
                        className="bg-[#0270A0] text-white py-2 px-4 rounded-lg font-semibold w-fit text-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        Retour à la page des opportunités
                    </button>
                </div>
            )}

        </ModalOppourtunity >
    );
}
