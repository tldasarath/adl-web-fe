import AboutSection from "@/Components/aboutPage/AboutSection";
import CTASection from "@/Components/aboutPage/CTASection ";
import InsightsSection from "@/Components/aboutPage/InsightsSection ";
import TeamSection from "@/Components/aboutPage/TeamSection";
import WhyChooseSection from "@/Components/aboutPage/WhyChooseSection";
import WhyUAEParallax from "@/Components/aboutPage/WhyUAEParallax ";
import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import ScheduleMeeting from "@/Components/HomePage/ScheduleMeeting/ScheduleMeeting";
import AboutMainland from "@/Components/mainlandPage/AboutMainland";
import MainlandFormation from "@/Components/mainlandPage/MainlandFormation";
import MainlandSetup from "@/Components/mainlandPage/MainlandSetup";
import Navbar from "@/Components/Navbar/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection 
      title={"Mainland Company"} 
      subTitle={"Formation in UAE"} 
      decription={"Start your UAE business with full access to the local market, 100% ownership options, visa quota, and corporate banking support. ADL Business Solutions makes your mainland setup simple, fast, and fully compliant."} 
      buttonText={"Get a Free Consultation"} 
      url={"/"} />

      <AboutMainland/>
     <MainlandSetup/>
     <MainlandFormation/>
      <Footer />
    </div>
  );
};

export default page;
