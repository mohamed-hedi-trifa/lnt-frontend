import React, { useState, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import {
  PhoneArrowUpRightIcon,
  EnvelopeOpenIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { AnimationOnScroll } from "react-animation-on-scroll";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function sendRequest(data: FormData) {
  return axios.post("/api/create-message", data);
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

    const data: FormData = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
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
    <div className="w-full  min-h-screen py-16 border-t">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-[106px]">        
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary">
              CONTACTEZ-NOUS
            </h2>
            <p className="text-2xl font-semibold text-black mt-2">
              Nous sommes à votre écoute
            </p>
          </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <AnimationOnScroll
            duration={1.5}
            animateIn="animate__fadeInLeftBig"
            animateOnce
            className="col-span-1 xl:col-span-2 w-full"
          >
            <div className="h-full w-full shadow-2xl rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3275.0534666483472!2d11.255356599999999!3d34.8297482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1301a9e32deb070d%3A0x453f7c016acebeb3!2sAssociation%20Kraten%20du%20d%C3%A9veloppement%20durable%20de%20la%20culture%20et%20du%20loisir%20AKDDCL!5e0!3m2!1sfr!2stn!4v1740282338761!5m2!1sfr!2stn"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0, minHeight: "500px" }}
                allowFullScreen
              ></iframe>
            </div>
          </AnimationOnScroll>

          <AnimationOnScroll
            duration={1.5}
            animateIn="animate__fadeInRightBig"
            animateOnce
            className="col-span-1 xl:col-span-3 flex flex-col gap-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center p-5 border border-gray-300 rounded-2xl shadow hover:shadow-lg transition">
                <PhoneArrowUpRightIcon className="h-12 w-12 text-primary mb-2" />
                <p className="text-sm text-gray-700 font-semibold">
                  (+216) 50258146
                </p>
              </div>
              <div className="flex flex-col items-center p-5 border border-gray-300 rounded-2xl shadow hover:shadow-lg transition">
                <EnvelopeOpenIcon className="h-12 w-12 text-blue-600 mb-2" />
                <p className="text-sm text-gray-700 font-semibold text-center">
                  Contact@akddclkerkennah.org.tn
                </p>
              </div>
              <div className="flex flex-col items-center p-5 border border-gray-300 rounded-2xl shadow hover:shadow-lg transition">
                <MapPinIcon className="h-12 w-12 text-red-600 mb-2" />
                <p className="text-sm text-gray-700 font-semibold text-center">
                  Port de Pêche Kraten, Kerkennah
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-helmi">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <input
                      className="py-3 px-5 border rounded-full outline-none focus:ring-2 focus:ring-primary"
                      type="text"
                      placeholder="Nom"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors?.name && (
                      <span className="text-red-500 mt-1">{errors?.name}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <input
                      className="py-3 px-5 border rounded-full outline-none focus:ring-2 focus:ring-primary"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors?.email && (
                      <span className="text-red-500 mt-1">{errors?.email}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <input
                    className="py-3 px-5 border rounded-full outline-none focus:ring-2 focus:ring-primary"
                    type="text"
                    placeholder="Sujet"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  {errors?.subject && (
                    <span className="text-red-500 mt-1">
                      {errors?.subject}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <textarea
                    className="py-3 px-5 border rounded-2xl outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  {errors?.message && (
                    <span className="text-red-500 mt-1">
                      {errors?.message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-1/2 mx-auto py-3 px-6 rounded-full bg-gradient-to-r from-secondary to-primary text-white font-semibold hover:opacity-90 transition"
                >
                  {loading ? "Envoi en cours..." : "Envoyer le message"}
                </button>
              </form>
            </div>
          </AnimationOnScroll>
        </div>
      </div>
    </div>
  );
};

export default Contact;
