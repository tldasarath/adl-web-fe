
"use client"
import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import CommercialLicenseSection from "@/Components/LicensePage/CommercialLicenseSection";
import FAQS from "@/Components/LicensePage/faqs";
import MainSection from "@/Components/LicensePage/MainSection";
import RelatedBlogs from "@/Components/LicensePage/RelatedBlogs";
import WhyADLSection from "@/Components/LicensePage/WhyADLSection";
import Navbar from "@/Components/Navbar/Navbar";
import { licenseDetails } from "@/Datas/licenseDetails";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
    const params = useParams()
    const license = licenseDetails.find(item => item.id === params.id);

    return (
        <div>
            <Navbar />
            <HeroSection
                title={license.licenseType}
                decription={"Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
                buttonText={"Get a Free Consultation"}
                url={"#schedule-meeting"} />

            <MainSection title={license.title} paragraph={license.serviceDescription} image={license.image} />
            <CommercialLicenseSection sectionTitle={license.sections.sectionTitle} benefitsTitle={license.sections.benefitsTitle} activities={license.sections.activities} benefits={license.sections.benefits} />
            <WhyADLSection description={license.whyADL} />
            <InnerBanner title={"Lorem ipsum dolor sit amet, consectetur "} description={"Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit"} buttonText={"Book a Free Consultation"} />
            <FAQS faqs={license.faqs} />
            <RelatedBlogs blogs={license.blogs} />
            <Footer />
        </div>
    );
};

export default page;
