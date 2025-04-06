import { ReactNode } from 'react';

export interface DevelopingStep {
  name: string;
  step_seconds: number;
  chime_seconds: number | '';
  exhaust_compensation?: number;
  exhaust_compensation_rate?: number;
  key: string;
  icon?: string;
  continuous_agitation?: number;
  temperature?: number;
}

export interface DevelopingProcess {
  name?: string;
  steps: Array<DevelopingStep>;
  key: string;
}
