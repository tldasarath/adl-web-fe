import LiquidGlass from "@/Components/button/GlassButton";
import Banner from "@/Components/Common/Banner";
import Footer from "@/Components/Footer/Footer";
import AboutSection from "@/Components/HomePage/AboutSection/AboutSection";
import BlogSection from "@/Components/HomePage/BlogSection/BlogSection";
import BusinessSection from "@/Components/HomePage/BusinessSection/BusinessSection";
import Companyformation from "@/Components/HomePage/CompanyFormation/Companyformation";
import FAQSection from "@/Components/HomePage/FaqSection/FaqSection";
import HeroSection from "@/Components/HomePage/Herosection/Herosection";
import ManagerSection from "@/Components/HomePage/ManagerSection/ManagerSection ";
import PackageSection from "@/Components/HomePage/PackageSection/PackageSection";
import PartnersSection from "@/Components/HomePage/PartnersSection/PartnersSection";
import ScheduleMeeting from "@/Components/HomePage/ScheduleMeeting/ScheduleMeeting";
import BusinessServices from "@/Components/HomePage/ServiceSection/BusinessService";
import ServicesSection from "@/Components/HomePage/ServiceSection/ServiceSetion";
import SocialMediaSection from "@/Components/HomePage/SocialMediaSection/SocialMediaSection";
import SubscribeSection from "@/Components/HomePage/SubscribeSection/SubscribeSection";
import TeamSection from "@/Components/HomePage/TeamSection/TeamSection";
import TestimonialSection from "@/Components/HomePage/Testimonial/Testimonial";
import ValuesSection from "@/Components/HomePage/ValuesSection/ValuesSection";
import VisaTypesSection from "@/Components/HomePage/VisaTypes/VisaTypesSection";
import Navbar from "@/Components/Navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Companyformation />
      <AboutSection />
      <ScheduleMeeting />
      <ManagerSection />
      <TeamSection />
      <ServicesSection />
      <BusinessServices />
      <BusinessSection />
      <PackageSection />
      <Banner />
      <VisaTypesSection />
      <ValuesSection />
      <PartnersSection />
      <BlogSection />
      <TestimonialSection />
      <SocialMediaSection />
      <FAQSection />
      <SubscribeSection />
      <Footer />
      {/* <div className="flex h-screen justify-center items-center">
     <LiquidGlass/>
   </div> */}
    </div>
  );
}
