import HeroSection from "@/Components/Common/HeroSection";
import InnerBanner from "@/Components/Common/InnerBanner";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import AboutFreezoneDetails from "@/Components/freezonePage/AboutFreezoneDetails";
import FreezoneInfoCard from "@/Components/freezonePage/FreezoneInfoCard";
import TestimonialSection from "@/Components/freezonePage/TestimonialSection";
import React from "react";
export const metadata = {
  title:
    "Freezone Company Setup in UAE | 100% Ownership | ADL Business Solutions",
  description:
    "ADL Business Solutions offers Freezone company setup services in Dubai, Abu Dhabi, Sharjah, and across the UAE. Get 100% foreign ownership, zero tax, and quick licensing for your business.",
  keywords:
    "UAE Freezone company setup, Dubai Freezone license, business setup in UAE, start business in Freezone, 100% ownership UAE, Freezone consultancy Dubai, ADL Business Solutions",
};

const page = () => {

  return (
    <div>
      <Navbar />
      <HeroSection
        title={"UAE Freezone Business Setup Services"}
        decription={
          "Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
        }
        buttonText={"Get a Free Consultation"}
        url={"/"}
      />

      <AboutFreezoneDetails />
      <FreezoneInfoCard />
<TestimonialSection/>
      <InnerBanner
        title={"LStart Your UAE Freezone Business with ADL"}
        description={
          "Take your business to new heights in one of the UAE’s globally recognized Freezones.Connect with ADL Business Solutions to explore the best jurisdiction for your business goals and begin your journey toward success — today."
        }
        buttonText={"Book a Free Consultation"}
      />

      <Footer />
    </div>
  );
};

export default page;
