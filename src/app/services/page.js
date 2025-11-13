import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import ScheduleMeeting from "@/Components/HomePage/ScheduleMeeting/ScheduleMeeting";
import Navbar from "@/Components/Navbar/Navbar";
import Services from "@/Components/ServicePage/Services";
export const metadata = {
  title: "Business Setup in Dubai | Start Your UAE Company with ADL Business Solutions",
  description:
    "Start your business in Dubai with expert guidance from ADL Business Solutions. We handle trade licenses, approvals, and documentation to help you launch your company smoothly in Mainland, Freezone, or Offshore zones.",
  keywords:
    "Business setup in Dubai, UAE company formation, business license Dubai, mainland company setup, freezone business setup, start a company in UAE",
};

export default function Serivces() {
  return (
    <div>
        <Navbar/>
        <HeroSection title={"Borem ipsum dolor sit"} subTitle={"in Dubaiamet, consectetur "} decription={"Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.ADL Business Solutions simplifies the entire process of company setup in Dubai and across the UAE — from trade licensing to operational compliance."} buttonText={"Get a Free Consultation"} url={"/"} />
        <Services/>
        <ScheduleMeeting/>
        <InnerBanner title={"Ready to Launch Your Business in Dubai"} description={"Let ADL Business Solutions handle the paperwork while you focus on growth. We make business setup seamless, fast, and affordable."} buttonText={"Start Your Business Now"}/>
        <Footer/>
    </div>
  )}