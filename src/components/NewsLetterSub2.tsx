import React, { useState } from "react";
import Button from "./atoms/Button";
import axios from "axios";
import Input from "./atoms/inputs/Input";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import EnveloppeIcon from "@/assets/icons/EnveloppeIcon";
import { toast } from "react-toastify";

export default function NewsLetterSub2({title, paragraph}) {
  const [email, setEmail] = useState("");

  function subscribe(e: React.FormEvent) {
    e.preventDefault();

    const data = new FormData();

    data.append("email", email);

    axios
      .post("/api/newsletter/subscribe", data)
      .then((res) => {
        toast.success(`${email} subscribed to news letter successfully !`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEmail("");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    // sm:w-[300px]
    <form onSubmit={subscribe} className="w-full  sm:w-[300px] h-[412px] px-[35px] py-7 bg-gradient-to-r from-[#51adc6] to-[#006e9f] rounded-xl shadow-helmi justify-center items-center gap-2.5 inline-flex">

      <div className="w-[259.95px] flex-col justify-start items-center gap-[25px] inline-flex">
        <div className="flex-col justify-start items-center gap-px flex">
          <div className="w-[231px] h-[75px] relative">
            <div className="w-[231px] h-[29px] left-0 top-[22.10px] absolute text-center text-white text-2xl font-extrabold font-['Manrope'] capitalize leading-7">{title}</div>
            <div className='flex justify-center'><EnveloppeIcon /></div>
          </div>
          <div className="w-[218px] text-center text-white text-base font-medium font-['Inter'] capitalize leading-7">{paragraph}</div>
          {/* Inscrivez-vous à notre newsletter pour Recevez les infos sur nos prochaines formations et campements ---------- Restez Connectés ! */}
        </div>
        <div className="h-[115px] flex-col justify-start items-start gap-[15px] flex px-5">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'
            className="text-center h-[50px] px-5 py-[16.50px] bg-white rounded-[5px] justify-center items-center flex placeholder:text-[#6d757f] placeholder:font-normal placeholder:text-sm" />

          <button type="submit" className="h-[50px] w-full py-4 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-center items-center flex">
            <div className="w-[114.82px] text-center text-white text-sm font-bold uppercase leading-[14px]">S'abonner</div>
          </button>
        </div>
      </div>
    </form>
  );
}
