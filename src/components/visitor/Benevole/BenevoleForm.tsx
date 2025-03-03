import React, { useState } from "react";

import UploadIcon from "@/assets/icons/UploadIcon";
import InputFieldBenevole from "./InputFieldBenevole";
import SelectFieldBenevole from "./SelectFieldBenevole";
import DateTimeBenevole from "./DateTimeBenevole";


export default function BenevoleForm() {


    const [isFormFilled, setisFormFilled] = useState(false);

    const [interestsMotivationCharCount, setInterestsMotivationCharCount] = useState(0);
    const [competencesExperiencesCharCount, setCompetencesExperiencesCharCount] = useState(0);
    const maxLength = 500;

    const handleInterestsMotivationChange = (e: { target: { value: string | any[]; }; }) => {
        setInterestsMotivationCharCount(e.target.value.length);
    };

    const handleCompetencesExperiencesChange = (e: { target: { value: string | any[]; }; }) => {
        setCompetencesExperiencesCharCount(e.target.value.length);
    };

    return (
        <div>
            {!isFormFilled ? (
                <div className="bg-white p-6 rounded-lg shadow-lg   relative sm:mr-10">
                    <div className="flex items-start flex-col mt-4 gap-5">


                        <div className="flex gap-6 sm:flex-row flex-col">

                            <InputFieldBenevole label="Nom" id="firstName" name="firstName" required width="200px" />
                            <InputFieldBenevole label="Prénom" id="secondName" name="secondName" required width="200px" />
                        </div>

                        <div className="flex flex-col items-start gap-1">
                            <label className="font-semibold text-sm">
                                Date de naissance <span className="text-[#FF0000]">*</span>
                            </label>
                            <div className="flex gap-6 flex-wrap">
                                {/* Day Select */}
                                <div className="w-[103px]">
                                    <SelectFieldBenevole
                                        id="day"
                                        name="day"
                                        required
                                        options={Array.from({ length: 31 }, (_, i) => (i + 1).toString())} // Days 1-31
                                        placeholder="Jours"
                             
                                        rounded={true}
                                    />
                                </div>
                                {/* Month Select */}
                                <div className="w-[103px]">
                                    <SelectFieldBenevole
                                        id="month"
                                        name="month"
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
                                        id="year"
                                        name="year"
                                        required
                                        options={Array.from({ length: 30 }, (_, i) => (2023 + i).toString())} // Years from 2023 to 2052
                                        placeholder="Années"
                                        rounded={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-6 sm:w-[500px] w-full">

                            <InputFieldBenevole label="Adresse e-mail" id="email" name="email" type="email" required />
                        </div>

                        <div className="flex gap-6  sm:w-[500px] w-full">

                            <InputFieldBenevole label="Numéro de téléphone" id="phone" name="phone" type="tel" required />
                        </div>

                        <div className="flex gap-6  sm:w-[500px] w-full">

                            <InputFieldBenevole label="Adresse" id="address" name="address" />
                        </div>

                        <div className="flex gap-2 flex-col items-start sm:w-[300px] w-full">
                            <label className="font-semibold text-sm">
                                Votre situation professionnelle <span className="text-[#FF0000]">*</span>
                            </label>
                            <SelectFieldBenevole
                                id="ProfessionalSituation situation"
                                name="ProfessionalSituation"
                                required
                                options={Array.from({ length: 30 }, (_, i) => (2023 + i).toString())} // Years from 2023 to 2052
                                placeholder="Veuillez sélectionner"

                                rounded={true}
                            />
                        </div>
                        <div className="flex gap-6">

                            <InputFieldBenevole label="Si vous êtes en activité, veuillez indiquer votre secteur professionnel" required id="address" name="address" width="501px" />
                        </div>
                       

                        <div className="flex gap-2 flex-col items-start w-full">
                            <label className="font-semibold text-sm">
                                Intérêts et Motivation <span className="text-[#FF0000]">*</span>
                            </label>
                            <textarea
                                name="interestsMotivation"
                                placeholder="Pourquoi souhaitez-vous devenir bénévole avec nous ?"
                                className="border border-[#D6DDEB] px-4 w-full h-[150px] py-4 sm:text-base text-sm"
                                maxLength={maxLength}
                                onChange={handleInterestsMotivationChange}
                            />
                            <div className="flex w-full justify-between text-[#A8ADB7] text-sm">
                                <p>Maximum {maxLength} characters</p>
                                <p>{interestsMotivationCharCount} / {maxLength}</p>
                            </div>
                        </div>

                        {/* Compétences et Expériences */}
                        <div className="flex gap-2 flex-col items-start w-full">
                            <label className="font-semibold text-sm">
                                Compétences et Expériences <span className="text-[#FF0000]">*</span>
                            </label>
                            <textarea
                                name="competencesExperiences"
                                placeholder="Décrivez vos compétences pertinentes et vos expériences passées"
                                className="border border-[#D6DDEB] px-4 w-full h-[150px] py-4 sm:text-base text-sm"
                                maxLength={maxLength}
                                onChange={handleCompetencesExperiencesChange}
                            />
                            <div className="flex w-full justify-between text-[#A8ADB7] text-sm">
                                <p>Maximum {maxLength} characters</p>
                                <p>{competencesExperiencesCharCount} / {maxLength}</p>
                            </div>
                        </div>


                        <div className="flex flex-col items-start gap-1">
                            <label className="font-semibold text-sm">
                                Disponibilité <span className="text-[#FF0000]">*</span>
                            </label>
                            <div className="flex sm:gap-5 gap-3 flex-wrap">

                                <DateTimeBenevole />
                                <div className="w-[90px]">
                                    <SelectFieldBenevole
                                        id="day"
                                        name="day"
                                        required
                                        options={Array.from({ length: 31 }, (_, i) => (i + 1).toString())} // Days 1-31
                                        placeholder="Jours"

                                        rounded={true}
                                    />
                                </div>


                                <div className="w-[90px]">
                                    <SelectFieldBenevole
                                        id="month"
                                        name="month"
                                        required
                                        options={[
                                            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
                                        ]}
                                        placeholder="Mois"

                                        rounded={true}
                                    />
                                </div>

                            </div>

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
                            onClick={() => setisFormFilled(true)}
                        >
                            Envoyer ma demande
                        </button>

                        <p className="text-start">En envoyant la demande, vous confirmez que vous acceptez nos

                            <span className="underline mx-1 text-[#0077B6] ">Conditions d'utilisation </span>

                            et notre
                            <span className="underline mx-1 text-[#0077B6]">Politique de confidentialité</span>
                        </p>

                    </div>
                </div>
            ) : (

                <div className="w-full   flex justify-center">

                    <div className="bg-[#feefef] p-6 rounded-lg shadow-lg w-[500px] flex flex-col gap-3 justify-between items-center ">
                        <div className="flex flex-col justify-between items-center gap-2">

                            <img src="/icons/folderIcon.png" alt="" width={45} />
                            <p className="font-semibold text-lg"><span className="text-[#0270A0]">Votre Demande</span> a été Envoyée avec Succès !</p>
                        </div>

                        <div className="text-sm flex flex-col gap-2 px-4">
                            <p>
                                Merci d'avoir postulé pour devenir bénévole avec l'AKDDCL. Nous avons bien reçu votre demande et nous l'examinerons dans les plus brefs délais
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
}
