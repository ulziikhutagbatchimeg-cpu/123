import type { AlevelTopic } from '../types/alevel';
import { ALEVEL_PART1 } from './alevelTopicsPart1';
import { ALEVEL_PART2 } from './alevelTopicsPart2';
import { ALEVEL_PART3 } from './alevelTopicsPart3';

// The AS & A Level (9701) revision topics, in the order of the revision deck
export const ALEVEL_TOPICS: AlevelTopic[] = [...ALEVEL_PART1, ...ALEVEL_PART2, ...ALEVEL_PART3];
