import React from "react";
import { Link } from "react-router-dom";

const AboutSection = () => (
  <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
    {/* Background Pattern - Fixed URL encoding issue here */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23000000%22 fill-opacity=%220.4%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
    </div>

    <div className="relative container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About Afghan Blog
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg mb-6 text-gray-700">
              Afghan Blog is a platform dedicated to sharing stories, ideas, and
              knowledge from Afghanistan and around the world. Our mission is to
              provide a space where writers can express themselves and readers
              can discover new perspectives.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              Whether you're interested in technology, culture, politics, or
              personal stories, you'll find something that resonates with you on
              Afghan Blog.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Learn More
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  ></path>
                </svg>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 text-blue-600 font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg border border-blue-200"
              >
                Join Us
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://picsum.photos/seed/afghanblog/600/400.jpg"
                alt="Afghan Blog Team"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
