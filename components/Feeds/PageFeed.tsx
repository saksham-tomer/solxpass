"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  User,
  MoreHorizontal,
  Image,
  Calendar,
  Smile,
  MapPin,
  BarChart2,
  Heart,
  Repeat,
  MessageCircle,
  Share,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

// Sidebar Component
const Sidebar = ({ isCollapsed, toggleSidebar }) => (
  <div
    className={`${
      isCollapsed ? "w-16" : "w-64"
    } p-4 flex flex-col h-screen fixed left-0 top-0 bg-black z-20 transition-all duration-300 lg:w-64`}
  >
    <div className="mb-8 flex justify-between items-center">
      <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current">
        <g>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </g>
      </svg>
      <button onClick={toggleSidebar} className="lg:hidden">
        {isCollapsed ? <Menu size={24} /> : <X size={24} />}
      </button>
    </div>
    <nav className="flex-grow">
      {[
        { icon: Home, label: "Home" },
        { icon: Search, label: "Explore" },
        { icon: Bell, label: "Notifications" },
        { icon: Mail, label: "Messages" },
        { icon: Bookmark, label: "Bookmarks" },
        { icon: User, label: "Profile" },
        { icon: MoreHorizontal, label: "More" },
      ].map(({ icon: Icon, label }) => (
        <div
          key={label}
          className={`flex items-center mb-4 text-xl hover:bg-gray-800 rounded-full p-3 cursor-pointer ${
            isCollapsed ? "justify-center lg:justify-start" : ""
          }`}
        >
          <Icon
            className={`${
              isCollapsed ? "w-6 h-6 lg:w-5 lg:h-5" : "w-5 h-5 mr-4"
            }`}
          />
          <span className={`${isCollapsed ? "hidden" : ""} lg:inline`}>
            {label}
          </span>
        </div>
      ))}
    </nav>
    <button
      className={`w-full bg-blue-500 text-white rounded-full py-3 mt-4 hover:bg-blue-600 transition duration-200 ${
        isCollapsed ? "px-0 lg:px-4" : "px-4"
      }`}
    >
      {isCollapsed ? <Image size={20} className="mx-auto lg:hidden" /> : null}
      <span className={`${isCollapsed ? "hidden" : ""} lg:inline`}>Post</span>
    </button>
    <div
      className={`mt-auto flex items-center p-3 hover:bg-gray-800 rounded-full cursor-pointer ${
        isCollapsed ? "hidden" : ""
      } lg:flex`}
    >
      <img
        src="/ape1.webp"
        alt="Profile"
        className="w-10 h-10 rounded-full mr-3"
      />
      <div className="flex-grow">
        <div className="font-bold">Saksham Tomar</div>
        <div className="text-gray-500">@SakshamDevDose</div>
      </div>
      <ChevronDown size={20} />
    </div>
  </div>
);

// Main Feed Component
const MainFeed = ({ posts, isLoading }) => (
  <div className="flex-grow border-x border-gray-800 min-h-screen ml-16 lg:ml-64">
    <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-sm p-4 border-b border-gray-800 z-10">
      <h1 className="text-xl font-bold">For you</h1>
      <div className="flex mt-4 overflow-x-auto">
        <div className="flex-shrink-0 text-center pb-3 border-b-4 border-blue-500 font-semibold px-4">
          For you
        </div>
        <div className="flex-shrink-0 text-center pb-3 text-gray-500 px-4">
          Following
        </div>
        <div className="flex-shrink-0 text-center pb-3 text-gray-500 px-4">
          Open Source Software
        </div>
        <div className="flex-shrink-0 text-center pb-3 text-gray-500 px-4">
          Open Source Contributors
        </div>
      </div>
    </div>

    <div className="p-4 border-b border-gray-800">
      <div className="flex">
        <img
          src="/ape3.jpg"
          alt="User"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="flex-grow">
          <textarea
            className="w-full bg-transparent text-xl resize-none"
            placeholder="What is happening?!"
            rows={2}
          ></textarea>
          <div className="flex flex-wrap justify-between items-center mt-4">
            <div className="flex space-x-4 text-blue-500 mb-2 sm:mb-0">
              <Image size={20} className="cursor-pointer" />
              <BarChart2 size={20} className="cursor-pointer" />
              <Smile size={20} className="cursor-pointer" />
              <Calendar size={20} className="cursor-pointer" />
              <MapPin size={20} className="cursor-pointer" />
            </div>
            <button className="bg-blue-500 text-white rounded-full px-4 py-2 font-bold hover:bg-blue-600 transition duration-200 w-full sm:w-auto">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>

    {isLoading
      ? Array(2)
          .fill()
          .map((_, i) => (
            <div key={i} className="animate-pulse p-4 border-b border-gray-800">
              <div className="flex">
                <div className="w-12 h-12 bg-gray-700 rounded-full mr-4"></div>
                <div className="flex-grow">
                  <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="h-40 bg-gray-700 rounded mb-4"></div>
                  <div className="flex flex-wrap justify-between">
                    {Array(4)
                      .fill()
                      .map((_, j) => (
                        <div
                          key={j}
                          className="w-12 h-4 bg-gray-700 rounded mb-2 sm:mb-0"
                        ></div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))
      : posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 border-b border-gray-800 hover:bg-gray-900 transition duration-200"
          >
            <div className="flex flex-col sm:flex-row">
              <img
                src="/ape2.jpg"
                alt={post.author}
                className="w-12 h-12 rounded-full mr-4 mb-4 sm:mb-0"
              />
              <div className="flex-grow">
                <div className="flex flex-wrap items-center">
                  <span className="font-bold mr-2">{post.author}</span>
                  <span className="text-gray-500 mr-2">{post.username}</span>
                  <span className="text-gray-500">· Oct 1</span>
                </div>
                <p className="mt-2">{post.content}</p>
                {post.image && (
                  <img
                    src={"/ape3.jpg"}
                    alt="Post content"
                    className="mt-4 rounded-2xl w-full"
                  />
                )}
                <div className="flex flex-wrap justify-between mt-4 text-gray-500">
                  <div className="flex items-center hover:text-blue-500 mb-2 sm:mb-0">
                    <MessageCircle size={18} className="mr-2" />
                    {post.comments}
                  </div>
                  <div className="flex items-center hover:text-green-500 mb-2 sm:mb-0">
                    <Repeat size={18} className="mr-2" />
                    {post.reposts}
                  </div>
                  <div className="flex items-center hover:text-red-500 mb-2 sm:mb-0">
                    <Heart size={18} className="mr-2" />
                    {post.likes}
                  </div>
                  <div className="flex items-center hover:text-blue-500 mb-2 sm:mb-0">
                    <BarChart2 size={18} className="mr-2" />
                    {post.views}
                  </div>
                  <Share size={18} className="hover:text-blue-500" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
  </div>
);

// Right Sidebar Component
const RightSidebar = () => (
  <div className="w-80 p-4 hidden lg:block">
    <div className="sticky top-0 pt-4">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-900 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
      </div>
      <div className="bg-gray-900 rounded-2xl p-4 mb-4">
        <h2 className="text-xl font-bold mb-4">Subscribe to Premium</h2>
        <p className="mb-4 text-sm">
          Subscribe to unlock new features and if eligible, receive a share of
          ads revenue.
        </p>
        <button className="bg-blue-500 text-white rounded-full py-2 px-4 font-bold hover:bg-blue-600 transition duration-200">
          Subscribe
        </button>
      </div>
      <div className="bg-gray-900 rounded-2xl p-4 mb-4">
        <h2 className="text-xl font-bold mb-4">What's happening</h2>
        <div className="mb-4">
          <span className="text-xs text-gray-500">
            US national news · This morning
          </span>
          <p className="font-bold">CBS News 2024 Vice Presidential Debate</p>
        </div>
        <div className="mb-4">
          <span className="text-xs text-gray-500">Technology · Trending</span>
          <p className="font-bold">Claude</p>
          <span className="text-xs text-gray-500">13.2K posts</span>
        </div>
        <div className="mb-4">
          <span className="text-xs text-gray-500">Trending in India</span>
          <p className="font-bold">#HelicopterCrash</p>
          <span className="text-xs text-gray-500">
            Trending with #Muzaffarpur
          </span>
        </div>
        <div className="mb-4">
          <span className="text-xs text-gray-500">
            Entertainment · Trending
          </span>
          <p className="font-bold">#PoojaHegde</p>
          <span className="text-xs text-gray-500">1,588 posts</span>
        </div>
        <div className="mb-4">
          <span className="text-xs text-gray-500">
            Business & finance · Trending
          </span>
          <p className="font-bold">#flipkartscam</p>
          <span className="text-xs text-gray-500">2,005 posts</span>
        </div>
        <a href="#" className="text-blue-500 text-sm hover:underline">
          Show more
        </a>
      </div>
      <div className="bg-gray-900 rounded-2xl p-4">
        <h2 className="text-xl font-bold mb-4">Who to follow</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src="/ape1.webp"
              alt="User"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-bold">Leon Si</p>
              <p className="text-xs text-gray-500">@leonsilicon</p>
            </div>
          </div>
          <button className="bg-white text-black rounded-full px-4 py-1 font-bold hover:bg-gray-200 transition duration-200">
            Follow
          </button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src="/ape2.jpg"
              alt="User"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-bold">nang</p>
              <p className="text-xs text-gray-500">@not_nang</p>
            </div>
          </div>
          <button className="bg-white text-black rounded-full px-4 py-1 font-bold hover:bg-gray-200 transition duration-200">
            Follow
          </button>
        </div>
        <a href="#" className="text-blue-500 text-sm hover:underline">
          Show more
        </a>
      </div>
    </div>
  </div>
);

// Main Component
const SocialMediaFeed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          author: "Elon Musk",
          username: "@elonmusk",
          content: "As this video describes, Trump supports women",
          image: "/api/placeholder/400/300",
          likes: "387K",
          reposts: "71K",
          comments: "17K",
          views: "48M",
        },
        {
          id: 2,
          author: "mango",
          username: "@Kacccha",
          content:
            "After countless sleepless nights, hard work, and tons of innovation, I am excited to announce that w 🎉✨",
          likes: "100",
          reposts: "10",
          comments: "5",
          views: "1K",
        },
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <MainFeed posts={posts} isLoading={isLoading} />
      <RightSidebar />
    </div>
  );
};

export default SocialMediaFeed;
