import React from 'react';
import { AlertCircle, BookMarked, Calculator, ClipboardCheck, FlaskConical, Gamepad2, GraduationCap } from 'lucide-react';
import type { AppTab, Programme } from '../context/AppContext';

// The student tools, shared by the Student area page and the navigation bar. A tool with courses shows only for those courses.
export interface NavLink {
  id: AppTab;
  labelEn: string;
  labelMn: string;
  descEn: string; // one line, so a student knows what the tool is for
  descMn: string;
  icon: React.ReactNode;
  badge?: number;
  courses?: Programme[];
}

export interface NavGroup {
  id: string;
  titleEn: string;
  titleMn: string;
  items: NavLink[];
}

export const navGroupBadge = (group: NavGroup): number => group.items.reduce((sum, i) => sum + (i.badge ?? 0), 0);

// The student area, sorted by what a student does with it: revise, practise, then lab and games
export const buildStudentGroups = (programme: Programme, unresolvedMistakes: number): NavGroup[] => {
  const groups: NavGroup[] = [
    {
      id: 'revise',
      titleEn: 'Revise',
      titleMn: 'Давтах',
      items: [
        {
          id: 'skills',
          labelEn: 'Exam Skills',
          labelMn: 'Шалгалтын ур чадвар',
          descEn: 'Command words and answer technique',
          descMn: 'Даалгаврын үг, хариулах арга',
          icon: <BookMarked className="w-4 h-4" />
        }
      ]
    },
    {
      id: 'practise',
      titleEn: 'Practise',
      titleMn: 'Дасгалжуулах',
      items: [
        {
          id: 'mistakes',
          labelEn: 'Mistake Notebook',
          labelMn: 'Алдааны сан',
          descEn: 'Questions you missed, to fix',
          descMn: 'Алдсан асуултууд, засах',
          icon: <AlertCircle className="w-4 h-4" />,
          badge: unresolvedMistakes > 0 ? unresolvedMistakes : undefined
        },
        {
          id: 'tests',
          labelEn: 'Tests',
          labelMn: 'Шалгалт',
          descEn: 'Timed chapter tests, auto-marked',
          descMn: 'Цагтай бүлгийн шалгалт, автомат дүгнэлт',
          icon: <ClipboardCheck className="w-4 h-4" />
        },
        {
          id: 'exam',
          labelEn: 'Past Papers',
          labelMn: 'Өмнөх жилийн шалгалт',
          descEn: programme === 'alevel' ? '9701 timed papers' : '0620 timed papers, 2017–2024',
          descMn: programme === 'alevel' ? '9701 цагтай шалгалт' : '0620 цагтай шалгалт, 2017–2024',
          icon: <GraduationCap className="w-4 h-4" />
        },
        {
          id: 'calculations',
          labelEn: 'Calculations',
          labelMn: 'Тооцооны бодлого',
          descEn: 'Calculators and worked numbers',
          descMn: 'Тооцоолуур, тооны бодлого',
          icon: <Calculator className="w-4 h-4" />
        }
      ]
    },
    {
      id: 'lab',
      titleEn: 'Lab & games',
      titleMn: 'Лаборатори, тоглоом',
      items: [
        {
          id: 'labs',
          labelEn: 'Virtual Labs',
          labelMn: 'Виртуал лаб',
          descEn: 'Simulations and external lab resources',
          descMn: 'Симуляци, гадаад лабораторийн нөөц',
          icon: <FlaskConical className="w-4 h-4" />
        },
        {
          id: 'games',
          labelEn: programme === 'alevel' ? 'Key terms & games' : 'Words & games',
          labelMn: programme === 'alevel' ? 'Түлхүүр үг, тоглоом' : 'Үг ба тоглоом',
          descEn: programme === 'alevel' ? '9701 key terms, learned by playing' : '0620 key words: cards and game',
          descMn: programme === 'alevel' ? '9701-ийн түлхүүр үгийг тоглож цээжлэх' : '0620-ийн түлхүүр үг: карт ба тоглоом',
          icon: <Gamepad2 className="w-4 h-4" />
        }
      ]
    }
  ];

  // IGCSE 0620, AS 9701 and A Level 9701 share one menu with the same groups and tools, in the 0620 order.
  return groups
    .map(g => ({ ...g, items: g.items.filter(i => !i.courses || i.courses.includes(programme)) }))
    .filter(g => g.items.length > 0);
};
