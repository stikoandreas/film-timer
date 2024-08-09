import { Link, useSearchParams } from 'react-router-dom';
import { Center, Button, Stack } from '@mantine/core';

import { Timer } from '@/components/Timer/Timer';

export function TimerPage() {
  const [searchParams] = useSearchParams();
  if (!searchParams.get('recipe')) return 'No recipe';
  const recipe = JSON.parse(searchParams.get('recipe')!);
  return (
    <Center>
      <Stack align="center">
        <Timer process={recipe} />
        <Button maw="90vw" w="450pt" component={Link} variant="outline" to="/">
          Cancel
        </Button>
      </Stack>
    </Center>
  );
}
