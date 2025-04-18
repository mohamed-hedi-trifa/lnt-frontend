import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import Select from "@/components/atoms/inputs/Select";
import Swal from "sweetalert2";

const ApplicationsList = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await axios.get("/api/opportunity/call-tender");
            setApplications(response.data.applications);
            setOpportunities(response.data.opportunities);
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
        doc.text(`Call for Tender Application #${application.id}`, 105, 20, { align: "center" });

        // Reset styling
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);

        let yPosition = 40;

        // Company Information
        doc.setFontSize(14);
        doc.text("Company Information", 14, yPosition);
        yPosition += 10;

        doc.setFontSize(12);
        const companyInfo = [
            `Company Name: ${application.company_name}`,
            `Email: ${application.email}`,
            `Phone: ${application.phone}`,
        ];

        companyInfo.forEach(info => {
            doc.text(info, 14, yPosition);
            yPosition += 8;
        });
        yPosition += 5;

        // Add other fields if they exist in your data
        // For example:
        if (application.address) {
            doc.text(`Address: ${application.address}`, 14, yPosition);
            yPosition += 8;
        }

        if (application.project_description) {
            doc.setFontSize(14);
            doc.text("Project Description", 14, yPosition);
            yPosition += 10;

            doc.setFontSize(12);
            const splitText = doc.splitTextToSize(application.project_description, 180);
            doc.text(splitText, 14, yPosition);
            yPosition += splitText.length * 7 + 5;
        }

        // Attachments
        doc.setFontSize(14);
        doc.text("Patente", 14, yPosition);
        yPosition += 10;

        doc.setFontSize(12);
        if (application.business_license) {
            const letterUrl = `${process.env.GATSBY_API_URL}${application.business_license}`;
            doc.textWithLink("Download Patente", 14, yPosition, { url: letterUrl });
            yPosition += 8;
        }

        // Attachments
        doc.setFontSize(14);
        doc.text("Offre technique et financier", 14, yPosition);
        yPosition += 10;

        doc.setFontSize(12);
        if (application.technical_and_financial_offer) {
            const letterUrl = `${process.env.GATSBY_API_URL}${application.technical_and_financial_offer}`;
            doc.textWithLink("Download Offre technique et financier", 14, yPosition, { url: letterUrl });
            yPosition += 8;
        }

        // Add other attachments if they exist
        if (application.proposal_path) {
            const proposalUrl = `${process.env.GATSBY_API_URL}${application.proposal_path}`;
            doc.textWithLink("Download Proposal", 14, yPosition, { url: proposalUrl });
            yPosition += 8;
        }


        let documents = [];

        if (application.other_documents) {
            if (typeof application.other_documents === 'string') {
                try {
                    documents = JSON.parse(application.other_documents);
                } catch (e) {
                    console.error("Failed to parse other_documents", e);
                }
            } else if (Array.isArray(application.other_documents)) {
                documents = application.other_documents;
            }
        }

        if (documents.length > 0) {
            doc.setFontSize(14);
            doc.text("Additional Documents:", 14, yPosition);
            yPosition += 8;

            documents.forEach((documentPath, index) => {
                const documentUrl = `${process.env.GATSBY_API_URL}${documentPath}`;
                doc.textWithLink(`Download Document ${index + 1}`, 14, yPosition, {
                    url: documentUrl
                });
                yPosition += 8;
            });
        }
        // Footer
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("Generated on: " + new Date().toLocaleDateString(), 14, 280);

        // Save PDF
        doc.save(`tender_application_${application.id}_${application.company_name}.pdf`);
        setLoading(false);
    };
    const [opportunityId, setOpportunityId] = useState<string>("-1");
    const handleOpportunityChange = async (e) => {
        const selectedId = e.target.value;
        setOpportunityId(selectedId);

        try {
            const response = await axios.get(`/api/opportunity/call-tender/${selectedId}`);
            setApplications(response.data);
            console.table(applications)
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
    };

    const markAsRead = async (id) => {
        try {
            const response = await axios.put(`/api/opportunity/call-tender/mark-read/${id}`).then((res) => {
                Swal.fire("Success", res.data.message, "success");
                fetchApplications();
            });


        } catch (error) {
            console.error('Error marking application as read:', error);
        }
    };
    return (
        <div className="p-6">

            <div className="flex w-full justify-between">
                <h1 className="text-2xl font-semibold mb-4">Call For Tender</h1>

                <Select divClassNames="!flex-row items-center gap-2" label="Opportunity:" name="opportunity" value={opportunityId} onChange={handleOpportunityChange}>
                    <option value="-1">All Opportunities</option>
                    {
                        opportunities.map((opportunity) => (
                            <option value={opportunity.id}>{opportunity.title_en || opportunity.title_fr}</option>
                        ))
                    }
                </Select>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border">ID</th>
                            <th className="py-2 px-4 border">Opportunity</th>
                            <th className="py-2 px-4 border">Company Name</th>
                            <th className="py-2 px-4 border">Email</th>
                            <th className="py-2 px-4 border">Phone</th>
                            <th className="py-2 px-4 border">Patente</th>
                            <th className="py-2 px-4 border">Offre technique et financier</th>
                            <th className="py-2 px-4 border">Export</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application) => (
                            <tr key={application.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border">{application.id}</td>
                                <td className="py-2 px-4 border">{application.opportunity && application.opportunity.title_en}</td>
                                <td className="py-2 px-4 border">{application.company_name}</td>
                                <td className="py-2 px-4 border">{application.email}</td>
                                <td className="py-2 px-4 border">{application.phone}</td>
                                <td className="py-2 px-4 border">
                                    {application.business_license ? (
                                        <a
                                            href={`${process.env.GATSBY_API_URL}${application?.business_license}`}
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
                                    {application.technical_and_financial_offer ? (
                                        <a
                                            href={`${process.env.GATSBY_API_URL}${application?.technical_and_financial_offer}`}
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