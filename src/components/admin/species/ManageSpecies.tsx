import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "gatsby";
import Title from "../../atoms/titles/Title";
import SpeciesGallery from "./SpeciesGallery";
import Input from "../../atoms/inputs/Input";
import Textarea from "@/components/atoms/inputs/Textarea";
import Table from '@/components/visitor/who-are-we/rapports/Table';
import TableSpecies from "@/components/visitor/aire-marine/monitoring/marin/species/TableSpecies";

export default function ManageSpecies({ params }: { params: any }) {
  const [species, setspecies] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string | null>(null);
  const [themeId, setThemeId] = useState("");
  const [formData, setFormData] = useState({
    title_en: "",
    title_fr: "",
  });

  useEffect(() => {
    if (params.slug) {
      setSlug(params.slug);
    }
  }, [params.slug]);

  const getSpecies = async () => {
    try {
      const res = await axios.get(`/api/species/${slug}`);
      setspecies(res.data);

      const blogSpecies: any = res.data;

      setFormData({
        title_en: blogSpecies.title_en ?? "",
        title_fr: blogSpecies.title_fr ?? "",

      });
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to fetch species", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!slug) return;


    getSpecies();
  }, [slug]);





  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-1">
        <Link to="/admin/species">
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <Title>Edit Species</Title>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-500">Loading...</p>
        </div>
      ) : species ? (
        <div className="bg-white shadow-md rounded-lg p-6">

          <div className="mb-6">
            <h1 className="text-4xl font-extrabold mb-2">Manage Edition</h1>
            <p className="text-lg text-gray-600">
              Title: <span className="font-semibold">{species.title_fr || species.title_en}</span>
            </p>
            <p className="text-lg text-gray-600">
              Type: <span className="font-semibold">{species.type}</span>
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <img
                src={`${process.env.GATSBY_API_URL}${species?.image}`}
                alt="Affiche 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">

                <h2 className="text-2xl font-bold mb-1">
                  Subtitle :

                </h2>
                <p className="text-primary ml-3">
                  {species.subtitle_en_en || species.subtitle_en_fr}
                </p>
                <h2 className="text-2xl font-bold mb-1">
                  Summary :

                </h2>

                <p className="text-gray-700 ml-3">
                  {species.summary_en || species.summary_fr}
                </p>
              </div>
            </div>

          </div>

          <hr className="my-6" />

          <div >
            {/* <h1 className="text-2xl font-bold mb-4">Recherche Et Connaissances</h1>
            <div className="flex gap-16 w-full">
              <Input
                label="English Title"
                type="text"
                name="title_en"
                value={formData.title_en}
                onChange={handleChange}
                customClassName=" w-[550px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <Input
                label="Frensh Title"
                type="text"
                name="title_fr"
                value={formData.title_en}
                onChange={handleChange}
                customClassName=" w-[550px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
           </div> */}
            <div className="flex flex-col items-center gap-5">

              <span className='text-[28px] sm:text-[36px] font-bold'>
                <p className='text-center'><span className='text-[#0270A0]'>Recherche</span> et Connaissances {species.title_research_knowledge_en || species.title_research_knowledge_fr}</p>
              </span>

              <div className='font-semibold text-[18px] sm:text-[20px]'>
                <p className='text-center max-w-[800px] w-full'>
                  {species.description_research_knowledge_en || species.description_research_knowledge_fr}
                </p>

              </div>


              <TableSpecies data={species.researchKnowledge} />
              <Link to="research-knowledge">
                <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200">
                  Update
                </button>
              </Link>
            </div>

          </div>

    

    


          <hr className="my-6" />
          <SpeciesGallery speciesId={species.id} />



        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>Species not found.</p>
        </div>
      )}
    </div>
  );
}
