// Import all character images
import elphabaImg from '../assets/images/elphaba.png';
import glindaImg from '../assets/images/glinda.png';
import fiyeroImg from '../assets/images/fiyero.png';
import nessaroseImg from '../assets/images/nessarose.png';
import boqImg from '../assets/images/boq.png';
import flyingMonkeyImg from '../assets/images/flyingmonkey.png';
import madameMorribleImg from '../assets/images/madamemorrible.png';

// Import all sound files
import wicked1Sound from '../assets/sounds/Wicked1.MP3';
import wicked2Sound from '../assets/sounds/Wicked2.MP3';
import wicked3Sound from '../assets/sounds/Wicked3.MP3';
import wicked4Sound from '../assets/sounds/Wicked4.MP3';
import wrongSound from '../assets/sounds/wrong.mp3';

export const gameData = {
  1: {
    title: "Chapter 1: Elphaba vs. Flying Monkeys",
    story: "Players answer multiplication questions to help Elphaba fend off mischievous Flying Monkeys attacking the city.",
    hero: "Elphaba",
    villain: "Flying Monkeys",
    heroImage: elphabaImg,
    villainImage: flyingMonkeyImg,
    unlocked: true
  },
  2: {
    title: "Chapter 2: Glinda vs. Madame Morrible",
    story: "Correct answers help Glinda block Madame Morrible’s spells from spreading chaos in the castle.",
    hero: "Glinda",
    villain: "Madame Morrible",
    heroImage: glindaImg,
    villainImage: madameMorribleImg,
    unlocked: false
  },
  3: {
    title: "Chapter 3: Fiyero vs. Flying Monkeys",
    story: "Multiplication problems give Fiyero the power to protect citizens from Flying Monkey mischief.",
    hero: "Fiyero",
    villain: "Flying Monkeys",
    heroImage: fiyeroImg,
    villainImage: flyingMonkeyImg,
    unlocked: false
  },
  4: {
    title: "Chapter 4: Nessarose vs. Madame Morrible",
    story: "Players solve questions to help Nessarose resist Madame Morrible’s manipulations in her palace.",
    hero: "Nessarose",
    villain: "Madame Morrible",
    heroImage: nessaroseImg,
    villainImage: madameMorribleImg,
    unlocked: false
  },
  5: {
    title: "Chapter 5: Boq vs. Flying Monkeys",
    story: "Multiplication answers strengthen Boq to fend off the Flying Monkeys during a forest encounter.",
    hero: "Boq",
    villain: "Flying Monkeys",
    heroImage: boqImg,
    villainImage: flyingMonkeyImg,
    unlocked: false
  },
  6: {
    title: "Chapter 6: Elphaba & Glinda vs. Madame Morrible",
    story: "Both heroes team up, and correct answers help them break Madame Morrible’s spell over the Emerald City.",
    hero: "Elphaba & Glinda",
    villain: "Madame Morrible",
    heroImage: elphabaImg, // You may want to update this to a combined image if available
    villainImage: madameMorribleImg,
    unlocked: false
  },
  7: {
    title: "Chapter 7: Final Battle – Elphaba, Glinda & Fiyero vs. Flying Monkeys",
    story: "Players answer a series of multiplication challenges to defeat the last wave of Flying Monkeys and save the day.",
    hero: "Elphaba, Glinda & Fiyero",
    villain: "Flying Monkeys",
    heroImage: elphabaImg, // You may want to update this to a group image if available
    villainImage: flyingMonkeyImg,
    unlocked: false
  }
};

export const sounds = {
  correct: [wicked1Sound, wicked2Sound, wicked3Sound, wicked4Sound],
  wrong: wrongSound
};

export const multiplicationTables = [3, 4];

export const generateQuestion = () => {
  const table = multiplicationTables[Math.floor(Math.random() * multiplicationTables.length)];
  
  // All tables only go up to 10 (no 11x11, 11x12, or any x11, x12)
  const multiplier = Math.floor(Math.random() * 10) + 1;
  
  return {
    question: `${table} × ${multiplier}`,
    answer: table * multiplier,
    table,
    multiplier
  };
};

export const generateQuestions = (count = 50) => {
  const questions = [];
  for (let i = 0; i < count; i++) {
    questions.push(generateQuestion());
  }
  return questions;
};