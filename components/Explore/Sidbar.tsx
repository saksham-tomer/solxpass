import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  children,
  clearable = false,
  onClear,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        <div className="flex items-center">
          {clearable && onClear && (
            <button
              onClick={onClear}
              className="text-gray-500 hover:text-red-500 transition-all duration-200 mr-3 text-sm font-medium"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-gray-800 transition-all duration-200"
          >
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ReclaimProtocolFilter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scoreMin, setScoreMin] = useState(0);
  const [scoreMax, setScoreMax] = useState(15);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 1534) {
        setIsOpen(true);
        setShowButton(false);
      } else {
        setIsOpen(false);
        setShowButton(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = [
    "entertainment",
    "finance",
    "gaming",
    "social_media",
    "shopping",
    "food",
    "professional",
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const sidebarContent = (
    <div className="p-6 overflow-y-auto h-full">
      <FilterSection
        title="Categories"
        clearable={true}
        onClear={() => setSelectedCategories([])}
      >
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={category}
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="mr-3"
              />
              <label htmlFor={category} className="text-gray-700 capitalize">
                {category.replace("_", " ")}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Score range">
        <div className="flex space-x-3 mb-4">
          <input
            type="number"
            placeholder="Min"
            value={scoreMin}
            onChange={(e) => setScoreMin(Number(e.target.value))}
            className="w-1/2 p-2 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none transition-all duration-200"
          />
          <input
            type="number"
            placeholder="Max"
            value={scoreMax}
            onChange={(e) => setScoreMax(Number(e.target.value))}
            className="w-1/2 p-2 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none transition-all duration-200"
          />
        </div>
        <input
          type="range"
          min="0"
          max="15"
          value={scoreMax}
          onChange={(e) => setScoreMax(Number(e.target.value))}
          className="w-full accent-blue-500 hover:accent-blue-600 transition-all duration-200"
        />
      </FilterSection>

      <FilterSection title="Provider Type">
        <div className="space-y-3">
          {["All", "Social Media", "Professional", "Finance"].map((type) => (
            <div key={type} className="flex items-center">
              <input
                type="radio"
                id={type}
                name="providerType"
                className="mr-3"
              />
              <label htmlFor={type} className="text-gray-700">
                {type}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Data Sensitivity">
        <div className="space-y-3">
          {["Low", "Medium", "High"].map((level) => (
            <div key={level} className="flex items-center">
              <input type="checkbox" id={level} className="mr-3" />
              <label htmlFor={level} className="text-gray-700">
                {level}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 right-4 z-50 ${
          showButton ? "block" : "hidden"
        } bg-white p-2 rounded-full shadow-lg`}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed top-0 left-0 h-full bg-white shadow-xl z-40 ${
              isMobile ? "w-64" : "w-64 md:w-72"
            }`}
          >
            {isMobile && (
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 rounded-full bg-white p-2 shadow-lg text-gray-500 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            )}
            {sidebarContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default ReclaimProtocolFilter;
