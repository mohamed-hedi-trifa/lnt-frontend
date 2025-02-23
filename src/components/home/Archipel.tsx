import { Link } from "gatsby";
import React, { useEffect, useRef, useState } from "react";
import LangLink from "../LangLink";
import Button from "../atoms/Button";
import PageParagraph from "../atoms/PageParagraph";
import PageTitle from "../atoms/titles/PageTitle";

export default function Archipel() {
  return (
    <section className="relative px-3 py-20">
      <div className="flex flex-col md:flex-row gap-10 items-center justify-between max-w-7xl mx-auto">
        <article className="max-w-[700px]">
          <h2 className="text-primary text-2xl font-bold text-center sm:text-start" style={{ textShadow: "2px 2px 2px rgb(0,0,0,.33)" }}>
            Aire Marine et Côtière Protégée des ilots nord de l'archipel de Kerkennah (AMCP)
          </h2>
          <PageParagraph>
            <p className="mt-3 text-sm">
              L'Aire marine protégée (AMP) des îles Kerkennah, d'une superficie de 1091,5 km², abrite une biodiversité marine exceptionnelle, comprenant des
              herbiers marins, des habitats côtiers, et des zones de reproduction essentielles pour plusieurs espèces. Ce projet phare, en partenariat avec
              l’Agence de protection et d’aménagement du littoral (Apal), L'Association Kraten du Développement Durable de la Culture et du Loisir(AKDDCL) et le
              fonds environnemental The MedFund, vise à renforcer la préservation des ressources marines et à promouvoir une pêche durable, garantissant ainsi des
              revenus stables pour les pêcheurs locaux.
            </p>
          </PageParagraph>
          <PageParagraph>
            <p className="mt-3 text-sm">
              Ce projet s'inscrit dans la stratégie nationale de transition écologique de la Tunisie, faisant de Kerkennah un modèle de résilience climatique et
              de gestion durable. Le MedFund apporte non seulement un soutien financier, mais aussi une expertise technique et un renforcement des capacités
              locales pour assurer la pérennité de l'AMP à long terme.
            </p>
          </PageParagraph>
          <LangLink
            to="/aire"
            className="hidden mt-4 justify-center sm:flex pt-6"
          >
            <Button variant="primary">
            En savoir plus
            </Button>
          </LangLink>
        </article>
        <article className="shrink-0 w-full md:w-5/12 max-w-[400px]">
          <div className="rounded-lg w-fit mx-auto overflow-hidden">
            <img src="/archipel.png" alt="" className="w-full" />
          </div>
        </article>
      </div>
      <LangLink
            to="/aire"
            className="flex mt-4 justify-center sm:hidden"
          >
            <Button variant="primary">
            En savoir plus
            </Button>
          </LangLink>
    </section>
  );
}
