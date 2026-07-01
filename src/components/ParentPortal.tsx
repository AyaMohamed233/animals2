/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserState, TranslationKeys } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { audio } from '../utils/audio';

interface ParentPortalProps {
  userState: UserState;
  updateUserState: (updater: (prev: UserState) => UserState) => void;
  onClose: () => void;
}

export default function ParentPortal({
  userState,
  updateUserState,
  onClose,
}: ParentPortalProps) {
  const [isLocked, setIsLocked] = useState(true);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState<'+' | 'x'>('+');
  const [answerInput, setAnswerInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const t: TranslationKeys = TRANSLATIONS[userState.language];

  const [confirmResetProgress, setConfirmResetProgress] = useState(false);
  const [confirmResetNames, setConfirmResetNames] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Generate a random children's safety math question
  useEffect(() => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 6) + 2;
    const op = Math.random() > 0.5 ? '+' : 'x';
    setNum1(n1);
    setNum2(n2);
    setOperator(op as '+' | 'x');
  }, []);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audio.playClickSound();

    const expectedAnswer = operator === '+' ? num1 + num2 : num1 * num2;
    if (parseInt(answerInput, 10) === expectedAnswer) {
      setIsLocked(false);
      setErrorMsg('');
    } else {
      setErrorMsg(t.parentGateIncorrect);
      setAnswerInput('');
    }
  };

  const handleResetProgress = () => {
    audio.playClickSound();
    updateUserState(prev => {
      const resetAnimals: Record<string, any> = {};
      Object.keys(prev.animalsState).forEach(id => {
        resetAnimals[id] = {
          id,
          nickname: '',
          avatarIndex: 0,
          isFavorite: false,
          completedCallsCount: 0,
        };
      });
      return {
        ...prev,
        totalCalls: 0,
        stickersUnlocked: [],
        achievements: {},
        animalsState: resetAnimals,
      };
    });
    setSuccessMsg(t.resetSuccess);
    setConfirmResetProgress(false);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleResetNames = () => {
    audio.playClickSound();
    updateUserState(prev => {
      const resetAnimals = { ...prev.animalsState };
      Object.keys(resetAnimals).forEach(id => {
        resetAnimals[id].nickname = '';
      });
      return {
        ...prev,
        animalsState: resetAnimals,
      };
    });
    setSuccessMsg(t.resetSuccess);
    setConfirmResetNames(false);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleExportConfig = () => {
    audio.playClickSound();
    const configStr = JSON.stringify(userState, null, 2);
    navigator.clipboard.writeText(configStr);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 3000);
  };

  // Sound Sliders
  const [musicVol, setMusicVol] = useState(30);
  const [soundVol, setSoundVol] = useState(80);

  const handleMusicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setMusicVol(val);
    audio.setMusicVolume(val / 100);
  };

  const handleSoundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setSoundVol(val);
    audio.setSoundVolume(val / 100);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
      <div
        id="parent-gate-card"
        dir={userState.language === 'ar' ? 'rtl' : 'ltr'}
        className="w-full max-w-lg overflow-hidden bg-white rounded-3xl shadow-2xl border-4 border-amber-300 transform transition-all duration-300 scale-100"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 flex justify-between items-center">
          <h2 className="text-2xl font-bold font-fredoka flex items-center gap-2">
            {t.parentGateTitle}
          </h2>
          <button
            onClick={() => {
              audio.playClickSound();
              onClose();
            }}
            className="p-2 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-900 font-bold"
          >
            ✕
          </button>
        </div>

        {isLocked ? (
          /* MATH LOCK PORTAL */
          <div className="p-8 text-center">
            <p className="text-lg text-slate-600 mb-6 font-medium">
              {t.parentGateSolve}
            </p>
            <div className="text-4xl font-extrabold text-amber-600 mb-6 bg-amber-50 py-4 px-6 rounded-2xl border border-amber-200 inline-block font-mono tracking-widest">
              {num1} {operator === 'x' ? '×' : '+'} {num2} = ?
            </div>

            <form onSubmit={handleUnlockSubmit} className="space-y-4 max-w-xs mx-auto">
              <input
                type="number"
                value={answerInput}
                onChange={e => setAnswerInput(e.target.value)}
                placeholder="?"
                required
                autoFocus
                className="w-full text-center text-3xl font-bold py-3 px-4 border-4 border-slate-200 rounded-2xl focus:border-amber-400 focus:outline-none font-mono"
              />
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-xl rounded-2xl shadow-md transform transition active:scale-95 cursor-pointer"
              >
                {t.enterParentsArea}
              </button>
            </form>

            {errorMsg && (
              <p className="text-rose-500 font-bold mt-4 animate-bounce">
                {errorMsg}
              </p>
            )}
          </div>
        ) : (
          /* PARENTS PANEL CONTROLS */
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {successMsg && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded-2xl text-center">
                {successMsg}
              </div>
            )}

            {/* Title */}
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-800 font-fredoka mb-1">
                {t.parentSectionTitle}
              </h3>
              <p className="text-xs text-slate-400">
                {t.parentPortalDesc}
              </p>
            </div>

            {/* Sound sliders */}
            <div className="space-y-4 bg-slate-50 p-4 rounded-2xl">
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">
                  {t.musicVolume} ({musicVol}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={musicVol}
                  onChange={handleMusicChange}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">
                  {t.soundVolume} ({soundVol}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soundVol}
                  onChange={handleSoundChange}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Call Settings */}
            <div className="bg-slate-50 p-4 rounded-2xl">
              <label className="flex items-center justify-between cursor-pointer gap-4">
                <div className="flex flex-col flex-1">
                  <span className="text-sm font-bold text-slate-700">
                    {t.requirePermissionToEndCallLabel}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    {t.requirePermissionToEndCallDesc}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={userState.requirePermissionToEndCall}
                  onChange={(e) => {
                    audio.playClickSound();
                    updateUserState(prev => ({
                      ...prev,
                      requirePermissionToEndCall: e.target.checked,
                    }));
                  }}
                  className="w-6 h-6 accent-amber-500 cursor-pointer rounded-lg border-2 border-slate-300 focus:ring-0"
                />
              </label>
            </div>

            {/* Management Buttons */}
            <div className="space-y-3">
              {confirmResetNames ? (
                <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 space-y-3">
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-300 leading-relaxed">
                    {t.confirmResetNames}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleResetNames}
                      className="flex-1 py-2 px-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs transition cursor-pointer"
                    >
                      {userState.language === 'ar' ? 'نعم، إعادة تعيين' : 'Yes, Reset'}
                    </button>
                    <button
                      onClick={() => setConfirmResetNames(false)}
                      className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs transition cursor-pointer"
                    >
                      {userState.language === 'ar' ? 'إلغاء' : 'Cancel'}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    audio.playClickSound();
                    setConfirmResetNames(true);
                    setConfirmResetProgress(false);
                  }}
                  className="w-full py-3 px-4 text-sm font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition cursor-pointer"
                >
                  {t.resetNames}
                </button>
              )}

              {confirmResetProgress ? (
                <div className="bg-rose-50 dark:bg-rose-950/20 p-4 rounded-2xl border border-rose-200 dark:border-rose-900/50 space-y-3">
                  <p className="text-xs font-bold text-rose-800 dark:text-rose-300 leading-relaxed">
                    {t.confirmResetProgress}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleResetProgress}
                      className="flex-1 py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs transition cursor-pointer"
                    >
                      {userState.language === 'ar' ? 'نعم، إعادة تعيين' : 'Yes, Reset'}
                    </button>
                    <button
                      onClick={() => setConfirmResetProgress(false)}
                      className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs transition cursor-pointer"
                    >
                      {userState.language === 'ar' ? 'إلغاء' : 'Cancel'}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    audio.playClickSound();
                    setConfirmResetProgress(true);
                    setConfirmResetNames(false);
                  }}
                  className="w-full py-3 px-4 text-sm font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition cursor-pointer"
                >
                  {t.resetProgress}
                </button>
              )}

              <button
                onClick={handleExportConfig}
                className="w-full py-3 px-4 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
              >
                {t.exportSettings}
              </button>

              {copiedMessage && (
                <p className="text-xs font-bold text-emerald-500 text-center animate-pulse">
                  {t.alertConfigCopied}
                </p>
              )}
            </div>

            {/* Privacy Section */}
            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
              <h4 className="text-sm font-bold text-blue-800 mb-1">
                {t.privacyTitle}
              </h4>
              <p className="text-xs text-blue-600 leading-relaxed">
                {t.privacyText}
              </p>
            </div>

            {/* App version info */}
            <div className="text-center text-xs text-slate-400 pt-2">
              <p className="font-semibold">{t.appVersion}</p>
              <p className="mt-1">
                {userState.language === 'ar' 
                  ? '© 2026 تطبيق اتصال الحيوانات. صُمم مع مراعاة أمان الأطفال أولاً.' 
                  : '© 2026 Animal Call App. Built with child safety first.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
