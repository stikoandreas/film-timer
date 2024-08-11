import { DevelopingProcess } from '@/types/DevelopingProcess';
import { randomId } from '@mantine/hooks';

export const recipes: DevelopingProcess[] = [
  {
    name: 'Black and white',
    steps: [
      { name: 'Develop', chime_seconds: 30, key: randomId(), step_seconds: 6 * 60 },
      { name: 'Stop', chime_seconds: '', key: randomId(), step_seconds: 30 },
      { name: 'Fix', chime_seconds: 27, key: randomId(), step_seconds: 5 * 60 },
    ],
    key: randomId(),
  },
  {
    name: 'C41',
    steps: [
      { name: 'Preheat', chime_seconds: '', key: randomId(), step_seconds: 2 * 60 },
      { name: 'Develop', chime_seconds: 30, key: randomId(), step_seconds: 3.5 * 60 },
      { name: 'Blix', chime_seconds: 30, key: randomId(), step_seconds: 6 * 60 },
      { name: 'Rinse', chime_seconds: '', key: randomId(), step_seconds: 3 * 60 },
      { name: 'Stab', chime_seconds: '', key: randomId(), step_seconds: 1 * 60 },
    ],
    key: randomId(),
  },
];
