import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { TrashIcon } from "@heroicons/react/24/outline";
import TrainingGallery from "./TrainingGallery";


export default function ManageTraining({ params }: { params: any }) {
    const [training, setTraining] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [slug, setSlug] = useState<string | null>(null);

    const [themeId, setThemeId] = useState("");

    useEffect(() => {
        if (params.slug) {
            setSlug(params.slug);
        }
    }, [params.slug]);

    const getAchievement = async () => {
        try {
            const res = await axios.get(`/api/training/${slug}`);
            setTraining(res.data);
        } catch (err) {
            Swal.fire("Error", err.response?.data?.message || "Failed to fetch training", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!slug) return;


        getAchievement();
    }, [slug]);

    const handleAddTheme = (e: React.FormEvent) => {
        e.preventDefault();


        if (training.themes.length >= 4) {
            Swal.fire("Error", "An training can have a maximum of 4 themes.", "error");
            return;
        }

        axios
            .post("/api/add-training-theme", {
                training_id: training.id,
                theme_id: themeId,
            })
            .then((res) => {
                Swal.fire("Success", "Theme added successfully!", "success");
                setThemeId("");
                getAchievement();
            })
            .catch((err) => {
                Swal.fire("Error", err.response?.data?.message || "Failed to add theme", "error");
            });
    };

    const deleteTheme = (e: any, item: any) => {
        e.preventDefault();

        Swal.fire({
            title: "Delete Theme",
            text: `Are you sure to delete ${item.title_en || item.title_fr} ?`,
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Cancel`,
            confirmButtonColor: "#df4759",
            denyButtonColor: "#d9e2ef",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/training/${training.id}/theme/${item.id}`)
                    .then((res) => {
                        Swal.fire("Deleted!", "The training has been removed from this training.", "success");
                        setThemeId("");
                        getAchievement();
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
            ) : training ? (
                <div className="bg-white shadow-md rounded-lg p-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-4xl font-extrabold mb-2">Manage Training</h1>
                        <p className="text-lg text-gray-600">
                            Titre: <span className="font-semibold">{training.title_en || training.title_fr}</span>
                        </p>
                        <img
                            src={`${process.env.GATSBY_API_URL}${training?.image}`}
                            alt="Affiche 1"
                            className="w-full h-48 object-cover"
                        />
                        <p className="text-lg text-gray-600">
                            Description: <span className="font-semibold">{training.description_en || training.description_fr}</span>
                        </p>
                    </div>



                    <hr className="my-6" />

        
                    {
                        training.type === 'formation' && (
                            <div>
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold mb-4">Themes</h2>
                                    {training.themes?.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {training.themes.map((item) => (
                                                <div key={item.id} className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm justify-between">
                                                    <div className="flex items-center">
                                                        <div className="flex flex-col">
                                                            <h3 className="text-xl font-medium">
                                                                {item?.name_en || item?.name_fr}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 sm:col-span-6 flex justify-end sm:justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => deleteTheme(e, item)}
                                                        >
                                                            <TrashIcon className="block h-8 w-8 text-red-600" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No theme yet</p>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4">Add Theme</h2>
                                    <form onSubmit={handleAddTheme} className="flex flex-col sm:flex-row items-center gap-4">
                                        <select
                                            value={themeId}
                                            onChange={(e) => setThemeId(e.target.value)}
                                            className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Select a theme</option>
                                            {training.themesNotSelected?.map((theme) => (
                                                <option key={theme.id} value={theme.id}>
                                                    {theme.name_en || theme.name_fr}
                                                </option>
                                            ))}
                                        </select>
                                        <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200">
                                            Add Theme
                                        </button>
                                    </form>
                                </div>
                                <hr className="my-6" />
                            </div>
                                 
                        )
                    }


     
                    <TrainingGallery trainingId={training.id} />
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    <p>Edition not found.</p>
                </div>
            )}
        </div>
    );
}
