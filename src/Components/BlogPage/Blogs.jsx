"use client";

import { blogs } from "@/Datas/blogs";
import Image from "next/image";
import { useRef, useState } from "react";
import MeetingComponent from "../Common/MeetingComponent";
import Container from "../Common/Container";

export default function Blogs() {
  const [meetingModal, setMeetingModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;
  const blogSectionRef = useRef(null);

  const handleScheduleClick = (value) => {
    setMeetingModal(value);
  };

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  // central page change with bounds checking & scrolling to this component
  const changePage = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    if (newPage === currentPage) return;
    setCurrentPage(newPage);

    // Scroll only this section into view
    if (blogSectionRef.current) {
      blogSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handlePrev = () => changePage(currentPage - 1);
  const handleNext = () => changePage(currentPage + 1);

  return (
    <div ref={blogSectionRef} className="min-h-screen text-white py-12 ">
   <Container>
       <div className="max-w-7xl  flex flex-col lg:flex-row gap-8">
        {/* Blog Grid Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-center lg:text-left mb-8">Our All Blogs</h1>

          {/* Grid Layout for Blog Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentBlogs.map((blog) => (
              <div
                key={blog.id}
                className="glass-bg rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="relative w-full h-40 md:h-56">
                  <Image src={blog.image} alt={blog.title} fill className="object-cover" priority />
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h4 className="text-lg md:text-xl font-semibold cursor-pointer text-[#E9C05F] hover:text-blue-400 transition-colors">
                      {blog.title}
                    </h4>
                    <p className="text-gray-300 mt-3 text-sm leading-relaxed">{blog.excerpt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Section (below grid) */}
          <div className="flex justify-center mt-12 space-x-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-6 py-2 rounded-md ${
                currentPage === 1 ? "glass-bg text-gray-500 cursor-not-allowed" : "glass-bg text-[#E9C05F]"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => changePage(pageNum)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === pageNum ? " border-b-2 border-[#E9C05F] text-white" : ""
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-6 py-2 rounded-md ${
                currentPage === totalPages ? "glass-bg text-gray-500 cursor-not-allowed" : "glass-bg text-[#E9C05F]"
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Sidebar */}
       <aside className="w-full lg:w-80 flex-shrink-0">
  <div
    className="
      lg:sticky lg:top-24 
      flex flex-col lg:flex-col 
      items-stretch 
      gap-6
      md:items-center md:justify-center
    "
  >
    {/* Latest Posts */}
    <div className="hidden md:block glass-bg p-5 rounded-2xl w-full md:max-w-md lg:max-w-none">
      <h3 className="text-xl font-semibold mb-4">Latest Posts</h3>
      <ul className="space-y-4">
        {blogs.slice(0, 5).map((post) => (
          <li
            key={post.id}
            className="flex items-center gap-3 hover:text-blue-400 cursor-pointer transition"
          >
            <div className="relative w-16 h-12 flex-shrink-0 rounded-md overflow-hidden">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
            <p className="text-sm text-gray-300 leading-snug hover:text-blue-400 transition">
              {post.title}
            </p>
          </li>
        ))}
      </ul>
    </div>

    {/* Call-to-Action Box */}
    <div
      className="
        glass-bg p-5 rounded-2xl 
        w-full md:max-w-md lg:max-w-none 
        md:mx-auto
      "
    >
      <h3 className="text-xl font-semibold mb-3">Let's Build Your Dream</h3>
      <p className="text-gray-300 text-sm leading-relaxed mb-4">
        Ready to start your business in Dubai? Get expert help from our consultants today.
      </p>
      <button
        type="button"
        onClick={() => handleScheduleClick(true)}
        className="cursor-pointer w-full glass-bg text-white py-2 rounded-lg transition hover:bg-blue-600"
      >
        Book a Meeting
      </button>
    </div>
  </div>
</aside>

      </div>
   </Container>

      {/* Meeting Modal */}
      {meetingModal && <MeetingComponent handleScheduleClick={handleScheduleClick} />}
    </div>
  );
}
