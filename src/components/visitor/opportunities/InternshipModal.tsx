import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import InputFieldOpportunity from './InputFieldOpportunity';
import SelectFieldOpportunity from "./SelectFieldOpportunity";
import UploadIcon from "@/assets/icons/UploadIcon";
import { toast } from "react-toastify";
import useLocalStorage from "@/lib/useLocalStorage";
import ModalOppourtunity from "@/components/ModalOppourtunity";
import './OtherDocument.css'
interface FormData {
    first_name: string;
    last_name: string;
    birth_day: number;
    birth_month: number;
    birth_year: number;
    email: string;
    phone: string;
    address: string;
}

export default function JobOfferModal({ show, hide }: { show: boolean, hide: () => void }) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useLocalStorage<FormData>("submit-application", {
        first_name: "",
        last_name: "",
        birth_day: 1,
        birth_month: 1,
        birth_year: 2015,
        email: "",
        phone: "",
        address: "",

    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [cvFileName, setCvFileName] = useState<string>('');
    const [motivation_letter, setMotivation_letter] = useState<File | null>(null);
    const [motivationLetterFileName, setMotivationLetterFileName] = useState<string>('');
    const [otherDocuments, setOtherDocuments] = useState<File[]>([]);
    const [otherDocumentNames, setOtherDocumentNames] = useState<string[]>([]);
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleOtherDocumentsChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);

            // Validate each file
            const validFiles = files.filter(file => {
                if (file.size > 5 * 1024 * 1024) {
                    toast.error(`Le fichier ${file.name} dépasse la taille maximale de 5 Mo.`);
                    return false;
                }
                if (!file.type.includes('pdf')) {
                    toast.error(`Le fichier ${file.name} doit être un PDF.`);
                    return false;
                }
                return true;
            });

            setOtherDocuments(prev => [...prev, ...validFiles]);
            setOtherDocumentNames(prev => [...prev, ...validFiles.map(file => file.name)]);
        }
    };

    const removeOtherDocument = (index: number) => {
        setOtherDocuments(prev => prev.filter((_, i) => i !== index));
        setOtherDocumentNames(prev => prev.filter((_, i) => i !== index));
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
        if (!cvFileName) newErrors.cvFile = "Le CV est requis.";

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

        otherDocuments.forEach((file, index) => {
            formDataToSend.append(`other_documents[${index}]`, file);
        });

        setIsLoading(true);
        try {
            const response = await axios.post("/api/opportunity/job-offer", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Reset form and state
            setFormData({
                first_name: "",
                last_name: "",
                birth_day: 1,
                birth_month: 1,
                birth_year: 2015,
                email: "",
                phone: "",
                address: "",
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
        <>

            {!isSuccess ? (
                <ModalOppourtunity title="Soumettez Votre Candidature" show={show} hide={hide}>

                    <form onSubmit={handleSubmit} className="bg-white px-6 rounded-lg shadow-lg w-[800px] max-h-[calc(100vh-60px)] overflow-y-auto relative">

                        <div className="flex items-start flex-col mt-4 gap-5">
                            <h1 className="font-semibold text-lg">Informations Personnelles</h1>

                            <div className="flex gap-6">
                                <InputFieldOpportunity
                                    label="Nom"
                                    id="first_name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                    width="200px"
                                />
                                {errors.first_name && <div className="text-red-500 text-sm">{errors.first_name}</div>}
                                <InputFieldOpportunity
                                    label="Prénom"
                                    id="last_name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                    width="200px"
                                />
                                {errors.last_name && <div className="text-red-500 text-sm">{errors.last_name}</div>}
                            </div>

                            <div className="flex flex-col items-start gap-1">
                                <label className="font-semibold text-sm">
                                    Date de naissance <span className="text-[#FF0000]">*</span>
                                </label>
                                <div className="flex gap-5">
                                    <SelectFieldOpportunity
                                        id="birth_day"
                                        name="birth_day"
                                        value={formData.birth_day}
                                        onChange={handleChange}
                                        required
                                        options={Array.from({ length: 31 }, (_, i) => (i + 1).toString())}
                                        placeholder="Jours"
                                        width="100px"
                                    />
                                    <SelectFieldOpportunity
                                        id="birth_month"
                                        name="birth_month"
                                        value={formData.birth_month}
                                        onChange={handleChange}
                                        required
                                        options={[
                                            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
                                        ]}
                                        valueoptions={[
                                            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
                                        ]}
                                        placeholder="Mois"
                                        width="100px"
                                    />
                                    <SelectFieldOpportunity
                                        id="birth_year"
                                        name="birth_year"
                                        value={formData.birth_year}
                                        onChange={handleChange}
                                        required
                                        options={Array.from({ length: 60 }, (_, i) => (2015 - i).toString())}
                                        placeholder="Années"
                                        width="100px"
                                    />
                                </div>
                                {errors.birth_date && <div className="text-red-500 text-sm">{errors.birth_date}</div>}
                            </div>

                            <div className="flex gap-6">
                                <InputFieldOpportunity
                                    label="Adresse e-mail"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    required
                                    width="500px"
                                />
                                {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                            </div>

                            <div className="flex gap-6">
                                <InputFieldOpportunity
                                    label="Numéro de téléphone"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    type="tel"
                                    required
                                    width="500px"
                                />
                                {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                            </div>

                            <div className="flex gap-6">
                                <InputFieldOpportunity
                                    label="Adresse"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    width="500px"
                                />
                                {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
                            </div>
                        </div>
                        <hr className="border-t-2 border-black mt-5" />
                        <div className="flex items-start flex-col mt-4 gap-5">
                            <h1 className="font-semibold text-lg">Stage Recherché</h1>

                            <div className="flex gap-2 flex-col items-start">
                                <label className="font-semibold text-sm">
                                    Type de stage <span className="text-[#FF0000]">*</span>
                                </label>
                                <SelectFieldOpportunity
                                    id="internship_type"
                                    name="internship_type"
                                    value={formData.internship_type}
                                    onChange={handleChange}
                                    required
                                    options={["Stage d'Initiation", "Stage PFA (Projet de Fin d'Année)", "Stage PFE (Projet de Fin d'Études)", "Stage Professionnel", "Stage de Recherche", "Autre"]}
                                    placeholder="Sélectionnez un type de stage"
                                    width="500px"
                                />
                                {errors.internship_type && <div className="text-red-500 text-sm">{errors.internship_type}</div>}
                            </div>
                            <div className="flex gap-6">
                                <InputFieldOpportunity
                                    label="Domaine de stage souhaité"
                                    id="desired_internship_field"
                                    name="desired_internship_field"
                                    value={formData.desired_internship_field}
                                    onChange={handleChange}
                                    required
                                    width="500px"
                                />
                                {errors.desired_internship_field && <div className="text-red-500 text-sm">{errors.desired_internship_field}</div>}
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <label className="font-semibold text-sm">
                                    Période souhaitée <span className="text-[#FF0000]">*</span>
                                </label>
                                <div className="flex gap-4 items-center ml-3">
                                    <label className="font-semibold text-sm mr-4">Date de Début :</label>
                                    <SelectFieldOpportunity
                                        id="start_date_day"
                                        name="start_date_day"
                                        value={formData.start_date_day}
                                        onChange={handleChange}
                                        required
                                        options={Array.from({ length: 31 }, (_, i) => (i + 1).toString())}
                                        placeholder="JJ"
                                        width="90px"
                                        height="28px"
                                    />
                                    <SelectFieldOpportunity
                                        id="start_date_month"
                                        name="start_date_month"
                                        value={formData.start_date_month}
                                        onChange={handleChange}
                                        required
                                        options={[
                                            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
                                        ]}
                                        valueoptions={[
                                            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
                                        ]}
                                        placeholder="MM"
                                        width="100px"
                                        height="28px"
                                    />
                                    <SelectFieldOpportunity
                                        id="start_date_year"
                                        name="start_date_year"
                                        value={formData.start_date_year}
                                        onChange={handleChange}
                                        required
                                        options={Array.from({ length: 30 }, (_, i) => (2023 + i).toString())}
                                        placeholder="AAA"
                                        width="100px"
                                        height="28px"
                                    />
                                </div>
                                {errors.start_date && <div className="text-red-500 text-sm">{errors.start_date}</div>}
                                <div className="flex gap-4 items-center ml-3">
                                    <label className="font-semibold text-sm mr-4">Date de Fin :</label>
                                    <SelectFieldOpportunity
                                        id="end_date_day"
                                        name="end_date_day"
                                        value={formData.end_date_day}
                                        onChange={handleChange}
                                        required
                                        options={Array.from({ length: 31 }, (_, i) => (i + 1).toString())}
                                        placeholder="JJ"
                                        width="90px"
                                        height="28px"
                                    />
                                    <SelectFieldOpportunity
                                        id="end_date_month"
                                        name="end_date_month"
                                        value={formData.end_date_month}
                                        onChange={handleChange}
                                        required
                                        options={[
                                            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
                                        ]}
                                        valueoptions={[
                                            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
                                        ]}
                                        placeholder="MM"
                                        width="100px"
                                        height="28px"
                                    />
                                    <SelectFieldOpportunity
                                        id="end_date_year"
                                        name="end_date_year"
                                        value={formData.end_date_year}
                                        onChange={handleChange}
                                        required
                                        options={Array.from({ length: 30 }, (_, i) => (2023 + i).toString())}
                                        placeholder="AAA"
                                        width="100px"
                                        height="28px"
                                    />
                                </div>
                                {errors.end_date && <div className="text-red-500 text-sm">{errors.end_date}</div>}
                            </div>
                        </div>


                        <hr className="border-t-2 border-black mt-5" />
                        <div className="flex items-start flex-col mt-4">
                            <h1 className="font-semibold text-lg mb-2">Documents à Joindre</h1>

                            <p className="text-start">
                                Veuillez ajouter votre CV et, si possible, une lettre de motivation pour compléter votre demande.
                            </p>

                            <p>
                                <span className="font-semibold underline">Formats acceptés</span> : PDF, taille maximale 5 Mo
                            </p>

                            <div className="flex flex-col items-start gap-2 mt-2">
                                <label className="font-semibold text-sm">
                                    Joindre votre CV <span className="text-[#FF0000]">*</span>
                                </label>
                                <div className="relative w-full max-w-sm">
                                    <label className="flex items-center gap-2 cursor-pointer border border-gray-300 px-4 py-2 rounded-lg bg-[#F8F8FD] border-dashed">
                                        <UploadIcon />
                                        <span className="text-gray-700 ml-2 font-medium">
                                            {cvFileName ? cvFileName : "Ajouter mon CV"}
                                        </span>
                                        <input
                                            type="file"
                                            id="cvFile"
                                            name="cvFile"
                                            onChange={handleCvFileChange}
                                            className="hidden"
                                            accept="application/pdf"
                                            required
                                        />

                                    </label>
                                </div>
                                {errors.cvFile && <div className="text-red-500 text-sm">{errors.cvFile}</div>}
                            </div>

                            <div className="flex flex-col items-start gap-2 mt-2">
                                <label className="font-semibold text-sm">
                                    Joindre votre Lettre de Motivation
                                </label>
                                <div className="relative w-full max-w-sm">
                                    <label className="flex items-center gap-2 cursor-pointer border border-gray-300 px-4 py-2 rounded-lg bg-[#F8F8FD] border-dashed">
                                        <UploadIcon />
                                        <span className="text-gray-700 ml-2 font-medium">
                                            {motivationLetterFileName ? motivationLetterFileName : "Joindre votre Lettre de Motivation"}
                                        </span>
                                        <input
                                            type="file"
                                            id="motivation_letter"
                                            name="motivation_letter"
                                            accept="application/pdf"
                                            onChange={handleMotivationLetterFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>


                        </div>

                        <hr className="border-t-2 border-black mt-5" />
                        <div className="w-full mt-4 flex flex-col gap-4">
                            <button
                                type="submit"
                                className="bg-[#0270A0] text-white py-2 px-4 rounded-lg font-semibold w-full"
                            >
                                Envoyer la demande
                            </button>

                            <p className="text-start">
                                En envoyant la demande, vous confirmez que vous acceptez nos
                                <span className="underline mx-1 text-[#0077B6]">Conditions d'utilisation</span>
                                et notre
                                <span className="underline mx-1 text-[#0077B6]">Politique de confidentialité</span>.
                            </p>
                        </div>
                    </form>

                </ModalOppourtunity>
            ) : (
                <ModalOppourtunity title="" show={show} hide={hide}>
                    <div className="w-full flex flex-col gap-3 justify-between items-center">

                        <div className="bg-[#feefef] p-6 rounded-lg shadow-lg w-[500px] flex flex-col gap-3 justify-between items-center ">
                            <div className="flex flex-col justify-between items-center gap-2">
                                <img src="/icons/folderIcon.png" alt="" width={45} />
                                <p className="font-semibold text-lg">
                                    <span className="text-[#0270A0]">Merci</span> pour votre demande !
                                </p>
                            </div>

                            <div className="text-sm flex flex-col gap-2 px-4">
                                <p>
                                    Votre demande de stage a été envoyée avec succès. Nous l'examinerons avec attention et vous recontacterons si votre profil correspond à nos besoins.
                                </p>
                                <p>
                                    En attendant, n'hésitez pas à explorer nos autres opportunités ou à nous contacter pour toute question supplémentaire.
                                </p>
                            </div>

                            <button
                                className="bg-[#0270A0] text-white py-2 px-4 rounded-lg font-semibold w-fit text-sm"
                                onClick={hide}
                            >
                                Retour à la page des opportunités
                            </button>
                        </div>
                    </div>
                </ModalOppourtunity>
            )}
        </>

    );
}