// One 9701 subsection (for example 3.1): its title and every learning outcome, in the same shape as the IGCSE
// statements. Each learning outcome is [number, English, Mongolian]. note is an optional line shown under the title.
export interface ALevelSubsection {
  ref: string;
  en: string;
  mn: string;
  note?: string;
  obj: Array<[number, string, string]>;
}
