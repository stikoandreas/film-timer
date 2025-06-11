import { useSearchParams, useNavigate } from 'react-router-dom';
import { Center, Button, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useContext } from 'react';

import { Timer } from '@/components/Timer/Timer';
import { StaticView } from '@/components/StaticView/StaticView';

import { AppStateContext } from '@/context/AppStateContext';

export function TimerPage() {
  const [searchParams] = useSearchParams();
  if (!searchParams.get('recipe')) return 'No recipe';
  const recipe = JSON.parse(searchParams.get('recipe')!);
  const navigate = useNavigate();

  const { recipeActive } = useContext(AppStateContext);

  const openModal = () =>
    recipeActive
      ? modals.openConfirmModal({
          title: 'Stop developing?',
          children: <Text size="sm">Are you sure you want to stop developing this recipe?</Text>,
          labels: { confirm: 'Cancel timer', cancel: 'Keep developing' },
          confirmProps: { color: 'red' },
          overlayProps: { blur: 5 },
          onCancel: () => {},
          onConfirm: () => navigate(-1),
          centered: true,
        })
      : navigate(-1);

  return (
    <StaticView
      style={{ viewTransitionName: 'timer-page', backgroundColor: 'var(--mantine-color-body)' }}
    >
      <Center>
        <Stack align="center">
          <Timer process={recipe} />
          <Button maw="90vw" w="450pt" variant="outline" onClick={openModal}>
            {recipeActive ? 'Cancel' : 'Back to recipes'}
          </Button>
        </Stack>
      </Center>
    </StaticView>
  );
}
