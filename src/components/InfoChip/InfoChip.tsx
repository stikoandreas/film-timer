import { Center, Text } from '@mantine/core';
import { Icon } from '@tabler/icons-react';

import classes from './InfoChip.module.css';

export function InfoChip(props: { icon: Icon; label: string; primary?: boolean }) {
  return (
    <Center key={props.label}>
      <props.icon
        className={[classes.icon, props.primary ? classes.primary : undefined].join(' ')}
      />
      <Text size="sm">{props.label}</Text>
    </Center>
  );
}
