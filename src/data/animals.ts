/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Animal } from '../types';

export const ANIMALS: Animal[] = [
  {
    id: 'lion',
    originalName: 'Lion',
    originalNameAr: 'الأسد',
    category: 'wild',
    footprintType: 'heavy',
    habitat: 'Savannah & Grasslands',
    habitatAr: 'السافانا والمراعي',
    food: 'Carnivore (Meat)',
    foodAr: 'آكل لحوم',
    interestingFact: 'Lions live in family groups called prides.',
    interestingFactAr: 'تعيش الأسود في مجموعات عائلية تسمى القطعان.',
    lifeSpan: '10 - 14 Years',
    lifeSpanAr: '١٠ - ١٤ سنة',
    babyName: 'Cub',
    babyNameAr: 'شبل',
    primaryColor: '#FBBF24', // Amber 400
    secondaryColor: '#D97706', // Amber 600
    accentColor: '#B45309', // Amber 700
  },
  {
    id: 'tiger',
    originalName: 'Tiger',
    originalNameAr: 'النمر',
    category: 'wild',
    footprintType: 'paw',
    habitat: 'Rainforests & Grasslands',
    habitatAr: 'الغابات المطيرة والمراعي',
    food: 'Carnivore (Meat)',
    foodAr: 'آكل لحوم',
    interestingFact: 'No two tigers have the exact same stripes!',
    interestingFactAr: 'لا يوجد نمران لهما نفس الخطوط تماماً!',
    lifeSpan: '10 - 15 Years',
    lifeSpanAr: '١٠ - ١٥ سنة',
    babyName: 'Cub',
    babyNameAr: 'شبل النمر',
    primaryColor: '#F97316', // Orange 500
    secondaryColor: '#EA580C', // Orange 600
    accentColor: '#1E293B', // Slate 800 (for stripes)
  },
  {
    id: 'leopard',
    originalName: 'Leopard',
    originalNameAr: 'الفهد المرقط',
    category: 'wild',
    footprintType: 'paw',
    habitat: 'Forests & Grasslands',
    habitatAr: 'الغابات والمراعي',
    food: 'Carnivore (Meat)',
    foodAr: 'آكل لحوم',
    interestingFact: 'Leopards are excellent climbers and carry food up trees.',
    interestingFactAr: 'الفهود متسلقون ممتازون ويحملون طعامهم فوق الأشجار.',
    lifeSpan: '12 - 17 Years',
    lifeSpanAr: '١٢ - ١٧ سنة',
    babyName: 'Cub',
    babyNameAr: 'جرو الفهد',
    primaryColor: '#F59E0B', // Amber 500
    secondaryColor: '#D97706', // Amber 600
    accentColor: '#34D399', // Emerald 400 (eyes)
  },
  {
    id: 'cheetah',
    originalName: 'Cheetah',
    originalNameAr: 'الفهد الصياد',
    category: 'wild',
    footprintType: 'paw',
    habitat: 'Dry Forests & Savannahs',
    habitatAr: 'الغابات الجافة والسافانا',
    food: 'Carnivore (Meat)',
    foodAr: 'آكل لحوم',
    interestingFact: 'Cheetah is the fastest land animal in the world.',
    interestingFactAr: 'الفهد الصياد هو أسرع حيوان بري في العالم.',
    lifeSpan: '10 - 12 Years',
    lifeSpanAr: '١٠ - ١٢ سنة',
    babyName: 'Cub',
    babyNameAr: 'جرو',
    primaryColor: '#FCD34D', // Amber 300
    secondaryColor: '#F59E0B', // Amber 500
    accentColor: '#111827', // Black spots
  },
  {
    id: 'elephant',
    originalName: 'Elephant',
    originalNameAr: 'الفيل',
    category: 'wild',
    footprintType: 'heavy',
    habitat: 'Forests & Savannahs',
    habitatAr: 'الغابات والسافانا',
    food: 'Herbivore (Plants)',
    foodAr: 'آكل عشب',
    interestingFact: 'Elephants use their trunks to breathe, drink, and grab food.',
    interestingFactAr: 'تستخدم الفيلة خراطيمها للتنفس والشرب والتقاط الطعام.',
    lifeSpan: '60 - 70 Years',
    lifeSpanAr: '٦٠ - ٧٠ سنة',
    babyName: 'Calf',
    babyNameAr: 'دغفل',
    primaryColor: '#94A3B8', // Slate 400
    secondaryColor: '#64748B', // Slate 500
    accentColor: '#F472B6', // Pink (inner ears)
  },
  {
    id: 'rhino',
    originalName: 'Rhino',
    originalNameAr: 'وحيد القرن',
    category: 'wild',
    footprintType: 'heavy',
    habitat: 'Grasslands & Shrublands',
    habitatAr: 'المراعي والشجيرات',
    food: 'Herbivore (Plants)',
    foodAr: 'آكل عشب',
    interestingFact: 'Rhino horns are made of keratin, the same stuff as our hair!',
    interestingFactAr: 'قرون وحيد القرن مصنوعة من الكيراتين، وهو نفس مادة شعرنا!',
    lifeSpan: '35 - 50 Years',
    lifeSpanAr: '٣٥ - ٥٠ سنة',
    babyName: 'Calf',
    babyNameAr: 'دغفل وحيد القرن',
    primaryColor: '#A1A1AA', // Zinc 400
    secondaryColor: '#71717A', // Zinc 500
    accentColor: '#E4E4E7', // Horn
  },
  {
    id: 'hippo',
    originalName: 'Hippo',
    originalNameAr: 'فرس النهر',
    category: 'wild',
    footprintType: 'heavy',
    habitat: 'Rivers & Lakes',
    habitatAr: 'الأنهار والبحيرات',
    food: 'Herbivore (Plants)',
    foodAr: 'آكل عشب',
    interestingFact: 'Hippos can hold their breath underwater for up to 5 minutes.',
    interestingFactAr: 'يستطيع فرس النهر حبس أنفاسه تحت الماء لمدة تصل إلى ٥ دقائق.',
    lifeSpan: '40 - 50 Years',
    lifeSpanAr: '٤٠ - ٥٠ سنة',
    babyName: 'Calf',
    babyNameAr: 'عجل فرس النهر',
    primaryColor: '#818CF8', // Indigo 400
    secondaryColor: '#6366F1', // Indigo 500
    accentColor: '#EEF2F6', // Teeth
  },
  {
    id: 'monkey',
    originalName: 'Monkey',
    originalNameAr: 'القرد',
    category: 'wild',
    footprintType: 'paw',
    habitat: 'Tropical Rainforests',
    habitatAr: 'الغابات الاستوائية المطيرة',
    food: 'Omnivore (Fruits & Insects)',
    foodAr: 'آكل كل شيء (فواكه وحشرات)',
    interestingFact: 'Monkeys use their tails for balance and wrapping around branches.',
    interestingFactAr: 'تستخدم القرود ذيولها للتوازن والالتفاف حول الأغصان.',
    lifeSpan: '15 - 30 Years',
    lifeSpanAr: '١٥ - ٣٠ سنة',
    babyName: 'Infant',
    babyNameAr: 'وليد القرد',
    primaryColor: '#B45309', // Amber 700
    secondaryColor: '#8B5CF6', // Purple 500 (fun card background)
    accentColor: '#FDBA74', // Skin tone
  },
  {
    id: 'gorilla',
    originalName: 'Gorilla',
    originalNameAr: 'الغوريلا',
    category: 'wild',
    footprintType: 'heavy',
    habitat: 'Mountain & Lowland Forests',
    habitatAr: 'الغابات الجبلية والمنخفضة',
    food: 'Herbivore (Leaves & Shoots)',
    foodAr: 'آكل عشب (أوراق الشجر والبراعم)',
    interestingFact: 'Gorillas are highly intelligent and can learn sign language!',
    interestingFactAr: 'الغوريلا ذكية جداً ويمكنها تعلم لغة الإشارة!',
    lifeSpan: '35 - 40 Years',
    lifeSpanAr: '٣٥ - ٤٠ سنة',
    babyName: 'Infant',
    babyNameAr: 'وليد الغوريلا',
    primaryColor: '#475569', // Slate 600
    secondaryColor: '#334155', // Slate 700
    accentColor: '#94A3B8', // Slate chest
  },
  {
    id: 'pig',
    originalName: 'Pig',
    originalNameAr: 'الخنزير',
    category: 'farm',
    footprintType: 'hoof',
    habitat: 'Farms & Woodlands',
    habitatAr: 'المزارع والغابات',
    food: 'Omnivore (Plants & Roots)',
    foodAr: 'آكل كل شيء',
    interestingFact: 'Pigs roll in mud to stay cool and protect their skin from the sun.',
    interestingFactAr: 'تتمرغ الخنازير في الطين لتبقى باردة وتحمي بشرتها من الشمس.',
    lifeSpan: '15 - 20 Years',
    lifeSpanAr: '١٥ - ٢٠ سنة',
    babyName: 'Piglet',
    babyNameAr: 'خُنُوص (خنزير صغير)',
    primaryColor: '#FDBA74', // Peach/Orange 300
    secondaryColor: '#F472B6', // Pink 400
    accentColor: '#EC4899', // Nose Pink
  },
  {
    id: 'dog',
    originalName: 'Dog',
    originalNameAr: 'الكلب',
    category: 'farm',
    footprintType: 'paw',
    habitat: 'Homes & Farms',
    habitatAr: 'المنازل والمزارع',
    food: 'Omnivore',
    foodAr: 'آكل كل شيء',
    interestingFact: 'Dogs have an incredible sense of smell, 10,000 times better than ours!',
    interestingFactAr: 'تمتلك الكلاب حاسة شم مذهلة، أفضل بـ ١٠ آلاف مرة من حاستنا!',
    lifeSpan: '10 - 13 Years',
    lifeSpanAr: '١٠ - ١٣ سنة',
    babyName: 'Puppy',
    babyNameAr: 'جرو الكلب',
    primaryColor: '#F59E0B', // Amber 500
    secondaryColor: '#D97706', // Amber 600
    accentColor: '#FEF3C7', // Spot color
  },
  {
    id: 'cat',
    originalName: 'Cat',
    originalNameAr: 'القطة',
    category: 'farm',
    footprintType: 'paw',
    habitat: 'Homes & Barns',
    habitatAr: 'المنازل والحظائر',
    food: 'Carnivore (Meat)',
    foodAr: 'آكل لحوم',
    interestingFact: 'Cats can jump up to six times their height in one leap!',
    interestingFactAr: 'تستطيع القطط القفز إلى ما يصل لستة أضعاف طولها في قفزة واحدة!',
    lifeSpan: '12 - 15 Years',
    lifeSpanAr: '١٢ - ١٥ سنة',
    babyName: 'Kitten',
    babyNameAr: 'هريرة',
    primaryColor: '#93C5FD', // Blue 300 (fun)
    secondaryColor: '#3B82F6', // Blue 500
    accentColor: '#FCA5A5', // Nose/ears
  },
  {
    id: 'cow',
    originalName: 'Cow',
    originalNameAr: 'البقرة',
    category: 'farm',
    footprintType: 'hoof',
    habitat: 'Grassy Fields & Barns',
    habitatAr: 'الحقول العشبية والحظائر',
    food: 'Herbivore (Grass)',
    foodAr: 'آكل عشب',
    interestingFact: 'Cows have four stomachs to help them digest tough grass!',
    interestingFactAr: 'الأبقار لها أربعة معدات لمساعدتها على هضم العشب الصلب!',
    lifeSpan: '15 - 20 Years',
    lifeSpanAr: '١٥ - ٢٠ سنة',
    babyName: 'Calf',
    babyNameAr: 'عجل',
    primaryColor: '#F8FAFC', // Slate 50
    secondaryColor: '#E2E8F0', // Slate 200
    accentColor: '#0F172A', // Spots (Black)
  },
  {
    id: 'buffalo',
    originalName: 'Buffalo',
    originalNameAr: 'الجاموس',
    category: 'farm',
    footprintType: 'hoof',
    habitat: 'Swamps & Grasslands',
    habitatAr: 'المستنقعات والمراعي',
    food: 'Herbivore (Grass)',
    foodAr: 'آكل عشب',
    interestingFact: 'Water buffalo love to spend hours wallowing in deep water mud.',
    interestingFactAr: 'يحب جاموس الماء قضاء ساعات في التمرغ في طين المياه العميقة.',
    lifeSpan: '15 - 25 Years',
    lifeSpanAr: '١٥ - ٢٥ سنة',
    babyName: 'Calf',
    babyNameAr: 'عجل الجاموس',
    primaryColor: '#64748B', // Slate 500
    secondaryColor: '#475569', // Slate 600
    accentColor: '#1E293B', // Horns
  },
  {
    id: 'sheep',
    originalName: 'Sheep',
    originalNameAr: 'الخروف',
    category: 'farm',
    footprintType: 'hoof',
    habitat: 'Pastures & Meadows',
    habitatAr: 'المراعي والمروج',
    food: 'Herbivore (Grass)',
    foodAr: 'آكل عشب',
    interestingFact: 'Sheep wool grows forever and must be sheared once a year.',
    interestingFactAr: 'صوف الخراف ينمو للأبد ويجب جزّه مرة في السنة.',
    lifeSpan: '10 - 12 Years',
    lifeSpanAr: '١٠ - ١٢ سنة',
    babyName: 'Lamb',
    babyNameAr: 'حمل (جدي الخروف)',
    primaryColor: '#E2E8F0', // Slate 200 (Fluffy Wool)
    secondaryColor: '#FFFFFF', // White
    accentColor: '#F87171', // Cheek Rosy Pink
  },
  {
    id: 'goat',
    originalName: 'Goat',
    originalNameAr: 'الماعز',
    category: 'farm',
    footprintType: 'hoof',
    habitat: 'Mountains & Farms',
    habitatAr: 'الجبال والمزارع',
    food: 'Herbivore (Plants & Twigs)',
    foodAr: 'آكل عشب',
    interestingFact: 'Goats are excellent climbers and can leap high onto narrow ledges!',
    interestingFactAr: 'الماعز متسلقون ممتازون ويمكنهم القفز عالياً فوق الحواف الضيقة!',
    lifeSpan: '15 - 18 Years',
    lifeSpanAr: '١٥ - ١٨ سنة',
    babyName: 'Kid',
    babyNameAr: 'جدي',
    primaryColor: '#F1F5F9', // Slate 100
    secondaryColor: '#CBD5E1', // Slate 300
    accentColor: '#A78BFA', // Purple collar
  },
  {
    id: 'horse',
    originalName: 'Horse',
    originalNameAr: 'الحصان',
    category: 'farm',
    footprintType: 'hoof',
    habitat: 'Meadows & Stables',
    habitatAr: 'المروج والاسطبلات',
    food: 'Herbivore (Hay & Grass)',
    foodAr: 'آكل عشب',
    interestingFact: 'Horses can sleep both standing up and lying down!',
    interestingFactAr: 'تستطيع الخيول النوم وهي واقفة وأيضاً وهي مستلقية!',
    lifeSpan: '25 - 30 Years',
    lifeSpanAr: '٢٥ - ٣٠ سنة',
    babyName: 'Foal',
    babyNameAr: 'مهر',
    primaryColor: '#D97706', // Amber 600
    secondaryColor: '#B45309', // Amber 700
    accentColor: '#FEF3C7', // Blonde mane
  },
  {
    id: 'donkey',
    originalName: 'Donkey',
    originalNameAr: 'الحمار',
    category: 'farm',
    footprintType: 'hoof',
    habitat: 'Farms & Dry Lands',
    habitatAr: 'المزارع والأراضي الجافة',
    food: 'Herbivore (Grass & Straw)',
    foodAr: 'آكل عشب',
    interestingFact: 'Donkeys have incredibly powerful memory and can recall places for 25 years!',
    interestingFactAr: 'تتمتع الحمير بذاكرة قوية للغاية ويمكنها تذكر الأماكن لمدة ٢٥ عاماً!',
    lifeSpan: '25 - 30 Years',
    lifeSpanAr: '٢٥ - ٣٠ سنة',
    babyName: 'Foal',
    babyNameAr: 'جحش',
    primaryColor: '#94A3B8', // Slate 400
    secondaryColor: '#475569', // Slate 600
    accentColor: '#E2E8F0', // Snout
  },
  {
    id: 'camel',
    originalName: 'Camel',
    originalNameAr: 'الجمل',
    category: 'farm',
    footprintType: 'heavy',
    habitat: 'Deserts & Sandy Plains',
    habitatAr: 'الصحاري والسهول الرملية',
    food: 'Herbivore (Thorny Plants)',
    foodAr: 'آكل عشب (نباتات شوكية)',
    interestingFact: 'Camel humps store fat, not water, to provide energy in the desert!',
    interestingFactAr: 'سنام الجمل يخزن الدهون، وليس الماء، لتوفير الطاقة في الصحراء!',
    lifeSpan: '40 - 50 Years',
    lifeSpanAr: '٤٠ - ٥٠ سنة',
    babyName: 'Calf',
    babyNameAr: 'حوار (ابن الجمل)',
    primaryColor: '#F59E0B', // Amber 500
    secondaryColor: '#D97706', // Amber 600
    accentColor: '#FDE047', // Light sand
  },
  {
    id: 'chicken',
    originalName: 'Chicken',
    originalNameAr: 'الدجاجة',
    category: 'birds',
    footprintType: 'bird',
    habitat: 'Coops & Farmlands',
    habitatAr: 'الأقفاص والأراضي الزراعية',
    food: 'Omnivore (Grains & Worms)',
    foodAr: 'آكل كل شيء',
    interestingFact: 'Chickens have a language with over 30 unique sounds to talk to each other.',
    interestingFactAr: 'للدجاج لغة تحتوي على أكثر من ٣٠ صوتاً فريداً للتحدث مع بعضهم البعض.',
    lifeSpan: '5 - 10 Years',
    lifeSpanAr: '٥ - ١٠ سنوات',
    babyName: 'Chick',
    babyNameAr: 'كتكوت',
    primaryColor: '#FDE047', // Yellow 300
    secondaryColor: '#F59E0B', // Amber 500
    accentColor: '#EF4444', // Red comb
  },
  {
    id: 'rooster',
    originalName: 'Rooster',
    originalNameAr: 'الديك',
    category: 'birds',
    footprintType: 'bird',
    habitat: 'Barnyards',
    habitatAr: 'حظائر المزارع',
    food: 'Omnivore (Grains & Seeds)',
    foodAr: 'آكل كل شيء',
    interestingFact: 'Roosters crow in the morning because they have an internal clock.',
    interestingFactAr: 'يصيح الديك في الصباح لأن لديه ساعة داخلية.',
    lifeSpan: '5 - 8 Years',
    lifeSpanAr: '٥ - ٨ سنوات',
    babyName: 'Cockerel',
    babyNameAr: 'كتكوت الديك',
    primaryColor: '#EF4444', // Red
    secondaryColor: '#F59E0B', // Amber
    accentColor: '#3B82F6', // Blue feathers
  },
  {
    id: 'duck',
    originalName: 'Duck',
    originalNameAr: 'البطة',
    category: 'birds',
    footprintType: 'webbed',
    habitat: 'Ponds & Lakes',
    habitatAr: 'البرك والبحيرات',
    food: 'Omnivore (Weeds & Insects)',
    foodAr: 'آكل كل شيء',
    interestingFact: 'Ducks have waterproof feathers, thanks to a special oil they produce.',
    interestingFactAr: 'البط له ريش مقاوم للماء بفضل زيت خاص ينتجه.',
    lifeSpan: '5 - 10 Years',
    lifeSpanAr: '٥ - ١٠ سنوات',
    babyName: 'Duckling',
    babyNameAr: 'فرخ البط (بطوط)',
    primaryColor: '#6EE7B7', // Emerald 300
    secondaryColor: '#10B981', // Emerald 500
    accentColor: '#F59E0B', // Orange bill
  },
  {
    id: 'goose',
    originalName: 'Goose',
    originalNameAr: 'الإوزة',
    category: 'birds',
    footprintType: 'webbed',
    habitat: 'Wetlands & Lakes',
    habitatAr: 'الأراضي الرطبة والبحيرات',
    food: 'Herbivore (Grass & Aquatic Plants)',
    foodAr: 'آكل عشب',
    interestingFact: 'Geese fly in a "V" shape to save energy while traveling long distances.',
    interestingFactAr: 'يطير الإوز في شكل حرف "V" لتوفير الطاقة أثناء السفر لمسافات طويلة.',
    lifeSpan: '10 - 15 Years',
    lifeSpanAr: '١٠ - ١٥ سنة',
    babyName: 'Gosling',
    babyNameAr: 'فرخ الإوز',
    primaryColor: '#F8FAFC', // Slate 50
    secondaryColor: '#E2E8F0', // Slate 200
    accentColor: '#F97316', // Orange beak
  },
  {
    id: 'turkey',
    originalName: 'Turkey',
    originalNameAr: 'الديك الرومي',
    category: 'birds',
    footprintType: 'bird',
    habitat: 'Forests & Farms',
    habitatAr: 'الغابات والمزارع',
    food: 'Omnivore (Acorns & Insects)',
    foodAr: 'آكل كل شيء',
    interestingFact: 'Turkeys can run up to 25 miles per hour on land!',
    interestingFactAr: 'تستطيع الديوك الرومية الركض بسرعة تصل لـ ٢٥ ميلاً في الساعة!',
    lifeSpan: '3 - 5 Years',
    lifeSpanAr: '٣ - ٥ سنوات',
    babyName: 'Poult',
    babyNameAr: 'فرخ الرومي',
    primaryColor: '#78716C', // Stone 500
    secondaryColor: '#EF4444', // Red wattle
    accentColor: '#3B82F6', // Blue neck
  },
  {
    id: 'owl',
    originalName: 'Owl',
    originalNameAr: 'البومة',
    category: 'birds',
    footprintType: 'bird',
    habitat: 'Woodlands & Deserts',
    habitatAr: 'الغابات والصحاري',
    food: 'Carnivore (Small Insects & Rodents)',
    foodAr: 'آكل لحوم (حشرات وقوارض)',
    interestingFact: 'Owls cannot move their eyes, but they can turn their heads 270 degrees!',
    interestingFactAr: 'البوم لا يمكنها تحريك عيونها، لكن يمكنها تدوير رؤوسها ٢٧٠ درجة!',
    lifeSpan: '10 - 15 Years',
    lifeSpanAr: '١٠ - ١٥ سنة',
    babyName: 'Owlet',
    babyNameAr: 'فرخ البومة',
    primaryColor: '#8B5CF6', // Purple (playful)
    secondaryColor: '#4C1D95', // Dark Purple
    accentColor: '#FBBF24', // Yellow big eyes
  },
  {
    id: 'parrot',
    originalName: 'Parrot',
    originalNameAr: 'الببغاء',
    category: 'birds',
    footprintType: 'bird',
    habitat: 'Tropical Rainforests',
    habitatAr: 'الغابات الاستوائية المطيرة',
    food: 'Herbivore (Seeds, Fruit & Flowers)',
    foodAr: 'آكل عشب',
    interestingFact: 'Parrots can mimic human words and even solve puzzles!',
    interestingFactAr: 'تستطيع الببغاوات تقليد الكلمات البشرية بل وحل الألغاز!',
    lifeSpan: '30 - 50 Years',
    lifeSpanAr: '٣٠ - ٥٠ سنة',
    babyName: 'Chick',
    babyNameAr: 'فرخ الببغاء',
    primaryColor: '#10B981', // Green
    secondaryColor: '#EF4444', // Red
    accentColor: '#FBBF24', // Yellow
  },
  {
    id: 'crow',
    originalName: 'Crow',
    originalNameAr: 'الغراب',
    category: 'birds',
    footprintType: 'bird',
    habitat: 'Fields & Forests',
    habitatAr: 'الحقول والغابات',
    food: 'Omnivore',
    foodAr: 'آكل كل شيء',
    interestingFact: 'Crows are super smart; they can recognize human faces for years!',
    interestingFactAr: 'الغربان ذكية جداً؛ يمكنها التعرف على وجوه البشر لسنوات!',
    lifeSpan: '7 - 15 Years',
    lifeSpanAr: '٧ - ١٥ سنة',
    babyName: 'Chicks',
    babyNameAr: 'فرخ الغراب',
    primaryColor: '#334155', // Slate 700
    secondaryColor: '#1E293B', // Slate 800
    accentColor: '#64748B', // Shimmer grey
  },
  {
    id: 'eagle',
    originalName: 'Eagle',
    originalNameAr: 'النسر',
    category: 'birds',
    footprintType: 'bird',
    habitat: 'Mountains & Forests',
    habitatAr: 'الجبال والغابات',
    food: 'Carnivore (Fish & Small Mammals)',
    foodAr: 'آكل لحوم',
    interestingFact: 'Eagles have incredible eyesight; they can spot a rabbit from 2 miles away!',
    interestingFactAr: 'تتمتع النسور بنظر خارق؛ يمكنها رصد أرنب من مسافة ميلين!',
    lifeSpan: '20 - 30 Years',
    lifeSpanAr: '٢٠ - ٣٠ سنة',
    babyName: 'Eaglet',
    babyNameAr: 'هيثم (ابن النسر)',
    primaryColor: '#78350F', // Amber 900
    secondaryColor: '#FBBF24', // Golden beak
    accentColor: '#FFFFFF', // White head
  },
  {
    id: 'falcon',
    originalName: 'Falcon',
    originalNameAr: 'الصقر',
    category: 'birds',
    footprintType: 'bird',
    habitat: 'Deserts & Mountains',
    habitatAr: 'الصحاري والجبال',
    food: 'Carnivore (Birds)',
    foodAr: 'آكل لحوم',
    interestingFact: 'Falcons are the fastest birds, diving at over 200 miles per hour!',
    interestingFactAr: 'الصقور هي أسرع الطيور، حيث تغوص بسرعة تزيد عن ٢٠٠ ميل في الساعة!',
    lifeSpan: '12 - 15 Years',
    lifeSpanAr: '١٢ - ١٥ سنة',
    babyName: 'Falconet',
    babyNameAr: 'فرخ الصقر',
    primaryColor: '#4B5563', // Gray 600
    secondaryColor: '#F59E0B', // Amber
    accentColor: '#9CA3AF', // Gray chest
  },
  {
    id: 'bird',
    originalName: 'Little Bird',
    originalNameAr: 'العصفور',
    category: 'birds',
    footprintType: 'bird',
    habitat: 'Gardens & Parks',
    habitatAr: 'الحدائق والمنتزهات',
    food: 'Herbivore (Seeds & Nectar)',
    foodAr: 'آكل عشب (بذور ورحيق)',
    interestingFact: 'Little birds sing lovely songs to welcome the warm morning sun.',
    interestingFactAr: 'تغني العصافير ألحاناً جميلة للترحيب بشمس الصباح الدافئة.',
    lifeSpan: '2 - 5 Years',
    lifeSpanAr: '٢ - ٥ سنوات',
    babyName: 'Nestling',
    babyNameAr: 'فرخ العصفور',
    primaryColor: '#60A5FA', // Blue 400
    secondaryColor: '#93C5FD', // Blue 300
    accentColor: '#F59E0B', // Beak
  },
  {
    id: 'penguin',
    originalName: 'Penguin',
    originalNameAr: 'البطريق',
    category: 'birds',
    footprintType: 'webbed',
    habitat: 'Icy Coasts & Antarctica',
    habitatAr: 'السواحل الجليدية والقارة القطبية الجنوبية',
    food: 'Carnivore (Fish & Krill)',
    foodAr: 'آكل لحوم (أسماك وروبيان)',
    interestingFact: 'Penguins cannot fly in the air, but they "fly" underwater incredibly fast!',
    interestingFactAr: 'لا تستطيع البطاريق الطيران في الهواء، لكنها "تطير" تحت الماء بسرعة كبيرة!',
    lifeSpan: '15 - 20 Years',
    lifeSpanAr: '١٥ - ٢٠ سنة',
    babyName: 'Chick',
    babyNameAr: 'فرخ البطريق',
    primaryColor: '#1E293B', // Slate 800
    secondaryColor: '#06B6D4', // Cyan (icy water)
    accentColor: '#F59E0B', // Yellow chest patch
  },
  {
    id: 'peacock',
    originalName: 'Peacock',
    originalNameAr: 'الطاووس',
    category: 'birds',
    footprintType: 'bird',
    habitat: 'Forestlands & Gardens',
    habitatAr: 'أراضي الغابات والحدائق',
    food: 'Omnivore (Seeds & Insects)',
    foodAr: 'آكل كل شيء',
    interestingFact: 'Only boy peacocks have those giant, colorful glowing feathers!',
    interestingFactAr: 'ذكور الطاووس فقط هي التي تمتلك تلك الريش العملاقة والملونة المتوهجة!',
    lifeSpan: '15 - 20 Years',
    lifeSpanAr: '١٥ - ٢٠ سنة',
    babyName: 'Peachick',
    babyNameAr: 'فرخ الطاووس',
    primaryColor: '#0D9488', // Teal 600
    secondaryColor: '#2563EB', // Blue 600
    accentColor: '#10B981', // Green feather eyes
  },
  {
    id: 'frog',
    originalName: 'Frog',
    originalNameAr: 'الضفدع',
    category: 'reptiles', // categorised broadly for simple kid terms or reptiles/amphibians
    footprintType: 'webbed',
    habitat: 'Ponds & Swamps',
    habitatAr: 'البرك والمستنقعات',
    food: 'Carnivore (Flies & Bugs)',
    foodAr: 'آكل لحوم (ذباب وحشرات)',
    interestingFact: 'Frogs drink water through their thin skin instead of using their mouths!',
    interestingFactAr: 'تشرب الضفادع الماء من خلال جلدها الرقيق بدلاً من استخدام فمها!',
    lifeSpan: '4 - 10 Years',
    lifeSpanAr: '٤ - ١٠ سنوات',
    babyName: 'Tadpole',
    babyNameAr: 'أبو ذنيبة (شرغوف)',
    primaryColor: '#10B981', // Green
    secondaryColor: '#34D399', // Emerald
    accentColor: '#F472B6', // Pink cheeks
  },
  {
    id: 'bee',
    originalName: 'Honey Bee',
    originalNameAr: 'النحلة',
    category: 'insects',
    footprintType: 'insect',
    habitat: 'Gardens & Meadows',
    habitatAr: 'الحدائق والمروج',
    food: 'Herbivore (Nectar & Pollen)',
    foodAr: 'رحيق الورد وحبوب اللقاح',
    interestingFact: 'Bees perform a little "waggle dance" to show friends where flowers are!',
    interestingFactAr: 'تؤدي النحلة "رقصة اهتزازية" قصيرة لتخبر صديقاتها بمكان وجود الزهور!',
    lifeSpan: '1 - 5 Months',
    lifeSpanAr: '١ - ٥ أشهر',
    babyName: 'Larva',
    babyNameAr: 'يرقة النحل',
    primaryColor: '#FBBF24', // Yellow
    secondaryColor: '#1E293B', // Slate (Stripes)
    accentColor: '#38BDF8', // Cyan wings
  },
  {
    id: 'butterfly',
    originalName: 'Butterfly',
    originalNameAr: 'الفراشة',
    category: 'insects',
    footprintType: 'insect',
    habitat: 'Fields & Rainforests',
    habitatAr: 'الحقول والغابات المطيرة',
    food: 'Herbivore (Liquid Nectar)',
    foodAr: 'رحيق الزهور',
    interestingFact: 'Butterflies taste their food using their feet instead of mouths!',
    interestingFactAr: 'تتذوق الفراشات طعامها بأقدامها بدلاً من فمها!',
    lifeSpan: '2 - 4 Weeks',
    lifeSpanAr: '٢ - ٤ أسابيع',
    babyName: 'Caterpillar',
    babyNameAr: 'يسروع (يرقة الفراشة)',
    primaryColor: '#F472B6', // Pink
    secondaryColor: '#818CF8', // Indigo
    accentColor: '#FBBF24', // Yellow details
  },
  {
    id: 'cricket',
    originalName: 'Cricket',
    originalNameAr: 'الصرصور المغني',
    category: 'insects',
    footprintType: 'insect',
    habitat: 'Grassy Meadows',
    habitatAr: 'المروج العشبية',
    food: 'Omnivore (Plants & Seeds)',
    foodAr: 'آكل كل شيء',
    interestingFact: 'Crickets make chirp sounds by rubbing their wings together!',
    interestingFactAr: 'تصدر صراصير الليل صوت الغناء بفرك أجنحتها معاً!',
    lifeSpan: '2 - 3 Months',
    lifeSpanAr: '٢ - ٣ أشهر',
    babyName: 'Nymph',
    babyNameAr: 'حورية',
    primaryColor: '#10B981', // Lime-ish green
    secondaryColor: '#059669', // Dark emerald
    accentColor: '#93C5FD', // Light blue accent
  },
  {
    id: 'wolf',
    originalName: 'Wolf',
    originalNameAr: 'الذئب',
    category: 'wild',
    footprintType: 'paw',
    habitat: 'Forests & Arctic',
    habitatAr: 'الغابات والمناطق القطبية',
    food: 'Carnivore (Meat)',
    foodAr: 'آكل لحوم',
    interestingFact: 'Wolves howl to talk to their pack and mark their territory.',
    interestingFactAr: 'تعوي الذئاب لتتواصل مع قطيعها وتحدد منطقتها الخاصة.',
    lifeSpan: '6 - 8 Years',
    lifeSpanAr: '٦ - ٨ سنوات',
    babyName: 'Pup',
    babyNameAr: 'جرو الذئب',
    primaryColor: '#64748B', // Slate grey
    secondaryColor: '#475569', // Dark slate
    accentColor: '#FDE047', // Yellow eyes
  },
  {
    id: 'fox',
    originalName: 'Fox',
    originalNameAr: 'الثعلب',
    category: 'wild',
    footprintType: 'paw',
    habitat: 'Forests & Grasslands',
    habitatAr: 'الغابات والمراعي',
    food: 'Omnivore (Rabbits & Berries)',
    foodAr: 'آكل كل شيء',
    interestingFact: 'Foxes have furry paws that help keep them warm in cold snow!',
    interestingFactAr: 'للثعالب مخالب مغطاة بالفراء لتساعدها على البقاء دافئة في الثلج!',
    lifeSpan: '3 - 6 Years',
    lifeSpanAr: '٣ - ٦ سنوات',
    babyName: 'Kit',
    babyNameAr: 'جرو الثعلب',
    primaryColor: '#F97316', // Orange
    secondaryColor: '#FFFFFF', // White tail tip
    accentColor: '#1E293B', // Black ears
  },
  {
    id: 'bear',
    originalName: 'Bear',
    originalNameAr: 'الدب',
    category: 'wild',
    footprintType: 'heavy',
    habitat: 'Mountains & Forests',
    habitatAr: 'الجبال والغابات',
    food: 'Omnivore (Fish & Berries)',
    foodAr: 'آكل كل شيء',
    interestingFact: 'Bears sleep through the entire winter in a deep nap called hibernation.',
    interestingFactAr: 'تنام الدببة طوال فصل الشتاء في غفوة طويلة تسمى البيات الشتوي.',
    lifeSpan: '20 - 25 Years',
    lifeSpanAr: '٢٠ - ٢٥ سنة',
    babyName: 'Cub',
    babyNameAr: 'ديسم (ابن الدب)',
    primaryColor: '#78350F', // Brown
    secondaryColor: '#451A03', // Dark Brown
    accentColor: '#FDBA74', // Soft snout
  },
  {
    id: 'panda',
    originalName: 'Panda',
    originalNameAr: 'الباندا',
    category: 'wild',
    footprintType: 'heavy',
    habitat: 'Bamboo Forests',
    habitatAr: 'غابات الخيزران',
    food: 'Herbivore (Bamboo)',
    foodAr: 'آكل عشب (خيزران)',
    interestingFact: 'Giant Pandas eat bamboo for up to 12 hours every single day!',
    interestingFactAr: 'تأكل الباندا العملاقة الخيزران لمدة تصل إلى ١٢ ساعة يومياً!',
    lifeSpan: '20 - 30 Years',
    lifeSpanAr: '٢٠ - ٣٠ سنة',
    babyName: 'Cub',
    babyNameAr: 'ديسم الباندا',
    primaryColor: '#FFFFFF', // White
    secondaryColor: '#1E293B', // Black patches
    accentColor: '#10B981', // Green bamboo
  },
  {
    id: 'koala',
    originalName: 'Koala',
    originalNameAr: 'الكوالا',
    category: 'wild',
    footprintType: 'paw',
    habitat: 'Eucalyptus Forests',
    habitatAr: 'غابات الأوكالبتوس (الكينا)',
    food: 'Herbivore (Eucalyptus Leaves)',
    foodAr: 'آكل عشب (أوراق الكينا)',
    interestingFact: 'Koalas sleep up to 20 hours a day because leaf food takes energy to digest!',
    interestingFactAr: 'تنام الكوالا حتى ٢٠ ساعة يومياً لأن طعام أوراق الشجر يستغرق طاقة لهضمه!',
    lifeSpan: '13 - 18 Years',
    lifeSpanAr: '١٣ - ١٨ سنة',
    babyName: 'Joey',
    babyNameAr: 'جوي (ابن الكوالا)',
    primaryColor: '#94A3B8', // Grey
    secondaryColor: '#CBD5E1', // Soft grey
    accentColor: '#F472B6', // Pink nose
  },
  {
    id: 'kangaroo',
    originalName: 'Kangaroo',
    originalNameAr: 'الكنغر',
    category: 'wild',
    footprintType: 'heavy',
    habitat: 'Australian Bush',
    habitatAr: 'الأحراش الأسترالية',
    food: 'Herbivore (Grass & Shrubs)',
    foodAr: 'آكل عشب',
    interestingFact: 'Kangaroos hop to travel and cannot walk backwards!',
    interestingFactAr: 'يقفز الكنغر للتنقل، ولا يمكنه المشي إلى الخلف أبداً!',
    lifeSpan: '6 - 15 Years',
    lifeSpanAr: '٦ - ١٥ سنة',
    babyName: 'Joey',
    babyNameAr: 'جوي (ابن الكنغر)',
    primaryColor: '#D97706', // Brownish
    secondaryColor: '#FEF3C7', // Pouch interior
    accentColor: '#F59E0B', // Accent
  },
  {
    id: 'zebra',
    originalName: 'Zebra',
    originalNameAr: 'الحمار الوحشي',
    category: 'wild',
    footprintType: 'hoof',
    habitat: 'Grassy Savannahs',
    habitatAr: 'السافانا العشبية',
    food: 'Herbivore (Grass)',
    foodAr: 'آكل عشب',
    interestingFact: 'Zebras can run in a zig-zag pattern to escape from lions!',
    interestingFactAr: 'يمكن للحمر الوحشية الجري بنمط متعرج للهروب من الأسود!',
    lifeSpan: '20 - 25 Years',
    lifeSpanAr: '٢٠ - ٢٥ سنة',
    babyName: 'Foal',
    babyNameAr: 'جحش الحمار الوحشي',
    primaryColor: '#FFFFFF', // White
    secondaryColor: '#0F172A', // Black stripes
    accentColor: '#CBD5E1', // Grey muzzle
  },
  {
    id: 'giraffe',
    originalName: 'Giraffe',
    originalNameAr: 'الزرافة',
    category: 'wild',
    footprintType: 'heavy',
    habitat: 'Savannahs & Woodlands',
    habitatAr: 'السافانا والغابات',
    food: 'Herbivore (Acacia Leaves)',
    foodAr: 'آكل عشب (أوراق الأكاسيا)',
    interestingFact: 'Giraffes have blue-purple tongues that are 20 inches long!',
    interestingFactAr: 'للزرافات ألسنة زرقاء مائلة للأرجواني بطول ٥٠ سنتيمتراً!',
    lifeSpan: '20 - 25 Years',
    lifeSpanAr: '٢٠ - ٢٥ سنة',
    babyName: 'Calf',
    babyNameAr: 'عجل الزرافة',
    primaryColor: '#F59E0B', // Amber
    secondaryColor: '#78350F', // Brown spots
    accentColor: '#8B5CF6', // Purple tongue
  },
  {
    id: 'crocodile',
    originalName: 'Crocodile',
    originalNameAr: 'التمساح',
    category: 'reptiles',
    footprintType: 'slither',
    habitat: 'Tropical Rivers & Lakes',
    habitatAr: 'الأنهار والبحيرات الاستوائية',
    food: 'Carnivore (Fish & Meat)',
    foodAr: 'آكل لحوم',
    interestingFact: 'Crocodiles can replace each of their 80 teeth up to 50 times!',
    interestingFactAr: 'يمكن للتماسيح استبدال كل سن من أسنانها الـ ٨٠ حتى ٥٠ مرة!',
    lifeSpan: '60 - 70 Years',
    lifeSpanAr: '٦٠ - ٧٠ سنة',
    babyName: 'Hatchling',
    babyNameAr: 'تمساح صغير (فرخ التمساح)',
    primaryColor: '#047857', // Emerald dark
    secondaryColor: '#10B981', // Green scales
    accentColor: '#FEF08A', // Yellow eyes
  },
  {
    id: 'alligator',
    originalName: 'Alligator',
    originalNameAr: 'القاطور (تمساح أمريكي)',
    category: 'reptiles',
    footprintType: 'slither',
    habitat: 'Swamps & Marshes',
    habitatAr: 'المستنقعات والأهوار',
    food: 'Carnivore (Fish & Turtles)',
    foodAr: 'آكل لحوم',
    interestingFact: 'Alligators love to lie in the sun to warm up their bodies.',
    interestingFactAr: 'تحب القواطير الاستلقاء تحت أشعة الشمس لتدفئة أجسامها.',
    lifeSpan: '30 - 50 Years',
    lifeSpanAr: '٣٠ - ٥٠ سنة',
    babyName: 'Hatchling',
    babyNameAr: 'فرخ القاطور',
    primaryColor: '#065F46', // Dark green
    secondaryColor: '#047857', // Green
    accentColor: '#F59E0B', // Teeth yellow
  },
  {
    id: 'snake',
    originalName: 'Snake',
    originalNameAr: 'الثعبان',
    category: 'reptiles',
    footprintType: 'slither',
    habitat: 'Deserts & Forests',
    habitatAr: 'الصحاري والغابات',
    food: 'Carnivore (Mice & Frogs)',
    foodAr: 'آكل لحوم (فئران وضفادع)',
    interestingFact: 'Snakes smell using their tongue and do not have eyelids!',
    interestingFactAr: 'تشم الثعابين باستخدام لسانها ولا تملك جفوناً لعيونها!',
    lifeSpan: '9 - 15 Years',
    lifeSpanAr: '٩ - ١٥ سنة',
    babyName: 'Snakelet',
    babyNameAr: 'ثعبان صغير',
    primaryColor: '#10B981', // Green
    secondaryColor: '#F59E0B', // Orange stripes
    accentColor: '#EF4444', // Red tongue
  },
  {
    id: 'turtle',
    originalName: 'Turtle',
    originalNameAr: 'السلحفاة',
    category: 'reptiles',
    footprintType: 'slither',
    habitat: 'Oceans & Lakes',
    habitatAr: 'المحيطات والبحيرات',
    food: 'Omnivore (Algae & Jellyfish)',
    foodAr: 'آكل كل شيء',
    interestingFact: 'Turtle shells are built directly into their skeleton!',
    interestingFactAr: 'قواقع السلاحف مبنية مباشرة في هياكلها العظمية!',
    lifeSpan: '50 - 100 Years',
    lifeSpanAr: '٥٠ - ١٠٠ سنة',
    babyName: 'Hatchling',
    babyNameAr: 'فرخ السلحفاة',
    primaryColor: '#10B981', // Green shell
    secondaryColor: '#B45309', // Brown shell pattern
    accentColor: '#34D399', // Skin
  },
  {
    id: 'dolphin',
    originalName: 'Dolphin',
    originalNameAr: 'الدلفين',
    category: 'ocean',
    footprintType: 'webbed', // ocean animals don't walk but keep a funny bubble trail
    habitat: 'Warm Coastal Seas',
    habitatAr: 'البحار الساحلية الدافئة',
    food: 'Carnivore (Fish & Squid)',
    foodAr: 'آكل لحوم (أسماك وحبار)',
    interestingFact: 'Dolphins sleep with one eye open to watch for predators!',
    interestingFactAr: 'تنام الدلافين بعين واحدة مفتوحة لمراقبة الحيوانات المفترسة!',
    lifeSpan: '20 - 30 Years',
    lifeSpanAr: '٢٠ - ٣٠ سنة',
    babyName: 'Calf',
    babyNameAr: 'عجل الدلفين',
    primaryColor: '#38BDF8', // Sky 400
    secondaryColor: '#0284C7', // Sky 600
    accentColor: '#E0F2FE', // Belly white
  },
  {
    id: 'whale',
    originalName: 'Blue Whale',
    originalNameAr: 'الحوت الأزرق',
    category: 'ocean',
    footprintType: 'webbed',
    habitat: 'Deep Oceans',
    habitatAr: 'المحيطات العميقة',
    food: 'Carnivore (Tiny Krill)',
    foodAr: 'آكل لحوم (الروبيان الصغير)',
    interestingFact: 'Blue whale is the largest animal to ever live on Earth!',
    interestingFactAr: 'الحوت الأزرق هو أكبر حيوان عاش على وجه الأرض على الإطلاق!',
    lifeSpan: '80 - 90 Years',
    lifeSpanAr: '٨٠ - ٩٠ سنة',
    babyName: 'Calf',
    babyNameAr: 'عجل الحوت',
    primaryColor: '#2563EB', // Blue 600
    secondaryColor: '#1D4ED8', // Blue 700
    accentColor: '#93C5FD', // Water blowhole
  },
  {
    id: 'seal',
    originalName: 'Seal',
    originalNameAr: 'الفقمة',
    category: 'ocean',
    footprintType: 'webbed',
    habitat: 'Cold Sea Coasts',
    habitatAr: 'سواحل البحار الباردة',
    food: 'Carnivore (Fish & Shellfish)',
    foodAr: 'آكل أسماك',
    interestingFact: 'Seals sleep in the water and can even sleep while floating like balloons!',
    interestingFactAr: 'تنام الفقمات في الماء ويمكنها النوم وهي تطفو كالبالونات!',
    lifeSpan: '25 - 30 Years',
    lifeSpanAr: '٢٥ - ٣٠ سنة',
    babyName: 'Pup',
    babyNameAr: 'جرو الفقمة',
    primaryColor: '#38BDF8', // Sky Blue
    secondaryColor: '#64748B', // Soft slate
    accentColor: '#FDA4AF', // Blushing pink cheeks
  },
  {
    id: 'shark',
    originalName: 'Shark',
    originalNameAr: 'القرش',
    category: 'ocean',
    footprintType: 'webbed',
    habitat: 'Tropical & Cold Seas',
    habitatAr: 'البحار الاستوائية والباردة',
    food: 'Carnivore (Fish)',
    foodAr: 'آكل أسماك',
    interestingFact: 'Sharks do not have any bones; their skeleton is made of soft cartilage!',
    interestingFactAr: 'ليس لدى القروش عظام؛ يتكون هيكلها العظمي من غضاريف مرنة!',
    lifeSpan: '20 - 30 Years',
    lifeSpanAr: '٢٠ - ٣٠ سنة',
    babyName: 'Pup',
    babyNameAr: 'جرو القرش',
    primaryColor: '#475569', // Slate
    secondaryColor: '#64748B', // Slate light
    accentColor: '#EF4444', // Red (scary/cool details)
  }
];
