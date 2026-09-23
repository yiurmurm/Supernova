import { QuizQuestion, QuizResult } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "When chaos erupts in the metropolis, what is your initial reflex?",
    subtitle: "Your split-second instinct reveals your energetic alignment.",
    options: [
      {
        label: "Disappear from view and flank from the blindspot",
        description: "Strike silently without ever being spotted",
        powerAffinity: "stealth",
        icon: "👻"
      },
      {
        label: "Charge forward with crackling offensive energy",
        description: "Overpower the threat with lightning and shockwaves",
        powerAffinity: "electricity",
        icon: "⚡"
      },
      {
        label: "Bend spacetime and reposition all allies instantly",
        description: "Open dimensional doorways to evacuate or ambush",
        powerAffinity: "teleportation",
        icon: "🌀"
      },
      {
        label: "Take to the skies to survey and rain tactical fire",
        description: "Dominate the high-altitude airspace",
        powerAffinity: "flight",
        icon: "🦅"
      }
    ]
  },
  {
    id: 2,
    question: "What is your greatest daily struggle in ordinary life?",
    subtitle: "Every superpower begins as a cure for human friction.",
    options: [
      {
        label: "Rush-hour traffic and slow commutes",
        description: "I want to be anywhere on Earth in 0.1 seconds",
        powerAffinity: "teleportation",
        icon: "🚪"
      },
      {
        label: "Never having enough hours in the day",
        description: "I need to freeze time, pause moments, or rewind mistakes",
        powerAffinity: "time",
        icon: "⏳"
      },
      {
        label: "Dealing with loud, aggressive personalities",
        description: "I want to slip past notice or persuade effortlessly",
        powerAffinity: "stealth",
        icon: "🌫️"
      },
      {
        label: "Feeling physically drained or physically limited",
        description: "I crave endless kinetic endurance and raw power",
        powerAffinity: "electricity",
        icon: "🔋"
      }
    ]
  },
  {
    id: 3,
    question: "Choose your ideal superhero secret hideout:",
    subtitle: "Where you retreat to recharge and calibrate your gear.",
    options: [
      {
        label: "A pocket dimension sanctuary between seconds",
        description: "Accessible only through a quantum ring gate",
        powerAffinity: "teleportation",
        icon: "🌌"
      },
      {
        label: "A glass spire skyscraper laboratory above the clouds",
        description: "Aerodynamic launchpads and lightning dynamos",
        powerAffinity: "flight",
        icon: "🏙️"
      },
      {
        label: "A subterranean cavern behind a neon waterfall",
        description: "Hidden sensors, dark matter pools, and shadow corridors",
        powerAffinity: "stealth",
        icon: "🦇"
      },
      {
        label: "A temporal observatory watching multiple timelines",
        description: "Quartz hourglasses and predictive probability screens",
        powerAffinity: "time",
        icon: "⌛"
      }
    ]
  },
  {
    id: 4,
    question: "Which sensory overclock appeals most to your mind?",
    subtitle: "The way you prefer to perceive cosmic reality.",
    options: [
      {
        label: "Seeing all 14 million probable future outcomes",
        description: "Predict every move before it even crosses their mind",
        powerAffinity: "time",
        icon: "👁️"
      },
      {
        label: "Feeling the planetary magnetic field humming in your hands",
        description: "Command raw voltage, currents, and lightning storms",
        powerAffinity: "electricity",
        icon: "⚡"
      },
      {
        label: "Feeling zero gravitational pull on your skeleton",
        description: "True three-axis freedom in the open sky",
        powerAffinity: "flight",
        icon: "🪶"
      },
      {
        label: "Hearing thoughts whispered across dimensional folds",
        description: "Slip unseen through walls and read intentions",
        powerAffinity: "stealth",
        icon: "🔮"
      }
    ]
  },
  {
    id: 5,
    question: "What is your philosophy on handling rogue villains?",
    subtitle: "Your moral alignment determines your operational doctrine.",
    options: [
      {
        label: "Banish them to a desolate pocket dimension with no escape",
        description: "Clean, instantaneous resolution with zero collateral",
        powerAffinity: "teleportation",
        icon: "🌀"
      },
      {
        label: "Rewind time to stop the heist before it even commences",
        description: "Prevention through chronological mastery",
        powerAffinity: "time",
        icon: "⏰"
      },
      {
        label: "Deliver a 500,000V shockwave that immobilizes instantly",
        description: "Decisive overwhelming force that ends negotiations",
        powerAffinity: "electricity",
        icon: "💥"
      },
      {
        label: "Infiltrate their base unseen and dismantle their power grid",
        description: "Surgical stealth sabotage without firing a shot",
        powerAffinity: "stealth",
        icon: "🗡️"
      }
    ]
  }
];

export const QUIZ_RESULTS: Record<string, QuizResult> = {
  teleportation: {
    powerName: "YOUR POWER: TELEPORTATION ✦",
    tagline: "Master of Spatial Singularities & Wormhole Gateways",
    archetype: "Spacetime Vanguard",
    description: "You reject physical boundaries. Why walk or drive when you can fold the fabric of the universe and step from Tokyo to Manhattan in the blink of an eye? You are strategic, swift, and impossible to pin down.",
    recommendedProductIds: ['acc-portalring', 'potion-voltaris', 'spray-shadowstep'],
    stats: { speed: 100, power: 85, intelligence: 94, stealth: 88, durability: 75 }
  },
  time: {
    powerName: "YOUR POWER: CHRONO-MANIPULATION ✦",
    tagline: "Lord of Temporal Dilation & Probabilistic Foresight",
    archetype: "Temporal Architect",
    description: "You understand that time is the ultimate currency. By slowing perceptual moments or rewinding fatal errors, you operate twenty moves ahead of everyone else in the room.",
    recommendedProductIds: ['acc-timeloop', 'eyewear-trinetra', 'potion-chronoflux'],
    stats: { speed: 92, power: 78, intelligence: 100, stealth: 85, durability: 80 }
  },
  electricity: {
    powerName: "YOUR POWER: ELECTRO-KINETIC SURGE ✦",
    tagline: "Conduit of 500,000-Volt Plasma Arcs & Lightning Overdrive",
    archetype: "Kinetic Dynamo",
    description: "Pure energetic intensity courses through your veins. You don't just react to the world—you supercharge it with electric crackle and unstoppable velocity.",
    recommendedProductIds: ['potion-voltaris', 'spray-stormskin', 'insect-electro-beetle'],
    stats: { speed: 95, power: 99, intelligence: 80, stealth: 35, durability: 88 }
  },
  flight: {
    powerName: "YOUR POWER: AETHERIC FLIGHT ✦",
    tagline: "Sovereign of the Stratosphere & Gravitational Freedom",
    archetype: "Skyward Sovereign",
    description: "Ground-bound gravity was never built for you. You crave the open sky, supersonic thermals, and the high vantage point where cities look like constellations.",
    recommendedProductIds: ['potion-aetherwing', 'spray-pheromone-flight', 'insect-monarch'],
    stats: { speed: 98, power: 75, intelligence: 85, stealth: 72, durability: 75 }
  },
  stealth: {
    powerName: "YOUR POWER: UMBRAL PHANTOM STEALTH ✦",
    tagline: "Shadow Phase Invisibility & Silent Resonance",
    archetype: "Night-Blade Specter",
    description: "The greatest powers are the ones never witnessed. You merge with the shadows, slip past security grids, and vanish like cool vapor before anyone realizes you were there.",
    recommendedProductIds: ['potion-phantom-mist', 'spray-chameleon-cloak', 'acc-shadowpendant'],
    stats: { speed: 85, power: 70, intelligence: 92, stealth: 100, durability: 70 }
  }
};
