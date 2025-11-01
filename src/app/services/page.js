import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import ScheduleMeeting from "@/Components/HomePage/ScheduleMeeting/ScheduleMeeting";
import Navbar from "@/Components/Navbar/Navbar";
import Services from "@/Components/ServicePage/Services";

export default function Serivces() {
  return (
    <div>
        <Navbar/>
        <Services/>
        <ScheduleMeeting/>
        <InnerBanner title={"Ready to Launch Your Business in Dubai"} description={"Let ADL Business Solutions handle the paperwork while you focus on growth. We make business setup seamless, fast, and affordable."} buttonText={"Start Your Business Now"}/>
        <Footer/>
    </div>
  )}