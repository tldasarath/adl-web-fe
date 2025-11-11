import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import AboutMainland from "@/Components/mainlandPage/AboutMainland";
import FAQSection from "@/Components/mainlandPage/FaqSection";
import MainlandFormation from "@/Components/mainlandPage/MainlandFormation";
import MainlandSetup from "@/Components/mainlandPage/MainlandSetup";
import MainlandWhyChoose from "@/Components/mainlandPage/MainlandWhyChoose";
import SuggestedBlogs from "@/Components/mainlandPage/SuggestedBlogs";
import Navbar from "@/Components/Navbar/Navbar";
import { Blogposts, MainlandFaqs } from "@/Datas/mainlandData";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection
        title={"Mainland Company"}
        subTitle={"Formation in UAE"}
        decription={
          "Start your UAE business with full access to the local market, 100% ownership options, visa quota, and corporate banking support. ADL Business Solutions makes your mainland setup simple, fast, and fully compliant."
        }
        buttonText={"Get a Free Consultation"}
        url={"/"}
      />

      <AboutMainland />
      <MainlandSetup />
      <MainlandFormation />
      <MainlandWhyChoose />
      <FAQSection faqs={MainlandFaqs} />
      <SuggestedBlogs blogs={Blogposts} />
      <InnerBanner
        title={"Start Your IFZA Freezone Company Today"}
        description={
          "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit,"
        }
        buttonText={"Book a Free Consultation"}
      />

      <Footer />
    </div>
  );
};

export default page;
