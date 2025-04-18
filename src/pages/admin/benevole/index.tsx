import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";

const ApplicationsList = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await axios.get("/api/volunteer-application");
            setApplications(response.data);
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
    };

    const generateApplicationPDF = (application) => {
        setLoading(true);
        const doc = new jsPDF();
        
        // Title
        doc.setFontSize(18);
        doc.setTextColor(40, 53, 147);
        doc.text(`Volunteer Application #${application.id}`, 105, 20, { align: "center" });
        
        // Reset styling
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        
        let yPosition = 40;
        
        // Personal Information
        doc.setFontSize(14);
        doc.text("Personal Information", 14, yPosition);
        yPosition += 10;
        
        doc.setFontSize(12);
        const personalInfo = [
            `Name: ${application.first_name} ${application.last_name}`,
            `Email: ${application.email}`,
            `Phone: ${application.phone}`,
            `Address: ${application.address}`
        ];
        
        personalInfo.forEach(info => {
            doc.text(info, 14, yPosition);
            yPosition += 8;
        });
        yPosition += 5;
        
        // Professional Information
        doc.setFontSize(14);
        doc.text("Professional Information", 14, yPosition);
        yPosition += 10;
        
        doc.setFontSize(12);
        const professionalInfo = [
            `Situation: ${application.professional_situation}`,
            `Sector: ${application.professional_sector}`
        ];
        
        professionalInfo.forEach(info => {
            doc.text(info, 14, yPosition);
            yPosition += 8;
        });
        yPosition += 5;
        
        // Interests & Motivation
        doc.setFontSize(14);
        doc.text("Interests & Motivation", 14, yPosition);
        yPosition += 10;
        
        doc.setFontSize(12);
        const splitText = doc.splitTextToSize(application.interests_motivation, 180);
        doc.text(splitText, 14, yPosition);
        yPosition += splitText.length * 7 + 5;
        
        // Competences & Experiences
        doc.setFontSize(14);
        doc.text("Competences & Experiences", 14, yPosition);
        yPosition += 10;
        
        doc.setFontSize(12);
        const splitCompetences = doc.splitTextToSize(application.competences_experiences, 180);
        doc.text(splitCompetences, 14, yPosition);
        yPosition += splitCompetences.length * 7 + 5;
        
        // Availability
        doc.setFontSize(14);
        doc.text("Availability", 14, yPosition);
        yPosition += 10;
        
        doc.setFontSize(12);
        doc.text(application.availability, 14, yPosition);
        yPosition += 10;
        
        // Attachments
        doc.setFontSize(14);
        doc.text("Attachments", 14, yPosition);
        yPosition += 10;
        
        doc.setFontSize(12);
        if (application.cv_path) {
            const cvUrl = `${process.env.GATSBY_API_URL}${application.cv_path}`;
            doc.textWithLink("Download CV", 14, yPosition, { url: cvUrl });
            yPosition += 8;
        }
        
        if (application.motivation_letter_path) {
            const letterUrl = `${process.env.GATSBY_API_URL}${application.motivation_letter_path}`;
            doc.textWithLink("Download Motivation Letter", 14, yPosition, { url: letterUrl });
            yPosition += 8;
        }
        
        // Footer
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("Generated on: " + new Date().toLocaleDateString(), 14, 280);
        
        // Save PDF
        doc.save(`volunteer_application_${application.id}_${application.last_name}.pdf`);
        setLoading(false);
    };
    const markAsRead = async (id) => {
        try {
            const response = await axios.put(`/api/benevole/mark-read/${id}`).then((res) => {
                Swal.fire("Success", res.data.message, "success");
                fetchApplications();
            });


        } catch (error) {
            console.error('Error marking application as read:', error);
        }
    };
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Benevole</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border">ID</th>
                            <th className="py-2 px-4 border">First Name</th>
                            <th className="py-2 px-4 border">Last Name</th>
                            <th className="py-2 px-4 border">Email</th>
                            <th className="py-2 px-4 border">Phone</th>
                            <th className="py-2 px-4 border">Address</th>
                            <th className="py-2 px-4 border">Professional Situation</th>
                            <th className="py-2 px-4 border">Professional Sector</th>
                            <th className="py-2 px-4 border">Interests & Motivation</th>
                            <th className="py-2 px-4 border">Competences & Experiences</th>
                            <th className="py-2 px-4 border">Availability</th>
                            <th className="py-2 px-4 border">CV</th>
                            <th className="py-2 px-4 border">Motivation Letter</th>
                            <th className="py-2 px-4 border">Export</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application) => (
                            <tr key={application.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border">{application.id}</td>
                                <td className="py-2 px-4 border">{application.first_name}</td>
                                <td className="py-2 px-4 border">{application.last_name}</td>
                                <td className="py-2 px-4 border">{application.email}</td>
                                <td className="py-2 px-4 border">{application.phone}</td>
                                <td className="py-2 px-4 border">{application.address}</td>
                                <td className="py-2 px-4 border">{application.professional_situation}</td>
                                <td className="py-2 px-4 border">{application.professional_sector}</td>
                                <td className="py-2 px-4 border">{application.interests_motivation}</td>
                                <td className="py-2 px-4 border">{application.competences_experiences}</td>
                                <td className="py-2 px-4 border">{application.availability}</td>
                                <td className="py-2 px-4 border">
                                    <a
                                        href={`${process.env.GATSBY_API_URL}${application?.cv_path}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        Download CV
                                    </a>
                                </td>
                                <td className="py-2 px-4 border">
                                    {application.motivation_letter_path ? (
                                        <a
                                            href={`${process.env.GATSBY_API_URL}${application?.motivation_letter_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            Download Letter
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td className="py-2 px-4 border">
                                    <button
                                        onClick={() => generateApplicationPDF(application)}
                                        disabled={loading}
                                        className={`bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                        {loading ? "Generating..." : "Export PDF"}
                                    </button>
                                </td>
                                <td className="py-2 px-4 border">
                                    <button
                                        onClick={() => markAsRead(application.id)}
                                        disabled={application.is_read === "yes"}
                                        className={`${application.is_read === "yes"
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-green-500 hover:bg-green-700"
                                            } text-white font-bold py-1 px-3 rounded text-sm`}
                                    >
                                        {application.is_read === "yes" ? "Already Read" : "Mark As Read"}
                                    </button>


                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationsList;