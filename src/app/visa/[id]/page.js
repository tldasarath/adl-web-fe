"use client"
import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import FAQSection from "@/Components/mainlandPage/FaqSection";
import SuggestedBlogs from "@/Components/mainlandPage/SuggestedBlogs";
import AboutVisa from "@/Components/visaPage/AboutVisa";
import { visaDetails } from "@/Datas/visaData";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams()
  const visa = visaDetails.find(item => item.id === params.id);



  return (
    <div>
      <Navbar />
      <HeroSection 
      title={visa.heroSection.title} 
      // subTitle={visa.heroSection.subTitle} 
      decription={visa.heroSection.description} 
      buttonText={visa.heroSection.buttonText} 
      url={visa.heroSection.buttonUrl} 
      />
      <AboutVisa
      image={visa.image}
      title={visa.title}
      para1={visa.paragraph1}
      para2={visa.paragraph2}
       />
      <InnerBanner 
      title={visa.meeting.title} 
      description={visa.meeting.description} 
      buttonText={visa.meeting.buttonText} 
      buttonUrl={visa.meeting.buttonUrl}
      />
      <FAQSection faqs={visa.faqs} />
      <SuggestedBlogs blogs={visa.relatedBlogs} />


      {/* <BusinessJourney heading={service.title}
        imageSrc={service.image}
        paragraph1={service.paragraph1}
        paragraph2={service.paragraph2}
        button1Text={service.button2Text}
        button2Text={service.button2Text}
        button1Url={service.button1Url}
        button2Url={service.button2Url} />
      <PointsSection title={service.section2.title} description={service.section2.description} items={service.section2.points} />
      <WhyChooseSection title={service.section3.title} description={service.section3.description} points={service.section3.points} image={service.section3.image} />
      <WhyChooseDubai title={service.section1.title} description1={service.section1.description1} description2={service.section1.description2} meetingTitle={service.meeting.title} meetingDescription={service.meeting.description} />
      <FAQSection faqs={service.faqs} />
      <Blogs />
      <InnerBanner title={"Ready to Launch Your Business in Dubai"} description={"Let ADL Business Solutions handle the paperwork while you focus on growth. We make business setup seamless, fast, and affordable."} buttonText={"Start Your Business Now"} />
       */}
      <Footer />
    </div>
  )
}