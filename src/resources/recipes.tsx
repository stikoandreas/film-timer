import { randomId } from '@mantine/hooks';
import { ReactNode } from 'react';
import {
  IconBrightness,
  IconBucketDroplet,
  IconDropletPause,
  IconShadowOff,
  IconSparkles,
  IconTemperaturePlus,
  IconTriangleOff,
  IconTriangle,
  IconTrianglePlus,
  IconRotateRectangle,
} from '@tabler/icons-react';

import { DevelopingProcess } from '@/types/DevelopingProcess';

export const recipeIcons: Record<string, ReactNode> = {
  dropletPause: <IconDropletPause />,
  temperaturePlus: <IconTemperaturePlus />,
  bucketDroplet: <IconBucketDroplet />,
  sparkles: <IconSparkles />,
  brightness: <IconBrightness />,
  shadowOff: <IconShadowOff />,
  triangleOff: <IconTriangleOff />,
  triangle: <IconTriangle />,
  trianglePlus: <IconTrianglePlus />,
  rotateRectangle: <IconRotateRectangle />,
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
  {
    name: 'Tetenal Colortec C41',
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
        step_seconds: 3.25 * 60,
        icon: 'brightness',
        exhaust_compensation: 15,
        exhaust_compensation_rate: 4,
      },
      {
        name: 'Blix',
        chime_seconds: 30,
        key: randomId(),
        step_seconds: 6 * 60,
        icon: 'triangleOff',
        exhaust_compensation: 60 * 2,
        exhaust_compensation_rate: 4,
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
  {
    name: 'Bellini C41',
    steps: [
      {
        name: 'Preheat',
        chime_seconds: '',
        key: randomId(),
        step_seconds: 3 * 60,
        icon: 'temperaturePlus',
      },
      {
        name: 'Develop',
        chime_seconds: 30,
        key: randomId(),
        step_seconds: 3.25 * 60,
        icon: 'brightness',
        exhaust_compensation: 15,
        exhaust_compensation_rate: 4,
      },
      {
        name: 'Bleach',
        chime_seconds: '',
        key: randomId(),
        step_seconds: 6 * 60,
        icon: 'triangle',
      },
      {
        name: 'Fix',
        chime_seconds: '',
        key: randomId(),
        step_seconds: 3 * 60,
        icon: 'shadowOff',
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
  {
    name: 'Bellini E6',
    steps: [
      {
        name: 'Preheat',
        chime_seconds: '',
        key: randomId(),
        step_seconds: 3 * 60,
        icon: 'temperaturePlus',
      },
      {
        name: 'First Developer',
        chime_seconds: 30,
        key: randomId(),
        step_seconds: 6 * 60,
        icon: 'brightness',
        exhaust_compensation: 30,
        exhaust_compensation_rate: 6,
      },
      {
        name: 'Wash',
        chime_seconds: '',
        key: randomId(),
        step_seconds: 2 * 60,
        icon: 'bucketDroplet',
      },
      {
        name: 'Reversal',
        chime_seconds: '',
        key: randomId(),
        step_seconds: 2 * 60,
        icon: 'rotateRectangle',
      },
      {
        name: 'Colour Developer',
        chime_seconds: 30,
        key: randomId(),
        step_seconds: 6 * 60,
        icon: 'brightness',
      },
      {
        name: 'Pre Bleach',
        chime_seconds: '',
        key: randomId(),
        step_seconds: 2 * 60,
        icon: 'trianglePlus',
      },
      {
        name: 'Bleach',
        chime_seconds: 30,
        key: randomId(),
        step_seconds: 6 * 60,
        icon: 'triangle',
      },
      {
        name: 'Fix',
        chime_seconds: 30,
        key: randomId(),
        step_seconds: 4 * 60,
        icon: 'shadowOff',
      },
      {
        name: 'Wash',
        chime_seconds: 2 * 60,
        key: randomId(),
        step_seconds: 6 * 60,
        icon: 'bucketDroplet',
      },
      {
        name: 'Stab',
        chime_seconds: '',
        key: randomId(),
        step_seconds: 0.5 * 60,
        icon: 'sparkles',
      },
    ],
    key: randomId(),
  },
];
