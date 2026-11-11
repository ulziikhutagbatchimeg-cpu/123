import { useEffect, useState } from 'react';
import type { LeitnerCard } from '../types/chemistry';

// The Leitner flashcard boxes: one review moves a card, and the next review is spaced by the box it is in
export type CardOutcome = 'easy' | 'good' | 'hard';
const INTERVAL_DAYS = [1, 2, 4, 7, 14];

// Easy moves the card up a box, good keeps it where it is, hard sends it back to box 1
export const reviewCard = (card: LeitnerCard, outcome: CardOutcome, now = Date.now()): LeitnerCard => {
  const box = outcome === 'easy' ? Math.min(5, card.box + 1) : outcome === 'good' ? Math.min(5, card.box) : 1;
  return { ...card, box, lastReviewDate: now, nextReviewDate: now + INTERVAL_DAYS[box - 1] * 86400000 };
};

// A deck kept in this browser under its own key. The cards come from the data; the student's boxes and review dates are
// laid over them, so a new card joins the deck and a corrected definition shows at once.
export const useLeitnerDeck = (storageKey: string, initial: LeitnerCard[]) => {
  const [cards, setCards] = useState<LeitnerCard[]>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = new Map((JSON.parse(raw) as LeitnerCard[]).map(c => [c.id, c]));
        return initial.map(c => {
          const s = saved.get(c.id);
          return s ? { ...c, box: s.box, lastReviewDate: s.lastReviewDate, nextReviewDate: s.nextReviewDate } : c;
        });
      }
    } catch {
      // Storage blocked or unreadable: the deck starts afresh
    }
    return initial;
  });
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(cards));
    } catch {
      // Storage can be blocked (private window); the deck still works for this visit
    }
  }, [storageKey, cards]);
  const review = (cardId: string, outcome: CardOutcome) =>
    setCards(prev => prev.map(c => (c.id === cardId ? reviewCard(c, outcome) : c)));
  return { cards, review };
};
