import InnerBanner from "@/Components/Common/InnerBanner";
import ContactForm from "@/Components/Contact/ContactForm";
import Footer from "@/Components/Footer/Footer";
import PartnersSection from "@/Components/HomePage/PartnersSection/PartnersSection";
import Navbar from "@/Components/Navbar/Navbar";

export default function Contact() {
  return (
    <div>
        <Navbar/>
        <ContactForm/>
        <PartnersSection/>
                <InnerBanner title={"Ready to Launch Your Business in Dubai"} description={"Let ADL Business Solutions handle the paperwork while you focus on growth. We make business setup seamless, fast, and affordable."} buttonText={"Start Your Business Now"}/>
        
        <Footer/>
    </div>
  )}