/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

interface AnimalAvatarProps {
  id: string;
  avatarIndex: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  isSpeaking?: boolean;
  sizeClassName?: string;
  className?: string;
}

export default function AnimalAvatar({
  id,
  avatarIndex,
  primaryColor,
  secondaryColor,
  accentColor,
  isSpeaking = false,
  sizeClassName = 'w-32 h-32',
  className = '',
}: AnimalAvatarProps) {
  const [mouthOpen, setMouthOpen] = useState(false);

  // Simple mouth flapping animation when animal is speaking
  useEffect(() => {
    let timer: any;
    if (isSpeaking) {
      timer = setInterval(() => {
        setMouthOpen(prev => !prev);
      }, 200);
    } else {
      setMouthOpen(false);
    }
    return () => clearInterval(timer);
  }, [isSpeaking]);

  // Determine key parameters for our cartoon SVGs
  const baseFill = primaryColor;
  const secondaryFill = secondaryColor;
  const highlightFill = accentColor;

  return (
    <div className={`relative flex items-center justify-center ${sizeClassName} ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg transition-transform duration-300 hover:scale-105"
      >
        {/* Background Ambient Circle Glow */}
        <circle cx="100" cy="100" r="90" fill={`${baseFill}1E`} />

        {/* -------------------- ANIMAL DISTINCT BODY PARTS -------------------- */}

        {/* 1. LION MANE */}
        {id === 'lion' && (
          <path
            d="M100 15 C55 15 15 55 15 100 C15 145 55 185 100 185 C145 185 185 145 185 100 C185 55 145 15 100 15 Z"
            fill={secondaryFill}
            stroke={highlightFill}
            strokeWidth="4"
          />
        )}

        {/* 2. ELEPHANT EARS (Large flapping flappers) */}
        {id === 'elephant' && (
          <>
            {/* Left Ear */}
            <path
              d="M60 100 C10 100 10 30 60 40 Z"
              fill={secondaryFill}
              stroke="#475569"
              strokeWidth="4"
            />
            {/* Right Ear */}
            <path
              d="M140 100 C190 100 190 30 140 40 Z"
              fill={secondaryFill}
              stroke="#475569"
              strokeWidth="4"
            />
            {/* Pink Inner Ears */}
            <path d="M55 90 C25 90 25 45 55 50 Z" fill={highlightFill} />
            <path d="M145 90 C175 90 175 45 145 50 Z" fill={highlightFill} />
          </>
        )}

        {/* 3. SHEEP FLUFFY CLOUD BODY */}
        {id === 'sheep' && (
          <path
            d="M100 35 C70 35 45 55 45 80 C30 80 20 95 20 110 C20 125 35 140 50 140 C50 155 70 165 100 165 C130 165 150 155 150 140 C165 140 180 125 180 110 C180 95 170 80 155 80 C155 55 130 35 100 35 Z"
            fill="#F8FAFC"
            stroke="#CBD5E1"
            strokeWidth="5"
          />
        )}

        {/* 4. BASE FACE/HEAD CIRCLE (Most animals) */}
        <circle
          cx="100"
          cy="105"
          r="60"
          fill={id === 'sheep' ? '#F1F5F9' : id === 'panda' ? '#FFFFFF' : baseFill}
          stroke={id === 'panda' ? '#1E293B' : secondaryFill}
          strokeWidth="4"
        />

        {/* 5. TIGER STRIPES */}
        {id === 'tiger' && (
          <>
            {/* Left Stripes */}
            <path d="M45 95 L65 100 L45 105 Z" fill={highlightFill} />
            <path d="M45 115 L65 118 L45 122 Z" fill={highlightFill} />
            {/* Right Stripes */}
            <path d="M155 95 L135 100 L155 105 Z" fill={highlightFill} />
            <path d="M155 115 L135 118 L155 122 Z" fill={highlightFill} />
            {/* Forehead Stripes */}
            <path d="M100 50 L95 70 L105 70 Z" fill={highlightFill} />
            <path d="M100 75 L90 85 L110 85 Z" fill={highlightFill} />
          </>
        )}

        {/* 6. ZEBRA STRIPES */}
        {id === 'zebra' && (
          <>
            <path d="M45 90 L70 95 L45 100 Z" fill={secondaryFill} />
            <path d="M45 110 L70 115 L45 120 Z" fill={secondaryFill} />
            <path d="M155 90 L130 95 L155 100 Z" fill={secondaryFill} />
            <path d="M155 110 L130 115 L155 120 Z" fill={secondaryFill} />
          </>
        )}

        {/* 7. LEOPARD/CHEETAH SPOTS */}
        {(id === 'leopard' || id === 'cheetah') && (
          <>
            <circle cx="65" cy="80" r="5" fill={highlightFill} />
            <circle cx="135" cy="80" r="5" fill={highlightFill} />
            <circle cx="75" cy="135" r="6" fill={highlightFill} />
            <circle cx="125" cy="135" r="6" fill={highlightFill} />
            <circle cx="100" cy="70" r="4" fill={highlightFill} />
            <circle cx="55" cy="110" r="5" fill={highlightFill} />
            <circle cx="145" cy="110" r="5" fill={highlightFill} />
          </>
        )}

        {/* 8. PANDA EYE PATCHES */}
        {id === 'panda' && (
          <>
            <ellipse cx="75" cy="95" rx="14" ry="18" fill={secondaryFill} transform="rotate(-15 75 95)" />
            <ellipse cx="125" cy="95" rx="14" ry="18" fill={secondaryFill} transform="rotate(15 125 95)" />
            {/* Panda Ears */}
            <circle cx="55" cy="55" r="18" fill={secondaryFill} />
            <circle cx="145" cy="55" r="18" fill={secondaryFill} />
          </>
        )}

        {/* 9. PIG NOSE SNOUT / COW SNOUT / DOG MUZZLE */}
        {id === 'pig' && (
          <ellipse cx="100" cy="115" rx="22" ry="14" fill={highlightFill} stroke="#DB2777" strokeWidth="3" />
        )}

        {id === 'cow' && (
          <ellipse cx="100" cy="120" rx="32" ry="18" fill="#FCA5A5" stroke="#F43F5E" strokeWidth="3" />
        )}

        {/* 10. ANIMAL EARS & HORNS */}
        {/* Cat Pointy Ears */}
        {(id === 'cat' || id === 'fox') && (
          <>
            <path d="M45 65 L30 20 L70 50 Z" fill={secondaryFill} stroke={secondaryFill} strokeWidth="2" />
            <path d="M155 65 L170 20 L130 50 Z" fill={secondaryFill} stroke={secondaryFill} strokeWidth="2" />
            <path d="M50 60 L40 32 L65 48 Z" fill="#FCA5A5" />
            <path d="M150 60 L160 32 L135 48 Z" fill="#FCA5A5" />
          </>
        )}

        {/* Dog Floppy Ears */}
        {id === 'dog' && (
          <>
            <path d="M45 70 C30 70 20 120 35 130 C50 140 55 90 45 70 Z" fill={secondaryFill} />
            <path d="M155 70 C170 70 180 120 165 130 C150 140 145 90 155 70 Z" fill={secondaryFill} />
          </>
        )}

        {/* Bear / Koala Circular Ears */}
        {(id === 'bear' || id === 'koala') && (
          <>
            <circle cx="55" cy="55" r="22" fill={secondaryFill} />
            <circle cx="145" cy="55" r="22" fill={secondaryFill} />
            <circle cx="55" cy="55" r="14" fill="#FDBA74" />
            <circle cx="145" cy="55" r="14" fill="#FDBA74" />
          </>
        )}

        {/* Cow Horns */}
        {(id === 'cow' || id === 'buffalo' || id === 'goat') && (
          <>
            <path d="M60 55 Q40 30 30 35 Q45 50 60 55 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
            <path d="M140 55 Q160 30 170 35 Q155 50 140 55 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          </>
        )}

        {/* Hippo Tiny Ears */}
        {id === 'hippo' && (
          <>
            <circle cx="60" cy="50" r="10" fill={secondaryFill} />
            <circle cx="140" cy="50" r="10" fill={secondaryFill} />
            <circle cx="60" cy="50" r="5" fill="#F472B6" />
            <circle cx="140" cy="50" r="5" fill="#F472B6" />
          </>
        )}

        {/* Monkey Ears */}
        {id === 'monkey' && (
          <>
            <circle cx="40" cy="100" r="18" fill={secondaryFill} />
            <circle cx="160" cy="100" r="18" fill={secondaryFill} />
            <circle cx="40" cy="100" r="10" fill="#FDBA74" />
            <circle cx="160" cy="100" r="10" fill="#FDBA74" />
          </>
        )}

        {/* Owl Big Head Feathers */}
        {id === 'owl' && (
          <>
            <path d="M50 50 L35 25 L75 45 Z" fill={secondaryFill} />
            <path d="M150 50 L165 25 L125 45 Z" fill={secondaryFill} />
          </>
        )}

        {/* Rabbit/Hare Long Ears (If needed, for base koala/kangaroo ears) */}
        {id === 'kangaroo' && (
          <>
            <path d="M60 55 Q45 10 50 15 Q65 40 70 55 Z" fill={secondaryFill} />
            <path d="M140 55 Q155 10 150 15 Q135 40 130 55 Z" fill={secondaryFill} />
          </>
        )}

        {/* Giraffe Ossicones (Horns) */}
        {id === 'giraffe' && (
          <>
            <line x1="85" y1="50" x2="80" y2="20" stroke={secondaryFill} strokeWidth="6" strokeLinecap="round" />
            <circle cx="80" cy="17" r="8" fill={highlightFill} />
            <line x1="115" y1="50" x2="120" y2="20" stroke={secondaryFill} strokeWidth="6" strokeLinecap="round" />
            <circle cx="120" cy="17" r="8" fill={highlightFill} />
          </>
        )}

        {/* Frog Big Eyes sitting on top */}
        {id === 'frog' && (
          <>
            <circle cx="70" cy="55" r="16" fill={baseFill} stroke={secondaryFill} strokeWidth="3" />
            <circle cx="130" cy="55" r="16" fill={baseFill} stroke={secondaryFill} strokeWidth="3" />
          </>
        )}

        {/* Bee Antennae */}
        {id === 'bee' && (
          <>
            <line x1="85" y1="55" x2="70" y2="25" stroke="#1E293B" strokeWidth="4" />
            <circle cx="70" cy="22" r="6" fill={secondaryFill} />
            <line x1="115" y1="55" x2="130" y2="25" stroke="#1E293B" strokeWidth="4" />
            <circle cx="130" cy="22" r="6" fill={secondaryFill} />
          </>
        )}

        {/* Rooster Comb */}
        {id === 'rooster' && (
          <path d="M100 45 C80 15 120 15 100 45 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
        )}

        {/* -------------------- GENERAL FACE DETAILS (EYES & CHEEKS) -------------------- */}

        {/* Cartoon Rosy Pink Cheeks */}
        <circle cx="65" cy="120" r="10" fill="#F472B6" opacity="0.6" />
        <circle cx="135" cy="120" r="10" fill="#F472B6" opacity="0.6" />

        {/* Big Expressive Cartoon Eyes */}
        <g id="cartoon-eyes">
          {id === 'frog' ? (
            <>
              {/* Frog specific eyes */}
              <circle cx="70" cy="55" r="10" fill="#FFFFFF" />
              <circle cx="130" cy="55" r="10" fill="#FFFFFF" />
              <circle cx="70" cy="55" r="5" fill="#1E293B" />
              <circle cx="130" cy="55" r="5" fill="#1E293B" />
              <circle cx="68" cy="53" r="2.5" fill="#FFFFFF" />
              <circle cx="128" cy="53" r="2.5" fill="#FFFFFF" />
            </>
          ) : id === 'owl' ? (
            <>
              {/* Owl giant yellow eye rings */}
              <circle cx="72" cy="95" r="22" fill="#FBBF24" />
              <circle cx="128" cy="95" r="22" fill="#FBBF24" />
              <circle cx="72" cy="95" r="12" fill="#1E293B" />
              <circle cx="128" cy="95" r="12" fill="#1E293B" />
              <circle cx="75" cy="92" r="4" fill="#FFFFFF" />
              <circle cx="131" cy="92" r="4" fill="#FFFFFF" />
            </>
          ) : (
            <>
              {/* Standard eyes */}
              <circle cx="75" cy="95" r="12" fill="#1E293B" />
              <circle cx="125" cy="95" r="12" fill="#1E293B" />
              {/* Eye reflections for that sparkling Disney look */}
              <circle cx="72" cy="92" r="4.5" fill="#FFFFFF" />
              <circle cx="122" cy="92" r="4.5" fill="#FFFFFF" />
              <circle cx="77" cy="98" r="2" fill="#FFFFFF" />
              <circle cx="127" cy="98" r="2" fill="#FFFFFF" />
            </>
          )}
        </g>

        {/* 11. SPECIAL SNOUTS & DETAILS */}
        {/* Cat Whiskers */}
        {(id === 'cat' || id === 'tiger' || id === 'leopard' || id === 'cheetah' || id === 'lion') && (
          <g stroke="#1E293B" strokeWidth="2" strokeLinecap="round">
            {/* Left whiskers */}
            <line x1="55" y1="120" x2="30" y2="115" />
            <line x1="55" y1="125" x2="28" y2="125" />
            <line x1="55" y1="130" x2="32" y2="135" />
            {/* Right whiskers */}
            <line x1="145" y1="120" x2="170" y2="115" />
            <line x1="145" y1="125" x2="172" y2="125" />
            <line x1="145" y1="130" x2="168" y2="135" />
          </g>
        )}

        {/* Pig Snout Holes */}
        {id === 'pig' && (
          <>
            <circle cx="94" cy="115" r="3" fill="#DB2777" />
            <circle cx="106" cy="115" r="3" fill="#DB2777" />
          </>
        )}

        {/* Elephant Trunk */}
        {id === 'elephant' && (
          <path
            d="M100 115 C100 140 85 160 70 155 C65 153 65 145 72 145 C80 145 88 135 88 115 Z"
            fill={baseFill}
            stroke={secondaryFill}
            strokeWidth="3"
          />
        )}

        {/* Bird Beaks */}
        {(id === 'chicken' ||
          id === 'rooster' ||
          id === 'duck' ||
          id === 'goose' ||
          id === 'owl' ||
          id === 'parrot' ||
          id === 'crow' ||
          id === 'eagle' ||
          id === 'falcon' ||
          id === 'bird' ||
          id === 'penguin' ||
          id === 'peacock') && (
          <path
            d="M100 105 L88 120 L112 120 Z"
            fill={id === 'crow' ? '#1E293B' : '#F59E0B'}
            stroke="#D97706"
            strokeWidth="2"
          />
        )}

        {/* Bee Stripes */}
        {id === 'bee' && (
          <g stroke="#1E293B" strokeWidth="6" strokeLinecap="round">
            <line x1="75" y1="135" x2="125" y2="135" />
            <line x1="82" y1="145" x2="118" y2="145" />
          </g>
        )}

        {/* -------------------- SPEECH MOUTH ANIMATION -------------------- */}
        <g id="mouth">
          {mouthOpen ? (
            // Excited talking oval mouth
            <ellipse cx="100" cy="128" rx="14" ry="10" fill="#EF4444" stroke="#1E293B" strokeWidth="3" />
          ) : (
            // Happy smile curve
            <path
              d="M90 125 Q100 135 110 125"
              stroke="#1E293B"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </g>

        {/* Snake Forked Tongue */}
        {id === 'snake' && (
          <path
            d="M100 130 L100 145 L94 152 M100 145 L106 152"
            stroke="#EF4444"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Crocodile sharp teeth */}
        {(id === 'crocodile' || id === 'alligator' || id === 'shark') && (
          <g fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5">
            <polygon points="85,124 90,132 95,124" />
            <polygon points="105,124 110,132 115,124" />
          </g>
        )}

        {/* -------------------- AVATAR OUTFITS / ACCESSORIES (0-4) -------------------- */}

        {/* Accessory 1: DETECTIVE GLASSES */}
        {avatarIndex === 1 && (
          <g stroke="#D97706" strokeWidth="4" fill="none">
            {/* Left Glass Frame */}
            <circle cx="75" cy="95" r="18" stroke="#FBBF24" />
            {/* Right Glass Frame */}
            <circle cx="125" cy="95" r="18" stroke="#FBBF24" />
            {/* Bridge */}
            <line x1="93" y1="95" x2="107" y2="95" stroke="#FBBF24" strokeWidth="4" />
            {/* Side Temples */}
            <path d="M57 95 L40 92" stroke="#FBBF24" strokeWidth="3" />
            <path d="M143 95 L160 92" stroke="#FBBF24" strokeWidth="3" />
          </g>
        )}

        {/* Accessory 2: PARTY TIME HAT */}
        {avatarIndex === 2 && (
          <g>
            {/* Stripe Party Hat (Sitting playfully tilted) */}
            <polygon points="80,50 120,50 100,5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3" />
            {/* Hat Stripes */}
            <path d="M85 40 Q100 32 115 40" stroke="#FBBF24" strokeWidth="4" fill="none" />
            <path d="M90 28 Q100 20 110 28" stroke="#EF4444" strokeWidth="4" fill="none" />
            {/* Pom-pom top ball */}
            <circle cx="100" cy="5" r="8" fill="#F472B6" />
          </g>
        )}

        {/* Accessory 3: ROYAL CROWN */}
        {avatarIndex === 3 && (
          <g>
            {/* Shiny Gold Crown */}
            <path
              d="M70 50 L75 25 L90 38 L100 20 L110 38 L125 25 L130 50 Z"
              fill="#FBBF24"
              stroke="#D97706"
              strokeWidth="3"
            />
            {/* Gemstones */}
            <circle cx="75" cy="23" r="3" fill="#EF4444" />
            <circle cx="100" cy="18" r="3" fill="#3B82F6" />
            <circle cx="125" cy="23" r="3" fill="#10B981" />
            <circle cx="100" cy="42" r="4" fill="#EC4899" />
          </g>
        )}

        {/* Accessory 4: COZY SCARF / RED BOWTIE */}
        {avatarIndex === 4 && (
          <g>
            {/* Cute Red Bowtie under the chin */}
            <polygon points="75,145 95,155 75,165" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
            <polygon points="125,145 105,155 125,165" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
            <circle cx="100" cy="155" r="7" fill="#F87171" stroke="#B91C1C" strokeWidth="2" />
            
            {/* Optional cozy scarf wrap */}
            <path
              d="M60 148 C75 160 125 160 140 148 C145 158 135 172 100 172 C65 172 55 158 60 148 Z"
              fill="#10B981"
              stroke="#047857"
              strokeWidth="2.5"
            />
            {/* Scarf hanging tail */}
            <path
              d="M125 160 L135 188 L120 190 Z"
              fill="#059669"
              stroke="#047857"
              strokeWidth="2"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
