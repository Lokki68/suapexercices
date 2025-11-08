export interface BilanInitial {
  conscience: string;
  fc: number;
  fr: number;
  ta: string;
  spo2: string;
  temp: string;
}

export interface EvolutionStep {
  minute: number;
  description: string;
  fc?: number;
  fr?: number;
  ta?: string;
  spo2?: string;
}

export interface Scenario {
  situation: string;
  bilan_initial: BilanInitial;
  evolution: EvolutionStep[];
  objectif_pedagogique: string;
}
