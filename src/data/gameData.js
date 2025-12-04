// Import all character images
import elphabaImg from '../assets/images/elphaba.png';
import glindaImg from '../assets/images/glinda.png';
import fiyeroImg from '../assets/images/fiyero.png';
import nessaroseImg from '../assets/images/nessarose.png';
import boqImg from '../assets/images/boq.png';
import madamemorribleImg from '../assets/images/madamemorrible.png';
import flyingmonkeyImg from '../assets/images/flyingmonkey.png';
import demonImg from '../assets/images/demon.png';

// Import all sound files
import wicked1Sound from '../assets/sounds/Wicked1.MP3';
import wicked2Sound from '../assets/sounds/Wicked2.MP3';
import wicked3Sound from '../assets/sounds/Wicked3.MP3';
import wicked4Sound from '../assets/sounds/Wicked4.MP3';
import wrongSound from '../assets/sounds/wrong.mp3';

export const gameData = {
  1: {
    title: "Chapter 1: Elphaba's Arrival",
    story: "Elphaba arrives at Shiz University and discovers her magical powers.",
    hero: "Elphaba",
    villain: "Madame Morrible",
    heroImage: elphabaImg,
    villainImage: madamemorribleImg,
    unlocked: true
  },
  2: {
    title: "Chapter 2: Glinda's Dilemma",
    story: "Glinda faces a tough choice between popularity and true friendship.",
    hero: "Glinda",
    villain: "Flying Monkey",
    heroImage: glindaImg,
    villainImage: flyingmonkeyImg,
    unlocked: false
  },
  3: {
    title: "Chapter 3: Fiyero's Stand",
    story: "Fiyero stands up to protect Elphaba from the Wizard's schemes.",
    hero: "Fiyero",
    villain: "Boq",
    heroImage: fiyeroImg,
    villainImage: boqImg,
    unlocked: false
  },
  4: {
    title: "Chapter 4: Nessarose's Spell",
    story: "Nessarose casts a spell that changes the fate of Oz.",
    hero: "Nessarose",
    villain: "Madame Morrible",
    heroImage: nessaroseImg,
    villainImage: madamemorribleImg,
    unlocked: false
  },
  5: {
    title: "Chapter 5: Boq's Wish",
    story: "Boq wishes to win Glinda's heart but gets caught in a magical mishap.",
    hero: "Boq",
    villain: "Flying Monkey",
    heroImage: boqImg,
    villainImage: flyingmonkeyImg,
    unlocked: false
  },
  6: {
    title: "Chapter 6: The Wizard's Plan",
    story: "The Wizard tries to capture Elphaba and take her powers.",
    hero: "Elphaba",
    villain: "Demon",
    heroImage: elphabaImg,
    villainImage: demonImg,
    unlocked: false
  },
  7: {
    title: "Chapter 7: The Final Showdown",
    story: "Elphaba, Glinda, and friends unite to defeat the Wizard and save Oz.",
    hero: "Glinda",
    villain: "Demon",
    heroImage: glindaImg,
    villainImage: demonImg,
    unlocked: false
  }
};

export const sounds = {
  correct: [wicked1Sound, wicked2Sound, wicked3Sound, wicked4Sound],
  wrong: wrongSound
};

export const multiplicationTables = [3, 4];

// Division chapters with specific times tables
export const divisionChapterTables = {
  1: [1, 2, 3],     // Chapter 1: 1-3 times table divisions
  2: [4, 5],        // Chapter 2: 4-5
  3: [6, 7],        // Chapter 3: 6-7
  4: [8, 9, 10],    // Chapter 4: 8-10
  5: [1, 2, 3, 4, 5], // Chapter 5: 1-5
  6: [6, 7, 8],     // Chapter 6: 6-8
  7: [6, 7, 8, 9, 10] // Chapter 7: 6-10
};

export const generateQuestion = (practiceMode = 'multiplication', chapter = 1) => {
  if (practiceMode === 'division') {
    // Get tables for this chapter
    const tables = divisionChapterTables[chapter] || [2, 3];
    const divisor = tables[Math.floor(Math.random() * tables.length)];
    
    // Generate a division problem (divisor × multiplier = dividend)
    const multiplier = Math.floor(Math.random() * 10) + 1;
    const dividend = divisor * multiplier;
    
    return {
      question: `${dividend} ÷ ${divisor}`,
      answer: multiplier,
      table: divisor,
      multiplier,
      dividend
    };
  } else {
    // Multiplication mode
    const table = multiplicationTables[Math.floor(Math.random() * multiplicationTables.length)];
    const multiplier = Math.floor(Math.random() * 10) + 1;
    
    return {
      question: `${table} × ${multiplier}`,
      answer: table * multiplier,
      table,
      multiplier
    };
  }
};

export const generateQuestions = (count = 50, practiceMode = 'multiplication', chapter = 1) => {
  const questions = [];
  for (let i = 0; i < count; i++) {
    questions.push(generateQuestion(practiceMode, chapter));
  }
  return questions;
};