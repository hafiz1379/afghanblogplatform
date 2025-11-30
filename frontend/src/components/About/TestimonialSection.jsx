import React, { useState, useEffect } from "react";

const TestimonialSection = () => {
  const testimonials = [
    {
      quote:
        "Afghan Blog has given me a platform to share my stories with a global audience. It's been an incredible journey.",
      author: "Farida Ahmad",
      role: "Contributing Writer",
      avatar: "https://picsum.photos/seed/farida/200/200.jpg",
    },
    {
      quote:
        "The quality of content and diverse perspectives on Afghan Blog have opened my eyes to so many new ideas.",
      author: "Omid Karimi",
      role: "Regular Reader",
      avatar: "https://picsum.photos/seed/omid/200/200.jpg",
    },
    {
      quote:
        "As an Afghan living abroad, Afghan Blog helps me stay connected to my culture and homeland.",
      author: "Zahra Hussain",
      role: "Community Member",
      avatar: "https://picsum.photos/seed/zahra/200/200.jpg",
    },
  ];

  // State for the current testimonial being displayed
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23000000%22 fill-opacity=%220.4%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            What People Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Hear from our community of writers and readers who are part of
            Afghan Blog.
          </p>
        </div>

        {/* Testimonial Carousel for Desktop */}
        <div className="hidden md:block relative max-w-4xl mx-auto">
          {/* Large Quote Mark */}
          <div className="absolute top-0 left-0 text-blue-200 opacity-20">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <div className="relative bg-white p-12 rounded-2xl shadow-xl">
            <div className="flex items-center mb-8">
              <img
                src={testimonials[activeIndex].avatar}
                alt={testimonials[activeIndex].author}
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-lg"
              />
              <div className="ml-6">
                <p className="font-bold text-xl text-gray-800">
                  {testimonials[activeIndex].author}
                </p>
                <p className="text-gray-500">
                  {testimonials[activeIndex].role}
                </p>
              </div>
            </div>
            <p className="text-xl text-gray-700 italic leading-relaxed">
              "{testimonials[activeIndex].quote}"
            </p>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-blue-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Cards for Mobile */}
        <div className="md:hidden space-y-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                />
                <div className="ml-4">
                  <p className="font-bold text-lg text-gray-800">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
