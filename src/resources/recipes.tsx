import { randomId } from '@mantine/hooks';
import { ReactNode } from 'react';

import { DevelopingProcess } from '@/types/DevelopingProcess';
import {
  IconBrightness,
  IconBucketDroplet,
  IconDetailsOff,
  IconDropletPause,
  IconShadowOff,
  IconSparkles,
  IconTemperaturePlus,
  IconTriangleOff,
} from '@tabler/icons-react';

export const recipeIcons: Record<string, ReactNode> = {
  dropletPause: <IconDropletPause />,
  temperaturePlus: <IconTemperaturePlus />,
  bucketDroplet: <IconBucketDroplet />,
  sparkles: <IconSparkles />,
  brightness: <IconBrightness />,
  shadowOff: <IconShadowOff />,
  triangleOff: <IconTriangleOff />,
};

export const recipes: DevelopingProcess[] = [
  {
    name: 'Black and white',
    steps: [
      {
        name: 'Develop',
        chime_seconds: 30,
        key: randomId(),
        step_seconds: 6 * 60,
        icon: 'brightness',
      },
      {
        name: 'Stop',
        chime_seconds: '',
        key: randomId(),
        step_seconds: 30,
        icon: 'dropletPause',
      },
      { name: 'Fix', chime_seconds: 30, key: randomId(), step_seconds: 5 * 60, icon: 'shadowOff' },
    ],
    key: randomId(),
  },
  {
    name: 'C41',
    steps: [
      {
        name: 'Preheat',
        chime_seconds: '',
        key: randomId(),
        step_seconds: 2 * 60,
        icon: 'temperaturePlus',
      },
      {
        name: 'Develop',
        chime_seconds: 30,
        key: randomId(),
        step_seconds: 3.5 * 60,
        icon: 'brightness',
      },
      {
        name: 'Blix',
        chime_seconds: 30,
        key: randomId(),
        step_seconds: 6 * 60,
        icon: 'triangleOff',
      },
      {
        name: 'Rinse',
        chime_seconds: '',
        key: randomId(),
        step_seconds: 3 * 60,
        icon: 'bucketDroplet',
      },
      {
        name: 'Stab',
        chime_seconds: '',
        key: randomId(),
        step_seconds: 1 * 60,
        icon: 'sparkles',
      },
    ],
    key: randomId(),
  },
];
