import { Button, Card, Group, Stack, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

import { recipes } from '@/resources/recipes';

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
            <Title order={4}>{recipe.name}</Title>
            <Button component={Link} to={`/recipes/${index}`}>
              Go
            </Button>
          </Group>
        </Card>
      ))}
    </Stack>
  );
}
