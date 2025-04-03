import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios, { AxiosError } from "axios";
import UploadIcon from "@/assets/icons/UploadIcon";

import { toast } from "react-toastify";
import useLocalStorage from "@/lib/useLocalStorage";
import InputFieldBenevole from "../Benevole/InputFieldBenevole";
import SelectFieldBenevole from "../Benevole/SelectFieldBenevole";
import DateTimeBenevole from "../Benevole/DateTimeBenevole";

interface FormData {
    first_name: string;
    last_name: string;
    birthDay: number;
    birthMonth: number;
    birthYear: number;
    email: string;
    phone: string;
    address: string;
    professional_situation: string;
    professional_sector: string;
    interests_motivation: string;
    competences_experiences: string;
    availability_start_date: string;
    availability_time: Date;
    availability_day: number;
    availability_month: number;
  
}

const BenevoleForm: React.FC = () => {

    const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
    
    useEffect(() => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("isFormFilled");
        setIsFormFilled(stored === "true");
      }
    }, []);
    
    const [formData, setFormData] = useLocalStorage("benevole-form", {
        first_name: "",
        last_name: "",
        birthDay: 0,
        birthMonth: 0,
        birthYear: 0,
        email: "",
        phone: "",
        address: "",
        professional_situation: "",
        professional_sector: "",
        interests_motivation: "",
        competences_experiences: "",
        availability_month: "",
        availability_day: "",
        availability_time: "",

    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cvFileName, setCvFileName] = useState<string>("");
    const [motivationLetterFileName, setMotivationLetterFileName] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

  

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.first_name) newErrors.first_name = "Le nom est requis.";
        if (!formData.last_name) newErrors.last_name = "Le prénom est requis.";
        if (!formData.birthDay || !formData.birthMonth || !formData.birthYear) newErrors.birthDate = "La date de naissance est requise.";
        if (!formData.email) newErrors.email = "L'adresse e-mail est requise.";
        if (!formData.phone) newErrors.phone = "Le numéro de téléphone est requis.";
        if (!formData.address) newErrors.address = "L'adresse est requise.";
        if (!formData.professional_situation) newErrors.professional_situation = "La situation professionnelle est requise.";
        if (!formData.interests_motivation) newErrors.interests_motivation = "Les intérêts et motivations sont requis.";
        if (!formData.competences_experiences) newErrors.competences_experiences = "Les compétences et expériences sont requises.";
        if (!formData.availability_time || !formData.availability_day || !formData.availability_month) newErrors.availability_start_date = "La date de début de disponibilité est requise.";
        if (!cvFileName) newErrors.cvFile = "Le CV est requis.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [cvFile, setCvFile] = useState<File | null>(null);
    const [motivation_letter, setMotivation_letter] = useState<File | null>(null);
    const handleCvFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setCvFile(file);
            setCvFileName(file.name);
        }
    };

    const handleMotivationLetterFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setMotivation_letter(file);
            setMotivationLetterFileName(file.name);
        }
    };
    
    useEffect(() => {
        localStorage.setItem("isFormFilled", String(isFormFilled));
      }, [isFormFilled]);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

       
        if (!validateForm()) {
            return;
        }

        const formDataToSend = new FormData();
        for (const key in formData) {
            if (formData[key as keyof FormData] !== null) {
                formDataToSend.append(key, formData[key as keyof FormData]);
            }
        }

        if (cvFile) {
            formDataToSend.append("cv_file", cvFile);
        }
        if (motivation_letter) {
            formDataToSend.append("motivation_letter", motivation_letter);
        }

        setIsLoading(true);
    
        try {
            const response = await axios.post("/api/submit-volunteer-application", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Votre demande a été envoyée avec succès !");
            setIsFormFilled(true);
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
        <div>
            {!isFormFilled ? (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg relative sm:mr-10">
                    <h2 className="text-xl font-semibold mb-4 text-[#0270A0]">Formulaire de Demande de Bénévolat</h2>

                    <hr className="border-t-2 border-black" />
                    <div className="flex items-start flex-col mt-4 gap-5">
                        <h1 className="font-semibold text-lg">Informations Personnelles</h1>

                        <div className="flex gap-6 sm:flex-row flex-col">
                            <InputFieldBenevole
                                label="Nom"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                                width="200px"
                            />
                            {errors.first_name && <div className="text-red-500 text-sm">{errors.first_name}</div>}
                            <InputFieldBenevole
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
                            <div className="flex gap-6 flex-wrap">
                                <div className="w-[103px]">
                                    <SelectFieldBenevole
                                        id="birthDay"
                                        name="birthDay"
                                        value={formData.birthDay}
                                        onChange={handleChange}
                                        required
                                        options={Array.from({ length: 31 }, (_, i) => (i + 1).toString())}
                                        placeholder="Jours"
                                        rounded={true}
                                    />
                                </div>
                                <div className="w-[103px]">
                                    <SelectFieldBenevole
                                        id="birthMonth"
                                        name="birthMonth"
                                        value={formData.birthMonth}
                                        onChange={handleChange}
                                        required
                                        options={[
                                            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
                                        ]}
                                        placeholder="Mois"
                                        rounded={true}
                                    />
                                </div>
                                <div className="w-[110px]">
                                    <SelectFieldBenevole
                                        id="birthYear"
                                        name="birthYear"
                                        value={formData.birthYear}
                                        onChange={handleChange}
                                        required
                                        options={Array.from({ length: 105 }, (_, i) => (new Date().getFullYear() - i).toString())} // Generate years dynamically
                                        placeholder="Années"
                                        rounded={true}
                                    />

                                </div>
                            </div>
                            {errors.birthDate && <div className="text-red-500 text-sm">{errors.birthDate}</div>}
                        </div>

                        <div className="flex gap-6 sm:w-[500px] w-full">
                            <InputFieldBenevole
                                label="Adresse e-mail"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                required
                            />
                            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                        </div>

                        <div className="flex gap-6 sm:w-[500px] w-full">
                            <InputFieldBenevole
                                label="Numéro de téléphone"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel"
                                required
                            />
                            {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                        </div>

                        <div className="flex gap-6 sm:w-[500px] w-full">
                            <InputFieldBenevole
                                label="Adresse"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                            {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
                        </div>

                        <div className="flex gap-2 flex-col items-start sm:w-[300px] w-full">
                            <label className="font-semibold text-sm">
                                Votre situation professionnelle <span className="text-[#FF0000]">*</span>
                            </label>
                            <SelectFieldBenevole
                                id="professional_situation"
                                name="professional_situation"
                                value={formData.professional_situation}
                                onChange={handleChange}
                                required
                                options={[
                                    "Employé", "Étudiant", "Indépendant", "Chômeur", "Retraité", "Autre"
                                ]}
                                placeholder="Veuillez sélectionner"
                                rounded={true}
                            />
                            {errors.professional_situation && <div className="text-red-500 text-sm">{errors.professional_situation}</div>}
                        </div>

                        <div className="flex gap-6">
                            <InputFieldBenevole
                                label="Si vous êtes en activité, veuillez indiquer votre secteur professionnel"
                                id="professional_sector"
                                name="professional_sector"
                                value={formData.professional_sector}
                                onChange={handleChange}
                                required
                                width="501px"
                            />
                            {errors.professional_sector && <div className="text-red-500 text-sm">{errors.professional_sector}</div>}
                        </div>

                        <div className="flex gap-2 flex-col items-start w-full">
                            <label className="font-semibold text-sm">
                                Intérêts et Motivation <span className="text-[#FF0000]">*</span>
                            </label>
                            <textarea
                                name="interests_motivation"
                                placeholder="Pourquoi souhaitez-vous devenir bénévole avec nous ?"
                                className="border border-[#D6DDEB] px-4 w-full h-[150px] py-4 sm:text-base text-sm"
                                maxLength={500}
                                value={formData.interests_motivation}
                                onChange={handleChange}
                            />
                            <div className="flex w-full justify-between text-[#A8ADB7] text-sm">
                                <p>Maximum 500 characters</p>
                                <p>{formData.interests_motivation?.length} / 500</p>
                            </div>
                            {errors.interests_motivation && <div className="text-red-500 text-sm">{errors.interests_motivation}</div>}
                        </div>

                        <div className="flex gap-2 flex-col items-start w-full">
                            <label className="font-semibold text-sm">
                                Compétences et Expériences <span className="text-[#FF0000]">*</span>
                            </label>
                            <textarea
                                name="competences_experiences"
                                placeholder="Décrivez vos compétences pertinentes et vos expériences passées"
                                className="border border-[#D6DDEB] px-4 w-full h-[150px] py-4 sm:text-base text-sm"
                                maxLength={500}
                                value={formData.competences_experiences}
                                onChange={handleChange}
                            />
                            <div className="flex w-full justify-between text-[#A8ADB7] text-sm">
                                <p>Maximum 500 characters</p>
                                <p>{formData.competences_experiences?.length} / 500</p>
                            </div>
                            {errors.competences_experiences && <div className="text-red-500 text-sm">{errors.competences_experiences}</div>}
                        </div>

                        <div className="flex flex-col items-start gap-1">
                            <label className="font-semibold text-sm">
                                Disponibilité <span className="text-[#FF0000]">*</span>
                            </label>
                            <div className="flex sm:gap-5 gap-3 flex-wrap">

                                <DateTimeBenevole

                                    id="availability_time"
                                    name="availability_time"
                                    value={formData.availability_time}
                                
                                    onChange={handleChange}
                                />
                                  
                                <div className="w-[90px]">
                                    <SelectFieldBenevole
                                        id="availability_day"
                                        name="availability_day"
                                        value={formData.availability_day}
                                        required
                                        options={Array.from({ length: 31 }, (_, i) => (i + 1).toString())} // Days 1-31
                                        placeholder="Jours"
                                        onChange={handleChange}
                                        rounded={true}
                                    />
                                </div>


                                <div className="w-[90px]">
                                    <SelectFieldBenevole
                                        id="availability_month"
                                        name="availability_month"
                                        required
                                        value={formData.availability_month}
                                        options={[
                                            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
                                        ]}
                                        valueoptions={[
                                            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
                                        ]}
                                        placeholder="Mois"
                                        onChange={handleChange}
                                        rounded={true}
                                    />
                                </div>

                            </div>
                            {errors.availability_date && <div className="text-red-500 text-sm">{errors.availability_start_date}</div>}
            
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
                                        {motivationLetterFileName ? motivationLetterFileName : "Ajouter ma lettre de motivation"}
                                    </span>
                                    <input
                                        type="file"
                                        id="motivationLetter"
                                        name="motivationLetter"
                                        onChange={handleMotivationLetterFileChange}
                                        accept="application/pdf"
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
                            disabled={isLoading}
                        >
                            {isLoading ? "Envoi en cours..." : "Envoyer ma demande"}
                        </button>

                        <p className="text-start">
                            En envoyant la demande, vous confirmez que vous acceptez nos
                            <span className="underline mx-1 text-[#0077B6]">Conditions d'utilisation</span>
                            et notre
                            <span className="underline mx-1 text-[#0077B6]">Politique de confidentialité</span>.
                        </p>
                    </div>
                </form>
            ) : (
                <div className="w-full flex justify-center">
                    <div className="bg-[#fff] p-6 rounded-lg shadow-helmi w-[700px] flex flex-col gap-3 justify-between items-center">
                        <div className="flex flex-col justify-between items-center gap-2">
                            <img src="/icons/folderIcon.png" alt="" width={45} />
                            <p className="font-semibold text-lg">
                                <span className="text-[#0270A0]">Votre Demande</span> a été Envoyée avec Succès !
                            </p>
                        </div>

                        <div className="text-sm flex flex-col gap-2 px-4">
                            <p>
                                Merci d'avoir postulé pour devenir bénévole avec l'AKDDCL. Nous avons bien reçu votre demande et nous l'examinerons dans les plus brefs délais.
                            </p>
                            <p>
                                En attendant, n'hésitez pas à explorer nos autres opportunités ou à
                                <span className="underline text-[#0077B6] mx-1">nous contacter</span>
                                pour toute question supplémentaire.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BenevoleForm;
