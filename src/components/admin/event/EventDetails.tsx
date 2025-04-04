import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function EventDetails({ params }: { params: any }) {
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [slug, setSlug] = useState<string | null>(null);
    const [partnerId, setPartnerId] = useState("");

    useEffect(() => {
        if (params.slug) {
            setSlug(params.slug);
        }
    }, [params.slug]);

    const getEvent = async () => {
        try {
            const res = await axios.get(`/api/get-event/${slug}`);
            setEvent(res.data);
        } catch (err:any) {
            Swal.fire("Error", err.response?.data?.message || "Failed to fetch event", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!slug) return;


        getEvent();
    }, [slug]);

    const handleAddEvent = (e: React.FormEvent) => {
        e.preventDefault();

        axios
            .post("/api/add-event-partner", {
                event_id: event.id,
                partner_id: partnerId,
            })
            .then((res) => {
                Swal.fire("Success", "Event added successfully!", "success");
                setPartnerId("");
                getEvent();
            })
            .catch((err) => {
                Swal.fire("Error", err.response?.data?.message || "Failed to add event", "error");
            });
    };

    const deletePartner = (e: any, item: any) => {
        e.preventDefault();

        Swal.fire({
            title: "Delete Partner",
            text: `Are you sure to delete ${item.title_en || item.title_fr} ?`,
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Cancel`,
            confirmButtonColor: "#df4759",
            denyButtonColor: "#d9e2ef",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/event/${event.id}/partner/${item.id}`)
                    .then((res) => {
                        Swal.fire("Deleted!", "The event has been removed from this event.", "success");
                        setPartnerId("");
                        getEvent();
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

    return (
        <div className="container mx-auto p-6">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-xl text-gray-500">Loading...</p>
                </div>
            ) : event ? (
                <div className="bg-white shadow-md rounded-lg p-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-4xl font-extrabold mb-2">Event Details</h1>
                        <p className="text-lg text-gray-600">
                            Titre: <span className="font-semibold">{event.title_en || event.title_fr }</span>
                        </p>
                        <img
                                src={`${process.env.GATSBY_API_URL}${event?.image}`}
                                alt="Affiche 1"
                                className="w-full h-48 object-cover"
                            />
                        <p className="text-lg text-gray-600">
                            Description: <span className="font-semibold">{event.description_en || event.description_fr}</span>
                        </p>
                    </div>

                

                    <hr className="my-6" />

                    {/* Events */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-4">Partners</h2>
                        {event.partners.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {event.partners.map((item: any) => (
                                    <div key={item.id} className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm justify-between">
                                        <div className="flex items-center">
                                            <img
                                                src={`${process.env.GATSBY_API_URL}${item?.image}`}
                                                alt={item.title_en || item.title_fr}
                                                className="w-16 h-16 object-cover rounded-md mr-4"
                                            />
                                            <div className="flex flex-col">
                                                <h3 className="text-xl font-medium">
                                                    {item?.title_en || item?.title_fr}
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

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Add Partner</h2>
                        <form onSubmit={handleAddEvent} className="flex flex-col sm:flex-row items-center gap-4">
                            <select
                                value={partnerId}
                                onChange={(e) => setPartnerId(e.target.value)}
                                className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select a partner</option>
                                {event.partnersnotselect.map((partner: any) => (
                                    <option key={partner.id} value={partner.id}>
                                        {partner.name}
                                    </option>
                                ))}
                            </select>
                            <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200">
                                Add Partner
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    <p>Edition not found.</p>
                </div>
            )}
        </div>
    );
}
