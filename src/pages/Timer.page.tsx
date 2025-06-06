import { useSearchParams, useNavigate } from 'react-router-dom';
import { Center, Button, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

import { Timer } from '@/components/Timer/Timer';
import { StaticView } from '@/components/StaticView/StaticView';

export function TimerPage() {
  const [searchParams] = useSearchParams();
  if (!searchParams.get('recipe')) return 'No recipe';
  const recipe = JSON.parse(searchParams.get('recipe')!);
  const navigate = useNavigate();

  const openModal = () =>
    modals.openConfirmModal({
      title: 'Stop developing?',
      children: <Text size="sm">Are you sure you want to stop developing this recipe?</Text>,
      labels: { confirm: 'Cancel timer', cancel: 'Keep developing' },
      confirmProps: { color: 'red' },
      overlayProps: { blur: 5 },
      onCancel: () => {},
      onConfirm: () => navigate(-1),
      centered: true,
    });

  return (
    <StaticView>
      <Center>
        <Stack align="center">
          <Timer process={recipe} />
          <Button maw="90vw" w="450pt" variant="outline" onClick={openModal}>
            Cancel
          </Button>
        </Stack>
      </Center>
    </StaticView>
  );
}
