import React, { useState, useEffect, useCallback } from "react";

// Move testimonials outside component to prevent useEffect dependency warning
const TESTIMONIALS = [
  {
    quote:
      "Afghan Blog has given me a platform to share my stories with a global audience. It's been an incredible journey.",
    author: "Farida Ahmad",
    role: "Contributing Writer",
    avatar: "https://picsum.photos/seed/farida/200/200.jpg",
    color: "indigo",
  },
  {
    quote:
      "The quality of content and diverse perspectives on Afghan Blog have opened my eyes to so many new ideas.",
    author: "Omid Karimi",
    role: "Regular Reader",
    avatar: "https://picsum.photos/seed/omid/200/200.jpg",
    color: "purple",
  },
  {
    quote:
      "As an Afghan living abroad, Afghan Blog helps me stay connected to my culture and homeland.",
    author: "Zahra Hussain",
    role: "Community Member",
    avatar: "https://picsum.photos/seed/zahra/200/200.jpg",
    color: "pink",
  },
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) =>
        prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
      );
      setIsTransitioning(false);
    }, 300);
  }, []);

  const goToPrev = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) =>
        prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
      );
      setIsTransitioning(false);
    }, 300);
  }, []);

  const goToIndex = useCallback(
    (index) => {
      if (index !== activeIndex) {
        setIsTransitioning(true);
        setTimeout(() => {
          setActiveIndex(index);
          setIsTransitioning(false);
        }, 300);
      }
    },
    [activeIndex]
  );

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [goToNext]);

  const colorClasses = {
    indigo: {
      border: "border-indigo-200",
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      ring: "ring-indigo-100",
      dot: "bg-indigo-500",
    },
    purple: {
      border: "border-purple-200",
      bg: "bg-purple-50",
      text: "text-purple-600",
      ring: "ring-purple-100",
      dot: "bg-purple-500",
    },
    pink: {
      border: "border-pink-200",
      bg: "bg-pink-50",
      text: "text-pink-600",
      ring: "ring-pink-100",
      dot: "bg-pink-500",
    },
  };

  const activeTestimonial = TESTIMONIALS[activeIndex];
  const colors = colorClasses[activeTestimonial.color];

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-slate-50 via-white to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-100/30 rounded-full blur-[150px]"></div>

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-100 shadow-sm mb-6">
            <svg
              className="w-4 h-4 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-sm font-medium text-purple-600">
              Testimonials
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            What People{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Say
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Hear from our community of writers and readers who are part of
            Afghan Blog.
          </p>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="w-12 h-1 rounded-full bg-slate-200"></div>
          </div>
        </div>

        {/* Desktop Testimonial Carousel */}
        <div className="hidden md:block relative max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="relative group">
            {/* Card Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-10 blur-xl"></div>

            {/* Card */}
            <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-10 md:p-12 overflow-hidden">
              {/* Large Quote Icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <svg
                  className="w-24 h-24 text-indigo-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Content */}
              <div
                className={`transition-all duration-300 ${
                  isTransitioning
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {/* Author Info */}
                <div className="flex items-center mb-8">
                  {/* Avatar */}
                  <div className="relative">
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-50 blur-sm`}
                    ></div>
                    <img
                      src={activeTestimonial.avatar}
                      alt={activeTestimonial.author}
                      className="relative w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>

                  <div className="ml-6">
                    <h4 className="text-xl font-bold text-slate-900">
                      {activeTestimonial.author}
                    </h4>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium ${colors.bg} ${colors.text} mt-1`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${colors.dot}`}
                      ></span>
                      {activeTestimonial.role}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="relative">
                  <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
                    "{activeTestimonial.quote}"
                  </p>
                </blockquote>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mt-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Bottom Gradient Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            {/* Prev Button */}
            <button
              onClick={goToPrev}
              className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 hover:scale-105"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((testimonial, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? `w-8 ${colorClasses[testimonial.color].dot}`
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 hover:scale-105"
              aria-label="Next testimonial"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Testimonial Cards */}
        <div className="md:hidden space-y-6">
          {TESTIMONIALS.map((testimonial, index) => {
            const cardColors = colorClasses[testimonial.color];

            return (
              <div key={index} className="relative group">
                {/* Card Glow */}
                <div
                  className={`absolute -inset-1 ${cardColors.dot} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500`}
                ></div>

                {/* Card */}
                <div className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <svg
                      className={`w-12 h-12 ${cardColors.text}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Author */}
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <div
                        className={`absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-50 blur-sm`}
                      ></div>
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="relative w-14 h-14 rounded-full object-cover border-2 border-white"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-slate-900">
                        {testimonial.author}
                      </h4>
                      <span
                        className={`text-sm ${cardColors.text} font-medium`}
                      >
                        {testimonial.role}
                      </span>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-slate-600 leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Bottom accent */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl ${cardColors.dot} opacity-50`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Decoration */}
        <div className="flex items-center justify-center gap-3 mt-16">
          <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          <div className="w-2 h-2 rounded-full bg-pink-300"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
