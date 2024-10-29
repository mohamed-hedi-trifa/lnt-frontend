import { Link } from "gatsby";
import React from "react";
import Dropdown from "../Dropdown";

interface NavItem {
    name: string;
    path: string;
    dropdown?: any;
}

// Translation object for the navbar
const translations = {
    en: [
        { name: "Home", path: "/" },
        { name: "About us", path: "/about/" },
        { name: "Activities", path: "/activities/" },
        { name: "Protected armarine", path: "/protected-armarine/" },
        { name: "Festivals", path: "/festivals/" },
        { name: "Contact", path: "/contact/" },
        { name: "Blog", path: "/blog/" },
    ],
    fr: [
        { name: "Accueil", path: "/" },
        { name: "À propos", path: "/about/" },
        { name: "Activities", path: "/activities/" },
        { name: "Protégé armarine", path: "/protected-armarine/" },
        { name: "Festivals", path: "/festivals/" },
        { name: "Contact", path: "/contact/" },
        { name: "Blog", path: "/blog/" },
    ]
};

function Navbar({ location }: { location: any }) {

    // Extract the language from the URL path (assuming it's the first part of the path, e.g., /en/ or /fr/)
    const lang = location?.pathname.startsWith("/fr/") ? "fr" : "en";

    // Get the appropriate navigation items based on the language
    const navItems = translations[lang];

    const renderNavItems = () => {
        return navItems.map((item: NavItem, index) => {
            if (item.dropdown) {
                return (
                    <li key={index}>
                        <Dropdown
                            title={item.name}
                            items={item.dropdown}
                            path={item.dropdown[0].path} // Use the first path for active check
                            active={location?.pathname.indexOf(item.dropdown[0].path) === 0}
                        />
                    </li>
                );
            } else {
                return (
                    <li key={index} className={`py-2 font-open font-normal transition duration-500 ${location?.pathname === item.path ? "text-primary" : "hover:text-primary"}`}>
                        <Link to={`/${lang}${item.path}`}>{item.name}</Link> {/* Prepend lang */}
                    </li>
                );
            }
        });
    };

    return (
        <div className="fixed z-30 w-full shadow-xl">
            <div className="w-full max-w-7xl flex items-center justify-between m-auto px-3 py-4">
                <Link to={`${lang}/`}>
                    <h2 className="uppercase font-poppins font-light text-xl scr1100:text-3xl text-center transition-all duration-300">
                        AKDDCL
                    </h2>
                </Link>
                <ul className="hidden min-[950px]:flex gap-4 text-sm list-none">
                    {renderNavItems()}
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
