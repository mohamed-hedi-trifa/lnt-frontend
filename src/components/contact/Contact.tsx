import React, { useState, FormEvent } from "react";
// import phoneIcon from "../../images/phone-icon.png";
// import hornIcon from "../../images/horn-icon.png";
// import locationIcon from "../../images/location-icon.png";
import axios, { AxiosError } from "axios";
// import { faArrowLeft, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

function sendRequest(data: FormData) {
    return axios.post('/api/create-message', data);
}

const Contact: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>({});

    const resetInputs = () => {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setErrors([]);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (loading) return;

        const nameVal = name.trim();
        const emailVal = email.trim();
        const subjectVal = subject.trim();
        const messageVal = message.trim();

        const data: FormData = {
            name: nameVal,
            email: emailVal,
            subject: subjectVal,
            message: messageVal,
        };

        setLoading(true);

        try {
            await sendRequest(data);
            Swal.fire("Succés", "Votre email a été envoyé avec succès", "success");
            resetInputs();
            setErrors([]);
        } catch (err) {
            const errorResponse = (err as AxiosError).response;
            if (errorResponse && errorResponse.data) {
                setErrors(errorResponse.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-[#f9f9f9] border-t">
            <div className="w-full px-8 py-8 max-w-w1300 mx-auto">
                <AnimationOnScroll duration={2} animateIn="animate__fadeInUp">
                    <div className="mb-10">
                        <div className="flex justify-center font-bold text-[#4da6e7]">CONTACTEZ NOUS</div>
                        <div className="text-black font-bold text-3xl flex justify-center">Contactez-nous dès maintenant</div>
                    </div>
                    <div className="shadow-xl grid grid-cols-12 p-10 bg-white gap-4 rounded-xl">
                        <div className="col-span-12 xl:col-span-5">
                            <div className="w-full">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3192.76092339878!2d10.195379876595958!3d36.84820142223363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1simmeuble%20new%20Tower%20-%20centre%20urbain%20nord%20%E2%80%93%20Tunis!5e0!3m2!1sen!2stn!4v1689236728352!5m2!1sen!2stn"
                                    width="100%" height="636px" frameBorder="0" style={{ border: 0 }}
                                    allowFullScreen></iframe>
                            </div>
                        </div>
                        <div className="break-all col-span-12 xl:col-span-7 flex flex-col gap-4">
                            <div className="grid grid-cols-12 gap-4 text-gray-500">
                                <div className="col-span-12 sm:col-span-4 shadow-xl flex flex-col items-center py-5 px-5 rounded-xl">
                                    {/* <img src={phoneIcon} alt="Phone Icon" /> */}
                                    <PhoneIcon className="h-16 w-16 text-[#4da6e7]" />
                                    <div>(+216) 50258146</div>
                                </div>
                                <div className="col-span-12 sm:col-span-4 shadow-xl flex flex-col items-center py-5 px-5 rounded-xl">
                                    {/* <img src={hornIcon} alt="Horn Icon" /> */}
                                    <EnvelopeIcon className="h-16 w-16 text-[#4da6e7]" />
                                    <div>Helmi@gmail.com</div>
                                </div>
                                <div className="col-span-12 sm:col-span-4 shadow-xl flex flex-col items-center py-5 px-5 rounded-xl">
                                    {/* <img src={locationIcon} alt="Location Icon" /> */}
                                    <MapPinIcon className="w-16 h-16 text-[#4da6e7]" />
                                    <div>Dar Helmi, Kraten, Kerkennah</div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 sm:col-span-6 flex flex-col justify-around gap-4">
                                        <div className="flex flex-col">
                                            <input className="py-2 px-4 border rounded-full outline-none" type="text" placeholder="Nom" value={name} onChange={e => setName(e.target.value)} />
                                            <span className="text-red-500">{errors?.name}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <input className="py-2 px-4 border rounded-full outline-none" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                                            <span className="text-red-500">{errors?.email}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <input className="py-2 px-4 border rounded-full outline-none" type="text" placeholder="Sujet" value={subject} onChange={e => setSubject(e.target.value)} />
                                            <span className="text-red-500">{errors?.subject}</span>
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-6 flex flex-col">
                                        <textarea className="py-3 px-5 border rounded-3xl outline-none w-full" name="message" placeholder="Message" cols={30} rows={8} value={message} onChange={e => setMessage(e.target.value)} ></textarea>
                                        <span className="text-red-500">{errors?.message}</span>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button className="w-full sm:w-[50%] border border-[#4da6e7] text-[#4da6e7] rounded-full p-3 hover:bg-[#4da6e7] transition duration-300 hover:text-white">
                                        Envoyer le message maintenant.
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </AnimationOnScroll>
            </div>
        </div>
    );
};

export default Contact;
