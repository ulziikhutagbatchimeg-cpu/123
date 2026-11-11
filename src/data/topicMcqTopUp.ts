import type { ExamQuestion } from '../types/chemistry';
import { TOP_UP_AS_01 } from './topUpAs01';
import { TOP_UP_AS_02 } from './topUpAs02';
import { TOP_UP_AS_03A } from './topUpAs03a';
import { TOP_UP_AS_03B } from './topUpAs03b';
import { TOP_UP_AS_04 } from './topUpAs04';
import { TOP_UP_AS_06 } from './topUpAs06';
import { TOP_UP_AS_09 } from './topUpAs09';
import { TOP_UP_AS_11 } from './topUpAs11';
import { TOP_UP_AS_13 } from './topUpAs13';
import { TOP_UP_AS_14 } from './topUpAs14';
import { TOP_UP_AS_17 } from './topUpAs17';
import { TOP_UP_AS_19 } from './topUpAs19';
import { TOP_UP_IG_02 } from './topUpIg02';
import { TOP_UP_IG_03 } from './topUpIg03';
import { TOP_UP_IG_06 } from './topUpIg06';
import { TOP_UP_IG_08 } from './topUpIg08';
import { TOP_UP_IG_10 } from './topUpIg10';
import { TOP_UP_IG_11 } from './topUpIg11';

// The questions added so that each IGCSE 0620 and AS 9701 topic has at least 11: six or more for the topic quiz and five of
// its own for the end-of-topic test (see lib/topicQuestions.ts, which keeps a topic's last five questions for its test).
//  - AS 9701: most topics had none or five, so the added ones come last in the pool and the last five of them are the test.
//  - IGCSE 0620: every topic already had enough for a test, so the added ones (medium and hard) come first and join the quiz.
// They are original; some follow the question types of the teacher's slides with new substances and numbers. None is
// copied from a Cambridge paper or the coursebook.
export const TOPIC_MCQ_TOP_UP: ExamQuestion[] = [
  ...TOP_UP_AS_01,
  ...TOP_UP_AS_02,
  ...TOP_UP_AS_03A,
  ...TOP_UP_AS_03B,
  ...TOP_UP_AS_04,
  ...TOP_UP_AS_06,
  ...TOP_UP_AS_09,
  ...TOP_UP_AS_11,
  ...TOP_UP_AS_13,
  ...TOP_UP_AS_14,
  ...TOP_UP_AS_17,
  ...TOP_UP_AS_19
];
export const TOPIC_MCQ_PRACTICE_FIRST: ExamQuestion[] = [
  ...TOP_UP_IG_02,
  ...TOP_UP_IG_03,
  ...TOP_UP_IG_06,
  ...TOP_UP_IG_08,
  ...TOP_UP_IG_10,
  ...TOP_UP_IG_11
];
