import React, { useEffect, useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { Link } from 'gatsby';
import { useAuthContext } from '../../../contexts/AuthProvider';
import { HomeIcon, UsersIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function SidebarAdmin() {
    const { user } = useAuthContext();
    const [openSection, setOpenSection] = useState(null);

    useEffect(() => {
        console.log("user:", user);
    }, [user]);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="sidebar pt-[4rem] lg:fixed w-full lg:w-[250px] flex flex-col overflow-auto h-full shadow bg-gray-800 text-white">
            <Link to="/admin/" className="flex flex-row gap-4 p-4 no-underline">
                <HomeIcon className="block h-6 w-6" aria-hidden="true" />
                <span>Home</span>
            </Link>

            {user?.role == 1 && (
                ['Prtners', 'Qi Sommesu-Nous', 'Air Marine et Côtière Protégée', 'Notre Festival', 'Actualités', 'Événements', 'Opportunités'].map((section, index) => (
                    <Accordion key={index} open={openSection === section}>
                        <AccordionHeader onClick={() => toggleSection(section)} className="p-4 text-white bg-gray-700 flex items-center">
                            <PhotoIcon className="h-6 w-6" aria-hidden="true" />
                            <span className="ml-2">{section}</span>
                        </AccordionHeader>
                        <AccordionBody className="bg-gray-900">
                            {section === 'Prtners' && (
                                <>
                                    <Link to="/admin/partners" className="block p-4 text-gray-300 hover:bg-gray-700">Partners</Link>
                                </>
                            )}
                            {section === 'Qui Sommes-Nous' && (
                                <>
                                    <Link to="/admin/users" className="block p-4 text-gray-300 hover:bg-gray-700">Manage Users</Link>
                                    <Link to="/admin/key-moment" className="block p-4 text-gray-300 hover:bg-gray-700">Key Moments</Link>
                                    <Link to="/admin/team-members" className="block p-4 text-gray-300 hover:bg-gray-700">Team Members</Link>

                                </>
                            )}
                            {section === 'Notre Festival' && (
                                <>

                                    <Link to="/admin/edition" className="block p-4 text-gray-300 hover:bg-gray-700">Edition</Link>
                                    <Link to="/admin/events" className="block p-4 text-gray-300 hover:bg-gray-700">Events</Link>
                                    <Link to="/admin/previous-editions" className="block p-4 text-gray-300 hover:bg-gray-700">Previous Edition</Link>
                                    <Link to="/admin/previous-event" className="block p-4 text-gray-300 hover:bg-gray-700">Previous Event</Link>
                                </>
                            )}
                            {section === 'Événements' && (
                                <>

                                    <Link to="/admin/event-type" className="block p-4 text-gray-300 hover:bg-gray-700">Events Types</Link>
                                    <Link to="/admin/events" className="block p-4 text-gray-300 hover:bg-gray-700">Events</Link>
                                </>
                            )}
                            {section === 'Air Marine et Côtière Protégée' && (
                                <>
                                    <Link to="/admin/posts" className="block p-4 text-gray-300 hover:bg-gray-700">Blog</Link>
                                </>
                            )}
                        </AccordionBody>
                    </Accordion>
                ))
            )}



        </div>
    );
}
