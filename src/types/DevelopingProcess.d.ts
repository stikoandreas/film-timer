export interface DevelopingStep {
  name: string;
  step_seconds: number;
  chime_seconds: number | '';
  key: string;
}

export interface DevelopingProcess {
  name?: string;
  steps: Array<DevelopingStep>;
  key: string;
}
