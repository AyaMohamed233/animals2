/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Achievement, UserState } from '../types';
import { ANIMALS } from '../data/animals';

export const ACHIEVEMENTS_LIST: Omit<Achievement, 'unlockedAt'>[] = [
  {
    id: 'first_call',
    title: 'First Call 📞',
    titleAr: 'الاتصال الأول 📞',
    description: 'Call your very first animal friend!',
    descriptionAr: 'اتصل بصديقك الحيوان الأول!',
    icon: '🎉',
  },
  {
    id: 'ten_calls',
    title: '10 Calls Master 🏆',
    titleAr: 'بطل ١٠ مكالمات 🏆',
    description: 'Complete 10 animal phone calls!',
    descriptionAr: 'أكمل ١٠ مكالمات هاتفية للحيوانات!',
    icon: '⭐',
  },
  {
    id: 'animal_lover',
    title: 'Animal Lover ❤️',
    titleAr: 'محب الحيوانات ❤️',
    description: 'Call 5 different animal friends.',
    descriptionAr: 'اتصل بـ ٥ أصدقاء حيوانات مختلفين.',
    icon: '🦁',
  },
  {
    id: 'bird_expert',
    title: 'Bird Expert 🦉',
    titleAr: 'خبير الطيور 🦉',
    description: 'Call 3 different birds.',
    descriptionAr: 'اتصل بـ ٣ طيور مختلفة.',
    icon: '🦜',
  },
  {
    id: 'farm_master',
    title: 'Farm Master 🐷',
    titleAr: 'مستكشف المزرعة 🐷',
    description: 'Call 3 different farm animals.',
    descriptionAr: 'اتصل بـ ٣ حيوانات مزرعة مختلفة.',
    icon: '🚜',
  },
  {
    id: 'safari_explorer',
    title: 'Safari Explorer 🦁',
    titleAr: 'مستكشف السافانا 🦁',
    description: 'Call 3 different wild animals.',
    descriptionAr: 'اتصل بـ ٣ حيوانات برية مختلفة.',
    icon: '🌴',
  },
  {
    id: 'ocean_explorer',
    title: 'Ocean Explorer 🐬',
    titleAr: 'مستكشف المحيط 🐬',
    description: 'Call 3 different ocean animals.',
    descriptionAr: 'اتصل بـ ٣ حيوانات بحرية مختلفة.',
    icon: '🌊',
  },
  {
    id: 'completed_collection',
    title: 'Super Collector 👑',
    titleAr: 'الجامع الخارق 👑',
    description: 'Call all animal friends!',
    descriptionAr: 'اتصل بجميع أصدقاء الحيوانات!',
    icon: '🎖️',
  },
];

/**
 * Checks the user's current progress state and returns any newly unlocked achievement IDs.
 */
export function checkAchievements(state: UserState): string[] {
  const newlyUnlocked: string[] = [];
  const animalStates = Object.values(state.animalsState);
  
  // 1. First Call
  if (!state.achievements['first_call'] && state.totalCalls >= 1) {
    newlyUnlocked.push('first_call');
  }

  // 2. 10 Calls
  if (!state.achievements['ten_calls'] && state.totalCalls >= 10) {
    newlyUnlocked.push('ten_calls');
  }

  // Helper arrays
  const distinctCalledIds = animalStates.filter(a => a.completedCallsCount > 0).map(a => a.id);
  
  // 3. Animal Lover
  if (!state.achievements['animal_lover'] && distinctCalledIds.length >= 5) {
    newlyUnlocked.push('animal_lover');
  }

  // 4. Bird Expert (Birds category)
  const birdIds = ANIMALS.filter(a => a.category === 'birds').map(a => a.id);
  const calledBirds = distinctCalledIds.filter(id => birdIds.includes(id));
  if (!state.achievements['bird_expert'] && calledBirds.length >= 3) {
    newlyUnlocked.push('bird_expert');
  }

  // 5. Farm Master (Farm category)
  const farmIds = ANIMALS.filter(a => a.category === 'farm').map(a => a.id);
  const calledFarm = distinctCalledIds.filter(id => farmIds.includes(id));
  if (!state.achievements['farm_master'] && calledFarm.length >= 3) {
    newlyUnlocked.push('farm_master');
  }

  // 6. Safari Explorer (Wild category)
  const wildIds = ANIMALS.filter(a => a.category === 'wild').map(a => a.id);
  const calledWild = distinctCalledIds.filter(id => wildIds.includes(id));
  if (!state.achievements['safari_explorer'] && calledWild.length >= 3) {
    newlyUnlocked.push('safari_explorer');
  }

  // 7. Ocean Explorer (Ocean category)
  const oceanIds = ANIMALS.filter(a => a.category === 'ocean').map(a => a.id);
  const calledOcean = distinctCalledIds.filter(id => oceanIds.includes(id));
  if (!state.achievements['ocean_explorer'] && calledOcean.length >= 3) {
    newlyUnlocked.push('ocean_explorer');
  }

  // 8. Completed Collection
  const totalAnimalCount = ANIMALS.length;
  if (!state.achievements['completed_collection'] && distinctCalledIds.length >= totalAnimalCount) {
    newlyUnlocked.push('completed_collection');
  }

  return newlyUnlocked;
}
