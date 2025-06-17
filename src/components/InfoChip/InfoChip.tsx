import { Center, Text } from '@mantine/core';
import { Icon } from '@tabler/icons-react';

import classes from './InfoChip.module.css';

export function InfoChip({
  size = 'xs',
  ...props
}: {
  icon: Icon;
  label: string;
  primary?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}) {
  return (
    <Center key={props.label}>
      <props.icon
        className={[classes.icon, props.primary ? classes.primary : undefined].join(' ')}
      />
      <Text size={size}>{props.label}</Text>
    </Center>
  );
}
