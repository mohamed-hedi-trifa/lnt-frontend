/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react";

import Navbar from "./Navbar";

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
      {haveLayout() ? <Navbar location={location} /> : ""}
      <div className="pt-[80px]">{children}</div>
    </>
  );
};

export default Layout;
