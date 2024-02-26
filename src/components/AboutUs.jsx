import React from "react";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">About CulinaShare</h2>
      {/* About Us Section */}
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-700">
          CulinaShare is dedicated to providing a platform for food enthusiasts
          to share their favorite recipes, discover new culinary creations, and
          connect with like-minded individuals from around the world.
        </p>
        <p className="text-gray-700 mt-4">
          CulinaShare is a vibrant community dedicated to the love of cooking
          and sharing delicious recipes. Our mission is to foster culinary
          exploration, making it accessible to individuals of all skill levels
          and backgrounds.
        </p>
        <p className="text-gray-700 mt-4">
          Whether you're a kitchen novice or a seasoned chef, CulinaShare
          provides a platform where you can discover a diverse array of recipes,
          contribute your own culinary creations, and build a personalized
          collection of favorite dishes.
        </p>
        <p className="text-gray-700 mt-4">
          We believe that the joy of cooking extends beyond the kitchen and has
          the power to bring people together. At CulinaShare, we strive to
          inspire creativity, foster a sense of community, and celebrate the art
          of crafting delicious meals.
        </p>
      </div>

      {/* Image and Social Links Section */}
      <div className="flex items-center justify-center mt-8">
        <img
          src="https://media.licdn.com/dms/image/D4D03AQF02U3rc4zDcQ/profile-displayphoto-shrink_400_400/0/1691939405884?e=1714608000&v=beta&t=PvFEpAt7piQHoTJiJHKJbXWHsvaFNIl_AwUr2a6Qx-w"
          alt="Abhay Dusane"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <p className="text-xl font-bold">Abhay Dusane</p>
          <div className="flex items-center mt-2">
            <a
              href="https://leetcode.com/abhaydusane24/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mr-2"
            >
              <SiLeetcode />
            </a>
            <a
              href="https://auth.geeksforgeeks.org/user/abhaydusanems24"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 mr-2"
            >
              <SiGeeksforgeeks />
            </a>
            <a
              href="https://github.com/CallmeAbhy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 mr-2"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/abhaydusane/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
