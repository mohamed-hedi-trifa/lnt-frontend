import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import { Link, navigate } from "gatsby";
import ItemsList from "../ItemsList";
import Input from "../../atoms/inputs/Input";
import Textarea from "../../atoms/inputs/Textarea";
import Button from "../../atoms/Button";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import Title from "../../atoms/titles/Title";
import Select from "../../atoms/inputs/Select";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import useLocalStorage from "@/lib/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

interface FormData {
    title_en: string;
    title_fr: string;
    description_en: string;
    description_fr: string;
    event_datetime: Date;
    location_en: string;
    location_fr: string;
    latitude: string;
    longitude: string;
    event_type_id: string;
}




const CreateEvent: React.FC = () => {
    const [language, setLanguage] = useState<string>("en");
    const [formData, setFormData] = useLocalStorage("event-info", {

        title_en: "",
        title_fr: "",
        description_en: "",
        description_fr: "",
        event_datetime: "",
        location_en: "",
        location_fr: "",
        latitude: "34.823808",
        longitude: "11.250386",
        event_type_id: ""
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const [englishItems, setEnglishItems] = useState<any[]>([]);
    const [frenchItems, setFrenchItems] = useState<any[]>([]);
    const [image, setImage] = useState<File | null>(null);

    const handleLanguageChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        if (
            (lang === "en" && (formData.title_fr || frenchItems.length > 0)) ||
            (lang === "fr" && (formData.title_en || englishItems.length > 0))
        ) {
            const result = await Swal.fire({
                title: "You have unsaved changes",
                text: `Do you want to save changes before switching language?`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                cancelButtonText: `Cancel`,
                denyButtonText: "Continute without saving",
            });

            if (result.isConfirmed) {
                const created = await createEvent();

                if (created) navigate(`/admin/events/${created.slug}?lang=${lang}`);
            } else if (result.isDenied) {
                setLanguage(lang);
            }
        } else {
            setLanguage(e.target.value);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]); // Store the file object
        }
    };

    const handleItemContentChange = (itemIndex: number, event: any) => {
        const updatedItems = language === "en" ? [...englishItems] : [...frenchItems];

        if (updatedItems[itemIndex].type === "image" || updatedItems[itemIndex].type === "pdf") {
            const file = event?.target?.files?.[0]; // Get the selected file

            if (file) {
                const reader = new FileReader();

                // Update file name immediately
                updatedItems[itemIndex].file = file;

                // Use FileReader to preview the image
                reader.onload = (e) => {
                    updatedItems[itemIndex].file_path = e.target?.result; // Set the preview URL (base64 string)
                    language === "en" ? setEnglishItems([...updatedItems]) : setFrenchItems([...updatedItems]);
                };

                reader.readAsDataURL(file); // Read the file and trigger onload
            }
        } else {
            updatedItems[itemIndex].content = event.target.value;
            language === "en" ? setEnglishItems([...updatedItems]) : setFrenchItems([...updatedItems]);
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (language === "en") {
            if (!formData.title_en) {
                newErrors.title_en = "Title is required.";
            }
            if (!formData.description_en) {
                newErrors.summary_en = "Summary is required.";
            }
            if (!formData.event_datetime) {
                newErrors.event_datetime = "Event date and time are required.";
            }
            if (!formData.location_en) {
                newErrors.location_en = "Location is required.";
            }
            if (!formData.latitude) {
                newErrors.latitude = "Latitude is required.";
            }
            if (!formData.longitude) {
                newErrors.longitude = "Longitude is required.";
            }
            if (englishItems.length === 0) {
                newErrors.items = "At least one content item is required.";
            }

        } else {
            if (!formData.title_fr) {
                newErrors.title_fr = "Title is required.";
            }
            if (!formData.description_fr) {
                newErrors.summary_fr = "Summary is required.";
            }
            if (!formData.event_datetime) {
                newErrors.event_datetime = "Event date and time are required.";
            }
            if (!formData.location_fr) {
                newErrors.location_fr = "Location is required.";
            }
            if (!formData.latitude) {
                newErrors.latitude = "Latitude is required.";
            }
            if (!formData.longitude) {
                newErrors.longitude = "Longitude is required.";
            }
            if (frenchItems.length === 0) {
                newErrors.items = "At least one content item is required.";
            }
        }

        if (!formData.event_type_id) {
            newErrors.event_type_id = "Event type is required.";
            console.log('sdfqsdfqsdfqdfsqd')
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function createEvent(): Promise<{ slug: string } | null> {
        if (!validateForm()) {
            return null;
        }

        const formDataToSend = new FormData();

        // Append all form fields to FormData
        for (const key in formData) {
            formDataToSend.append(key, formData[key as keyof FormData]);
        }

        if (image) {
            formDataToSend.append("image", image); // Append the main image file
        }

        const selectedItems = language === "en" ? englishItems : frenchItems;

        selectedItems.forEach((item, index) => {
            formDataToSend.append(`items[${index}][type]`, item.type);
            formDataToSend.append(`items[${index}][language]`, item.language);
            formDataToSend.append(`items[${index}][order]`, item.order);

            if (item.type === "list") {
                item.content.forEach((listItem: any, listIndex: number) => {
                    formDataToSend.append(`items[${index}][content][${listIndex}][text]`, listItem.text);
                    if (listItem.imageFile) {
                        formDataToSend.append(`items[${index}][content][${listIndex}][imageFile]`, listItem.imageFile);
                    }
                });
            } else {
                formDataToSend.append(`items[${index}][content]`, item.content);
            }

            // Append the file if it's an image or PDF
            if (item.file) {
                formDataToSend.append(`items[${index}][file]`, item.file); // Dynamic field name for file
            }
        });

        setIsLoading(true);
        try {
            const response = await axios.post("/api/events", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setFormData({
                title_en: "",
                title_fr: "",
                description_en: "",
                description_fr: "",
                event_datetime: "",
                location_en: "",
                location_fr: "",
                latitude: 34.823808,
                longitude: 11.250386,
                event_type: ""


            });

            setErrors({}); // Clear any previous errors
            toast.success("Event created successfully");
            return response.data;
        } catch (error) {
            let msg = "An error occurred while creating the event. Please try again.";
            if (error instanceof AxiosError) {
                msg = error?.response?.data?.message;
            }
            setErrors((prevErrors) => ({
                ...prevErrors,
                apiError: msg,
            })); // Set API error message
        } finally {
            setIsLoading(false);
        }

        return null;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const created = await createEvent();

        if (created) navigate("/admin/events");
    };


    const addNewItem = (type: string) => {
        const newItem = {
            id: uuidv4(), // 👈 Must generate a unique id
            order: language === "en" ? englishItems.length : frenchItems.length,
            content: type === "list" ? [{ text: "", image: "" }] : "",
            type,
            language: language,
        };

        const updatedItems = language === "en" ? [...englishItems] : [...frenchItems];
        updatedItems.push(newItem);
        language === "en" ? setEnglishItems(updatedItems) : setFrenchItems(updatedItems);
    };

    const [eventTypes, setEventTypes] = useState([]);

    const getEventType = async () => {
        try {
            const response = await axios.get("/api/event-type/");
            setEventTypes(response.data);
        } catch (error) {
            console.error("Error fetching event types:", error);
        }
    };

    useEffect(() => {
        getEventType();
    }, []);

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Link className="" to="/admin/events">
                        <ArrowLeftIcon className="h-5 w-5" />
                    </Link>
                    <Title>Create New Event</Title>
                </div>
                <Select divClassNames="!flex-row items-center gap-2" label="Language:" name="language" value={language} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </Select>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col grow">
                {language === "en" && (
                    <>
                        <Input label="Title" type="text" name="title_en" value={formData.title_en} onChange={handleChange} />
                        {errors.title_en && <div className="text-red-500 text-sm">{errors.title_en}</div>}

                        <Input label="Description" type="text" name="description_en" value={formData.description_en} onChange={handleChange} />
                        {errors.description_en && <div className="text-red-500 text-sm">{errors.description_en}</div>}

                        <Input label="Event Date & Time" type="datetime-local" name="event_datetime" value={formData.event_datetime} onChange={handleChange} />
                        {errors.event_datetime && <div className="text-red-500 text-sm">{errors.event_datetime}</div>}

                        <Input label="Location" type="text" name="location_en" value={formData.location_en} onChange={handleChange} />
                        {errors.location_en && <div className="text-red-500 text-sm">{errors.location_en}</div>}
                        <Select

                            label="Event type:"
                            name="event_type_id"
                            value={formData.event_type_id}
                            onChange={(e) => setFormData({ ...formData, event_type_id: e.target.value })}
                        >
                            <option value="">Select Event Type</option>
                            {eventTypes.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name_en}
                                </option>
                            ))}
                           
                        </Select>
                        {errors.event_type_id && <div className="text-red-500 text-sm">{errors.event_type_id}</div>}
                    </>
                )}

                {language === "fr" && (
                    <>
                        <Input label="Titre" type="text" name="title_fr" value={formData.title_fr} onChange={handleChange} />
                        {errors.title_fr && <div className="text-red-500 text-sm">{errors.title_fr}</div>}

                        <Input label="Description" type="text" name="description_fr" value={formData.description_fr} onChange={handleChange} />
                        {errors.description_fr && <div className="text-red-500 text-sm">{errors.description_fr}</div>}
                        
                        <Input label="Date et Heure de l'Événement" type="datetime-local" name="event_datetime" value={formData.event_datetime} onChange={handleChange} />
                        {errors.event_datetime && <div className="text-red-500 text-sm">{errors.event_datetime}</div>}

                        <Input label="Lieu" type="text" name="location_fr" value={formData.location_fr} onChange={handleChange} />
                        {errors.location_fr && <div className="text-red-500 text-sm">{errors.location_fr}</div>}

                        <Select
                            label="Event type:"
                            name="event_type_id"
                            value={formData.event_type_id}
                            onChange={(e) => setFormData({ ...formData, event_type_id: e.target.value })}
                        >
                                     <option value="">Select Event Type</option>
                            {eventTypes.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name_fr}
                                </option>
                            ))}
                            
                        </Select>
                        {errors.event_type_id && <div className="text-red-500 text-sm">{errors.event_type_id}</div>}
                    </>
                )}

                <Input label="Latitude" type="text" name="latitude" value={formData.latitude || "34.823808"} onChange={handleChange} />
                {errors.latitude && <div className="text-red-500 text-sm">{errors.latitude}</div>}

                <Input label="Longitude" type="text" name="longitude" value={formData.longitude || "11.250386"} onChange={handleChange} />
                {errors.longitude && <div className="text-red-500 text-sm">{errors.longitude}</div>}





                <div className="text-slate-500 text-sm font-medium mb-2">Content</div>

                {(language === "en" && englishItems.length) || (language === "fr" && frenchItems.length) ? (
                    <ItemsList
                        handleItemContentChange={handleItemContentChange}
                        items={language === "en" ? englishItems : frenchItems}
                        setItems={language === "en" ? setEnglishItems : setFrenchItems}
                        language={language}
                        key={language}
                    />
                ) : (
                    <div className="shadow p-4">There is no content currently, add new content by clicking one of the buttons below</div>
                )}

                {errors.items && <div className="text-red-500 text-sm">{errors.items}</div>}
                {errors.apiError && <div className="text-red-500 text-sm">{errors.apiError}</div>}

                <div className="mt-4 px-8 flex justify-between">
                    <section className="flex gap-2">
                        <div className="mb-1">
                            <Button type="button" customClassnames="!py-1 !px-3 !text-xs !flex justify-center items-center" onClick={() => addNewItem("title")}>
                                <PlusIcon className="h-4 w-4" />
                                Title
                            </Button>
                        </div>
                        <div className="mb-1">
                            <Button type="button" customClassnames="!py-1 !px-3 !text-xs !flex justify-center items-center" onClick={() => addNewItem("text")}>
                                <PlusIcon className="h-4 w-4" />
                                Text
                            </Button>
                        </div>
                        <div className="mb-1">
                            <Button type="button" customClassnames="!py-1 !px-3 !text-xs !flex justify-center items-center" onClick={() => addNewItem("list")}>
                                <PlusIcon className="h-4 w-4" />
                                List
                            </Button>
                        </div>
                        <div className="mb-1">
                            <Button type="button" customClassnames="!py-1 !px-3 !text-xs !flex justify-center items-center" onClick={() => addNewItem("image")}>
                                <PlusIcon className="h-4 w-4" />
                                Image
                            </Button>
                        </div>
                        <div className="mb-1">
                            <Button type="button" customClassnames="!py-1 !px-3 !text-xs !flex justify-center items-center" onClick={() => addNewItem("pdf")}>
                                <PlusIcon className="h-4 w-4" />
                                PDF
                            </Button>
                        </div>
                    </section>
                </div>

                <Input label="Image" type="file" name="image" onChange={handleImageChange} />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <div className="w-fit mx-auto">
                            <ReactLoading type="spinningBubbles" color="white" height={25} width={25} />
                        </div>
                    ) : (
                        "Create Event"
                    )}
                </Button>
            </form>
        </div>
    );
};

export default CreateEvent;
