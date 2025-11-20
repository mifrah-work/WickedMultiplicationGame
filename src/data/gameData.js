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
    title: "Chapter 1",
    story: "Elphaba blasts the Flying Monkeys with emerald lightning every time Reanne gets a multiplication correct.",
    hero: "Elphaba",
    villain: "Flying Monkeys",
    heroImage: elphabaImg,
    villainImage: flyingMonkeyImg,
    unlocked: true
  },
  2: {
    title: "Chapter 2",
    story: "Glinda twirls her sparkly wand and knocks back Madame Morrible whenever Reanne solves a question.",
    hero: "Glinda",
    villain: "Madame Morrible",
    heroImage: glindaImg,
    villainImage: madameMorribleImg,
    unlocked: false
  },
  3: {
    title: "Chapter 3",
    story: "Fiyero dashes through the trees, striking down a Monkey with every right answer.",
    hero: "Fiyero",
    villain: "Flying Monkeys",
    heroImage: fiyeroImg,
    villainImage: flyingMonkeyImg,
    unlocked: false
  },
  4: {
    title: "Chapter 4",
    story: "Nessarose casts a steady, glowing spell that weakens Madame Morrible each time Reanne gets one right.",
    hero: "Nessarose",
    villain: "Madame Morrible",
    heroImage: nessaroseImg,
    villainImage: madameMorribleImg,
    unlocked: false
  },
  5: {
    title: "Chapter 5",
    story: "Boq bravely swings his lantern, scattering a Monkey swarm with each correct solution.",
    hero: "Boq",
    villain: "Flying Monkeys",
    heroImage: boqImg,
    villainImage: flyingMonkeyImg,
    unlocked: false
  },
  6: {
    title: "Chapter 6",
    story: "Elphaba unleashes a giant emerald shockwave powered by Reanne's perfect answers.",
    hero: "Elphaba",
    villain: "Madame Morrible (Boss Round)",
    heroImage: elphabaImg,
    villainImage: madameMorribleImg,
    unlocked: false
  },
  7: {
    title: "Chapter 7",
    story: "Glinda lifts into the air and sparkles explode around her as she defeats each Monkey Reanne answers.",
    hero: "Glinda",
    villain: "Flying Monkeys (Final Round)",
    heroImage: glindaImg,
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