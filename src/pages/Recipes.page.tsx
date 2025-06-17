import {
  ActionIcon,
  Card,
  Divider,
  Group,
  SegmentedControl,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { IconAlarm, IconChevronRight, IconListCheck } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { recipes } from '@/resources/recipes';
import { DevelopingProcess, DevelopingStep } from '@/types/DevelopingProcess';
import { formatSeconds } from '@/lib/time';

import { InfoChip } from '@/components/InfoChip/InfoChip';
import { ScrollableView } from '@/components/ScrollableView/ScrollableView';

export function RecipesPage() {
  const [process, setProcess] = useState('c41');

  function filterRecipe(recipe: DevelopingProcess) {
    return process !== 'other'
      ? process === recipe.process
      : recipe.process !== 'c41' && recipe.process !== 'bw';
  }

  const filteredRecipes = recipes.filter(filterRecipe);

  return (
    <ScrollableView>
      <Stack align="center" gap={0}>
        <Title mt="xs">Recipes</Title>
        <SegmentedControl
          data={[
            { label: 'C41', value: 'c41' },
            { label: 'Black and White', value: 'bw' },
            { label: 'Other', value: 'other' },
          ]}
          my="xs"
          w={400}
          maw="90vw"
          onChange={setProcess}
          value={process}
        />
        <Card shadow="sm" w={400} maw="90vw">
          <Stack align="center" gap={0}>
            {filteredRecipes.map((recipe, index) => (
              <>
                <UnstyledButton
                  component={Link}
                  key={recipe.id}
                  to={`/recipes/${recipe.id}`}
                  w="100%"
                  viewTransition
                  py="xs"
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
                          ).concat(
                            '',
                            recipe.steps.some((step) => step.exhaust_compensation) ? '+' : ''
                          )}
                        />
                        <InfoChip icon={IconListCheck} label={`${recipe.steps.length} steps`} />
                      </Group>
                    </Stack>
                    <ActionIcon variant="subtle" color="gray">
                      <IconChevronRight size={24} />
                    </ActionIcon>
                  </Group>
                </UnstyledButton>
                {index < filteredRecipes.length - 1 && <Divider my="xs" w="100%" />}
              </>
            ))}
          </Stack>
        </Card>
      </Stack>
    </ScrollableView>
  );
}
