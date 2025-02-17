import React, { useState } from "react";
import InputFieldOpportunity from './InputFieldOpportunity'
import SelectFieldOpportunity from "./SelectFieldOpportunity";
import UploadIcon from "@/assets/icons/UploadIcon";

export default function InternshipApplicationForm({ isOpen, setIsOpen }: { isOpen: any, setIsOpen: any }) {
    if (!isOpen) return null;

    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] px-10">
            {!isSuccess ? (
                <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-h-[calc(100vh-60px)] overflow-y-auto relative">


                    <button
                        className="absolute top-4 right-10 text-gray-600 text-5xl"
                        onClick={() => setIsOpen(false)}
                    >
                        &times;
                    </button>


                    <h2 className="text-xl font-semibold mb-4 text-[#0270A0]">Formulaire de Demande de Stage</h2>

                    <hr className="border-t-2 border-black" />
                    <div className="flex items-start flex-col mt-4 gap-5">
                        <h1 className="font-semibold text-lg">
                            Informations Personnelles
                        </h1>

                        <div className="flex gap-6">

                            <InputFieldOpportunity label="Nom" id="firstName" name="firstName" required width="200px" />
                            <InputFieldOpportunity label="Prénom" id="secondName" name="secondName" required width="200px" />
                        </div>

                        <div className="flex flex-col items-start gap-1">
                            <label className="font-semibold text-sm">
                                Date de naissance <span className="text-[#FF0000]">*</span>
                            </label>
                            <div className="flex gap-5">
                                {/* Day Select */}
                                <SelectFieldOpportunity
                                    id="day"
                                    name="day"
                                    required
                                    options={Array.from({ length: 31 }, (_, i) => (i + 1).toString())} // Days 1-31
                                    placeholder="Jours"
                                    width="100px"
                                />

                                {/* Month Select */}
                                <SelectFieldOpportunity
                                    id="month"
                                    name="month"
                                    required
                                    options={[
                                        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
                                    ]}
                                    placeholder="Mois"
                                    width="100px"
                                />

                                {/* Year Select */}
                                <SelectFieldOpportunity
                                    id="year"
                                    name="year"
                                    required
                                    options={Array.from({ length: 30 }, (_, i) => (2023 + i).toString())} // Years from 2023 to 2052
                                    placeholder="Années"
                                    width="100px"
                                />
                            </div>

                        </div>

                        <div className="flex gap-6">

                            <InputFieldOpportunity label="Adresse e-mail" id="email" name="email" type="email" required width="500px" />
                        </div>

                        <div className="flex gap-6">

                            <InputFieldOpportunity label="Numéro de téléphone" id="phone" name="phone" type="tel" required width="500px" />
                        </div>

                        <div className="flex gap-6">

                            <InputFieldOpportunity label="Adresse" id="address" name="address" required width="500px" />
                        </div>
                    </div>
                    <hr className="border-t-2 border-black mt-5" />
                    <div className="flex items-start flex-col mt-4 gap-5">

                        <h1 className="font-semibold text-lg">
                            Informations Académiques
                        </h1>

                        <div className="flex gap-6">

                            <InputFieldOpportunity label="Établissement d'enseignement" id="educationalInstitution" name="educationalInstitution" required width="500px" />
                        </div>
                        <div className="flex gap-6">

                            <InputFieldOpportunity label="Niveau d'études" id="educationLevel" name="educationelLev" required width="500px" />
                        </div>
                        <div className="flex gap-6">
                            <InputFieldOpportunity label="Domaine d'études" id="studyField" name="studyField" required width="500px" />
                        </div>


                    </div>
                    <hr className="border-t-2 border-black mt-5" />
                    <div className="flex items-start flex-col mt-4 gap-5">

                        <h1 className="font-semibold text-lg">
                            Stage Recherché
                        </h1>

                        <div className="flex gap-2 flex-col items-start">
                            <label className="font-semibold text-sm">
                                Type de stage <span className="text-[#FF0000]">*</span>
                            </label>
                            <SelectFieldOpportunity
                                id="intershipType"
                                name="intershipType"
                                required
                                options={[
                                    "1", "2", "4"
                                ]}
                                placeholder="Sélectionnez un type de stage"
                                width="500px"
                            />
                        </div>
                        <div className="flex gap-6">

                            <InputFieldOpportunity label="Domaine de stage souhaité" id="educationLevel" name="educationelLev" required width="500px" />
                        </div>
                        <div className="flex flex-col items-start gap-2">
                            <label className="font-semibold text-sm">
                                Période souhaitée <span className="text-[#FF0000]">*</span>
                            </label>
                            <div className="flex  gap-4 items-center ml-3">
                                <label className="font-semibold text-sm mr-4 ">
                                    Date de Début :
                                </label>
                                <SelectFieldOpportunity
                                    id="intershipType"
                                    name="intershipType"
                                    required
                                    options={[
                                        "1", "2", "4"
                                    ]}
                                    placeholder="JJ"
                                    width="90px"
                                    height="28px"
                                />
                                <SelectFieldOpportunity
                                    id="intershipType"
                                    name="intershipType"
                                    required
                                    options={[
                                        "1", "2", "4"
                                    ]}
                                    placeholder="MM"
                                    width="90px"
                                    height="28px"
                                />
                                <SelectFieldOpportunity
                                    id="intershipType"
                                    name="intershipType"
                                    required
                                    options={[
                                        "1", "2", "4"
                                    ]}
                                    placeholder="AAA"
                                    width="100px"
                                    height="28px"
                                />
                            </div>
                            <div className="flex  gap-4 items-center ml-3">
                                <label className="font-semibold text-sm mr-4 ">
                                    Date de Fin :
                                </label>
                                <SelectFieldOpportunity
                                    id="intershipType"
                                    name="intershipType"
                                    required
                                    options={[
                                        "1", "2", "4"
                                    ]}
                                    placeholder="JJ"
                                    width="90px"
                                    height="28px"
                                />
                                <SelectFieldOpportunity
                                    id="intershipType"
                                    name="intershipType"
                                    required
                                    options={[
                                        "1", "2", "4"
                                    ]}
                                    placeholder="MM"
                                    width="90px"
                                    height="28px"
                                />
                                <SelectFieldOpportunity
                                    id="intershipType"
                                    name="intershipType"
                                    required
                                    options={[
                                        "1", "2", "4"
                                    ]}
                                    placeholder="AAA"
                                    width="100px"
                                    height="28px"
                                />
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
                            Votre demande de stage a été envoyée avec succès. Nous l'examinerons avec attention et vous recontacterons si votre profil correspond à nos besoins.
                        </p>
                        <p>
                            En attendant, n'hésitez pas à explorer nos autres opportunités ou à nous contacter pour toute question supplémentaire.
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
        </div>
    );
}
