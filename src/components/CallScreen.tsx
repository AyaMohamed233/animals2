/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Animal, UserState, TranslationKeys } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { audio } from '../utils/audio';
import AnimalAvatar from './AnimalAvatar';
import { Phone, PhoneOff, Mic, Volume2, RotateCcw, Play, Square, RefreshCw, Sparkles, BookOpen } from 'lucide-react';

interface CallScreenProps {
  animal: Animal;
  userState: UserState;
  updateUserState: (updater: (prev: UserState) => UserState) => void;
  onHangUp: () => void;
  onConfetti: () => void;
}

type CallState = 'ringing' | 'connecting' | 'connected' | 'goodbye';

const AMBIENT_BACKGROUNDS: Record<string, { day: string; night: string }> = {
  none: {
    day: 'from-sky-100 via-sky-50 to-orange-50 text-slate-800',
    night: 'from-indigo-950 via-slate-900 to-indigo-900 text-slate-100',
  },
  forest: {
    day: 'from-emerald-100 via-green-50 to-emerald-50 text-slate-800',
    night: 'from-emerald-950 via-slate-900 to-teal-950 text-slate-100',
  },
  farm: {
    day: 'from-amber-100 via-yellow-50 to-amber-50 text-slate-800',
    night: 'from-amber-950 via-slate-900 to-amber-950 text-slate-100',
  },
  jungle: {
    day: 'from-teal-100 via-emerald-50 to-lime-50 text-slate-800',
    night: 'from-teal-950 via-slate-900 to-emerald-950 text-slate-100',
  },
  ocean: {
    day: 'from-sky-100 via-blue-50 to-cyan-50 text-slate-800',
    night: 'from-sky-950 via-slate-900 to-cyan-950 text-slate-100',
  },
  night: {
    day: 'from-indigo-100 via-slate-50 to-purple-50 text-slate-800',
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

export default function CallScreen({
  animal,
  userState,
  updateUserState,
  onHangUp,
  onConfetti,
}: CallScreenProps) {
  const [callState, setCallState] = useState<CallState>('ringing');
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isAnimalSoundPaused, setIsAnimalSoundPaused] = useState(false);
  const [isIntroSpeaking, setIsIntroSpeaking] = useState(false);

  // Parent permission for ending call
  const [showEndCallGate, setShowEndCallGate] = useState(false);
  const [gateNum1, setGateNum1] = useState(0);
  const [gateNum2, setGateNum2] = useState(0);
  const [gateOperator, setGateOperator] = useState<'+' | 'x'>('+');
  const [gateAnswer, setGateAnswer] = useState('');
  const [gateError, setGateError] = useState('');

  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Timer & Mount tracking refs
  const ringTimerRef = useRef<any>(null);
  const connectTimerRef = useRef<any>(null);
  const hangUpTimerRef = useRef<any>(null);
  const isMountedRef = useRef<boolean>(true);

  const t: TranslationKeys = TRANSLATIONS[userState.language];
  const animalState = userState.animalsState[animal.id];
  const displayName = animalState?.nickname || (userState.language === 'ar' ? animal.originalNameAr : animal.originalName);

  // Call duration counter
  useEffect(() => {
    let interval: any;
    if (callState === 'connected') {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(interval);
  }, [callState]);

  // Phase 1: RINGING (2-3 seconds)
  useEffect(() => {
    isMountedRef.current = true;
    // Play realistic ringtone
    audio.playRingtone();

    ringTimerRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;
      setCallState('connecting');
      audio.playConnectionChime();

      // Short delay for connecting screen
      connectTimerRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;
        setCallState('connected');
        triggerVoiceIntroduction();
      }, 1200);
    }, 2800);

    return () => {
      isMountedRef.current = false;
      if (ringTimerRef.current) clearTimeout(ringTimerRef.current);
      if (connectTimerRef.current) clearTimeout(connectTimerRef.current);
      if (hangUpTimerRef.current) clearTimeout(hangUpTimerRef.current);
      audio.stopAllSounds();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Format call duration timer (e.g. 00:05)
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Speaks: "Hello! I'm Lion!" before animal sounds start
  const triggerVoiceIntroduction = () => {
    setIsIntroSpeaking(true);
    setIsAnimalSoundPaused(false);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = userState.language === 'ar'
        ? `أهلاً! أنا ${displayName}!`
        : `Hello! I'm ${displayName}!`;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = userState.language === 'ar' ? 'ar-SA' : 'en-US';
      utterance.pitch = 1.4; // High pitch for kids animation
      utterance.rate = 0.9;

      utterance.onend = () => {
        if (!isMountedRef.current) return;
        setIsIntroSpeaking(false);
        // Start animal sound synthesis loop
        audio.startAnimalSound(animal.id, false);
      };

      utterance.onerror = () => {
        if (!isMountedRef.current) return;
        setIsIntroSpeaking(false);
        audio.startAnimalSound(animal.id, false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      if (!isMountedRef.current) return;
      setIsIntroSpeaking(false);
      audio.startAnimalSound(animal.id, false);
    }
  };

  // Action: Replay Animal Sound
  const handleReplay = () => {
    audio.playClickSound();
    audio.stopAnimalSoundInterval();
    triggerVoiceIntroduction();
  };

  // Action: Toggle mute
  const handleMuteToggle = () => {
    audio.playClickSound();
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audio.setMute(nextMute);
  };

  // Action: Toggle Speaker
  const handleSpeakerToggle = () => {
    audio.playClickSound();
    const nextSpeaker = !isSpeakerOn;
    setIsSpeakerOn(nextSpeaker);
    audio.setSpeaker(nextSpeaker);
  };

  // Action: Pause animal sound loop
  const handlePauseToggle = () => {
    audio.playClickSound();
    if (isAnimalSoundPaused) {
      audio.startAnimalSound(animal.id, false);
      setIsAnimalSoundPaused(false);
    } else {
      audio.stopAnimalSoundInterval();
      setIsAnimalSoundPaused(true);
    }
  };

  // Action: Handle Hang Up Click (shows permission gate if configured)
  const handleHangUpClick = () => {
    audio.playClickSound();
    if (userState.requirePermissionToEndCall) {
      const n1 = Math.floor(Math.random() * 8) + 2;
      const n2 = Math.floor(Math.random() * 6) + 2;
      const op = Math.random() > 0.5 ? '+' : 'x';
      setGateNum1(n1);
      setGateNum2(n2);
      setGateOperator(op as '+' | 'x');
      setGateAnswer('');
      setGateError('');
      setShowEndCallGate(true);
    } else {
      executeHangUp();
    }
  };

  // Action: Submit parent verification to end call
  const handleVerifyEndCallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audio.playClickSound();

    const expectedAnswer = gateOperator === '+' ? gateNum1 + gateNum2 : gateNum1 * gateNum2;
    if (parseInt(gateAnswer, 10) === expectedAnswer) {
      setShowEndCallGate(false);
      executeHangUp();
    } else {
      setGateError(t.parentGateIncorrect);
      setGateAnswer('');
    }
  };

  // Action: HANG UP execution
  const executeHangUp = () => {
    // Stop recording if active
    if (isRecording) {
      stopRecordingGracefully();
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Stop active animal sounds, synthesizer loops, and ringing immediately
    audio.stopAnimalSoundInterval();

    setCallState('goodbye');
    audio.playEndCallChime();

    // Trigger completion state increment
    updateUserState(prev => {
      const updatedAnimals = { ...prev.animalsState };
      const currentCallCount = updatedAnimals[animal.id]?.completedCallsCount || 0;
      
      const isFirstCompletedCall = currentCallCount === 0;
      
      updatedAnimals[animal.id] = {
        ...updatedAnimals[animal.id],
        id: animal.id,
        nickname: updatedAnimals[animal.id]?.nickname || '',
        avatarIndex: updatedAnimals[animal.id]?.avatarIndex || 0,
        completedCallsCount: currentCallCount + 1,
      };

      // Add sticker unlocked if first call
      const updatedStickers = [...prev.stickersUnlocked];
      if (isFirstCompletedCall && !updatedStickers.includes(animal.id)) {
        updatedStickers.push(animal.id);
      }

      return {
        ...prev,
        totalCalls: prev.totalCalls + 1,
        stickersUnlocked: updatedStickers,
        animalsState: updatedAnimals,
      };
    });

    // Let the child enjoy the goodbye animation for 2 seconds
    hangUpTimerRef.current = setTimeout(() => {
      onHangUp();
    }, 2000);
  };

  // RECORDING FUNCTIONALITIES (Children love listening to their voices!)
  const startRecording = async () => {
    audio.playClickSound();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setMicError(null);
    } catch (err) {
      console.warn('Microphone access denied or unsupported:', err);
      setMicError(t.alertMicPermission);
      setTimeout(() => setMicError(null), 5000);
    }
  };

  const stopRecordingGracefully = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      // Stop the mic stream tracks to disable the browser mic recording indicator
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleRecordToggle = () => {
    audio.playClickSound();
    if (isRecording) {
      stopRecordingGracefully();
    } else {
      startRecording();
    }
  };

  const playRecordedVoice = () => {
    audio.playClickSound();
    if (audioUrl) {
      // Temporarily mute background music/animal sounds while child plays their voice
      const oldMusicMuted = userState.musicEnabled;
      audio.setMute(true);

      const audioPlayback = new Audio(audioUrl);
      audioPlayback.volume = 1.0;
      audioPlayback.play();
      
      audioPlayback.onended = () => {
        audio.setMute(isMuted);
      };
    }
  };

  const currentAmbientBg = AMBIENT_BACKGROUNDS[userState.ambientSound] || AMBIENT_BACKGROUNDS.none;
  const backgroundClasses = userState.themeMode === 'night' ? currentAmbientBg.night : currentAmbientBg.day;

  return (
    <div
      dir={userState.language === 'ar' ? 'rtl' : 'ltr'}
      className={`fixed inset-0 z-30 flex flex-col items-center justify-between p-6 bg-gradient-to-b transition-colors duration-500 ${backgroundClasses}`}
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

      {/* Wave footprints or stars floating in the background for immersion */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 text-6xl rotate-12">⭐</div>
        <div className="absolute top-1/3 right-10 text-5xl -rotate-45">✨</div>
        <div className="absolute bottom-1/4 left-16 text-6xl rotate-45">🌙</div>
      </div>

      {/* CALL TIMER HEADER */}
      <div className="w-full flex justify-between items-center max-w-md mt-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${callState === 'connected' ? 'bg-emerald-500 animate-ping' : 'bg-rose-400'}`} />
          <span className="font-mono font-bold text-lg tracking-wider">
            {callState === 'connected' ? formatTime(seconds) : '--:--'}
          </span>
        </div>
        <div className="bg-slate-950/5 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm">
          {callState === 'ringing' && t.ringing}
          {callState === 'connecting' && t.calling}
          {callState === 'connected' && t.connected}
          {callState === 'goodbye' && t.endedCall}
        </div>
      </div>

      {/* ANIMAL PROFILE VIEW */}
      <div className="flex flex-col items-center text-center space-y-4 max-w-md w-full my-auto relative z-10">
        {/* Glowing animated avatar border */}
        <div className="relative">
          <div
            className={`absolute -inset-4 rounded-full bg-gradient-to-tr from-amber-400 via-rose-300 to-cyan-300 opacity-40 blur-lg transition-transform duration-1000 ${
              callState === 'connected' && !isAnimalSoundPaused ? 'animate-spin scale-110' : 'scale-100'
            }`}
          />
          <div
            className={`relative rounded-full p-4 border-4 bg-white/40 shadow-xl transition-all duration-300 ${
              callState === 'ringing' ? 'animate-bounce' : 'scale-100'
            }`}
            style={{ borderColor: animal.primaryColor }}
          >
            <AnimalAvatar
              id={animal.id}
              avatarIndex={animalState?.avatarIndex || 0}
              primaryColor={animal.primaryColor}
              secondaryColor={animal.secondaryColor}
              accentColor={animal.accentColor}
              isSpeaking={isIntroSpeaking || (callState === 'connected' && !isAnimalSoundPaused && !isMuted)}
              sizeClassName="w-48 h-48 sm:w-56 sm:h-56"
            />
          </div>

          {/* Connected Sound Wave Bars */}
          {callState === 'connected' && !isAnimalSoundPaused && !isMuted && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-1.5 h-10 w-32 justify-center">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-emerald-400 to-amber-400 rounded-full animate-pulse"
                  style={{
                    height: `${25 + Math.random() * 75}%`,
                    animationDelay: `${i * 150}ms`,
                    animationDuration: '600ms',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Text descriptions */}
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight font-fredoka drop-shadow-sm text-slate-800 dark:text-slate-100">
            {displayName}
          </h1>
          <p className="text-slate-500 font-bold dark:text-slate-300 uppercase tracking-widest text-xs">
            {userState.language === 'ar' ? animal.originalNameAr : animal.originalName}
          </p>
        </div>

        {/* Voice Speech status bubble */}
        {isIntroSpeaking && (
          <div className="bg-amber-100 border border-amber-200 text-amber-800 text-sm font-fredoka font-bold px-4 py-2 rounded-2xl animate-pulse shadow-sm">
            {userState.language === 'ar' ? 'يتكلم الآن... 🗣️' : 'Speaking introduction... 🗣️'}
          </div>
        )}
      </div>

      {/* CALL ACTION BOARD */}
      <div className="w-full max-w-md space-y-6 relative z-10 mb-6">
        {callState === 'connected' && (
          <div className="grid grid-cols-3 gap-4 bg-white/20 backdrop-blur-md p-4 rounded-3xl shadow-lg border border-white/30 text-slate-700 dark:text-slate-200">
            {/* MUTE */}
            <button
              onClick={handleMuteToggle}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition transform active:scale-90 cursor-pointer ${
                isMuted ? 'bg-rose-500/80 text-white' : 'hover:bg-white/30'
              }`}
            >
              <Mic className="w-6 h-6 mb-1" />
              <span className="text-xs font-bold">{t.mute}</span>
            </button>

            {/* SPEAKER */}
            <button
              onClick={handleSpeakerToggle}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition transform active:scale-90 cursor-pointer ${
                isSpeakerOn ? 'bg-emerald-500/80 text-white' : 'hover:bg-white/30'
              }`}
            >
              <Volume2 className="w-6 h-6 mb-1" />
              <span className="text-xs font-bold">{t.speaker}</span>
            </button>

            {/* REPLAY */}
            <button
              onClick={handleReplay}
              className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-white/30 transition transform active:scale-90 cursor-pointer"
            >
              <RotateCcw className="w-6 h-6 mb-1 animate-spin-slow" />
              <span className="text-xs font-bold">{t.replay}</span>
            </button>

            {/* PAUSE/PLAY */}
            <button
              onClick={handlePauseToggle}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition transform active:scale-90 cursor-pointer ${
                isAnimalSoundPaused ? 'bg-amber-400 text-slate-800' : 'hover:bg-white/30'
              }`}
            >
              {isAnimalSoundPaused ? <Play className="w-6 h-6 mb-1" /> : <Square className="w-6 h-6 mb-1" />}
              <span className="text-xs font-bold">
                {isAnimalSoundPaused ? (userState.language === 'ar' ? 'تشغيل' : 'Play') : (userState.language === 'ar' ? 'إيقاف مؤقت' : 'Pause')}
              </span>
            </button>

            {/* RECORD CHILD VOICE */}
            <button
              onClick={handleRecordToggle}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition transform active:scale-90 cursor-pointer ${
                isRecording ? 'bg-red-500 text-white animate-pulse' : 'hover:bg-white/30'
              }`}
            >
              <Mic className="w-6 h-6 mb-1 text-red-500" />
              <span className="text-xs font-bold">
                {isRecording ? t.stopRecord : t.recordVoice}
              </span>
            </button>

            {/* PLAY RECORDED VOICE */}
            <button
              onClick={playRecordedVoice}
              disabled={!audioUrl || isRecording}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition transform active:scale-90 cursor-pointer ${
                !audioUrl ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/30'
              }`}
            >
              <Play className="w-6 h-6 mb-1 text-blue-500" />
              <span className="text-xs font-bold">{t.playRecord}</span>
            </button>
          </div>
        )}

        {micError && (
          <div className="text-center px-4 mb-4 text-xs font-bold text-amber-200 animate-bounce">
            ⚠️ {micError}
          </div>
        )}

        {/* MAIN CALL TRIGGER / HANG UP */}
        <div className="flex justify-center">
          {callState !== 'goodbye' ? (
            <button
              onClick={handleHangUpClick}
              className="w-20 h-20 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-xl hover:shadow-red-500/50 transform active:scale-90 transition cursor-pointer"
            >
              <PhoneOff className="w-10 h-10 transform rotate-135" />
            </button>
          ) : (
            <div className="text-2xl font-bold font-fredoka text-rose-500 animate-bounce">
              {t.goodbye} 👋
            </div>
          )}
        </div>
      </div>

      {/* PARENT PERMISSION VERIFICATION MODAL FOR ENDING CALL */}
      {showEndCallGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in text-slate-800">
          <div
            id="end-call-gate-card"
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border-4 border-rose-400 p-6 text-center transform scale-100 transition-all"
          >
            <h3 className="text-2xl font-extrabold font-fredoka text-rose-500 mb-2 flex items-center justify-center gap-2">
              <span>🔒</span> {t.parentPermissionTitle}
            </h3>
            <p className="text-sm text-slate-600 mb-4 font-medium leading-relaxed">
              {t.parentPermissionDesc}
            </p>

            <div className="text-3xl font-black text-rose-600 mb-4 bg-rose-50 py-3 px-5 rounded-2xl border border-rose-200 inline-block font-mono tracking-wider">
              {gateNum1} {gateOperator === 'x' ? '×' : '+'} {gateNum2} = ?
            </div>

            <form onSubmit={handleVerifyEndCallSubmit} className="space-y-4">
              <input
                type="number"
                value={gateAnswer}
                onChange={e => setGateAnswer(e.target.value)}
                placeholder="?"
                required
                autoFocus
                className="w-full text-center text-2xl font-bold py-2.5 px-4 border-4 border-slate-200 rounded-2xl focus:border-rose-400 focus:outline-none font-mono"
              />
              
              {gateError && (
                <p className="text-rose-500 text-sm font-bold animate-bounce">
                  {gateError}
                </p>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    audio.playClickSound();
                    setShowEndCallGate(false);
                  }}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition transform active:scale-95 cursor-pointer text-sm"
                >
                  {t.keepTalking}
                </button>
                <button
                  type="submit"
                  className="py-3 px-4 bg-rose-500 hover:bg-rose-600 text-white font-extrabold rounded-xl shadow-md transition transform active:scale-95 cursor-pointer text-sm flex items-center justify-center gap-1"
                >
                  <span>👋</span> {t.confirmEndCall}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
