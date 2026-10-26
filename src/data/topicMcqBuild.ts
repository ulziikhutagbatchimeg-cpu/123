import type { ExamOption, ExamQuestion } from '../types/chemistry';

// Builds one end-of-topic multiple-choice question. Each option is [English, Mongolian]; the correct option is A, B, C or D.
// The questions are original, written for the 0620 syllabus; none is copied from a Cambridge paper.
export const mcq = (
  topicId: string,
  chapterId: string,
  syllabusRef: string,
  n: number,
  titleEn: string,
  titleMn: string,
  questionEn: string,
  questionMn: string,
  options: [string, string][],
  correct: ExamOption['id'],
  misconceptionEn: string,
  misconceptionMn: string,
  remediationTopicId = topicId
): ExamQuestion => ({
  id: `${topicId}-q${n}`,
  topicId,
  chapterId,
  syllabusRef,
  paper: 'Paper 2',
  totalMarks: 1,
  titleEn,
  titleMn,
  questionTextEn: questionEn,
  questionTextMn: questionMn,
  type: 'mcq',
  options: options.map(([textEn, textMn], i) => ({ id: 'ABCD'[i] as ExamOption['id'], textEn, textMn })),
  correctOption: correct,
  misconceptionDiagnosisEn: misconceptionEn,
  misconceptionDiagnosisMn: misconceptionMn,
  remediationTopicId
});

// The question writer of one topic: the topic, chapter and syllabus reference are fixed, so each call gives only the question
export const topicWriter = (topicId: string, chapterId: string, syllabusRef: string) =>
  (
    n: number,
    titleEn: string,
    titleMn: string,
    questionEn: string,
    questionMn: string,
    options: [string, string][],
    correct: ExamOption['id'],
    misconceptionEn: string,
    misconceptionMn: string,
    remediationTopicId?: string
  ) => mcq(topicId, chapterId, syllabusRef, n, titleEn, titleMn, questionEn, questionMn, options, correct, misconceptionEn, misconceptionMn, remediationTopicId);
