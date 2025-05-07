import { ActionIcon, Card, Group, Stack, Text } from '@mantine/core';
import { IconAlarm, IconChevronRight, IconListCheck } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { recipes } from '@/resources/recipes';
import { DevelopingStep } from '@/types/DevelopingProcess';
import { formatSeconds } from '@/lib/time';

import { InfoChip } from '@/components/InfoChip/InfoChip';

export function RecipesPage() {
  return (
    <Stack align="center" mt="md" gap={0}>
      {recipes.map((recipe, index) => (
        <Card
          component={Link}
          w={400}
          maw="90vw"
          shadow="sm"
          mt="xs"
          key={recipe.key}
          to={`/recipes/${index}`}
        >
          <Group justify="space-between ">
            <Stack gap={6}>
              <Text m={0} ml={3} fz={17} fw={500}>
                {recipe.name}
              </Text>
              <Group gap={8}>
                <InfoChip
                  icon={IconAlarm}
                  primary
                  label={formatSeconds(
                    recipe.steps
                      .map((step: DevelopingStep) => step.step_seconds)
                      .reduce((acc: number, step: number) => acc + step, 0)
                  ).concat('', recipe.steps.some((step) => step.exhaust_compensation) ? '+' : '')}
                />
                <InfoChip icon={IconListCheck} label={`${recipe.steps.length} steps`} />
              </Group>
            </Stack>
            <ActionIcon variant="subtle" color="gray">
              <IconChevronRight size={24} />
            </ActionIcon>
          </Group>
        </Card>
      ))}
    </Stack>
  );
}
