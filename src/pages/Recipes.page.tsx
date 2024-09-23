import { Button, Card, Group, Stack, Title } from '@mantine/core';
import { IconAlarm, IconListCheck } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { recipes } from '@/resources/recipes';
import { DevelopingStep } from '@/types/DevelopingProcess';
import { formatSeconds } from '@/lib/time';

import { InfoChip } from '@/components/InfoChip/InfoChip';

export function RecipesPage() {
  return (
    <Stack align="center" mt="md">
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
              <Title order={4} ml={3}>
                {recipe.name}
              </Title>
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
            <Button component={Link} to={`/recipes/${index}`}>
              Go
            </Button>
          </Group>
        </Card>
      ))}
    </Stack>
  );
}
