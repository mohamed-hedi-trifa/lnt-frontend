import React from "react";
import NewsLetterSub from "../NewsLetterSub";
import Hero from "./Hero";
import UpcomingEvents from "./UpcomingEvents";
import WhoAreWe from "./WhoAreWe";
import Archipel from "./Archipel";
import LatestNews from "./LatestNews";

export default function Home() {
  return (
    <div className="mt-[-80px]">
      <Hero />
      <UpcomingEvents />
      <WhoAreWe />
      <Archipel />
      <LatestNews />
    </div>
  );
}
