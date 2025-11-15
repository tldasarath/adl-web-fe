import Image from "next/image";

const posts = [
  {
    image: "/assets/images/post/01.jpg",
    title: "Need smooth VAT filing and reliable business insurance in the UAE",
    description: "Need smooth VAT filing and reliable business insurance in the UAE",
    date: "October 25, 2025",
  },
  {
    image: "/assets/images/post/02.jpg",
    title: "Eid Mubarak",
    description: "Need translation that UAE authorities accept without delay",
    date: "October 10, 2025",
  },
  {
    image: "/assets/images/post/03.jpg",
    title: "Happy Diwali",
    description: "Your brand is your identity. Your name, your idea, your hard work.",
    date: "November 2, 2025",
  },
  {
    image: "/assets/images/post/04.jpg",
    title: "BANKING ON YOUR TERMS",
    description: "Struggling with UAE document approvals Let our experts handle every step - fast, legal, and hassle-free.",
    date: "October 29, 2025",
  },
  {
    image: "/assets/images/post/05.jpg",
    title: "Celebrate Success",
    description: "When it comes to closing your business in the UAE, paperwork matters.",
    date: "November 10, 2025",
  },
  {
    image: "/assets/images/post/06.jpg",
    title: "Celebrate Success",
    description: "Need a Dubai business address without renting an office",
    date: "November 10, 2025",
  },
  {
    image: "/assets/images/post/07.jpg",
    title: "Celebrate Success",
    description: "Your brand deserves protection.",
    date: "November 10, 2025",
  },
  {
    image: "/assets/images/post/08.jpg",
    title: "Celebrate Success",
    description: "Start your business in Dubai - the smart way.",
    date: "November 10, 2025",
  },
];

export default function SocialMediaSection() {
  const duplicatedPosts = [...posts, ...posts];

  return (
    <section className="py-8 md:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl mb-5 md:text-3xl text-center main-text font-bold text-white">
          Social Media
        </h2>

        <div className="relative">
          <div className="flex animate-slide-x gap-4 pt-10 w-max">
            {duplicatedPosts.map((post, index) => (
              <a
                key={index}
                href="https://www.instagram.com/adl_business_solutions_/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-b from-[#1c2334] to-[#0e1424] 
                rounded-2xl overflow-hidden shadow-md 
                w-[260px] sm:w-[300px] md:w-[340px] flex-shrink-0 hover:opacity-90 transition"
              >
                <div className="relative w-full aspect-[4/5]">
  <Image
    src={post.image}
    alt={post.title}
    fill
    className="object-cover"
  />
</div>


                <div className="p-5">
                  <p className="text-sm md:text-base font-normal mb-3 truncate">
                    {post.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
