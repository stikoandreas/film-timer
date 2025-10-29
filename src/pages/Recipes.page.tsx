import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Group,
  SegmentedControl,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { IconAlarm, IconChevronRight, IconListCheck } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';

import { recipes } from '@/resources/recipes';
import { DevelopingProcess, DevelopingStep } from '@/types/DevelopingProcess';
import { formatSeconds } from '@/lib/time';

import { InfoChip } from '@/components/InfoChip/InfoChip';
import { ScrollableView } from '@/components/ScrollableView/ScrollableView';
import { useTitle } from '@/context/TitleContext';

export function RecipesPage() {
  const [process, setProcess] = useState('c41');
  useTitle('Recipes');

  function filterRecipe(recipe: DevelopingProcess) {
    return process !== 'other'
      ? process === recipe.process
      : recipe.process !== 'c41' && recipe.process !== 'bw';
  }

  const [customRecipes] = useLocalStorage<DevelopingProcess[]>({
    key: 'customRecipes',
    defaultValue: [],
    getInitialValueInEffect: true,
  });

  const allRecipes = [...recipes, ...customRecipes];

  const filteredRecipes = allRecipes.filter(filterRecipe);

  return (
    <ScrollableView>
      <Stack align="center" gap={0}>
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
              <Fragment key={recipe.id}>
                <UnstyledButton
                  component={Link}
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
              </Fragment>
            ))}
            <Button
              component={Link}
              to={`/recipes/custom/${process}`}
              variant="light"
              fullWidth
              mt="md"
            >
              Create Custom Recipe
            </Button>
          </Stack>
        </Card>
      </Stack>
    </ScrollableView>
  );
}
