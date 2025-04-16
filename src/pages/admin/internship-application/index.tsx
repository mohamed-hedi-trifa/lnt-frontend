import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const ApplicationsList = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await axios.get("/api/internship-applications");
            setApplications(response.data);
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
    };

    const generateApplicationPDF = async (application) => {
        setLoading(true);
        const doc = new jsPDF();

        // Styling
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(40, 53, 147);
        doc.text(`Internship Application #${application.id}`, 105, 20, { align: "center" });

        // Reset styling for content
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);

        let yPosition = 40;

        // Personal Information Section
        doc.setFontSize(14);
        doc.text("Personal Information", 14, yPosition);
        yPosition += 10;

        doc.setFontSize(12);
        const personalInfo = [
            `Name: ${application.first_name} ${application.last_name}`,
            `Email: ${application.email}`,
            `Phone: ${application.phone}`,
        ];

        personalInfo.forEach(info => {
            doc.text(info, 14, yPosition);
            yPosition += 8;
        });

        yPosition += 5;

        // Education Information Section
        doc.setFontSize(14);
        doc.text("Education Information", 14, yPosition);
        yPosition += 10;

        doc.setFontSize(12);
        const educationInfo = [
            `Institution: ${application.educational_institution}`,
            `Education Level: ${application.education_level}`,
            `Study Field: ${application.study_field}`,
        ];

        educationInfo.forEach(info => {
            doc.text(info, 14, yPosition);
            yPosition += 8;
        });

        yPosition += 5;

        // Internship Information Section
        doc.setFontSize(14);
        doc.text("Internship Details", 14, yPosition);
        yPosition += 10;

        doc.setFontSize(12);
        const internshipInfo = [
            `Internship Type: ${application.internship_type}`,
            `Desired Field: ${application.desired_internship_field}`,
            `Start Date: ${application.start_date}`,
            `End Date: ${application.end_date}`,
        ];

        internshipInfo.forEach(info => {
            doc.text(info, 14, yPosition);
            yPosition += 8;
        });

        yPosition += 10;

        // Attachments Section
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

        // Save the PDF
        doc.save(`application_${application.id}_${application.last_name}.pdf`);
        setLoading(false);
    };

    const markAsRead = async (id) => {
        try {
            const response = await fetch(`/api/internship-application/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to mark as read');
            }

            const data = await response.json();
            console.log(data.message);
            // Optionally refresh data or update UI state
        } catch (error) {
            console.error('Error marking application as read:', error);
        }
    };


    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Internship Applications</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border">ID</th>
                            <th className="py-2 px-4 border">First Name</th>
                            <th className="py-2 px-4 border">Last Name</th>
                            <th className="py-2 px-4 border">Email</th>
                            <th className="py-2 px-4 border">Phone</th>
                            <th className="py-2 px-4 border">Institution</th>
                            <th className="py-2 px-4 border">Education Level</th>
                            <th className="py-2 px-4 border">Study Field</th>
                            <th className="py-2 px-4 border">Internship Type</th>
                            <th className="py-2 px-4 border">Desired Field</th>
                            <th className="py-2 px-4 border">Start Date</th>
                            <th className="py-2 px-4 border">End Date</th>
                            <th className="py-2 px-4 border">CV</th>
                            <th className="py-2 px-4 border">Motivation Letter</th>
                            <th className="py-2 px-4 border">Download PDF</th>
                            <th className="py-2 px-4 border">Export</th>
                            <th className="py-2 px-4 border"></th>
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
                                <td className="py-2 px-4 border">{application.educational_institution}</td>
                                <td className="py-2 px-4 border">{application.education_level}</td>
                                <td className="py-2 px-4 border">{application.study_field}</td>
                                <td className="py-2 px-4 border">{application.internship_type}</td>
                                <td className="py-2 px-4 border">{application.desired_internship_field}</td>
                                <td className="py-2 px-4 border">{application.start_date}</td>
                                <td className="py-2 px-4 border">{application.end_date}</td>
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
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                                    >
                                        Download PDF
                                    </button>
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