import Container from "@/Components/Common/Container";
import Image from "next/image";

const blogs = [
  {
    title: "Business Setup",
    description:
      "Worem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a mattis nulla. Sed dignissim, metus nec fringilla accumsan.",
    image: "/assets/images/blogs/business-setup.png", // Replace with actual image paths
  },
  {
    title: "Visa",
    description:
      "Worem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a mattis nulla. Sed dignissim, metus nec fringilla accumsan.",
    image: "/assets/images/blogs/visa.png",
  },
  {
    title: "PRO",
    description:
      "Worem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a mattis nulla. Sed dignissim, metus nec fringilla accumsan.",
    image: "/assets/images/blogs/pro.png",
  },
  {
    title: "Compliance",
    description:
      "Worem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a mattis nulla. Sed dignissim, metus nec fringilla accumsan.",
    image: "/assets/images/blogs/compliance.png",
  },
];

export default function BlogSection() {
  return (
    <section className=" py-16">
   <Container>   <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
                <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white ">
            Our Recent Blog</h2>
                <p className="text-base lg:text-lg mb-8 font-light leading-normal">
            Worem ipsum dolor sit amet consecteturdolor sit amet
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl "
            >
              <Image
                src={blog.image}
                alt={blog.title}
                width={400}
                height={300}
                className="object-contain w-64 h-96 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute w-50 bottom-0  right-0 border-b border-b-[#E9C05F]  p-5"  style={{
    backgroundImage:
      "linear-gradient(90deg, rgba(36,43,61,1) 0%, rgba(10,14,29,1) 48%)",
    backgroundPosition: "center center",
  }}>
                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {blog.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div></Container>
    </section>
  );
}
