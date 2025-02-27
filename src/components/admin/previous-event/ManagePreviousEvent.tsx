import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "gatsby";
import PreviouEditionGallery from "./PreviousEventGallery";
import PreviousEventGallery from "./PreviousEventGallery";


export default function ManagePreviousEvent({ params }: { params: any }) {
    const [previousEvent, setpreviousEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [slug, setSlug] = useState<string | null>(null);

    useEffect(() => {
        if (params.slug) {
            setSlug(params.slug);
        }
    }, [params.slug]);

    const getPreviousEvent = async () => {
        try {
            const res = await axios.get(`/api/previous-event/${slug}`);
            setpreviousEvent(res.data);
        } catch (err) {
            Swal.fire("Error", err.response?.data?.message || "Failed to fetch edition", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!slug) return;


        getPreviousEvent();
    }, [slug]);










    return (
        <div className="container mx-auto p-6">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-xl text-gray-500 animate-pulse">Loading...</p>
                </div>
            ) : previousEvent ? (
                <div className="bg-white shadow-lg rounded-xl overflow-hidden p-8 transition-all duration-300 hover:shadow-xl">
                    <div className="mb-8">
                        <Link to="/admin/previous-event" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                            <ArrowLeftIcon className="h-6 w-6 inline-block" />
                            <span className="ml-2 text-lg font-medium">Back to Previous Events</span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Manage Previous Event</h1>
                        <p className="text-lg text-gray-700 mb-2">
                            <span className="font-semibold">Name:</span> {previousEvent.name_fr || previousEvent.name_en}
                        </p>
                        <p className="text-lg text-gray-700">
                            <span className="font-semibold">Description:</span> {previousEvent.description_en || previousEvent.description_fr}
                        </p>
                    </div>

                    <hr className="my-8 border-t border-gray-200" />

                    <PreviousEventGallery previousEventId={previousEvent.id} />

                </div>
            ) : (
                <div className="text-center text-gray-500 py-20">
                    <p className="text-xl">No Previous Events Found.</p>
                </div>
            )}
        </div>
    );
}
