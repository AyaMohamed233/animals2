/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserState, TranslationKeys, Animal } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { ANIMALS } from '../data/animals';
import { audio } from '../utils/audio';
import AnimalAvatar from './AnimalAvatar';

interface DailyRewardModalProps {
  userState: UserState;
  updateUserState: (updater: (prev: UserState) => UserState) => void;
  onClose: () => void;
  onConfetti: () => void;
}

export default function DailyRewardModal({
  userState,
  updateUserState,
  onClose,
  onConfetti,
}: DailyRewardModalProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [unlockedAnimal, setUnlockedAnimal] = useState<Animal | null>(null);

  const t: TranslationKeys = TRANSLATIONS[userState.language];

  // Check if claimed today already
  const lastClaimed = userState.dailyRewardClaimedAt;
  const todayStr = new Date().toISOString().split('T')[0];
  const hasClaimedToday = lastClaimed && lastClaimed.startsWith(todayStr);

  const handleOpenGift = () => {
    if (hasClaimedToday) return;

    audio.playClickSound();
    
    // Choose an animal sticker that hasn't been unlocked yet, or a random one
    const lockedAnimals = ANIMALS.filter(a => !userState.stickersUnlocked.includes(a.id));
    const selectionSource = lockedAnimals.length > 0 ? lockedAnimals : ANIMALS;
    const chosen = selectionSource[Math.floor(Math.random() * selectionSource.length)];

    setUnlockedAnimal(chosen);
    setIsOpened(true);
    audio.playConfettiChime();
    onConfetti();

    updateUserState(prev => {
      const stickers = [...prev.stickersUnlocked];
      if (!stickers.includes(chosen.id)) {
        stickers.push(chosen.id);
      }
      return {
        ...prev,
        dailyRewardClaimedAt: new Date().toISOString(),
        stickersUnlocked: stickers,
      };
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
      <div
        id="daily-reward-card"
        dir={userState.language === 'ar' ? 'rtl' : 'ltr'}
        className="w-full max-w-md p-6 bg-white rounded-3xl shadow-2xl border-4 border-rose-300 text-center transform transition-all"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold font-fredoka text-rose-500">
            {t.dailyRewardTitle}
          </h2>
          <button
            onClick={() => {
              audio.playClickSound();
              onClose();
            }}
            className="p-1 px-3 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold rounded-full transition"
          >
            ✕
          </button>
        </div>

        {!isOpened ? (
          <div className="py-8 space-y-6">
            {hasClaimedToday ? (
              <div className="space-y-4">
                <div className="text-7xl animate-bounce">😴</div>
                <p className="text-slate-600 font-fredoka text-lg font-bold">
                  {t.dailyRewardClaimed}
                </p>
                <p className="text-slate-400 text-sm">
                  {userState.language === 'ar' 
                    ? 'عد غداً للحصول على صديق مفاجئ آخر!' 
                    : 'Come back tomorrow for another surprise friend!'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Wobbly Glowing Gift Box */}
                <div
                  onClick={handleOpenGift}
                  className="w-48 h-48 mx-auto relative flex items-center justify-center bg-rose-50 rounded-full cursor-pointer animate-pulse hover:scale-110 transition-transform duration-300"
                >
                  <div className="text-8xl animate-bounce filter drop-shadow-xl select-none">
                    🎁
                  </div>
                  {/* Glowing rings */}
                  <div className="absolute inset-0 rounded-full border-4 border-rose-400/30 animate-ping" />
                </div>

                <button
                  onClick={handleOpenGift}
                  className="w-full py-4 px-6 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-extrabold text-xl rounded-2xl shadow-lg transform active:scale-95 transition cursor-pointer"
                >
                  {t.dailyRewardButton}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* REWARD SUCCESS CARD SCREEN */
          <div className="py-6 space-y-6 animate-scale-up">
            <div className="relative w-44 h-44 mx-auto flex items-center justify-center bg-yellow-50 rounded-full border-4 border-yellow-300 shadow-inner">
              {unlockedAnimal && (
                <AnimalAvatar
                  id={unlockedAnimal.id}
                  avatarIndex={0}
                  primaryColor={unlockedAnimal.primaryColor}
                  secondaryColor={unlockedAnimal.secondaryColor}
                  accentColor={unlockedAnimal.accentColor}
                  isSpeaking={false}
                  sizeClassName="w-36 h-36"
                />
              )}
              {/* Sticker badge ring */}
              <div className="absolute -bottom-2 bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                {userState.language === 'ar' ? 'تم فتح الملصق!' : 'STICKER UNLOCKED!'}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-extrabold text-slate-800 font-fredoka">
                {userState.language === 'ar' ? unlockedAnimal?.originalNameAr : unlockedAnimal?.originalName}
              </h3>
              <p className="text-rose-500 font-bold text-lg">
                {t.dailyRewardSlogan}
              </p>
            </div>

            <button
              onClick={() => {
                audio.playClickSound();
                onClose();
              }}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-xl rounded-2xl shadow-lg cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
