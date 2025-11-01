import Image from "next/image";

const posts = [
  {
    image: "/assets/images/post/post1.png",
    title: "BEYOND BORDERS: YOUR GOLDEN VISA",
    description: "Your global lifestyle secured",
    date: "October 25, 2025",
  },
  {
    image: "/assets/images/post/post2.png",
    title: "Eid Mubarak",
    description: "Celebrating unity and blessings",
    date: "October 10, 2025",
  },
  {
    image: "/assets/images/post/post3.png",
    title: "Happy Diwali",
    description: "Let your life shine bright with happiness",
    date: "November 2, 2025",
  },
  {
    image: "/assets/images/post/post4.png",
    title: "BANKING ON YOUR TERMS",
    description: "Where your money meets momentum",
    date: "October 29, 2025",
  },
  {
    image: "/assets/images/post/post1.png",
    title: "Celebrate Success",
    description: "Empowering business excellence",
    date: "November 10, 2025",
  },
];

export default function SocialMediaSection() {
  // Duplicate for smooth infinite scroll
  const duplicatedPosts = [...posts, ...posts];

  return (
    <section className="  py-8 md:py-14  overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl mb-5 md:text-3xl text-center  main-text font-bold text-white ">
          Social Media</h2>

        <div className="relative">
          {/* Slider wrapper */}
          <div className="flex animate-slide-x gap-6 w-max">
            {duplicatedPosts.map((post, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-[#1c2334] to-[#0e1424] rounded-2xl overflow-hidden shadow-md min-w-[280px] sm:min-w-[320px] md:min-w-[360px] flex-shrink-0"
              >
                <div className="relative w-full h-72">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className=" text-sm md:text-base font-normal mb-3">{post.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
