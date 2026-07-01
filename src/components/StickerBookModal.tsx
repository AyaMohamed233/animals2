/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserState, TranslationKeys } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { ANIMALS } from '../data/animals';
import { audio } from '../utils/audio';
import AnimalAvatar from './AnimalAvatar';

interface StickerBookModalProps {
  userState: UserState;
  onClose: () => void;
}

export default function StickerBookModal({ userState, onClose }: StickerBookModalProps) {
  const t: TranslationKeys = TRANSLATIONS[userState.language];
  const stickers = userState.stickersUnlocked || [];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto">
      <div
        id="sticker-book-card"
        dir={userState.language === 'ar' ? 'rtl' : 'ltr'}
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-4 border-yellow-300 overflow-hidden transform animate-scale-up my-8"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold font-fredoka flex items-center gap-2">
              🦄 {userState.language === 'ar' ? 'دفتر الملصقات والنجوم' : 'My Sticker & Badge Book'}
            </h2>
            <p className="text-xs font-semibold opacity-80 mt-1">
              {userState.language === 'ar'
                ? `لقد جمعت ${stickers.length} من أصل ${ANIMALS.length} ملصقاً! 🏷️`
                : `You collected ${stickers.length} of ${ANIMALS.length} stickers! 🏷️`}
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

        {/* Stickers Grid */}
        <div className="p-6 max-h-[60vh] overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 bg-slate-50 dark:bg-slate-800">
          {ANIMALS.map((animal) => {
            const isUnlocked = stickers.includes(animal.id);
            const nickname = userState.animalsState[animal.id]?.nickname;
            const displayName = nickname || (userState.language === 'ar' ? animal.originalNameAr : animal.originalName);

            return (
              <div
                key={animal.id}
                onClick={() => {
                  if (isUnlocked) {
                    audio.playClickSound();
                    // speak name on tap
                    if ('speechSynthesis' in window) {
                      window.speechSynthesis.cancel();
                      const utterance = new SpeechSynthesisUtterance(displayName);
                      utterance.lang = userState.language === 'ar' ? 'ar-SA' : 'en-US';
                      utterance.pitch = 1.3;
                      window.speechSynthesis.speak(utterance);
                    }
                  }
                }}
                className={`flex flex-col items-center p-2.5 rounded-2xl bg-white dark:bg-slate-700 shadow-sm border-2 transition transform active:scale-95 ${
                  isUnlocked
                    ? 'border-yellow-300 hover:rotate-3 cursor-pointer'
                    : 'border-slate-200 opacity-40 select-none'
                }`}
              >
                {/* Sticker Frame */}
                <div className="relative w-full aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden">
                  {isUnlocked ? (
                    <>
                      <AnimalAvatar
                        id={animal.id}
                        avatarIndex={userState.animalsState[animal.id]?.avatarIndex || 0}
                        primaryColor={animal.primaryColor}
                        secondaryColor={animal.secondaryColor}
                        accentColor={animal.accentColor}
                        isSpeaking={false}
                        sizeClassName="w-16 h-16 sm:w-20 sm:h-20"
                      />
                      {/* Little Badge Star */}
                      <div className="absolute top-1 right-1 bg-yellow-400 text-[10px] p-0.5 rounded-full shadow">
                        ⭐
                      </div>
                    </>
                  ) : (
                    /* Grey placeholder silhouette */
                    <span className="text-3xl filter grayscale select-none">❓</span>
                  )}
                </div>

                <span className="text-xs font-bold font-fredoka text-slate-700 dark:text-slate-200 mt-2 truncate w-full text-center">
                  {isUnlocked ? displayName : '???'}
                </span>
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
            className="w-full max-w-xs py-3 px-6 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 font-extrabold rounded-2xl shadow-md transition transform active:scale-95 text-center cursor-pointer"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
}
