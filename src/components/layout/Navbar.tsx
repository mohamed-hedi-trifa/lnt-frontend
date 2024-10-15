import { Link } from "gatsby"
import React from "react"
import Dropdown from "../Dropdown"

interface NavItem {
    name: string,
    path: string,
    dropdown?: any
}

const navItems = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about/" },
    { name: "Activities", path: "/activities/" },
    { name: "Protected armarine", path: "/protected-armarine/" },
    { name: "Festivals", path: "/festivals/" },
    { name: "Contact", path: "/contact/" },
    { name: "Blog", path: "/blog/" },
];


function Navbar({ location }: { location: any }) {

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
                        <Link to={item.path}>{item.name}</Link>
                    </li>
                );
            }
        });
    };

    return (
        <div className="fixed z-30 w-full shadow-xl">
            <div className="w-full max-w-7xl flex items-center justify-between m-auto px-3 py-4">
                <Link to="/">
                    <h2 className="uppercase font-poppins font-light text-xl scr1100:text-3xl text-center  transition-all duration-300">
                        akddcl
                    </h2>
                </Link>
                {/* <button
          className="min-[950px]:hidden"
          onClick={() => setMobileNavbarOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} className="text-white" size="2x" />
        </button> */}
                <ul className="hidden min-[950px]:flex gap-4 text-sm list-none">
                    {renderNavItems()}
                </ul>
            </div>
        </div>
    )
}

export default Navbar
