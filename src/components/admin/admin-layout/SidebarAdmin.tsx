import React, { useEffect, useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { Link } from 'gatsby';
import { useAuthContext } from '../../../contexts/AuthProvider';
import { 
  HomeIcon, 
  UsersIcon, 
  PhotoIcon, 
  NewspaperIcon, 
  CalendarIcon, 
  BriefcaseIcon, 
  InformationCircleIcon, 
  ClipboardDocumentListIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline';

const sectionIcons = {
  'Prtners': UsersIcon,
  'Qui Sommes-Nous': InformationCircleIcon,
  'AMCP': ClipboardDocumentListIcon,
  'Notre Festival': SparklesIcon,
  'Actualités': NewspaperIcon,
  'Événements': CalendarIcon,
  'Opportunités': BriefcaseIcon,
};

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
    <div className="sidebar pt-[4rem] lg:fixed w-full lg:w-[250px] flex flex-col overflow-auto h-full shadow-lg bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-all duration-300">
      <Link 
        to="/admin/" 
        className="flex flex-row gap-4 p-4 no-underline hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
      >
        <HomeIcon className="block h-6 w-6" aria-hidden="true" />
        <span>Home</span>
      </Link>

      {user?.role === 1 && (
        ['Prtners', 'Qui Sommes-Nous', 'AMCP', 'Notre Festival', 'Actualités', 'Événements', 'Opportunités']
          .map((section, index) => {
            const IconComponent = sectionIcons[section] || PhotoIcon;
            return (
              <Accordion key={index} open={openSection === section}>
                <AccordionHeader 
                  onClick={() => toggleSection(section)}
                  className={`p-4 flex items-center transition-all duration-300 transform hover:scale-105 ${openSection === section ? 'bg-blue-600 border-l-4 border-blue-800' : 'bg-gray-700'}`}
                >
                  <IconComponent className="h-6 w-6" aria-hidden="true" />
                  <span className="ml-2 font-semibold">{section}</span>
                </AccordionHeader>
                <AccordionBody className="bg-gray-900 transition-all duration-300">
                  {section === 'Prtners' && (
                    <Link 
                      to="/admin/partners" 
                      className="block p-4 text-gray-300 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                    >
                      Partners
                    </Link>
                  )}
                  {section === 'Qui Sommes-Nous' && (
                    <>
                      <Link 
                        to="/admin/users" 
                        className="block p-4 text-gray-300 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                      >
                        Manage Users
                      </Link>
                      <Link 
                        to="/admin/key-moment" 
                        className="block p-4 text-gray-300 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                      >
                        Key Moments
                      </Link>
                      <Link 
                        to="/admin/team-members" 
                        className="block p-4 text-gray-300 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                      >
                        Team Members
                      </Link>
                    </>
                  )}
                  {section === 'Notre Festival' && (
                    <>
                      <Link 
                        to="/admin/edition" 
                        className="block p-4 text-gray-300 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                      >
                        Edition
                      </Link>
                      <Link 
                        to="/admin/events" 
                        className="block p-4 text-gray-300 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                      >
                        Events
                      </Link>
                    </>
                  )}
                  {section === 'Événements' && (
                    <Link 
                      to="/admin/events" 
                      className="block p-4 text-gray-300 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                    >
                      Events
                    </Link>
                  )}
                  {section === 'AMCP' && (
                    <Link 
                      to="/admin/posts" 
                      className="block p-4 text-gray-300 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                    >
                      Blog
                    </Link>
                  )}
                  {/* Ajoutez ici des liens pour 'Actualités' et 'Opportunités' selon vos besoins */}
                </AccordionBody>
              </Accordion>
            );
          })
      )}
    </div>
  );
}
