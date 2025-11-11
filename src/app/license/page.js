
import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import CommercialLicenseSection from "@/Components/LicensePage/CommercialLicenseSection";
import FAQS from "@/Components/LicensePage/faqs";
import MainSection from "@/Components/LicensePage/MainSection";
import WhyADLSection from "@/Components/LicensePage/WhyADLSection";
import Navbar from "@/Components/Navbar/Navbar";
import ComparisonAtAGlance from "@/Components/OffshorePage/ComparisonAtAGlance";
import OffshoreFAQAndBenefits from "@/Components/OffshorePage/OffshoreFAQAndBenefits";
import OffshoreFormationServices from "@/Components/OffshorePage/OffshoreFormationServices";
import OffshoreTypes from "@/Components/OffshorePage/OffshoreTypes";
import WhychooseOffshore from "@/Components/OffshorePage/WhychooseOffshore";
import React from "react";

const page = () => {
    return (
        <div>
            <Navbar />
            <HeroSection
                title={"Commercial License"}
                decription={"Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
                buttonText={"Get a Free Consultation"}
                url={"/"} />

            <MainSection />
            <CommercialLicenseSection/>
          <WhyADLSection/>
            <InnerBanner title={"Lorem ipsum dolor sit amet, consectetur "} description={"Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit"} buttonText={"Book a Free Consultation"} />
        {/* <FAQS faqs={}/> */}
            <Footer />
        </div>
    );
};

export default page;
