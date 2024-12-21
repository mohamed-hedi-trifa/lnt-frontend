import React, { useEffect, useRef, useState } from "react";
import LangLink from "../LangLink";
import Button from "../atoms/Button";

export default function WhoAreWe() {
  return (
    <section className="relative px-3 py-10 sm:py-20 bg-slate-100 isolate">
      <div className="absolute top-0 left-0 z-[-1] w-[120px]  h-[200px] bg-[radial-gradient(circle,#cbd5e1_3px,transparent_1px)] bg-[length:12px_12px]"></div>
      <div className="absolute bottom-0 right-0 z-[-1] w-[120px]  h-[200px] bg-[radial-gradient(circle,#cbd5e1_3px,transparent_1px)] bg-[length:12px_12px]"></div>
      <div className="grid md:grid-cols-2 gap-3 items-center max-w-7xl mx-auto">
        <article className="">
          <div className="w-[40%] aspect-[5/6] rounded-lg overflow-hidden">
            <img src="/who_are_we_1.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-[40%] aspect-[5/6] ml-[30%] mt-[-30%] rounded-lg overflow-hidden">
            <img src="/who_are_we_2.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-[30%] aspect-[5/6] ml-[60%] mt-[-25%] rounded-lg overflow-hidden">
            <img src="/who_are_we_3.jpg" alt="" className="w-full h-full object-cover" />
          </div>
        </article>
        <article className="">
          <h2 className="text-primary text-2xl font-bold" style={{ textShadow: "2px 2px 2px rgb(0,0,0,.5)" }}>
            Qui Somme-Nous
          </h2>
          <p className="mt-3 text-2xl md:text-3xl font-bold">Association Kratten du Développement Durable de la Culture et du Loisir</p>
          <div className="mt-2 flex gap-2">
            <div className="h-[5px] w-5 bg-[#006E9F]"></div>
            <div className="h-[5px] w-20 bg-[#006E9F]"></div>
          </div>
          <p className="mt-3 text-sm leading-6">
            L'Association Kratten du Développement Durable de la Culture et du Loisir(AKDDCL) est une organisation à but non lucratif fondée en 2014, dédiée à
            la préservation de l’environnement et à la promotion de la culture locale à Kerkennah. Nous œuvrons pour soutenir les pêcheurs dans une gestion
            durable des ressources maritimes et pour lutter contre la pêche illégale autour de l'archipel.
          </p>
          <p className="mt-3 text-sm leading-6">
            En plus de nos initiatives pour la protection de l’environnement, nous organisons divers événements culturels et sportifs, comme le Festival de la
            Culture des Îles Méditerranéennes, qui célèbre le riche patrimoine des îles de Kerkennah. Nous croyons en un développement équilibré, respectueux de
            notre environnement et de nos traditions, tout en créant des opportunités pour les générations futures. Notre mission est de rassembler la
            communauté autour de valeurs de durabilité, de culture et de solidarité pour bâtir un avenir meilleur pour notre île et ses habitants.
          </p>
          <LangLink
            to="/who-are-we"
            className="mt-4 flex justify-center sm:justify-start"
          >
            <Button variant="primary">
            En savoir plus
            </Button>
          </LangLink>
        </article>
      </div>
    </section>
  );
}
