/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Animal, UserState, TranslationKeys } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { audio } from '../utils/audio';
import AnimalAvatar from './AnimalAvatar';
import { Star, Award, Tag, Sparkles, Home, Apple, Hourglass, Baby, Lightbulb, Check } from 'lucide-react';

interface FunFactsModalProps {
  animal: Animal;
  userState: UserState;
  updateUserState: (updater: (prev: UserState) => UserState) => void;
  onClose: () => void;
}

export default function FunFactsModal({
  animal,
  userState,
  updateUserState,
  onClose,
}: FunFactsModalProps) {
  const t: TranslationKeys = TRANSLATIONS[userState.language];
  const animalState = userState.animalsState[animal.id];
  const isFirstCall = (animalState?.completedCallsCount || 1) <= 1;

  // State for quick nickname editing
  const [nicknameInput, setNicknameInput] = useState(animalState?.nickname || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveNickname = (e: React.FormEvent) => {
    e.preventDefault();
    audio.playClickSound();
    updateUserState(prev => {
      const updated = { ...prev.animalsState };
      updated[animal.id] = {
        ...updated[animal.id],
        nickname: nicknameInput.trim(),
      };
      return { ...prev, animalsState: updated };
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleOutfitChange = (index: number) => {
    audio.playClickSound();
    updateUserState(prev => {
      const updated = { ...prev.animalsState };
      updated[animal.id] = {
        ...updated[animal.id],
        avatarIndex: index,
      };
      return { ...prev, animalsState: updated };
    });
  };

  const currentNickname = animalState?.nickname || (userState.language === 'ar' ? animal.originalNameAr : animal.originalName);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto">
      <div
        id="fun-facts-card"
        dir={userState.language === 'ar' ? 'rtl' : 'ltr'}
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-4 border-emerald-300 overflow-hidden transform animate-scale-up my-8"
      >
        {/* Glow Header */}
        <div
          className="p-6 text-center text-white space-y-2"
          style={{ backgroundColor: animal.primaryColor }}
        >
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            {userState.language === 'ar' ? 'تمت المكالمة بنجاح!' : 'Call Complete! 🎉'}
          </div>
          <h2 className="text-3xl font-extrabold font-fredoka flex items-center justify-center gap-2 drop-shadow-sm">
            {t.starStickerBadgeTitle}
          </h2>
        </div>

        {/* Inner Content Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* LEFT PANEL: AVATAR + DRESS UP + NICKNAME */}
          <div className="space-y-6 flex flex-col items-center">
            {/* Main Avatar Showcase */}
            <div
              className="relative p-4 rounded-full border-4 bg-yellow-50/50 dark:bg-slate-800"
              style={{ borderColor: animal.primaryColor }}
            >
              <AnimalAvatar
                id={animal.id}
                avatarIndex={animalState?.avatarIndex || 0}
                primaryColor={animal.primaryColor}
                secondaryColor={animal.secondaryColor}
                accentColor={animal.accentColor}
                isSpeaking={false}
                sizeClassName="w-40 h-40"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 font-extrabold text-xs px-3 py-1 rounded-full shadow flex items-center gap-1">
                <span>🏆</span>
                <span>{currentNickname}</span>
              </div>
            </div>

            {/* Custom Nickname Form */}
            <form onSubmit={handleSaveNickname} className="w-full max-w-xs space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block text-center">
                {t.editNickname}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nicknameInput}
                  onChange={(e) => setNicknameInput(e.target.value)}
                  placeholder={userState.language === 'ar' ? animal.originalNameAr : animal.originalName}
                  maxLength={12}
                  className="w-full text-center font-bold px-3 py-2 border-2 border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl focus:outline-none focus:border-amber-400 text-slate-800 dark:text-slate-100 font-fredoka text-sm"
                />
                <button
                  type="submit"
                  className="px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition flex items-center justify-center cursor-pointer"
                >
                  {isSaved ? <Check className="w-4 h-4" /> : t.saveNickname}
                </button>
              </div>
            </form>

            {/* Choose Cute Outfits */}
            <div className="w-full space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block text-center">
                {t.chooseAvatar}
              </label>
              <div className="flex justify-center gap-2">
                {['🐾', '🕶️', '🎈', '👑', '🧣'].map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOutfitChange(idx)}
                    className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center transition transform active:scale-90 text-lg cursor-pointer ${
                      (animalState?.avatarIndex || 0) === idx
                        ? 'bg-amber-400 text-white border-2 border-amber-600 shadow'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: REWARDS + FUN FACTS */}
          <div className="space-y-6">
            
            {/* 3 unlocked reward items */}
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {userState.language === 'ar' ? 'الجوائز التي تم فتحها:' : 'Claimed Unlocked Rewards:'}
              </h3>
              
              <div className="grid grid-cols-3 gap-2">
                {/* Reward 1: STAR */}
                <div className="flex flex-col items-center p-2 bg-amber-50 dark:bg-slate-700 rounded-xl border border-amber-200 text-center animate-scale-up">
                  <Star className="w-8 h-8 text-amber-500 fill-current animate-pulse" />
                  <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-300 mt-1 uppercase">Star ⭐</span>
                </div>

                {/* Reward 2: STICKER */}
                <div className="flex flex-col items-center p-2 bg-rose-50 dark:bg-slate-700 rounded-xl border border-rose-200 text-center animate-scale-up" style={{ animationDelay: '150ms' }}>
                  <Tag className="w-8 h-8 text-rose-500 fill-current" />
                  <span className="text-[10px] font-extrabold text-rose-700 dark:text-rose-300 mt-1 uppercase">Sticker 🏷️</span>
                </div>

                {/* Reward 3: BADGE */}
                <div className="flex flex-col items-center p-2 bg-emerald-50 dark:bg-slate-700 rounded-xl border border-emerald-200 text-center animate-scale-up" style={{ animationDelay: '300ms' }}>
                  <Award className="w-8 h-8 text-emerald-500 animate-bounce" />
                  <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 mt-1 uppercase">Badge 🎖️</span>
                </div>
              </div>
            </div>

            {/* EDUCATIONAL FUN FACTS DISPLAY */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {userState.language === 'ar' ? 'حقائق ممتعة للأطفال:' : 'Educational Fun Facts:'}
              </h3>

              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-3.5 text-sm">
                {/* HABITAT */}
                <div className="flex items-start gap-3">
                  <Home className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                  <div>
                    <span className="font-extrabold text-slate-700 dark:text-slate-300 block text-xs">
                      {t.factHabitat}
                    </span>
                    <span className="text-slate-600 dark:text-slate-200 font-medium text-sm">
                      {userState.language === 'ar' ? animal.habitatAr : animal.habitat}
                    </span>
                  </div>
                </div>

                {/* FOOD */}
                <div className="flex items-start gap-3">
                  <Apple className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  <div>
                    <span className="font-extrabold text-slate-700 dark:text-slate-300 block text-xs">
                      {t.factFood}
                    </span>
                    <span className="text-slate-600 dark:text-slate-200 font-medium text-sm">
                      {userState.language === 'ar' ? animal.foodAr : animal.food}
                    </span>
                  </div>
                </div>

                {/* LIFESPAN */}
                <div className="flex items-start gap-3">
                  <Hourglass className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <div>
                    <span className="font-extrabold text-slate-700 dark:text-slate-300 block text-xs">
                      {t.factLifespan}
                    </span>
                    <span className="text-slate-600 dark:text-slate-200 font-medium text-sm">
                      {userState.language === 'ar' ? animal.lifeSpanAr : animal.lifeSpan}
                    </span>
                  </div>
                </div>

                {/* BABY NAME */}
                <div className="flex items-start gap-3">
                  <Baby className="w-5 h-5 text-sky-500 flex-shrink-0" />
                  <div>
                    <span className="font-extrabold text-slate-700 dark:text-slate-300 block text-xs">
                      {t.factBaby}
                    </span>
                    <span className="text-slate-600 dark:text-slate-200 font-semibold text-sm">
                      {userState.language === 'ar' ? animal.babyNameAr : animal.babyName}
                    </span>
                  </div>
                </div>

                {/* COOL FACT */}
                <div className="flex items-start gap-3 p-3 bg-amber-50/50 dark:bg-slate-700/50 rounded-xl border border-amber-100 dark:border-amber-900/50">
                  <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 animate-pulse" />
                  <div>
                    <span className="font-extrabold text-amber-800 dark:text-amber-200 block text-xs">
                      {t.factInteresting}
                    </span>
                    <p className="text-slate-600 dark:text-slate-200 text-xs leading-relaxed mt-0.5">
                      {userState.language === 'ar' ? animal.interestingFactAr : animal.interestingFact}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Close and proceed */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex justify-center">
          <button
            onClick={() => {
              audio.playClickSound();
              onClose();
            }}
            className="w-full max-w-sm py-4 px-6 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-lg rounded-2xl shadow-md transition transform active:scale-95 text-center cursor-pointer"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
}
