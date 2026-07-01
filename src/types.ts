/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AnimalCategory = 'wild' | 'farm' | 'birds' | 'ocean' | 'reptiles' | 'insects';

export type FootprintType = 'paw' | 'hoof' | 'bird' | 'webbed' | 'slither' | 'insect' | 'heavy';

export interface Animal {
  id: string;
  originalName: string;
  originalNameAr: string;
  category: AnimalCategory;
  footprintType: FootprintType;
  
  // Fun Facts (English)
  habitat: string;
  food: string;
  interestingFact: string;
  lifeSpan: string;
  babyName: string;
  
  // Fun Facts (Arabic)
  habitatAr: string;
  foodAr: string;
  interestingFactAr: string;
  lifeSpanAr: string;
  babyNameAr: string;

  // Base aesthetic colors for rendering the SVG cartoon
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export interface UserAnimalState {
  id: string;
  nickname: string;
  avatarIndex: number;
  isFavorite: boolean;
  completedCallsCount: number;
}

export interface Achievement {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  unlockedAt: string | null; // ISO Date String or null
}

export interface UserState {
  language: 'en' | 'ar';
  themeMode: 'day' | 'night';
  soundEnabled: boolean;
  musicEnabled: boolean;
  animationsEnabled: boolean;
  ambientSound: 'none' | 'forest' | 'farm' | 'jungle' | 'ocean' | 'night';
  stickersUnlocked: string[]; // List of animal IDs that unlocked stickers
  dailyRewardClaimedAt: string | null; // ISO Date String of last claim
  animalsState: Record<string, UserAnimalState>;
  achievements: Record<string, boolean>; // id -> unlocked
  totalCalls: number;
  requirePermissionToEndCall: boolean;
}

export interface TranslationKeys {
  appName: string;
  homeTitle: string;
  searchPlaceholder: string;
  categoryAll: string;
  categoryWild: string;
  categoryFarm: string;
  categoryBirds: string;
  categoryOcean: string;
  categoryReptiles: string;
  categoryInsects: string;
  favoritesSection: string;
  allAnimalsSection: string;
  dailyRewardTitle: string;
  dailyRewardButton: string;
  dailyRewardClaimed: string;
  dailyRewardSlogan: string;
  achievementsTitle: string;
  parentGateTitle: string;
  parentGateSolve: string;
  parentGateIncorrect: string;
  parentGateClose: string;
  parentSectionTitle: string;
  resetProgress: string;
  resetNames: string;
  resetSuccess: string;
  exportSettings: string;
  privacyTitle: string;
  privacyText: string;
  appVersion: string;
  mute: string;
  speaker: string;
  replay: string;
  voiceIntroduction: string;
  recordVoice: string;
  stopRecord: string;
  playRecord: string;
  calling: string;
  ringing: string;
  connected: string;
  endedCall: string;
  goodbye: string;
  factHabitat: string;
  factFood: string;
  factInteresting: string;
  factLifespan: string;
  factBaby: string;
  unlockedSticker: string;
  unlockedBadge: string;
  close: string;
  saveNickname: string;
  editNickname: string;
  chooseAvatar: string;
  musicVolume: string;
  soundVolume: string;
  ambientSoundTitle: string;
  ambientNone: string;
  ambientForest: string;
  ambientFarm: string;
  ambientJungle: string;
  ambientOcean: string;
  ambientNight: string;
  starStickerBadgeTitle: string;
  requirePermissionToEndCallLabel: string;
  requirePermissionToEndCallDesc: string;
  parentPermissionTitle: string;
  parentPermissionDesc: string;
  keepTalking: string;
  confirmEndCall: string;
  stickersTitle: string;
  parentsButtonLabel: string;
  dailySurpriseGift: string;
  sortByLabel: string;
  sortAlphabetical: string;
  sortFavorites: string;
  sortMostCalled: string;
  enterParentsArea: string;
  parentPortalDesc: string;
  confirmResetProgress: string;
  confirmResetNames: string;
  alertConfigCopied: string;
  alertMicPermission: string;
}
