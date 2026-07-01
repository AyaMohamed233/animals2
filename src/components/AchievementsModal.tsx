/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserState, TranslationKeys } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { ACHIEVEMENTS_LIST } from '../utils/achievements';
import { audio } from '../utils/audio';
import { Award, Lock, Sparkles } from 'lucide-react';

interface AchievementsModalProps {
  userState: UserState;
  onClose: () => void;
}

export default function AchievementsModal({ userState, onClose }: AchievementsModalProps) {
  const t: TranslationKeys = TRANSLATIONS[userState.language];
  const unlockedMap = userState.achievements || {};

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto">
      <div
        id="achievements-book-card"
        dir={userState.language === 'ar' ? 'rtl' : 'ltr'}
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden transform animate-scale-up my-8"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold font-fredoka flex items-center gap-2">
              🏆 {t.achievementsTitle}
            </h2>
            <p className="text-xs font-semibold opacity-80 mt-1">
              {userState.language === 'ar'
                ? `لقد فتحت ${Object.values(unlockedMap).filter(Boolean).length} من أصل ٨ أوسمة خارقة!`
                : `You unlocked ${Object.values(unlockedMap).filter(Boolean).length} of 8 super badges!`}
            </p>
          </div>
          <button
            onClick={() => {
              audio.playClickSound();
              onClose();
            }}
            className="p-2 bg-slate-900/10 hover:bg-slate-900/20 text-slate-900 font-bold rounded-full transition"
          >
            ✕
          </button>
        </div>

        {/* List Grid */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-800">
          {ACHIEVEMENTS_LIST.map((ach) => {
            const isUnlocked = unlockedMap[ach.id] || false;

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-all duration-300 ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-amber-50 to-yellow-100/50 dark:from-slate-700 dark:to-slate-700/50 border-amber-300 shadow'
                    : 'bg-white dark:bg-slate-700 border-slate-100 dark:border-slate-800 opacity-60'
                }`}
              >
                {/* Badge Icon circle */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-inner relative flex-shrink-0 ${
                    isUnlocked
                      ? 'bg-amber-300 border-2 border-amber-400 text-slate-900 animate-wiggle-slow'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {isUnlocked ? ach.icon : <Lock className="w-6 h-6 text-slate-300" />}
                  {isUnlocked && (
                    <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-0.5 shadow animate-ping">
                      ✨
                    </div>
                  )}
                </div>

                {/* Badge text */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100 font-fredoka flex items-center gap-1.5">
                    {userState.language === 'ar' ? ach.titleAr : ach.title}
                    {isUnlocked && <span className="text-[10px] bg-amber-400 text-amber-950 font-bold px-1.5 py-0.5 rounded-full uppercase tracking-widest">UNLOCKED</span>}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-300 font-medium leading-relaxed mt-1">
                    {userState.language === 'ar' ? ach.descriptionAr : ach.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700 flex justify-center">
          <button
            onClick={() => {
              audio.playClickSound();
              onClose();
            }}
            className="w-full max-w-xs py-3 px-6 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-900 font-extrabold rounded-2xl shadow-md transition transform active:scale-95 text-center cursor-pointer"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
}
