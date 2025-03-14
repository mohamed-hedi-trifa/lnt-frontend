import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import PageParagraph from "../atoms/PageParagraph";
import Carousel from "./Carousel";






export default function Partners() {

  const [partners, setPartners] = useState<any>(null);
  const getPartners = async () => {
      try {

          const res = await axios.get("/api/get-general-parteners");
          setPartners(res.data);
          console.log(res.data)

      } catch (err) {
          Swal.fire("Error", err.response?.data?.message || "Failed to fetch Partners", "error");
      } finally {

      }
  };

  useEffect(() => {
      getPartners();
  }, [])
  const swiperRef = useRef<any>(null);



  return (
    <section className="relative px-3 py-20 bg-slate-900 overflow-hidden">
      <div className="absolute left-0 -translate-x-1/3 top-1/2 -translate-y-1/2 w-[400px] aspect-square opacity-60">
        <img src="/spot.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute right-0 translate-x-1/3 top-1/2 -translate-y-1/2 w-[400px] aspect-square opacity-60">
        <img src="/spot.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-4xl mx-auto">

        <h2 className="text-white text-center font-bold text-3xl">Avec qui nous sommes engagés...</h2>
        <PageParagraph>
          <p className="mt-4 text-white text-center md:text-base leading-7">
            L'Association Kratten du Développement Durable de la Culture et du Loisir (AKDDCL) s'associe à des partenaires locaux et internationaux qui partagent
            notre engagement pour la durabilité et le bien-être communautaire. Ensemble, nous soutenons les pêcheurs dans des pratiques durables, organisons des
            événements culturels et préservons le patrimoine de la région de Kerkennah, notamment à travers l'aire marine protégée. Cette collaboration renforce
            notre impact et aide à protéger notre environnement marin tout en enrichissant notre communauté.
          </p>
        </PageParagraph>
        <div className="mt-10">
        <Carousel slides={partners} />
        </div>

      </div>
    </section>
  );
}
