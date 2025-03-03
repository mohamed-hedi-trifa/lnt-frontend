import React, { useEffect, useState } from "react";
import axios from "axios";

const KeyMoments = () => {
  const [loading, setLoading] = useState(true);
  const [itemsList, setItemsList] = useState([]);

  function getKeyMoments() {
    axios
      .get("/api/key-moments")
      .then((res) => {
        setItemsList(res.data); // Make sure res.data is an array
      })
      .catch((err) => {
        console.error("Error fetching key moments:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getKeyMoments();
  }, []);

  return (
    <div className="px-2 my-7">
      <h3 className="text-primary font-bold text-4xl leading-10 flex justify-start">
        Moments Clés :
      </h3>
      <br />
      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : (
        <ul className="flex flex-col gap-7 sm:gap-10">
          {itemsList.length > 0 ? (
            itemsList.map((item, index) => (
              <li
                className="!pl-0 flex gap-6 text-lg sm:text-2xl font-medium leading-9"
                key={index}
              >
                <div className="shrink-0 pt-1">
                  <img src={"/icons/certificate.png"} width="20px" height="25px" alt="Certificate" />
                </div>
                <div>{item.year}: {item.event_description_en || item.event_description_fr}</div>
              </li>
            ))
          ) : (
            <p className="text-center">Aucun moment clé trouvé.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default KeyMoments;


