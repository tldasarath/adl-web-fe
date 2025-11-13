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
import Navbar from "@/Components/Navbar/Navbar";
import React from "react";
export const metadata = {
  title: " Business Setup Consultants in Dubai, UAE | Company Setup | ADL",
  description:
    "Find the best business setup consultants in the UAE with ADL Business Solutions. Expert support for company formation, licensing, visas, and complete business setup services.",
  keywords:
    "best business setup consultants uae,business setup consultants dubai,company formation consultants uae,top business setup companies uae,business setup experts dubai,uae company formation advisors",
};

const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection 
      title={"Borem ipsum dolor sit"} 
      subTitle={"in Dubaiamet, consectetur "} 
      decription={"Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.ADL Business Solutions simplifies the entire process of company setup in Dubai and across the UAE — from trade licensing to operational compliance."} buttonText={"Get a Free Consultation"} url={"/"} />
      <InsightsSection />
      <AboutSection />
      <ScheduleMeeting />
      <WhyUAEParallax/>
      <TeamSection />
      <WhyChooseSection />
      {/* <CTASection/> */}
      <InnerBanner
        title={"Ready to Launch Your Business in Dubai"}
        description={
          "Start smart with ADL Business Solutions. We manage licensing, paperwork, and compliance so you can focus on building your business empire."
        }
        buttonText={"Start Your Business Now"}
        link={"/contact"}
      />
      <Footer />
    </div>
  );
};

export default page;
