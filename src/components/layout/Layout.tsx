
import * as React from "react";


const Layout = ({ children, location = { pathname: "" } }: { children: React.ReactNode; location: any }) => {
  const haveLayout = () => {
    return (
      location?.pathname.indexOf("/contact") !== 0 &&
      location?.pathname.indexOf("/login") !== 0 &&
      location?.pathname.indexOf("/register") !== 0 &&
      location?.pathname.indexOf("/check-certificate") !== 0
    );
  };

  return (
    <>
  
      {/* {haveLayout() ? <Navbar location={location} /> : ""} */}
      <div className="">{children}</div>
   
    </>
  );
};

export default Layout;
