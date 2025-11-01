import Container from "@/Components/Common/Container";
import Image from "next/image";

const testimonials = [
  {
    date: "Oct 10, 2025",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a mattis nulla.",
    name: "Arjun K",
    role: "Designer",
    avatar: "/images/avatar-1.png",
  },
  {
    date: "Oct 12, 2025",
    message:
      "Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.",
    name: "Priya M",
    role: "Developer",
    avatar: "/images/avatar-2.png",
  },
  {
    date: "Oct 15, 2025",
    message:
      "Cras vel ligula nec sapien facilisis aliquam. Nulla facilisi. Integer non turpis sit amet metus ultrices malesuada.",
    name: "Rahul S",
    role: "Manager",
    avatar: "/images/avatar-3.png",
  },
  {
    date: "Oct 18, 2025",
    message:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    name: "Neha P",
    role: "Consultant",
    avatar: "/images/avatar-4.png",
  },
  {
    date: "Oct 21, 2025",
    message:
      "Duis nec nisi vel lacus convallis pharetra. Nulla facilisi. Donec tempus metus ac eros tincidunt, at efficitur elit mattis.",
    name: "Karan V",
    role: "UI/UX",
    avatar: "/images/avatar-5.png",
  },
  {
    date: "Oct 25, 2025",
    message:
      "Ut sit amet elit quis libero gravida elementum. Proin efficitur, justo sed viverra malesuada, magna urna laoreet velit.",
    name: "Sneha T",
    role: "Team Lead",
    avatar: "/images/avatar-6.png",
  },
];

export default function TestimonialSlider() {
  // Duplicate testimonials for smooth looping
  const duplicated = [...testimonials, ...testimonials];

  return (
    <section className="  py-8 md:py-14  overflow-hidden">
    <Container>
          <div className="max-w-7xl mx-auto px-6 text-center mb-12">
                <h2 className="text-2xl mb-5 md:text-3xl text-center  main-text font-bold text-white ">
          Testimonial</h2>
                <p className="text-base lg:text-lg mb-8 font-light leading-normal">
          Once ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna.
        </p>
      </div>

      {/* 3 Row Vertical Slider */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
        {/* Row 1 - bottom to top */}
        <div className="relative overflow-hidden fade-mask">
          <div className="animate-slide-up flex flex-col gap-6">
            {duplicated.map((item, i) => (
              <TestimonialCard key={`up-${i}`} {...item} />
            ))}
          </div>
        </div>

        {/* Row 2 - top to bottom */}
        <div className="hidden md:block relative fade-mask overflow-hidden">
          <div className="animate-slide-down flex flex-col gap-6">
            {duplicated.map((item, i) => (
              <TestimonialCard key={`down-${i}`} {...item} />
            ))}
          </div>
        </div>

        {/* Row 3 - bottom to top */}
        <div className=" hidden md:block  fade-mask overflow-hidden">
          <div className="animate-slide-up flex flex-col gap-6">
            {duplicated.map((item, i) => (
              <TestimonialCard key={`up2-${i}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </Container>
    </section>
  );
}

function TestimonialCard({
  date,
  message,
  name,
  role,
  avatar,
}) {
  return (
    <div className="bg-gradient-to-br from-[#1c2334] to-[#0e1424] p-6 rounded-2xl shadow-md border border-white/10 w-full">
      <p className="text-sm text-gray-400 mb-3">{date}</p>
      <p className="text-gray-300 mb-6 leading-relaxed">{message}</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={avatar}
            alt={name}
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="text-left">
          <h4 className="text-sm font-semibold">{name}</h4>
          <p className="text-xs text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  );
}
