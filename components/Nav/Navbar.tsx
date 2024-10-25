"use client";
import React, { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import {
  RiDashboardLine,
  RiNewspaperLine,
  RiShieldCheckLine,
} from "react-icons/ri";
import WalletConnection from "./WalletAdapter";
import { signIn, signOut, useSession } from "next-auth/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (connected && publicKey) {
      const fetchBalance = async () => {
        try {
          const balance = await connection.getBalance(publicKey);
          setBalance(balance / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance(null);
        }
      };

      fetchBalance();
      const intervalId = setInterval(fetchBalance, 10000);

      return () => clearInterval(intervalId);
    } else {
      setBalance(null);
    }
  }, [connected, publicKey, connection]);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setIsDarkMode(savedMode === "true" || (!savedMode && prefersDark));
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    {
      icon: <RiDashboardLine className="mr-2 text-2xl text-indigo-500" />,
      text: "Dashboard",
      href: "/dashboard",
    },
    /*
    {
      icon: <RiNewspaperLine className="mr-2 text-2xl text-green-500" />,
      text: "Feeds",
      href: "/feeds",
    },*/
    {
      icon: <RiShieldCheckLine className="mr-2 text-2xl text-yellow-500" />,
      text: "Proof",
      href: "/explore",
    },
  ];

  const router = useRouter();

  return (
    <>
      <motion.nav
        className={`fixed w-full z-30 transition-all top-0 duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              className="text-3xl font-extrabold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span
                onClick={() => router.push("/")}
                className="bg-clip-text text-transparent cursor-pointer bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 animate-gradient-x"
              >
                SolXPass
              </span>
            </motion.div>
            <ul className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={item.href}
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {item.icon}
                    <span className="font-medium">{item.text}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center space-x-4">
              <motion.button
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isDarkMode ? "moon" : "sun"}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDarkMode ? (
                      <FaMoon className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <FaSun className="w-5 h-5 text-yellow-500" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="bg-gradient-to-r from-cyan-400 hidden md:flex py-2 px-6 text-base to-purple-500 text-black font-bold rounded-lg hover:from-cyan-500 hover:via-pink-600 hover:to-purple-600 transition-all duration-300 shadow-neon border border-cyan-300 animate-pulse"
                >
                  <span className="text-white">Sign Out</span>
                </button>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="bg-gradient-to-r from-cyan-400 hidden md:flex py-2 px-6 text-base to-purple-500 text-black font-bold rounded-lg hover:from-cyan-500 hover:via-pink-600 hover:to-purple-600 transition-all duration-300 shadow-neon border border-cyan-300 animate-pulse"
                >
                  <span className="text-white">Sign In</span>
                </button>
              )}
              <div
                className="relative"
                onMouseEnter={() => setIsWalletOpen(true)}
                onMouseLeave={() => setIsWalletOpen(false)}
              >
                <WalletMultiButton />
                {connected && balance !== null && isWalletOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 p-2 bg-white dark:bg-black/80 backdrop-blur-md rounded-lg shadow-lg border border-cyan-500"
                  >
                    <p className="text-sm font-medium text-cyan-400">
                      Balance: {balance.toFixed(4)} SOL
                    </p>
                  </motion.div>
                )}
              </div>
              <motion.button
                className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={toggleMobileMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-y-0 right-0 w-64 bg-white/90 dark:bg-black/90 backdrop-blur-md z-50 shadow-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex flex-col h-full p-6">
              <motion.button
                className="self-end p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={toggleMobileMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTimes className="w-5 h-5" />
              </motion.button>
              <ul className="mt-8 space-y-6">
                {navItems.map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href={item.href}
                      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                      onClick={toggleMobileMenu}
                    >
                      {item.icon}
                      <span className="font-medium">{item.text}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
