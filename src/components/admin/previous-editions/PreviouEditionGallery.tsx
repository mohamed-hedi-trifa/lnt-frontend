import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const PreviouEditionGallery = ({ previousEventId }: { previousEventId: any }) => {
    const [media, setMedia] = useState([]);
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaType, setMediaType] = useState("image");


    useEffect(() => {
        fetchMedia();
    }, [previousEventId]);


    const fetchMedia = async () => {
        try {
            const response = await axios.get(`/api/previous-edition/${previousEventId}/media`);
        

            if (Array.isArray(response.data)) {
                setMedia(response.data);
            } else if (Array.isArray(response.data.data)) {
                setMedia(response.data.data);
            } else {
                setMedia([]); // Ensure it's an array
            }
        } catch (error) {
            console.error("Error fetching media", error);
        }
    };



    const addMedia = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append("previous_edition_id", previousEventId);
        formDataToSend.append("media_type", mediaType);

    

        if (mediaType === "image" && mediaFile) {
            formDataToSend.append("media_url", mediaFile);
        } else if (mediaType === "video" && mediaFile) {
            formDataToSend.append("video_id", mediaFile);
        }
        console.log(mediaType);
        try {
            const response = await axios.post("/api/add-previous-edition-media", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setMedia((prevMedia) => [...(Array.isArray(prevMedia) ? prevMedia : []), response.data.data]);
            setMediaFile(null);
               Swal.fire("Success", "Media added successfully", "success");
        } catch (error) {
            console.error("Error adding media", error);
        }
    };


    const deleteMedia = async (id) => {
  

        Swal.fire({
            title: "Delete Media",
            text: `Are you sure you want to delete this media?`,
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: "Cancel",
            confirmButtonColor: "#df4759",
            denyButtonColor: "#d9e2ef",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/remove-previous-edition-media/${id}`)
                    .then((res) => {
                        Swal.fire("Success", res.data.message, "success");
                        setMedia(media.filter((item) => item.id !== id));
                    })
                    .catch((err) => {
                        if (err.response?.status === 404) {
                            Swal.fire("Error", "Media not found", "error");
                        } else {
                            Swal.fire("Error", "An error occurred while deleting the media", "error");
                        }
                    });
            }
        });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Previous Edition Gallery</h2>

            {/* Add Media Form */}
            <div className="mb-6 border p-4 rounded-lg">
                {/* Select Media Type */}
                <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                </select>

                {/* Dynamic Input: File for Image, Text for Video */}
                {mediaType === "image" ? (
                    <input
                        type="file"
                        onChange={(e) => setMediaFile(e.target.files[0])}
                        className="w-full p-2 border rounded mb-2"
                    />
                ) : (
                    <input
                        type="text"
                        placeholder="Enter Video ID"
                        onChange={(e) => setMediaFile(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    />
                )}

                {/* Add Media Button */}
                <button
                    onClick={addMedia}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Add Media
                </button>
            </div>


            {/* Media List */}
            <div>

                {media.length === 0 ? (
                    <p className="text-center text-gray-500">No media available</p>
                ) : (
                    <div>
                        {media.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 border-b">
                                {item.media_type === "image" ? (
                                    <img src={`${process.env.GATSBY_API_URL}${item?.media_url}`} alt="Media" className="w-20 h-20 object-cover" />
                                ) : (
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${item?.video_id}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                )}
                                <button onClick={() => deleteMedia(item.id)} className="text-red-500">Delete</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PreviouEditionGallery;
