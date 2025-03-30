"use client";
import React, { useState, useEffect } from 'react';
import { Search, Video, Moon, Sun, ChevronDown, ArrowRight, Globe, Languages } from 'lucide-react';
import { ExamMarquee } from '@/components/ExamMarquee';
import Navbar from '@/components/Navbar';

// Define the types for our application
type Label = {
  id: string;
  name: string;
};

type Consultant = {
  id: string;
  name: string;
  tags: string[];
  price: number;
  avatar: string;
};

type LanguageTranslator = {
  id: string;
  name: string;
  fromLanguages: string[];
  toLanguages: string[];
  experience: string;
  rating: number;
  price: number;
  avatar: string;
};

// Component for theme toggle
const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="fixed right-4 top-20 z-50 p-2 rounded-full bg-white/10 backdrop-blur-md shadow-lg"
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun className="text-yellow-300" size={24} /> : <Moon className="text-indigo-700" size={24} />}
    </button>
  );
};

// Custom marquee component with theme support
const CustomExamMarquee: React.FC = () => {
  const marqueeItems = [
    "JEE Main & Advanced",
    "NEET Preparation",
    "UPSC Civil Services",
    "CAT MBA Entrance",
    "GATE Engineering",
    "SSC Exams",
    "Banking Exams",
    "CA Preparation",
    "NDA Coaching",
    "GRE & GMAT",
    "CLAT Law Entrance"
  ];

  return (
    <div className="py-3 overflow-hidden bg-indigo-100 dark:bg-zinc-800 border-y border-indigo-200 dark:border-zinc-700">
      <div className="flex space-x-8 animate-marquee whitespace-nowrap">
        {marqueeItems.map((item, index) => (
          <div 
            key={index} 
            className="px-4 py-1 mx-2 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-500 dark:to-indigo-700 text-white text-sm font-medium shadow-md"
          >
            {item}
          </div>
        ))}
        {/* Duplicate items for continuous effect */}
        {marqueeItems.map((item, index) => (
          <div 
            key={`dup-${index}`} 
            className="px-4 py-1 mx-2 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-500 dark:to-indigo-700 text-white text-sm font-medium shadow-md"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// Animated Heading Component
const AnimatedHeading: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="py-6 overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400 dark:from-zinc-300 dark:to-zinc-100 text-center mb-2 animate-pulse">
        {text}
      </h2>
      <div className="flex justify-center">
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-indigo-400 dark:from-zinc-400 dark:to-zinc-300 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

// Language Translation Arrow Component
const TranslationArrow: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-500 dark:to-indigo-700 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-500 dark:to-indigo-700 rounded-full opacity-70 scale-75"></div>
        <ArrowRight className="text-white z-10" size={24} />
      </div>
    </div>
  );
};


// Custom Dropdown Component
const LanguageDropdown: React.FC<{
  label: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}> = ({ label, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-2">
        {label}
      </label>
      <button
        type="button"
        className="w-full bg-white dark:bg-zinc-800 border border-indigo-300 dark:border-indigo-600 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span className="block truncate text-indigo-800 dark:text-indigo-200">
            {selected || "Select Language"}
          </span>
          <ChevronDown size={16} className="text-indigo-600 dark:text-indigo-400" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-zinc-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {options.map((option) => (
            <div
              key={option}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const OmegleForStudents: React.FC = () => {
  // Available labels for selection
  const availableLabels: Label[] = [
    { id: 'jee', name: 'JEE' },
    { id: 'neet', name: 'NEET' },
    { id: 'upsc', name: 'UPSC' },
    { id: 'btech', name: 'B-TECH' },
    { id: 'internship', name: 'Internship' },
    { id: 'placements', name: 'Placements' },
    { id: 'nda', name: 'NDA' },
    { id: 'ca', name: 'CA' },
    { id: 'ssc-cgl', name: 'SSC-CGL' },
    { id: 'gate', name: 'GATE' },
    { id: 'cat', name: 'CAT' },
    { id: 'gmat', name: 'GMAT' },
    { id: 'gre', name: 'GRE' }
  ];

  // Sample consultants data
  const consultantsData: Consultant[] = [
    {
      id: '1',
      name: 'Dr. Aisha Sharma',
      tags: ['JEE', 'NEET', 'B-TECH'],
      price: 799,
      avatar: '/api/placeholder/100/100'
    },
    {
      id: '2',
      name: 'Prof. Rajiv Mehta',
      tags: ['UPSC', 'SSC-CGL', 'NDA'],
      price: 999,
      avatar: '/api/placeholder/100/100'
    },
    {
      id: '3',
      name: 'Neha Gupta',
      tags: ['Placements', 'Internship', 'B-TECH'],
      price: 599,
      avatar: '/api/placeholder/100/100'
    },
    {
      id: '4',
      name: 'Vivek Singhania',
      tags: ['CA', 'Placements', 'Internship'],
      price: 899,
      avatar: '/api/placeholder/100/100'
    }
  ];

  // Available languages for translation
  const availableLanguages = [
    "English", "Hindi", "Spanish", "French", "German", 
    "Chinese", "Japanese", "Russian", "Arabic", "Portuguese",
    "Bengali", "Tamil", "Telugu", "Malayalam", "Kannada",
    "Urdu", "Punjabi", "Marathi", "Gujarati", "Odia"
  ];
  const mentalHealthCounselors = [
    {
      id: 'm1',
      name: 'Dr. Priya Sharma',
      specialization: ['JEE', 'NEET', 'General Anxiety'],
      experience: '8+ years',
      rating: 4.9,
      price: 899,
      avatar: '/api/placeholder/100/100',
      availability: 'Mon-Sat, 4PM-8PM'
    },
    {
      id: 'm2',
      name: 'Rahul Verma',
      specialization: ['UPSC', 'CAT', 'Depression', 'Stress Management'],
      experience: '6+ years',
      rating: 4.7,
      price: 799,
      avatar: '/api/placeholder/100/100',
      availability: 'Tue-Sun, 10AM-7PM'
    },
    {
      id: 'm3',
      name: 'Dr. Meera Patel',
      specialization: ['JEE', 'GATE', 'Anxiety Disorders', 'Performance Pressure'],
      experience: '10+ years',
      rating: 4.9,
      price: 999,
      avatar: '/api/placeholder/100/100',
      availability: 'Mon-Fri, 9AM-5PM'
    },
    {
      id: 'm4',
      name: 'Vikram Singh',
      specialization: ['NEET', 'Burnout', 'Academic Stress', 'Time Management'],
      experience: '7+ years',
      rating: 4.8,
      price: 849,
      avatar: '/api/placeholder/100/100',
      availability: 'Wed-Sun, 11AM-9PM'
    }
  ];
  // Sample language translators data
  const translatorsData: LanguageTranslator[] = [
    {
      id: '1',
      name: 'Ananya Patel',
      fromLanguages: ['English', 'Hindi', 'Gujarati'],
      toLanguages: ['French', 'Spanish', 'English'],
      experience: '5+ years',
      rating: 4.8,
      price: 699,
      avatar: '/api/placeholder/100/100'
    },
    {
      id: '2',
      name: 'Miguel Rodriguez',
      fromLanguages: ['Spanish', 'English', 'Portuguese'],
      toLanguages: ['Hindi', 'English', 'French'],
      experience: '7+ years',
      rating: 4.9,
      price: 899,
      avatar: '/api/placeholder/100/100'
    },
    {
      id: '3',
      name: 'Sophie Chen',
      fromLanguages: ['Chinese', 'English', 'Japanese'],
      toLanguages: ['Hindi', 'English', 'Spanish'],
      experience: '6+ years',
      rating: 4.7,
      price: 799,
      avatar: '/api/placeholder/100/100'
    },
    {
      id: '4',
      name: 'Ravi Kumar',
      fromLanguages: ['Hindi', 'English', 'Punjabi', 'Urdu'],
      toLanguages: ['German', 'French', 'English'],
      experience: '8+ years',
      rating: 4.9,
      price: 999,
      avatar: '/api/placeholder/100/100'
    }
  ];

  // State for exam counseling
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [searchClicked, setSearchClicked] = useState<boolean>(false);
  const [filteredConsultants, setFilteredConsultants] = useState<Consultant[]>([]);
  const [selectedMentalHealthExam, setSelectedMentalHealthExam] = useState<string>("");
  const [mentalHealthSearchClicked, setMentalHealthSearchClicked] = useState<boolean>(false);
  const [filteredCounselors, setFilteredCounselors] = useState<any[]>([]);

  // State for language translation
  const [fromLanguage, setFromLanguage] = useState<string>("");
  const [toLanguage, setToLanguage] = useState<string>("");
  const [translationSearchClicked, setTranslationSearchClicked] = useState<boolean>(false);
  const [filteredTranslators, setFilteredTranslators] = useState<LanguageTranslator[]>([]);

  // State for active section
  const [activeSection, setActiveSection] = useState<'exams' | 'translation'>('exams');

  // Handle label selection
  const toggleLabel = (labelName: string) => {
    if (selectedLabels.includes(labelName)) {
      setSelectedLabels(selectedLabels.filter(label => label !== labelName));
    } else {
      setSelectedLabels([...selectedLabels, labelName]);
    }
  };

  // Handle search for exam consultants
  const handleSearch = () => {
    if (selectedLabels.length === 0) {
      setFilteredConsultants(consultantsData);
    } else {
      const filtered = consultantsData.filter(consultant => 
        selectedLabels.some(label => consultant.tags.includes(label))
      );
      setFilteredConsultants(filtered);
    }
    setSearchClicked(true);
    setActiveSection('exams');
    setTranslationSearchClicked(false);
  };

  // Handle search for language translators
  const handleTranslationSearch = () => {
    if (!fromLanguage && !toLanguage) {
      setFilteredTranslators(translatorsData);
    } else {
      const filtered = translatorsData.filter(translator => {
        const matchesFrom = !fromLanguage || translator.fromLanguages.includes(fromLanguage);
        const matchesTo = !toLanguage || translator.toLanguages.includes(toLanguage);
        return matchesFrom && matchesTo;
      });
      setFilteredTranslators(filtered);
    }
    setTranslationSearchClicked(true);
    setActiveSection('translation');
    setSearchClicked(false);
  };

  // Handle consultation
  const handleConsult = (consultantId: string) => {
    console.log(`Starting consultation with consultant ID: ${consultantId}`);
    // Implement video call functionality here
  };

  // Generate star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half-star" className="text-yellow-400">½</span>);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-indigo-50 dark:bg-zinc-900 transition-colors duration-300">
      {/* Navbar */}
      <Navbar />
      <ThemeToggle />

      {/* Header Section - Theme responsive gradient */}
      <header className="mt-16 bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-900 pt-8 pb-6 px-4 shadow-lg">
  <div className="text-center">
    <h1 className="text-5xl font-extrabold text-white dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-gray-100 dark:to-gray-300 tracking-tight mb-2 transform hover:scale-105 transition-transform duration-300">
      OMEGLE FOR STUDENTS
    </h1>
    <p className="text-indigo-100 dark:text-zinc-300 text-lg max-w-2xl mx-auto">
      Connect with experts and peers in your field of study for guidance and consultation
    </p>
  </div>
</header>

      {/* Custom Marquee with theme support */}
      <CustomExamMarquee />

      {/* Navigation Tabs */}
      <div className="flex justify-center mt-6">
        <div className="bg-white dark:bg-zinc-800 rounded-full shadow-md p-1 max-w-md w-full flex">
          <button
            onClick={() => {
              setActiveSection('exams');
              setTranslationSearchClicked(false);
              setMentalHealthSearchClicked(false);
            }}
            className={`flex-1 py-2 px-4 rounded-full font-medium transition-all duration-200 ${
              activeSection === 'exams'
                ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-zinc-600 dark:to-zinc-800 text-white shadow-lg'
                : 'text-indigo-700 dark:text-zinc-300 hover:bg-indigo-100 dark:hover:bg-zinc-700'
            }`}
          >
            Exam Preparation
          </button>
          <button
            onClick={() => {
              setActiveSection('translation');
              setSearchClicked(false);
              setMentalHealthSearchClicked(false);
            }}
            className={`flex-1 py-2 px-4 rounded-full font-medium transition-all duration-200 ${
              activeSection === 'translation'
                ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-zinc-600 dark:to-zinc-800 text-white shadow-lg'
                : 'text-indigo-700 dark:text-zinc-300 hover:bg-indigo-100 dark:hover:bg-zinc-700'
            }`}
          >
            Language Translation
          </button>
          <button
            onClick={() => {
              setActiveSection('mentalHealth');
              setSearchClicked(false);
              setTranslationSearchClicked(false);
            }}
            className={`flex-1 py-2 px-4 rounded-full font-medium transition-all duration-200 ${
              activeSection === 'mentalHealth'
                ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-zinc-600 dark:to-zinc-800 text-white shadow-lg'
                : 'text-indigo-700 dark:text-zinc-300 hover:bg-indigo-100 dark:hover:bg-zinc-700'
            }`}
          >
            Mental Health
          </button>
        </div>
      </div>
      {/* Body Section - Theme responsive */}
      <main className="transition-colors duration-300">
        {/* Exam Preparation Section */}
        {activeSection === 'exams' && (
          <>
            <AnimatedHeading text="Find Your Exam Preparation Counselor" />
            <section className="max-w-5xl mx-auto px-4 py-4">
              <h2 className="text-indigo-800 dark:text-zinc-200 text-xl font-semibold mb-4">Choose your areas of interest:</h2>
              <div className="flex flex-wrap gap-3 mb-6">
                {availableLabels.map((label) => (
                  <button
                    key={label.id}
                    onClick={() => toggleLabel(label.name)}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                      selectedLabels.includes(label.name)
                        ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-500 dark:to-indigo-700 text-white shadow-lg transform scale-105'
                        : 'bg-indigo-100 dark:bg-zinc-700 text-indigo-700 dark:text-zinc-300 hover:bg-indigo-200 dark:hover:bg-zinc-600'
                    }`}
                  >
                    {label.name}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-500 dark:to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 dark:hover:from-indigo-600 dark:hover:to-indigo-800 text-white px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  <Search size={20} />
                  Find Consultants
                </button>
              </div>
            </section>

            {/* Results Section for Exam Consultants */}
            {searchClicked && (
              <section className="max-w-5xl mx-auto px-4 py-8">
                <h2 className="text-indigo-800 dark:text-zinc-200 text-2xl font-semibold mb-6">Available Consultants:</h2>
                
                {filteredConsultants.length === 0 ? (
                  <div className="bg-indigo-100/50 dark:bg-zinc-800/50 rounded-xl p-8 text-center">
                    <p className="text-indigo-700 dark:text-zinc-300 text-lg">No consultants found matching your criteria. Please try different tags.</p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {filteredConsultants.map((consultant) => (
                      <div 
                      key={consultant.id} 
                      className="bg-gradient-to-br from-indigo-500/90 via-indigo-600/90 to-indigo-700/90 dark:from-zinc-700/90 dark:via-zinc-800/90 dark:to-zinc-900/90 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-103"
                    >
                        <div className="p-6">
                          <div className="flex items-center gap-4">
                            <img 
                              src={consultant.avatar} 
                              alt={consultant.name} 
                              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-300 dark:border-indigo-300"
                            />
                            <div>
                              <h3 className="text-xl font-bold text-white">{consultant.name}</h3>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {consultant.tags.map((tag, index) => (
                                  <span 
                                    key={index} 
                                    className="text-xs px-2 py-1 rounded-full bg-indigo-400/40 dark:bg-indigo-400/40 text-white"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex justify-between items-center">
                            <div className="text-indigo-200 dark:text-indigo-200 font-bold">
                              ₹{consultant.price} <span className="text-xs text-indigo-300 dark:text-indigo-300 font-normal">per session</span>
                            </div>
                            <button
                              onClick={() => handleConsult(consultant.id)}
                              className="bg-white/20 hover:bg-white/30 dark:bg-white/20 dark:hover:bg-white/30 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 transition-all duration-200"
                            >
                              <Video size={16} />
                              Consult Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </>
        )}

        {/* Language Translation Section */}
        {activeSection === 'translation' && (
          <>
            <AnimatedHeading text="Find Your Language Translation Counselor" />
            <section className="max-w-5xl mx-auto px-4 py-4">
              <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div className="md:col-span-2">
                    <LanguageDropdown 
                      label="Translate From" 
                      options={availableLanguages} 
                      selected={fromLanguage} 
                      onChange={setFromLanguage} 
                    />
                  </div>
                  
                  <div className="flex justify-center md:col-span-1">
                    <TranslationArrow />
                  </div>
                  
                  <div className="md:col-span-2">
                    <LanguageDropdown 
                      label="Translate To" 
                      options={availableLanguages} 
                      selected={toLanguage} 
                      onChange={setToLanguage} 
                    />
                  </div>
                </div>
                
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleTranslationSearch}
                    className="bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-500 dark:to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 dark:hover:from-indigo-600 dark:hover:to-indigo-800 text-white px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                  >
                    <Globe size={20} />
                    Find Language Counselors
                  </button>
                </div>
              </div>
            </section>

            {/* Results Section for Language Translators */}
            {translationSearchClicked && (
              <section className="max-w-5xl mx-auto px-4 py-8">
                <h2 className="text-indigo-800 dark:text-zinc-200 text-2xl font-semibold mb-6">Available Language Counselors:</h2>
                
                {filteredTranslators.length === 0 ? (
                  <div className="bg-indigo-100/50 dark:bg-zinc-800/50 rounded-xl p-8 text-center">
                    <p className="text-indigo-700 dark:text-zinc-300 text-lg">No language counselors found for this combination. Please try different languages.</p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {filteredTranslators.map((translator) => (
                      <div 
                      key={translator.id} 
                      className="bg-gradient-to-br from-indigo-500/90 via-indigo-600/90 to-indigo-700/90 dark:from-zinc-700/90 dark:via-zinc-800/90 dark:to-zinc-900/90 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-103"
                    >
                        <div className="p-6">
                          <div className="flex items-center gap-4">
                            <img 
                              src={translator.avatar} 
                              alt={translator.name} 
                              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-300 dark:border-indigo-300"
                            />
                            <div>
                              <h3 className="text-xl font-bold text-white">{translator.name}</h3>
                              <div className="flex text-yellow-300 mt-1">
                                {renderStars(translator.rating)}
                                <span className="text-indigo-200 ml-2">({translator.rating})</span>
                              </div>
                              <div className="text-indigo-200 text-sm mt-1">Experience: {translator.experience}</div>
                            </div>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-indigo-200 text-sm font-medium mb-1">From Languages:</h4>
                              <div className="flex flex-wrap gap-1">
                                {translator.fromLanguages.map((lang, index) => (
                                  <span 
                                    key={index} 
                                    className="text-xs px-2 py-1 rounded-full bg-indigo-400/40 dark:bg-indigo-400/40 text-white"
                                  >
                                    {lang}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-indigo-200 text-sm font-medium mb-1">To Languages:</h4>
                              <div className="flex flex-wrap gap-1">
                                {translator.toLanguages.map((lang, index) => (
                                  <span 
                                    key={index} 
                                    className="text-xs px-2 py-1 rounded-full bg-indigo-400/30 dark:bg-indigo-400/30 text-white"
                                  >
                                    {lang}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex justify-between items-center">
                            <div className="text-indigo-200 dark:text-indigo-200 font-bold">
                              ₹{translator.price} <span className="text-xs text-indigo-300 dark:text-indigo-300 font-normal">per session</span>
                            </div>
                            <button
                              onClick={() => handleConsult(translator.id)}
                              className="bg-white/20 hover:bg-white/30 dark:bg-white/20 dark:hover:bg-white/30 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 transition-all duration-200"
                            >
                              <Video size={16} />
                              Consult Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </>
        )}
        {activeSection === 'mentalHealth' && (
  <>
    <AnimatedHeading text="Mental Health Support for Students" />
    
    <section className="max-w-5xl mx-auto px-4 py-6">
      <div className="bg-indigo-100 dark:bg-zinc-800 rounded-xl p-6 mb-8 shadow-md">
        <div className="flex items-center mb-4">
          <div className="w-2 h-16 bg-gradient-to-b from-indigo-500 to-indigo-700 dark:from-zinc-500 dark:to-zinc-700 rounded-full mr-4"></div>
          <blockquote className="text-indigo-800 dark:text-zinc-200 text-xl italic font-medium">
            "Your mental health is more important than your exam. The test measures what you know, not who you are. Take care of yourself first."
          </blockquote>
        </div>
        <p className="text-indigo-600 dark:text-zinc-400 text-right">— Dewansh Mishra (Co-Founder ClimbR)</p>
      </div>
      
      <h2 className="text-indigo-800 dark:text-zinc-200 text-xl font-semibold mb-4">Select the exam causing you stress:</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        {availableLabels.map((label) => (
          <button
            key={`mh-${label.id}`}
            onClick={() => setSelectedMentalHealthExam(label.name)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
              selectedMentalHealthExam === label.name
                ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-zinc-600 dark:to-zinc-800 text-white shadow-lg transform scale-105'
                : 'bg-indigo-100 dark:bg-zinc-700 text-indigo-700 dark:text-zinc-300 hover:bg-indigo-200 dark:hover:bg-zinc-600'
            }`}
          >
            {label.name}
          </button>
        ))}
      </div>
      
      <div className="flex justify-center mt-6">
        <button
          onClick={() => {
            if (selectedMentalHealthExam) {
              const filtered = mentalHealthCounselors.filter(
                counselor => counselor.specialization.includes(selectedMentalHealthExam)
              );
              setFilteredCounselors(filtered);
              setMentalHealthSearchClicked(true);
            } else {
              setFilteredCounselors(mentalHealthCounselors);
              setMentalHealthSearchClicked(true);
            }
          }}
          className="bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-zinc-600 dark:to-zinc-800 hover:from-indigo-600 hover:to-indigo-800 dark:hover:from-zinc-700 dark:hover:to-zinc-900 text-white px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          <Search size={20} />
          Find Mental Health Counselors
        </button>
      </div>
    </section>

    {/* Results Section for Mental Health Counselors */}
    {mentalHealthSearchClicked && (
      <section className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-indigo-800 dark:text-zinc-200 text-2xl font-semibold mb-6">Available Mental Health Counselors:</h2>
        
        {filteredCounselors.length === 0 ? (
          <div className="bg-indigo-100/50 dark:bg-zinc-800/50 rounded-xl p-8 text-center">
            <p className="text-indigo-700 dark:text-zinc-300 text-lg">No counselors found for this exam. Please try a different selection.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredCounselors.map((counselor) => (
              <div 
                key={counselor.id} 
                className="bg-gradient-to-br from-indigo-500/90 via-indigo-600/90 to-indigo-700/90 dark:from-zinc-700/90 dark:via-zinc-800/90 dark:to-zinc-900/90 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-103"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={counselor.avatar} 
                      alt={counselor.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-indigo-300 dark:border-zinc-300"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white">{counselor.name}</h3>
                      <div className="flex text-yellow-300 mt-1">
                        {renderStars(counselor.rating)}
                        <span className="text-indigo-200 dark:text-zinc-300 ml-2">({counselor.rating})</span>
                      </div>
                      <div className="text-indigo-200 dark:text-zinc-300 text-sm mt-1">Experience: {counselor.experience}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-indigo-200 dark:text-zinc-300 text-sm font-medium mb-1">Specialization:</h4>
                    <div className="flex flex-wrap gap-2">
                      {counselor.specialization.map((spec, index) => (
                        <span 
                          key={index} 
                          className="text-xs px-2 py-1 rounded-full bg-indigo-400/40 dark:bg-zinc-500/40 text-white"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <h4 className="text-indigo-200 dark:text-zinc-300 text-sm font-medium mb-1">Availability:</h4>
                    <p className="text-white text-sm">{counselor.availability}</p>
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <div className="text-indigo-200 dark:text-zinc-200 font-bold">
                      ₹{counselor.price} <span className="text-xs text-indigo-300 dark:text-zinc-400 font-normal">per session</span>
                    </div>
                    <button
                      onClick={() => handleConsult(counselor.id)}
                      className="bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 transition-all duration-200"
                    >
                      <Video size={16} />
                      Connect Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    )}
  </>
)}
        {/* Footer */}
        <footer className="py-8 text-center text-indigo-600 dark:text-zinc-500 text-sm">
          <p>© 2025 Omegle for Students - Connect, Learn, Succeed</p>
        </footer>
      </main>
    </div>
  );
};

export default OmegleForStudents;