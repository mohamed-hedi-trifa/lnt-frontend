import React, { useState } from "react";
import Button from "./Button";
import axios from "axios";
import Input from "./Input";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function NewsLetterSub() {
  const [email, setEmail] = useState("");

  function subscribe(e: React.FormEvent) {
    e.preventDefault();

    const data = new FormData();

    data.append("email", email);

    axios
      .post("/api/newsletter/subscribe", data)
      .then((res) => {
        console.log("successfully subscribed to news letter");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <form onSubmit={subscribe} className="text-black flex flex-col gap-2 py-5 px-10 sm:px-3 rounded-lg bg-white shadow-[1px_2px_6px_rgb(0,0,0,.2)]">
      <h1 className="font-bold text-center">Restez informé!</h1>
      <p className="text-slate-600 text-sm text-center">Abonnez-vous à notre bulletin <br/> pour les dernières nouvelles et événements de l'AKDDCL.</p>
      <div className="relative flex items-center">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-4 py-2 rounded text-sm shadow-[-1px_2px_5px_rgb(0,0,0,.4)]"
      />
      <EnvelopeIcon className="h-5 w-5 absolute right-2 text-gray-500" />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-sky-700 hover:bg-sky-900 text-white font-semibold py-2 shadow-[-1px_2px_5px_rgb(0,0,0,.3)] duration-200"
      >
        S'abonner
      </button>
    </form>
  );
}
