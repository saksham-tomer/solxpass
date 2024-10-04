import React, { useState, useEffect } from "react";
import { Info, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as provider from "../Data/Provider.json";
import Image from "next/image";
import RequestProof from "./Connect";

const categories = [
  "entertainment",
  "finance",
  "food",
  "gaming",
  "professional",
  "shopping",
  "social_media",
];

const ITEMS_PER_PAGE = 6;

interface Connection {
  id: string;
  name: string;
  score: number;
  description: string;
}

interface ProviderData {
  id: string;
  score: number;
  name: string;
}

const SOLIDVaultExplorer: React.FC<{ category: string }> = ({
  category,
}: {
  category: string;
}) => {
  const [activeTab, setActiveTab] = useState(category);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<Connection[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [providerData, setProviderData] = useState<ProviderData>();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setActiveTab(category);
    const filteredItems = provider[category as keyof typeof provider] || [];
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    setTotalPages(totalPages);
    setCurrentPage(1);
    updateCurrentItems(filteredItems, 1);
  }, [category]);

  useEffect(() => {
    const filteredItems = provider[activeTab as keyof typeof provider] || [];
    updateCurrentItems(filteredItems, currentPage);
  }, [currentPage, activeTab]);

  const updateCurrentItems = (items: Connection[], page: number) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCurrentItems(items.slice(startIndex, endIndex));
  };

  const CardSkeleton = () => (
    <div className="bg-gray-100 p-4 rounded-lg flex flex-col animate-pulse border border-gray-300 shadow-lg shadow-gray-300/50">
      <div className="flex justify-between items-start mb-3">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full" />
        <div className="w-16 sm:w-20 h-6 sm:h-8 bg-gray-300 rounded-md" />
      </div>
      <div className="text-left">
        <div className="h-4 sm:h-5 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-3 sm:h-4 bg-gray-300 rounded w-full mb-2" />
        <div className="h-3 sm:h-4 bg-gray-300 rounded w-2/3 mb-3" />
        <div className="h-5 sm:h-6 bg-gray-300 rounded w-1/4" />
      </div>
    </div>
  );

  const Pagination = () => (
    <div className="flex justify-center items-center mt-8 space-x-4">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );

  const Modal = () => {
    return (
      <AnimatePresence>
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.3 },
          }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        >
          <div className="bg-white p-6 items-center flex flex-col rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Connect to Provider</h2>
            <p className="text-gray-500 text-sm mb-8">
              Are you sure you want to connect to this provider?
            </p>
            <RequestProof providerData={providerData} />
            <p className="text-gray-500 text-xs mt-2">
              Scan the generated QR Code
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-600 transition-colors duration-300 ease-in-out text-white px-4 py-1 text-sm flex flex-row items-center justify-center ms-center rounded hover:bg-red-600"
            >
              Close
              <Zap className="w-3 h-3 inline font-bold ml-2" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="w-full relative max-w-4xl min-h-screen mx-auto p-4 sm:p-8 mb-12 bg-white rounded-xl text-gray-800 border border-gray-300 shadow-2xl shadow-gray-300/20">
      {showModal && <Modal />}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-6 sm:mb-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mr-3 font-mono">
          Explore the Providers
        </h2>
        <Info className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap gap-2 mb-6 sm:mb-8 bg-gray-100 p-1 rounded-xl border border-gray-300"
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
              activeTab === cat
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab(cat);
              const filteredItems =
                provider[cat as keyof typeof provider] || [];
              const totalPages = Math.ceil(
                filteredItems.length / ITEMS_PER_PAGE
              );
              setTotalPages(totalPages);
              setCurrentPage(1);
              updateCurrentItems(filteredItems, 1);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
      >
        <AnimatePresence>
          {isLoading
            ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardSkeleton />
                </motion.div>
              ))
            : currentItems.map((connection) => (
                <motion.div
                  key={connection.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-4 sm:p-5 rounded-xl flex flex-col border border-gray-300 shadow-lg shadow-gray-300/20 hover:shadow-gray-300/40 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <Image
                      src={`/${connection.name
                        .slice(0, connection.name.indexOf(" "))
                        .toLowerCase()}.png`}
                      className="w-10 h-10 bg-gray-200 object-cover rounded-full"
                      width={1920}
                      height={1080}
                      alt=""
                    />
                    <motion.button
                      className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-600 rounded-md text-xs font-bold text-white hover:bg-blue-700 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowModal(true);
                        setProviderData({
                          id: connection.id,
                          score: connection.score,
                          name: connection.name,
                        });
                      }}
                    >
                      Connect <Zap className="w-3 h-3 inline ml-1" />
                    </motion.button>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-800">
                      {connection.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3">
                      {connection.description}
                    </p>
                    <motion.span
                      className="bg-yellow-400 text-gray-900 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold inline-block"
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      +{connection.score} SAKC
                    </motion.span>
                  </div>
                </motion.div>
              ))}
        </AnimatePresence>
      </motion.div>
      <Pagination />
    </div>
  );
};

export default SOLIDVaultExplorer;
