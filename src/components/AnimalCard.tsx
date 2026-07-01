/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Animal, UserAnimalState } from '../types';
import AnimalAvatar from './AnimalAvatar';
import { Heart, Edit2, Check, Phone, Star } from 'lucide-react';
import { audio } from '../utils/audio';

interface AnimalCardProps {
  key?: string;
  animal: Animal;
  userState: UserAnimalState;
  language: 'en' | 'ar';
  onCall: () => void;
  onToggleFavorite: () => void;
  onRename: (newName: string) => void;
}

export default function AnimalCard({
  animal,
  userState,
  language,
  onCall,
  onToggleFavorite,
  onRename,
}: AnimalCardProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userState?.nickname || '');

  const originalName = language === 'ar' ? animal.originalNameAr : animal.originalName;
  const currentNickname = userState?.nickname || originalName;
  const isFavorite = userState?.isFavorite || false;
  const completedCalls = userState?.completedCallsCount || 0;

  const handleSaveRename = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    audio.playClickSound();
    onRename(tempName.trim());
    setIsEditingName(false);
  };

  const startRenameMode = () => {
    audio.playClickSound();
    setTempName(userState?.nickname || '');
    setIsEditingName(true);
  };

  return (
    <div
      id={`animal-card-${animal.id}`}
      className="relative flex flex-col items-center justify-between p-4 bg-white/70 dark:bg-slate-800/80 backdrop-blur-md rounded-3xl shadow-lg border-2 hover:border-amber-400 dark:hover:border-amber-400 transition-all duration-300 hover:shadow-2xl overflow-hidden group"
      style={{
        borderColor: isFavorite ? '#F59E0B' : '#E2E8F0',
      }}
    >
      {/* Floating Sparkle for unlocked sticker */}
      {completedCalls > 0 && (
        <div className="absolute top-3 left-3 bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm animate-pulse z-10 flex items-center gap-1">
          <span>🏷️</span>
          <span>{language === 'ar' ? 'ملصق' : 'STICKER'}</span>
        </div>
      )}

      {/* Favorite Ribbon Star Button */}
      <button
        onClick={() => {
          audio.playClickSound();
          onToggleFavorite();
        }}
        className={`absolute top-3 right-3 p-2 rounded-full shadow-sm transition-transform active:scale-75 cursor-pointer z-10 ${
          isFavorite
            ? 'bg-amber-400 text-white'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500'
        }`}
      >
        <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
      </button>

      {/* Cute Interactive Character Avatar */}
      <div
        onClick={onCall}
        className="w-full aspect-square max-w-[140px] flex items-center justify-center cursor-pointer relative"
      >
        <AnimalAvatar
          id={animal.id}
          avatarIndex={userState?.avatarIndex || 0}
          primaryColor={animal.primaryColor}
          secondaryColor={animal.secondaryColor}
          accentColor={animal.accentColor}
          isSpeaking={false}
          sizeClassName="w-28 h-28 sm:w-32 sm:h-32"
          className=""
        />
        {/* Play call indicator on hover */}
        <div className="absolute inset-0 bg-emerald-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none" />
      </div>

      {/* Editable nickname/original details */}
      <div className="w-full text-center mt-3 mb-2 space-y-1 min-h-[50px] flex flex-col justify-center">
        {isEditingName ? (
          <form onSubmit={handleSaveRename} className="flex items-center gap-1.5 px-1 justify-center">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder={originalName}
              maxLength={12}
              required
              className="w-full text-center text-sm font-bold bg-slate-50 dark:bg-slate-700 py-1 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 font-fredoka text-slate-800 dark:text-slate-100"
            />
            <button
              type="submit"
              className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-1">
            <span className="text-lg font-extrabold font-fredoka text-slate-800 dark:text-slate-100 truncate max-w-[120px]">
              {currentNickname}
            </span>
            <button
              onClick={startRenameMode}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 rounded transition cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Display original name if customized */}
        {userState?.nickname && (
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            {originalName}
          </p>
        )}
      </div>

      {/* CALL BUTTON */}
      <button
        onClick={() => {
          audio.playClickSound();
          onCall();
        }}
        className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold rounded-2xl shadow-md transition transform active:scale-95 flex items-center justify-center gap-2 text-sm cursor-pointer"
      >
        <Phone className="w-4 h-4 fill-current animate-pulse" />
        <span className="font-fredoka">{language === 'ar' ? 'اتصال' : 'CALL'}</span>
      </button>
    </div>
  );
}
