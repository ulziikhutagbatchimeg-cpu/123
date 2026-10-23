import type { Bi } from './statesLessons';

// The scientific inquiry plan of each chapter 1 lesson. Every lesson answers one question with one changed variable,
// keeps the others the same, and then states what the model cannot show.

export interface StructuredItem {
  prompt: Bi;
  marks: Bi[]; // one entry per mark point; each entry ends with its mark
  total: number; // total marks for the question
}

export interface InquiryPlan {
  question: Bi; // block 1: the question the lesson answers
  independent: Bi; // block 2: the variable the student changes
  dependent: Bi; // block 2: the variable the student measures
  controlled: Bi; // block 2: what is kept the same
  limitation: Bi; // block 5: what the model cannot show
  structured: StructuredItem; // block 4: an exam-style answer with mark points
}

export const STATES_INQUIRY: Record<string, InquiryPlan> = {
  'states-1': {
    question: {
      mn: 'Хатуу, шингэн, хийн бөөмс ямар зайтай, ямар хөдөлгөөнтэй байдаг вэ?',
      en: 'How far apart are the particles in a solid, a liquid and a gas, and how do they move?'
    },
    independent: { mn: 'Төлөв (хатуу, шингэн, хий)', en: 'State (solid, liquid, gas)' },
    dependent: { mn: 'Бөөмсийн зай, байрлал, хөдөлгөөн', en: 'Particle separation, arrangement and motion' },
    controlled: { mn: 'Бөөмсийн тоо, хэмжээ', en: 'Number and size of particles' },
    limitation: {
      mn: 'Симуляци нь бөөмсийг хялбаршуулсан дүрс. Бодит бөөмс харагдахгүй; хурд ба хэмжээ масштабтай биш.',
      en: 'The simulation is a simplified picture. Real particles cannot be seen, and speeds and sizes are not to scale.'
    },
    structured: {
      prompt: { mn: 'Хийн бөөмсийн зай ба хөдөлгөөнийг тайлбарла.', en: 'Describe the separation and motion of gas particles.' },
      marks: [
        { mn: 'Бөөмс хоорондоо маш хол байна (1)', en: 'The particles are very far apart (1)' },
        { mn: 'Бүх чиглэлд санамсаргүй, хурдан хөдөлнө (1)', en: 'They move randomly and rapidly in all directions (1)' }
      ],
      total: 2
    }
  },
  'states-2': {
    question: {
      mn: 'Мөс хайлах, ус буцлах үед температур юу хийдэг вэ, яагаад?',
      en: 'What does the temperature do while ice melts or water boils, and why?'
    },
    independent: { mn: 'Нийлүүлсэн энерги (халаалтын хугацаа)', en: 'Energy supplied (heating time)' },
    dependent: { mn: 'Температур', en: 'Temperature' },
    controlled: { mn: 'Бодисын хэмжээ, даралт', en: 'Amount of substance and pressure' },
    limitation: {
      mn: 'Муруй нь цэвэр бодисын загвар. Холимгийн хайлах ба буцлах цэг нэг утганд биш, мужид явагддаг.',
      en: 'The curve is for a pure substance. Mixtures melt and boil over a range of temperatures, not at one value.'
    },
    structured: {
      prompt: { mn: 'Мөс 0 °C-т хайлж байхад температур тогтмол байна. Яагаад?', en: 'Ice melts at 0 °C and the temperature stays constant. Why?' },
      marks: [
        { mn: 'Нийлүүлсэн энерги бөөмсийн хоорондын хүчийг даван туулахад зарцуулагдана (1)', en: 'The energy supplied is used to overcome the forces between particles (1)' },
        { mn: 'Бөөмсийн дундаж кинетик энерги, тиймээс температур өөрчлөгдөхгүй (1)', en: 'The average kinetic energy of the particles, and so the temperature, does not change (1)' }
      ],
      total: 2
    }
  },
  'states-3': {
    question: {
      mn: 'Хийг халахад эсвэл шахахад эзлэхүүн ба даралт юу болох вэ?',
      en: 'What happens to the volume and pressure of a gas when it is heated or compressed?'
    },
    independent: {
      mn: 'Температур (тогтмол даралт) эсвэл эзлэхүүн (тогтмол температур)',
      en: 'Temperature (constant pressure) or volume (constant temperature)'
    },
    dependent: { mn: 'Эзлэхүүн эсвэл даралт', en: 'Volume or pressure' },
    controlled: { mn: 'Хийн хэмжээ (бөөмсийн тоо)', en: 'Amount of gas (number of particles)' },
    limitation: {
      mn: 'Симуляци идеал хийг загварчилна. Бодит хий өндөр даралт, бага температурт идеалаас хазайдаг.',
      en: 'The simulation models an ideal gas. Real gases deviate from ideal behaviour at high pressure and low temperature.'
    },
    structured: {
      prompt: { mn: 'Битүү саванд хийг халахад даралт яагаад нэмэгддэг вэ?', en: 'Why does the pressure of a gas in a sealed container increase when it is heated?' },
      marks: [
        { mn: 'Бөөмс илүү хурдан хөдөлнө (1)', en: 'The particles move faster (1)' },
        { mn: 'Ханатай илүү хүчтэй мөргөлдөнө (1)', en: 'They hit the walls with more force (1)' },
        { mn: 'Ханатай илүү олон удаа мөргөлдөнө (1)', en: 'They hit the walls more often (1)' }
      ],
      total: 3
    }
  },
  'states-4': {
    question: {
      mn: 'Диффуз хийд шингэнээс яагаад хурдан явагдах вэ? Mr нөлөөлөх үү?',
      en: 'Why is diffusion faster in gases than in liquids? Does Mr matter?'
    },
    independent: { mn: 'Хийн Mr (NH₃, HCl) эсвэл температур', en: 'Mr of the gas (NH₃, HCl) or temperature' },
    dependent: { mn: 'Бөгжний байрлал ба хугацаа', en: 'Position of the ring and time' },
    controlled: { mn: 'Хоолойн урт, туршилтын нөхцөл', en: 'Tube length and test conditions' },
    limitation: {
      mn: 'Загвар нь хурдны харьцааг харуулна. Бөөмсийн мөргөлдөөн ба концентрацийн градиентийг дүрслээгүй.',
      en: 'The model shows the ratio of speeds. It does not show particle collisions or the concentration gradient.'
    },
    structured: {
      prompt: { mn: 'Хийн диффуз шингэнээс яагаад хурдан вэ?', en: 'Why is diffusion in a gas faster than in a liquid?' },
      marks: [
        { mn: 'Хийн бөөмс хоорондоо хол, хурдан хөдөлнө (1)', en: 'Gas particles are far apart and move quickly (1)' },
        { mn: 'Шингэний бөөмс нягт тул мөргөлдөөн олон, тархалт удаан (1)', en: 'Liquid particles are close together, so they collide often and diffuse slowly (1)' }
      ],
      total: 2
    }
  }
};
