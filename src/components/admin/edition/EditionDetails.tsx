import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditionDetails({ params }: { params: any }) {
  const [edition, setEdition] = useState<any>(null); // Use `null` instead of `[]` since it's a single edition
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      setSlug(params.slug);
    }
  }, [params.slug]);

  useEffect(() => {
    if (!slug) return; // Ensure `slug` is set before calling API

    const getEdition = async () => {
      try {
        const res = await axios.get(`/api/edition/${slug}`);
        setEdition(res.data);
      } catch (err) {
        Swal.fire("Error", err.response?.data?.message || "Failed to fetch edition", "error");
      } finally {
        setLoading(false);
      }
    };

    getEdition();
  }, [slug]); // This effect runs only when `slug` is updated

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : edition ? (
        <div>
          <h2>Year : {edition.year}</h2>
          <p>Name : {edition.name_fr || edition.name_en}</p>
          <h1>Affiche 1 : </h1>
          <img src={`${process.env.GATSBY_API_URL}${edition?.image_affiche1}`} width={150} />
          <h2>titre {edition.titre_affiche1_fr || edition.titre_affiche1_en}</h2>
          <h3>decription : {edition.desciption_affich1_en || edition.desciption_affich1_fr}</h3>

          <h1>Affiche 2 : </h1>
          <img src={`${process.env.GATSBY_API_URL}${edition?.image_affiche2}`} width={150} />
          <h2>titre {edition.titre_affiche2_fr || edition.titre_affiche2_en}</h2>
          <h3>decription : {edition.desciption_affich2_en || edition.desciption_affich2_fr}</h3>


          <div className="flex">
            {edition.events && edition.events.map((item: any) => (
              <div key={item.id} className="p-2 border rounded">
                {item.name}
              </div>
            ))}
          </div>

        </div>


      ) : (
        <p>Edition not found.</p>
      )}
    </div>
  );
}
