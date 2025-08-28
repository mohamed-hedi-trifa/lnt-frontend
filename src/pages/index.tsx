
import React, { useEffect, useState } from "react";
import Header from "@/components/visitor/header";
import HeroSection from "@/components/visitor/homePage/hero-section";
import FeaturedListings from "@/components/visitor/homePage/featured-listings";
import WhyChooseUs from "@/components/visitor/homePage/why-choose-us";
import Footer from "@/components/visitor/footer";
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { DialogContent } from "@radix-ui/react-dialog";


const IndexPage = () => {

    return (
        <div className="min-h-screen">
            <Header  />
            <main>
                <HeroSection />
                <FeaturedListings />
                <WhyChooseUs />
            </main>
            <Footer />


        </div>
    );
};

export default IndexPage;
