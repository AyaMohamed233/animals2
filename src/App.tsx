/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { UserState, TranslationKeys, Animal, FootprintType } from './types';
import { TRANSLATIONS } from './utils/translations';
import { ANIMALS } from './data/animals';
import { audio } from './utils/audio';
import { checkAchievements } from './utils/achievements';
import AnimalCard from './components/AnimalCard';
import CallScreen from './components/CallScreen';
import FunFactsModal from './components/FunFactsModal';
import ParentPortal from './components/ParentPortal';
import DailyRewardModal from './components/DailyRewardModal';
import StickerBookModal from './components/StickerBookModal';
import AchievementsModal from './components/AchievementsModal';
import ConfettiEffect from './components/ConfettiEffect';
import SunMoonBackground from './components/SunMoonBackground';

import {
  Search,
  Star,
  Moon,
  Sun,
  Lock,
  Globe,
  Award,
  BookOpen,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'animal_call_v1_state';

const AMBIENT_BACKGROUNDS: Record<string, { day: string; night: string }> = {
  none: {
    day: 'from-sky-100 via-sky-50/50 to-amber-50 text-slate-800',
    night: 'from-slate-950 via-slate-900 to-indigo-950 text-slate-100',
  },
  forest: {
    day: 'from-emerald-100 via-green-50/50 to-teal-50 text-slate-800',
    night: 'from-emerald-950 via-slate-900 to-teal-950 text-slate-100',
  },
  farm: {
    day: 'from-amber-100 via-yellow-50/50 to-orange-50 text-slate-800',
    night: 'from-amber-950 via-slate-900 to-amber-950 text-slate-100',
  },
  jungle: {
    day: 'from-teal-100 via-emerald-50/50 to-lime-50 text-slate-800',
    night: 'from-teal-950 via-slate-900 to-emerald-950 text-slate-100',
  },
  ocean: {
    day: 'from-sky-100 via-blue-50/50 to-cyan-50 text-slate-800',
    night: 'from-sky-950 via-slate-900 to-cyan-950 text-slate-100',
  },
  night: {
    day: 'from-indigo-100 via-slate-50/50 to-purple-50 text-slate-800',
    night: 'from-indigo-950 via-slate-900 to-purple-950 text-slate-100',
  },
};

const AMBIENT_IMAGES: Record<string, { day: string; night: string }> = {
  none: {
    day: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=1200&auto=format&fit=crop',
    night: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1200&auto=format&fit=crop',
  },
  forest: {
    day: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop',
    night: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200&auto=format&fit=crop',
  },
  farm: {
    day: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop',
    night: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=1200&auto=format&fit=crop',
  },
  jungle: {
    day: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1200&auto=format&fit=crop',
    night: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1200&auto=format&fit=crop',
  },
  ocean: {
    day: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1200&auto=format&fit=crop',
    night: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop',
  },
  night: {
    day: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=1200&auto=format&fit=crop',
    night: 'https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?q=80&w=1200&auto=format&fit=crop',
  },
};

export default function App() {
  // --- STATE INITIALIZATION ---
  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.requirePermissionToEndCall === undefined) {
          parsed.requirePermissionToEndCall = false;
        } else {
          // Force set to false for existing users so they can end call without permission immediately
          parsed.requirePermissionToEndCall = false;
        }
        // Ensure all 52 animals are in parsed state (handling potential migration or additions)
        const updatedAnimalsState = { ...parsed.animalsState };
        ANIMALS.forEach(a => {
          if (!updatedAnimalsState[a.id]) {
            updatedAnimalsState[a.id] = {
              id: a.id,
              nickname: '',
              avatarIndex: 0,
              isFavorite: false,
              completedCallsCount: 0,
            };
          }
        });
        return {
          ...parsed,
          animalsState: updatedAnimalsState,
        };
      } catch (e) {
        console.warn('Failed parsing state, reset to default.');
      }
    }

    // Default Fresh State
    const defaultState: UserState = {
      language: 'en',
      themeMode: 'day',
      soundEnabled: true,
      musicEnabled: true,
      animationsEnabled: true,
      ambientSound: 'none',
      stickersUnlocked: [],
      dailyRewardClaimedAt: null,
      animalsState: {},
      achievements: {},
      totalCalls: 0,
      requirePermissionToEndCall: false,
    };

    ANIMALS.forEach(a => {
      defaultState.animalsState[a.id] = {
        id: a.id,
        nickname: '',
        avatarIndex: 0,
        isFavorite: false,
        completedCallsCount: 0,
      };
    });

    return defaultState;
  });

  // --- UI NAVIGATION & ROUTING STATES ---
  const [activeCallAnimal, setActiveCallAnimal] = useState<Animal | null>(null);
  const [showFunFactsAnimal, setShowFunFactsAnimal] = useState<Animal | null>(null);
  
  // Modals
  const [showParentPortal, setShowParentPortal] = useState(false);
  const [showDailyReward, setShowDailyReward] = useState(false);
  const [showStickerBook, setShowStickerBook] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  // Confetti Particle state
  const [confettiActive, setConfettiActive] = useState(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('alphabetical'); // alphabetical, favorites, category...

  // Ambient sound dropdown state & click outside handler
  const [showAmbientDropdown, setShowAmbientDropdown] = useState(false);
  const ambientDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ambientDropdownRef.current && !ambientDropdownRef.current.contains(event.target as Node)) {
        setShowAmbientDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Helper Translation shortcut
  const t: TranslationKeys = TRANSLATIONS[userState.language];

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userState));
  }, [userState]);

  // --- SYSTEM LEVEL AUDIO RIGGING ---
  // Background music effect
  const musicEnabledPrimitive = userState.musicEnabled;
  const isMutedPrimitive = !userState.soundEnabled;
  useEffect(() => {
    if (musicEnabledPrimitive && !isMutedPrimitive) {
      audio.startBackgroundMusic();
    } else {
      audio.stopBackgroundMusic();
    }
    return () => audio.stopBackgroundMusic();
  }, [musicEnabledPrimitive, isMutedPrimitive]);

  // Ambient noises trigger effect
  const ambientSoundPrimitive = userState.ambientSound;
  useEffect(() => {
    audio.setAmbientSound(ambientSoundPrimitive);
    return () => audio.stopAmbientSounds();
  }, [ambientSoundPrimitive]);

  // Handle document class for day/night colors
  const themeModePrimitive = userState.themeMode;
  useEffect(() => {
    const root = document.documentElement;
    if (themeModePrimitive === 'night') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeModePrimitive]);

  // --- HELPER WRAPPER STATE UPDATER ---
  const updateUserState = (updater: (prev: UserState) => UserState) => {
    setUserState(prev => {
      const nextState = updater(prev);
      
      // Perform dynamic achievements check on state updates!
      const newlyUnlocked = checkAchievements(nextState);
      if (newlyUnlocked.length > 0) {
        // Unlock newly earned badges
        const updatedAchievements = { ...nextState.achievements };
        newlyUnlocked.forEach(id => {
          updatedAchievements[id] = true;
        });

        // Trigger visual confetti
        setConfettiActive(true);
        audio.playConfettiChime();

        return {
          ...nextState,
          achievements: updatedAchievements,
        };
      }
      return nextState;
    });
  };

  // --- TRIGGER ACTION HANDLERS ---
  const handleCallAnimal = (animal: Animal) => {
    audio.playClickSound();
    setActiveCallAnimal(animal);
  };

  const handleToggleFavorite = (animalId: string) => {
    updateUserState(prev => {
      const updated = { ...prev.animalsState };
      const cur = updated[animalId];
      if (cur) {
        updated[animalId] = { ...cur, isFavorite: !cur.isFavorite };
      }
      return { ...prev, animalsState: updated };
    });
  };

  const handleRenameAnimal = (animalId: string, newName: string) => {
    updateUserState(prev => {
      const updated = { ...prev.animalsState };
      if (updated[animalId]) {
        updated[animalId] = { ...updated[animalId], nickname: newName };
      }
      return { ...prev, animalsState: updated };
    });
  };

  // Switch sound mute easily from quick dashboard
  const handleToggleMute = () => {
    audio.playClickSound();
    updateUserState(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  const handleToggleMusic = () => {
    audio.playClickSound();
    updateUserState(prev => ({
      ...prev,
      musicEnabled: !prev.musicEnabled,
    }));
  };

  const handleToggleTheme = () => {
    audio.playClickSound();
    updateUserState(prev => ({
      ...prev,
      themeMode: prev.themeMode === 'day' ? 'night' : 'day',
    }));
  };

  const handleToggleLanguage = () => {
    audio.playClickSound();
    updateUserState(prev => ({
      ...prev,
      language: prev.language === 'en' ? 'ar' : 'en',
    }));
  };

  // Callback on finishing phone call
  const handleHangUpCall = () => {
    if (activeCallAnimal) {
      const finishedAnimal = activeCallAnimal;
      setActiveCallAnimal(null);
      // Automatically pop up the fun facts & rewards dashboard
      setShowFunFactsAnimal(finishedAnimal);
      setConfettiActive(true);
      
      // Cleanly resume the chosen ambient atmosphere sounds if any
      audio.setAmbientSound(userState.ambientSound);
    }
  };

  // --- COMPUTED ANIMALS LIST (FILTERING & SORTING) ---
  const filteredAndSortedAnimals = useMemo(() => {
    // 1. Search Query
    let list = ANIMALS.filter(animal => {
      const original = (userState.language === 'ar' ? animal.originalNameAr : animal.originalName).toLowerCase();
      const nickname = (userState.animalsState[animal.id]?.nickname || '').toLowerCase();
      const query = searchQuery.toLowerCase();
      return original.includes(query) || nickname.includes(query);
    });

    // 2. Category Filter
    if (activeCategory !== 'all') {
      list = list.filter(a => a.category === activeCategory);
    }

    // 3. Sorting
    if (sortBy === 'alphabetical') {
      list.sort((a, b) => {
        const nameA = (userState.animalsState[a.id]?.nickname || (userState.language === 'ar' ? a.originalNameAr : a.originalName)).toLowerCase();
        const nameB = (userState.animalsState[b.id]?.nickname || (userState.language === 'ar' ? b.originalNameAr : b.originalName)).toLowerCase();
        return nameA.localeCompare(nameB);
      });
    } else if (sortBy === 'favorites') {
      list.sort((a, b) => {
        const favA = userState.animalsState[a.id]?.isFavorite ? 1 : 0;
        const favB = userState.animalsState[b.id]?.isFavorite ? 1 : 0;
        return favB - favA; // Favorites first
      });
    } else if (sortBy === 'calls') {
      list.sort((a, b) => {
        const callsA = userState.animalsState[a.id]?.completedCallsCount || 0;
        const callsB = userState.animalsState[b.id]?.completedCallsCount || 0;
        return callsB - callsA; // Most called first
      });
    }

    return list;
  }, [searchQuery, activeCategory, sortBy, userState.animalsState, userState.language]);

  // Determine current footprint background pattern
  const currentFootprintType = useMemo<FootprintType>(() => {
    if (activeCategory === 'birds') return 'bird';
    if (activeCategory === 'farm') return 'hoof';
    if (activeCategory === 'ocean') return 'webbed';
    if (activeCategory === 'insects') return 'insect';
    if (activeCategory === 'reptiles') return 'slither';
    return 'paw'; // Default wild paws
  }, [activeCategory]);

  const currentAmbientBg = AMBIENT_BACKGROUNDS[userState.ambientSound] || AMBIENT_BACKGROUNDS.none;
  const backgroundClasses = userState.themeMode === 'night' ? currentAmbientBg.night : currentAmbientBg.day;

  return (
    <div
      dir={userState.language === 'ar' ? 'rtl' : 'ltr'}
      className={`min-h-screen relative flex flex-col justify-between overflow-x-hidden select-none transition-colors duration-500 font-sans ${backgroundClasses}`}
    >
      {/* Immersive background image matching the selected ambient sound */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out z-0 pointer-events-none"
        style={{ 
          backgroundImage: `url(${userState.themeMode === 'night' ? AMBIENT_IMAGES[userState.ambientSound].night : AMBIENT_IMAGES[userState.ambientSound].day})`,
        }}
      />
      {/* Overlay to ensure maximum contrast and readability */}
      <div 
        className={`absolute inset-0 z-0 transition-all duration-700 pointer-events-none ${
          userState.themeMode === 'night' 
            ? 'bg-slate-950/70 backdrop-blur-[1px]' 
            : 'bg-white/50 backdrop-blur-[1px]'
        }`}
      />

      {/* Visual Confetti Sparkles Canvas */}
      <ConfettiEffect active={confettiActive} onComplete={() => setConfettiActive(false)} />

      {/* SUN AND MOON THEME BACKGROUND */}
      {userState.animationsEnabled && <SunMoonBackground themeMode={userState.themeMode} />}

      {/* -------------------- SKY SCENIC AMBIENT OVERLAYS -------------------- */}
      {userState.animationsEnabled && (
        <div className="absolute inset-x-0 top-0 h-64 pointer-events-none overflow-hidden select-none z-0">
          {userState.themeMode === 'day' ? (
            /* Day Mode clouds drifting */
            <>
              <div className="absolute top-10 w-28 h-8 bg-white/70 rounded-full blur-[1px] animate-cloud-slow" />
              <div className="absolute top-24 w-36 h-10 bg-white/50 rounded-full blur-[2px] animate-cloud-medium" />
              <div className="absolute top-4 left-[10%] text-6xl animate-pulse-glow">☀️</div>
            </>
          ) : (
            /* Night Mode sleeping crescent moon & twinkling particles */
            <>
              <div className="absolute top-10 right-[15%] text-6xl animate-bounce">🌙</div>
              <div className="absolute top-16 right-[25%] text-xs opacity-40 animate-pulse">⭐</div>
              <div className="absolute top-8 left-[30%] text-sm opacity-60 animate-ping">✨</div>
              <div className="absolute top-28 left-[15%] text-xs opacity-50 animate-pulse">⭐</div>
            </>
          )}
        </div>
      )}

      {/* -------------------- MAIN DASHBOARD HEADER -------------------- */}
      <header className="relative w-full max-w-7xl mx-auto px-4 pt-6 pb-2 z-10 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* App Title */}
        <div className="flex items-center gap-3 bg-white/50 dark:bg-slate-800/50 p-2 px-5 rounded-3xl backdrop-blur-md shadow-sm border border-white/20">
          <div className="text-3xl animate-wiggle-slow">🦁</div>
          <div>
            <h1 className="text-2xl font-extrabold font-fredoka tracking-tight text-slate-800 dark:text-slate-100 leading-none">
              {t.appName}
            </h1>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-300 tracking-wider uppercase mt-1 leading-none">
              {t.homeTitle}
            </p>
          </div>
        </div>

        {/* Floating Quick Settings Widgets Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 bg-white/50 dark:bg-slate-800/50 p-2.5 rounded-3xl backdrop-blur-md shadow-sm border border-white/20">
          {/* Day / Night Theme Switch */}
          <button
            onClick={handleToggleTheme}
            className="p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-yellow-300 rounded-2xl shadow-sm transition transform active:scale-90 cursor-pointer"
          >
            {userState.themeMode === 'day' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Mute/Sound Switch */}
          <button
            onClick={handleToggleMute}
            className="p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-100 rounded-2xl shadow-sm transition transform active:scale-90 cursor-pointer"
          >
            {userState.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Bilingual Language Switch */}
          <button
            onClick={handleToggleLanguage}
            className="p-3 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-2xl shadow-sm font-extrabold text-sm transition transform active:scale-90 flex items-center gap-1 cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            <span>{userState.language === 'en' ? 'AR' : 'EN'}</span>
          </button>

          {/* Stickers Book */}
          <button
            onClick={() => {
              audio.playClickSound();
              setShowStickerBook(true);
            }}
            className="p-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-2xl shadow-sm font-extrabold text-sm transition transform active:scale-90 flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span className="font-fredoka">{t.stickersTitle} ({userState.stickersUnlocked.length})</span>
          </button>

          {/* Achievements badge */}
          <button
            onClick={() => {
              audio.playClickSound();
              setShowAchievements(true);
            }}
            className="p-3 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-2xl shadow-sm font-extrabold text-sm transition transform active:scale-90 flex items-center gap-1.5 cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span className="font-fredoka">🏆</span>
          </button>

          {/* Parents Gates Portal */}
          <button
            onClick={() => {
              audio.playClickSound();
              setShowParentPortal(true);
            }}
            className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-2xl shadow-sm font-extrabold text-sm transition transform active:scale-90 flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span className="font-fredoka">{t.parentsButtonLabel}</span>
          </button>
        </div>
      </header>

      {/* -------------------- DYNAMIC NATURE SOUND BAR -------------------- */}
      <div className="relative w-full max-w-7xl mx-auto px-4 py-2 z-30 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Quick Ambient noise panel */}
        <div ref={ambientDropdownRef} className="relative flex flex-col sm:flex-row items-center gap-3 bg-white/40 dark:bg-slate-800/40 p-3 rounded-3xl backdrop-blur-md border border-white/10 shadow-sm justify-between w-full sm:w-auto min-w-[280px] z-30">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-300 font-fredoka flex items-center gap-1.5">
            🌳 {t.ambientSoundTitle}
          </span>
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => {
                audio.playClickSound();
                setShowAmbientDropdown(!showAmbientDropdown);
              }}
              className="w-full sm:w-48 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 rounded-2xl font-bold text-xs flex items-center justify-between gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>
                {[
                  { id: 'none', label: t.ambientNone },
                  { id: 'forest', label: t.ambientForest },
                  { id: 'farm', label: t.ambientFarm },
                  { id: 'jungle', label: t.ambientJungle },
                  { id: 'ocean', label: t.ambientOcean },
                  { id: 'night', label: t.ambientNight },
                ].find(a => a.id === userState.ambientSound)?.label || t.ambientNone}
              </span>
              {showAmbientDropdown ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Dropdown list - Opens upwards above the button */}
            {showAmbientDropdown && (
              <div className="absolute left-0 right-0 bottom-full mb-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-xl overflow-hidden z-50 animate-fade-in divide-y divide-slate-50 dark:divide-slate-700/30">
                {[
                  { id: 'none', label: t.ambientNone },
                  { id: 'forest', label: t.ambientForest },
                  { id: 'farm', label: t.ambientFarm },
                  { id: 'jungle', label: t.ambientJungle },
                  { id: 'ocean', label: t.ambientOcean },
                  { id: 'night', label: t.ambientNight },
                ].map((ambient) => (
                  <button
                    key={ambient.id}
                    onClick={() => {
                      audio.playClickSound();
                      updateUserState(prev => ({ ...prev, ambientSound: ambient.id as any }));
                      setShowAmbientDropdown(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-xs font-bold transition-colors cursor-pointer flex items-center justify-between ${
                      userState.ambientSound === ambient.id
                        ? 'bg-emerald-500 text-white'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span>{ambient.label}</span>
                    {userState.ambientSound === ambient.id && (
                      <span className="w-2 h-2 rounded-full bg-white block" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bouncing Daily Reward box on main screen */}
        <div className="flex-shrink-0">
          <button
            onClick={() => {
              audio.playClickSound();
              setShowDailyReward(true);
            }}
            className="p-3.5 px-6 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-extrabold rounded-2xl shadow-md transition hover:scale-105 active:scale-95 flex items-center gap-2 text-sm cursor-pointer animate-pulse"
          >
            <span className="text-lg">🎁</span>
            <span className="font-fredoka">{t.dailySurpriseGift}</span>
          </button>
        </div>
      </div>

      {/* -------------------- SEARCH & SORTS NAVIGATION -------------------- */}
      <section className="relative w-full max-w-7xl mx-auto px-4 py-2 z-10 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Bar */}
          <div className="relative w-full md:max-w-md">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 ${
              userState.language === 'ar' ? 'right-4' : 'left-4'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`w-full py-3 bg-white/70 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-white/20 focus:outline-none focus:ring-4 focus:ring-amber-300 font-fredoka font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm ${
                userState.language === 'ar' ? 'pr-11 pl-10' : 'pl-11 pr-10'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute top-1/2 -translate-y-1/2 font-bold text-slate-400 hover:text-slate-600 text-sm ${
                  userState.language === 'ar' ? 'left-4' : 'right-4'
                }`}
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Sort Dropdown selector */}
          <div className="flex items-center gap-2 bg-white/40 dark:bg-slate-800/40 p-2 rounded-2xl backdrop-blur-md">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">{t.sortByLabel}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-slate-700 dark:text-slate-200 font-bold text-sm outline-none cursor-pointer focus:ring-0"
            >
              <option value="alphabetical" className="dark:bg-slate-800 text-slate-800 dark:text-slate-100">{t.sortAlphabetical}</option>
              <option value="favorites" className="dark:bg-slate-800 text-slate-800 dark:text-slate-100">{t.sortFavorites}</option>
              <option value="calls" className="dark:bg-slate-800 text-slate-800 dark:text-slate-100">{t.sortMostCalled}</option>
            </select>
          </div>
        </div>

        {/* Responsive horizontal category selector scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
          {[
            { id: 'all', label: t.categoryAll },
            { id: 'wild', label: t.categoryWild },
            { id: 'farm', label: t.categoryFarm },
            { id: 'birds', label: t.categoryBirds },
            { id: 'ocean', label: t.categoryOcean },
            { id: 'reptiles', label: t.categoryReptiles },
            { id: 'insects', label: t.categoryInsects },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                audio.playClickSound();
                setActiveCategory(cat.id);
              }}
              className={`px-5 py-2.5 rounded-full font-extrabold text-sm whitespace-nowrap transition transform active:scale-95 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-400 text-slate-900 shadow-md border-2 border-amber-500'
                  : 'bg-white/60 hover:bg-white/80 dark:bg-slate-800/60 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-2 border-transparent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* -------------------- RESPONSIVE ANIMALS GRID -------------------- */}
      <main className="relative w-full max-w-7xl mx-auto px-4 py-6 z-10 flex-1">
        {filteredAndSortedAnimals.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {filteredAndSortedAnimals.map((animal) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                userState={userState.animalsState[animal.id]}
                language={userState.language}
                onCall={() => handleCallAnimal(animal)}
                onToggleFavorite={() => handleToggleFavorite(animal.id)}
                onRename={(name) => handleRenameAnimal(animal.id, name)}
              />
            ))}
          </div>
        ) : (
          /* Empty Search Fallback */
          <div className="py-20 text-center space-y-4">
            <span className="text-7xl animate-bounce">🙈</span>
            <h3 className="text-xl font-extrabold text-slate-500 dark:text-slate-400 font-fredoka">
              No animal friends found matching search.
            </h3>
          </div>
        )}
      </main>

      {/* -------------------- INACTIVE / SYSTEM FOOTER -------------------- */}
      <footer className="relative w-full text-center py-6 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-950/5 dark:bg-slate-950/10 backdrop-blur-sm mt-12">
        <p>🐾 Animal Call — The Premium Simulated Call Applet for Toddlers</p>
        <p className="mt-1 text-[9px] lowercase">natively synthesized with HTML5 web oscillators — safe & offline always</p>
      </footer>

      {/* -------------------- TELEPHONE VOICE SIMULATOR APP ROUTER -------------------- */}

      {/* 1. CALL SCREEN OVERLAY */}
      {activeCallAnimal && (
        <CallScreen
          animal={activeCallAnimal}
          userState={userState}
          updateUserState={updateUserState}
          onHangUp={handleHangUpCall}
          onConfetti={() => setConfettiActive(true)}
        />
      )}

      {/* 2. POST CALL EDUCATIONAL FUN FACTS DISPLAY */}
      {showFunFactsAnimal && (
        <FunFactsModal
          animal={showFunFactsAnimal}
          userState={userState}
          updateUserState={updateUserState}
          onClose={() => {
            audio.playClickSound();
            setShowFunFactsAnimal(null);
          }}
        />
      )}

      {/* 3. PARENTS gate settings */}
      {showParentPortal && (
        <ParentPortal
          userState={userState}
          updateUserState={updateUserState}
          onClose={() => {
            audio.playClickSound();
            setShowParentPortal(false);
          }}
        />
      )}

      {/* 4. DAILY GIFT REWARD */}
      {showDailyReward && (
        <DailyRewardModal
          userState={userState}
          updateUserState={updateUserState}
          onClose={() => {
            audio.playClickSound();
            setShowDailyReward(false);
          }}
          onConfetti={() => setConfettiActive(true)}
        />
      )}

      {/* 5. STICKERS ALBUM */}
      {showStickerBook && (
        <StickerBookModal
          userState={userState}
          onClose={() => {
            audio.playClickSound();
            setShowStickerBook(false);
          }}
        />
      )}

      {/* 6. ACHIEVEMENTS MILESTONES */}
      {showAchievements && (
        <AchievementsModal
          userState={userState}
          onClose={() => {
            audio.playClickSound();
            setShowAchievements(false);
          }}
        />
      )}
    </div>
  );
}
