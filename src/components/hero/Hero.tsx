import React, { useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import HeroDesktop from "./HeroDesktop";
import HeroMobile from "./HeroMobile";

export const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="flex flex-col">
      <NavBar />
      <div className="pt-24"> 
        {isMobile ? <HeroMobile /> : <HeroDesktop />}
      </div>
    </section>
  );
};
