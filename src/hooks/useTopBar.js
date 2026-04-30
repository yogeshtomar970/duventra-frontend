import { useState, useEffect, useRef } from "react";

export const menuData = [
  {
    name: "Fest & Event",
    items: ["Cultural Event", "Sports Event", "Tech Event", "Academic Event"],
  },
  {
    name: "Competition",
    items: ["Debates", "Writing", "Gaming", "Design", "Quiz"],
  },
  {
    name: "E-Cell",
    items: ["Entrepreneurship", "Startup", "Internship"],
  },
  {
    name: "Skills",
    items: ["Workshop", "Courses"],
  },
  {
    name: "Others",
    items: ["NCC", "Campaigning"],
  },
];

export const collegeList = [
  "Shyam Lal College",
  "Hansraj College",
  "Hindu College",
];

export default function useTopBar({ onSearch, onFilterChange }) {
  const [searchActive, setSearchActive] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);

  const dropdownRefs = useRef({});

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && dropdownRefs.current[activeDropdown]) {
        if (!dropdownRefs.current[activeDropdown].contains(event.target)) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const toggleDropdown = (menuName, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === menuName ? null : menuName);
  };

  const handleCheckbox = (item) => {
    const updated = selectedOptions.includes(item)
      ? selectedOptions.filter((i) => i !== item)
      : [...selectedOptions, item];

    setSelectedOptions(updated);
    onFilterChange?.({ eventTypes: updated, college: selectedCollege });
  };

  const handleCollegeSelect = (college) => {
    const updatedCollege = selectedCollege === college ? null : college;
    setSelectedCollege(updatedCollege);
    onFilterChange?.({ eventTypes: selectedOptions, college: updatedCollege });
  };

  const handleClearAll = () => {
    setSelectedOptions([]);
    setSelectedCollege(null);
    onFilterChange?.({ eventTypes: [], college: null });
  };

  const handleSearchChange = (e) => {
    onSearch?.(e.target.value);
  };

  const isAllActive = selectedOptions.length === 0 && !selectedCollege;

  return {
    // State
    searchActive,
    activeDropdown,
    selectedOptions,
    showFilter,
    selectedCollege,
    isAllActive,
    dropdownRefs,

    // Setters
    setSearchActive,
    setShowFilter,

    // Handlers
    toggleDropdown,
    handleCheckbox,
    handleCollegeSelect,
    handleClearAll,
    handleSearchChange,
  };
}
