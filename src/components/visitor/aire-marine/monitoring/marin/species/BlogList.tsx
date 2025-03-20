import PageParagraph from "@/components/atoms/PageParagraph";
import React from "react";
import reactStringReplace from "react-string-replace";
import PageParagraph2 from "@/components/atoms/PageParagraph2";
import NomScientifique from "@/assets/icons/NomScientifique";

export default function BlogList({ content }: { content: any[] }) {

  const data = Array.isArray(content) ? content : JSON.parse(content);

  return (



    <ul className="divide-y mx-10 mb-4 list-disc border-2 border-black rounded-[12px]">



      <div className="self-stretch p-5 rounded-xl  outline outline-1 outline-offset-[-1px] outline-black inline-flex flex-col justify-start items-start overflow-hidden">
        <div className="self-stretch  flex flex-col justify-center items-center gap-3">
          <div className="self-stretch flex flex-col justify-center items-start gap-2.5">
            <div className="self-stretch inline-flex justify-start items-center gap-2.5">
              <img src="/icons/etiqueter.png" alt="" />
              <div className="flex-1 inline-flex flex-col justify-center items-center gap-[3px]">
                <div className="self-stretch justify-start text-black text-xl font-bold font-['Montserrat'] leading-7">Nom scientifique</div>
                <div className="self-stretch justify-start text-black text-xl font-medium font-['Montserrat'] leading-7">Posidonia oceanica</div>
              </div>
            </div>
            <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-stone-400"></div>
          </div>
          <div className="flex flex-col justify-center items-start gap-2.5">
            <div className="inline-flex justify-center items-center gap-2.5">
              <img src="/icons/monde.png" alt="" />
              <div className="w-[665px] inline-flex flex-col justify-start items-start gap-[3px]">
                <div className="self-stretch justify-start text-black text-xl font-bold font-['Montserrat'] leading-7">Répartition / Habitat</div>
                <div className="self-stretch justify-start text-black text-xl font-medium font-['Montserrat'] leading-7">La Posidonie oceanica est une plante marine emblématique de la mer Méditerranée. Elle prospère sur des fonds marins sableux ou rocheux peu profonds, généralement à une profondeur allant jusqu’à 40 mètres. Ces herbiers forment des écosystèmes uniques et essentiels pour la biodiversité marine.</div>
              </div>
            </div>
            <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-stone-400"></div>
          </div>
          <div className="self-stretch flex flex-col justify-center items-start gap-2.5">
            <div className="self-stretch inline-flex justify-start items-center gap-2.5">
              <img src="/icons/regle.png" alt="" />
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-[3px]">
                <div className="self-stretch justify-start text-black text-xl font-bold font-['Montserrat'] leading-7">Taille et Morphologie</div>
                <div className="self-stretch justify-start text-black text-xl font-medium font-['Montserrat'] leading-7">Cette plante à fleurs se distingue par ses longues feuilles rubanées mesurant entre 20 et 100 cm de long pour une largeur de 6 à 10 mm. Elle produit des fruits flottants, parfois surnommés "olives de mer", qui participent à sa reproduction.</div>
              </div>
            </div>
            <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-stone-400"></div>
          </div>
          <div className="self-stretch h-44 relative">
            <div className="w-[728px] left-0 top-0 absolute inline-flex justify-start items-center gap-2.5">
              <img src="/icons/coutellerie.png" alt="" />
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-[3px]">
                <div className="self-stretch justify-start text-black text-xl font-bold font-['Montserrat'] leading-7">Régime alimentaire</div>
                <div className="self-stretch justify-start text-black text-xl font-medium font-['Montserrat'] leading-7">En tant que plante autotrophe, la posidonie puise des nutriments tels que l’azote et le phosphore dans les sédiments marins. Grâce à la photosynthèse, elle génère de l’oxygène et produit sa propre matière organique, essentielle à la survie des espèces qui y habitent.</div>
              </div>
            </div>
            <div className="w-[741px] h-0 left-0 top-[180px] absolute outline outline-1 outline-offset-[-0.50px] outline-stone-400"></div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2.5">
            <div className="w-[741px] inline-flex justify-center items-center gap-2.5">
              <img src="/icons/point-dexclamation.png" alt="" />
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-[3px]">
                <div className="self-stretch justify-start text-black text-xl font-bold font-['Montserrat'] leading-7">Statut de Conservation</div>
                <div className="self-stretch justify-start text-black text-xl font-medium font-['Montserrat'] leading-7">La posidonie est une espèce protégée depuis plusieurs décennies. En France, elle bénéficie d’un statut de protection renforcé depuis 1988, et elle est reconnue comme un habitat d’intérêt prioritaire au sein de l’Union européenne.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ul>

  );
}

function parseContent(text: string) {
  const textWithBold = reactStringReplace(text, /\*\*(.*?)\*\*/g, (match, i) => (
    <span key={i} className="font-semibold">
      {match}
    </span>
  ));

  const textWithLinks = reactStringReplace(textWithBold, /(https?:\/\/[^\s]+)/g, (match, i) => (
    <a key={i} href={match} target="_blank" rel="noopener noreferrer" className="text-blue-500 markdown-link">
      {match}
    </a>
  ));

  return textWithLinks;
}
