import Banner from "@/Components/Common/Banner";
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
        <Banner/>
        <Footer/>
    </div>
  )}