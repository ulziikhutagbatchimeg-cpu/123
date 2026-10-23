import type { AlevelInquiryPlan } from './alevelInquiryTypes';
import { ALEVEL_INQUIRY_PART1 } from './alevelInquiryPart1';
import { ALEVEL_INQUIRY_PART2 } from './alevelInquiryPart2';
import { ALEVEL_INQUIRY_PART3 } from './alevelInquiryPart3';

// The 40-minute inquiry lesson of each 9701 chapter that has slides, keyed by the chapter id (al-ch-N)
export const ALEVEL_INQUIRY: Record<string, AlevelInquiryPlan> = {
  ...ALEVEL_INQUIRY_PART1,
  ...ALEVEL_INQUIRY_PART2,
  ...ALEVEL_INQUIRY_PART3
};
