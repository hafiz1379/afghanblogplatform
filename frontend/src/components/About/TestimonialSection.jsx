import React from "react";

const TestimonialSection = () => {
  const testimonials = [
    {
      quote:
        "Afghan Blog has given me a platform to share my stories with a global audience. It's been an incredible journey.",
      author: "Farida Ahmad",
      role: "Contributing Writer",
    },
    {
      quote:
        "The quality of content and diverse perspectives on Afghan Blog have opened my eyes to so many new ideas.",
      author: "Omid Karimi",
      role: "Regular Reader",
    },
    {
      quote:
        "As an Afghan living abroad, Afghan Blog helps me stay connected to my culture and homeland.",
      author: "Zahra Hussain",
      role: "Community Member",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            What People Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-gray-800">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
