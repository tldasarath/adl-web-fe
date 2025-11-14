import Container from "@/Components/Common/Container";
import { blogs } from "@/Datas/blogs";
import Image from "next/image";
import Link from "next/link";



export default function BlogSection() {
  return (
    <section className=" py-16">
   <Container>   <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
                <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white ">
            Our Recent Blog</h2>
                <p className="text-base lg:text-lg mb-8 font-light leading-normal">
Stay updated with the latest insights on UAE business setup, visa services, compliance, and market trends. Explore expert tips and guides designed to help entrepreneurs and companies grow confidently in the UAE.          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {blogs.splice(0,4).map((blog, index) => (
            <Link
              key={index}
              className="relative group overflow-hidden rounded-2xl "
          href={`/blogs/${blog.id}`}
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
<h3 className="text-lg font-semibold mb-2 truncate">{blog.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div></Container>
    </section>
  );
}
