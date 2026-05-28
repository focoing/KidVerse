export interface Game {
  id: string
  name: string
  description: string
  icon: string
  type: 'math' | 'english' | 'emotion' | 'language' | 'cooperation' | 'friends' | 'art' | 'music'
  difficulty: 1 | 2 | 3
  instructions: string
}

export const games: Game[] = [
  {
    id: 'number-click',
    name: '数字点击',
    description: '点击正确的数字，锻炼数字识别能力',
    icon: 'Calculator',
    type: 'math',
    difficulty: 1,
    instructions: '根据提示，点击正确的数字！',
  },
  {
    id: 'letter-drag',
    name: '字母拼写',
    description: '拖拽字母组成正确的单词',
    icon: 'Languages',
    type: 'english',
    difficulty: 2,
    instructions: '将字母拖拽到正确位置，组成单词！',
  },
  {
    id: 'emotion-game',
    name: '情绪识别屋',
    description: '识别角色的情绪，学会理解他人感受',
    icon: 'Smile',
    type: 'emotion',
    difficulty: 1,
    instructions: '识别角色的情绪，选择正确的表情！',
  },
  {
    id: 'language-game',
    name: '语言表达森林',
    description: '学会表达自己的需求，礼貌沟通',
    icon: 'MessageCircle',
    type: 'language',
    difficulty: 2,
    instructions: '学习用礼貌的语言表达自己！',
  },
  {
    id: 'cooperation-game',
    name: '合作乐园',
    description: '和小伙伴一起完成任务，学会合作与等待',
    icon: 'Users',
    type: 'cooperation',
    difficulty: 2,
    instructions: '和小伙伴一起完成任务！',
  },
  {
    id: 'friends-game',
    name: '朋友广场',
    description: '理解他人行为背后的想法和意图',
    icon: 'Users2',
    type: 'friends',
    difficulty: 2,
    instructions: '理解朋友的想法，做出正确选择！',
  },
  {
    id: 'art-game',
    name: '创意绘画',
    description: '在画布上自由创作，发挥你的想象力',
    icon: 'Palette',
    type: 'art',
    difficulty: 1,
    instructions: '选择颜色和画笔大小，在画布上绘画！',
  },
  {
    id: 'music-game',
    name: '音乐节奏',
    description: '跟着节奏击打音符，享受音乐的乐趣',
    icon: 'Music',
    type: 'music',
    difficulty: 2,
    instructions: '点击或按键盘 D F J K 键击打下落的音符！',
  },
]

export const numberGameQuestions = [
  { question: '找出数字 5', answer: 5, options: [2, 5, 8, 3] },
  { question: '找出数字 7', answer: 7, options: [7, 1, 4, 9] },
  { question: '找出数字 3', answer: 3, options: [6, 8, 3, 1] },
  { question: '找出数字 9', answer: 9, options: [5, 9, 2, 7] },
  { question: '找出数字 1', answer: 1, options: [4, 1, 6, 8] },
  { question: '找出数字 8', answer: 8, options: [8, 3, 5, 2] },
  { question: '找出数字 4', answer: 4, options: [9, 7, 4, 1] },
  { question: '找出数字 6', answer: 6, options: [6, 2, 8, 5] },
]

export const letterWords = [
  { word: 'CAT', letters: ['C', 'A', 'T'], hint: '喵喵叫的小动物' },
  { word: 'DOG', letters: ['D', 'O', 'G'], hint: '汪汪叫的小动物' },
  { word: 'SUN', letters: ['S', 'U', 'N'], hint: '天空中最亮的星星' },
  { word: 'TREE', letters: ['T', 'R', 'E', 'E'], hint: '森林里的植物' },
  { word: 'FISH', letters: ['F', 'I', 'S', 'H'], hint: '水里游的动物' },
]

export const animalCards = [
  { id: 'cat', name: '小猫', emoji: '🐱' },
  { id: 'dog', name: '小狗', emoji: '🐶' },
  { id: 'bird', name: '小鸟', emoji: '🐦' },
  { id: 'rabbit', name: '兔子', emoji: '🐰' },
  { id: 'bear', name: '小熊', emoji: '🐻' },
  { id: 'elephant', name: '大象', emoji: '🐘' },
]

export const colors = [
  { name: '红色', color: '#EF4444', emoji: '🔴' },
  { name: '蓝色', color: '#3B82F6', emoji: '🔵' },
  { name: '绿色', color: '#22C55E', emoji: '🟢' },
  { name: '黄色', color: '#EAB308', emoji: '🟡' },
  { name: '紫色', color: '#A855F7', emoji: '🟣' },
  { name: '橙色', color: '#F97316', emoji: '🟠' },
]

export const puzzleImages = [
  { id: 'cat', name: '可爱小猫', pieces: 4, src: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cartoon%20cat%20kitten%20colorful%20children%20illustration&image_size=square' },
  { id: 'dog', name: '可爱小狗', pieces: 4, src: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cartoon%20dog%20puppy%20colorful%20children%20illustration&image_size=square' },
  { id: 'fish', name: '彩色小鱼', pieces: 4, src: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cartoon%20fish%20colorful%20underwater%20children%20illustration&image_size=square' },
  { id: 'tree', name: '大树', pieces: 9, src: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cartoon%20tree%20forest%20colorful%20children%20illustration&image_size=square' },
]
