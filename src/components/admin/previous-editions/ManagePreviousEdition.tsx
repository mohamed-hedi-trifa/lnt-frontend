import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "gatsby";
import Title from "../../atoms/titles/Title";
import EditionGallery from "../edition/EditionGallery";
import PreviouEditionGallery from "./PreviouEditionGallery";


export default function ManagePreviousEdition({ params }: { params: any }) {
  const [previousEdition, setpreviousEdition] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string | null>(null);
  const [partnerId, setPartnerId] = useState("");
  const [eventId, setEventId] = useState("");

  useEffect(() => {
    if (params.slug) {
      setSlug(params.slug);
    }
  }, [params.slug]);

  const getPreviousEdition = async () => {
    try {
      const res = await axios.get(`/api/previous-editions/${slug}`);
      setpreviousEdition(res.data);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to fetch edition", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!slug) return;


    getPreviousEdition();
  }, [slug]);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post("/api/add-event-prev-edition", {
        previous_edition_id: previousEdition.id,
        previous_event_id: eventId,
      })
      .then((res) => {
        Swal.fire("Success", "Event added successfully!", "success");
        setEventId("");
        getPreviousEdition();
      })
      .catch((err) => {
        Swal.fire("Error", err.response?.data?.message || "Failed to add event", "error");
      });
  };



  const deleteEvent = (e: any, item: any) => {
    e.preventDefault();

    Swal.fire({
      title: "Delete Event",
      text: `Are you sure to delete ${item.title_en || item.title_fr} ?`,
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
      confirmButtonColor: "#df4759",
      denyButtonColor: "#d9e2ef",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/previous-edition/${previousEdition.id}/event/${item.id}`)
          .then((res) => {
            Swal.fire("Deleted!", "The event has been removed from this edition.", "success");
            setEventId("");
            getPreviousEdition();
          })
          .catch((err) => {
            if (err.response.data.status === 404) {
              Swal.fire("Erreur", err.response.data.message, "error");
            } else if (err.response.status === 401) {
              Swal.fire("Error", err.response.data.message, "error");
            }
          });
      } else if (result.isDenied) {
      }
    });
  };


  const handleAddPartner = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post("/api/add-partner-previous-edition", {
        previous_edition_id: previousEdition.id,
        partner_id: partnerId,
      })
      .then((res) => {
        Swal.fire("Success", "Partner added successfully!", "success");
        setEventId("");
        getPreviousEdition();
      })
      .catch((err) => {
        Swal.fire("Error", err.response?.data?.message || "Failed to add event", "error");
      });
  };


  const deletePartner = (e: any, item: any) => {
    e.preventDefault();

    Swal.fire({
      title: "Delete Partner",
      text: `Are you sure to delete ${item.name} ?`,
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
      confirmButtonColor: "#df4759",
      denyButtonColor: "#d9e2ef",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/previous-edition/${previousEdition.id}/partner/${item.id}`)
          .then((res) => {
            Swal.fire("Deleted!", "The partner has been removed from this edition.", "success");
            setPartnerId("");
            getPreviousEdition();
          })
          .catch((err) => {
            if (err.response.data.status === 404) {
              Swal.fire("Erreur", err.response.data.message, "error");
            } else if (err.response.status === 401) {
              Swal.fire("Error", err.response.data.message, "error");
            }
          });
      } else if (result.isDenied) {
      }
    });
  };
  const getImageSrc = (image) => {
    if (!image) return '';
    return image.startsWith('http') ? image : `${process.env.GATSBY_API_URL}${image}`;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-1">
        <Link to="/admin/previous-editions">
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <Title>Edit Edition</Title>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-500">Loading...</p>
        </div>
      ) : previousEdition ? (
        <div className="bg-white shadow-md rounded-lg p-6">

          <div className="mb-6">
            <h1 className="text-4xl font-extrabold mb-2">Manage Edition</h1>
            <p className="text-lg text-gray-600">
              Year: <span className="font-semibold">{previousEdition.year}</span>
            </p>
            <p className="text-lg text-gray-600">
              Name: <span className="font-semibold">{previousEdition.name_fr || previousEdition.name_en}</span>
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <img
                src={getImageSrc(previousEdition?.image)}
                alt="Affiche 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">

                <h2 className="text-2xl font-bold mb-1">
                  Description :

                </h2>
                <p className="text-gray-700 ml-3">
                  {previousEdition.description_en || previousEdition.description_fr}
                </p>
                <h2 className="text-2xl font-bold mb-1">
                  Card Description :

                </h2>

                <p className="text-gray-700 ml-3">
                  {previousEdition.card_description_en || previousEdition.card_description_fr}
                </p>
              </div>
            </div>

          </div>

          <hr className="my-6" />

          {/* Events */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Events</h2>
            {previousEdition.previousEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {previousEdition.previousEvents.map((item: any) => (
                  <div key={item.id} className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm justify-between">
                    <div className="flex items-center">

                      <div className="flex flex-col">
                        <h3 className="text-xl font-medium">
                          {item?.name_en || item?.name_fr}
                        </h3>

                        <h3 className="text-sm font-medium">
                          {item?.description_en || item?.description_fr}
                        </h3>
                      </div>

                    </div>

                    <div className="col-span-12 sm:col-span-6 flex justify-end sm:justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          deleteEvent(e, item);
                        }}
                      >
                        <TrashIcon className="block h-8 w-8 text-red-600" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No events yet</p>
            )}
          </div>

          {/* Formulaire d'ajout d'event */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Add Event</h2>
            <form onSubmit={handleAddEvent} className="flex flex-col sm:flex-row items-center gap-4">
              <select
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select an event</option>
                {previousEdition.previousEventsnotselect.map((event: any) => (
                  <option key={event.id} value={event.id}>
                    {event.name_en || event.name_fr}
                  </option>
                ))}
              </select>
              <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200">
                Add Event
              </button>
            </form>
          </div>

          <hr className="my-6" />
          {/* start partners */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Partners</h2>
            {previousEdition.partners.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {previousEdition.partners.map((item: any) => (
                  <div key={item.id} className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm justify-between">
                    <div className="flex items-center">
                      <img
                        src={`${process.env.GATSBY_API_URL}${item?.image}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div className="flex flex-col">
                        <h3 className="text-xl font-medium">
                          {item?.name}
                        </h3>

                      </div>

                    </div>

                    <div className="col-span-12 sm:col-span-6 flex justify-end sm:justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          deletePartner(e, item);
                        }}
                      >
                        <TrashIcon className="block h-8 w-8 text-red-600" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No partner yet</p>
            )}
          </div>

          {/* Formulaire d'ajout d'event */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Add Partner</h2>
            <form onSubmit={handleAddPartner} className="flex flex-col sm:flex-row items-center gap-4">
              <select
                value={partnerId}
                onChange={(e) => setPartnerId(e.target.value)}
                className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a partner</option>
                {previousEdition.partnersnotselect.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200">
                Add Partner
              </button>
            </form>
          </div>

          <hr className="my-6" />
          <PreviouEditionGallery previousEventId={previousEdition.id} />



        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>Edition not found.</p>
        </div>
      )}
    </div>
  );
}
