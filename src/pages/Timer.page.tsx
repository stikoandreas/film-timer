import { useSearchParams, useNavigate } from 'react-router-dom';
import { Center, Button, Stack } from '@mantine/core';

import { Timer } from '@/components/Timer/Timer';

export function TimerPage() {
  const [searchParams] = useSearchParams();
  if (!searchParams.get('recipe')) return 'No recipe';
  const recipe = JSON.parse(searchParams.get('recipe')!);
  const navigate = useNavigate();
  return (
    <Center>
      <Stack align="center">
        <Timer process={recipe} />
        <Button maw="90vw" w="450pt" variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </Stack>
    </Center>
  );
}
