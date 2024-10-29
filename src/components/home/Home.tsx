import React from "react";
import NewsLetterSub from "../NewsLetterSub";
import Hero from "./Hero";
import UpcomingEvents from "./UpcomingEvents";
import WhoAreWe from "./WhoAreWe";
import Archipel from "./Archipel";

export default function Home() {
  return (
    <div className="mt-[-80px]">
      <Hero />
      <UpcomingEvents />
      <WhoAreWe />
      <Archipel />
    </div>
  );
}
