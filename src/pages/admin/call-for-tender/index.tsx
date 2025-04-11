import React, { useEffect, useState } from "react";
import axios from "axios";

const ApplicationsList = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await axios.get("/api/opportunity/call-tender");
            setApplications(response.data);
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Call For Tender</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border">ID</th>
                            <th className="py-2 px-4 border">Company Name</th>
                            <th className="py-2 px-4 border">Email</th>
                            <th className="py-2 px-4 border">Phone</th>

                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application) => (
                            <tr key={application.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border">{application.id}</td>
                                <td className="py-2 px-4 border">{application.company_name}</td>
              
                                <td className="py-2 px-4 border">{application.email}</td>
                                <td className="py-2 px-4 border">{application.phone}</td>
              
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