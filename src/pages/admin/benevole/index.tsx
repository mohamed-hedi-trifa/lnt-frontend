import React, { useEffect, useState } from "react";
import axios from "axios";

const ApplicationsList = () => {
    const [applications, setApplications] = useState([]);

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
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default ApplicationsList;