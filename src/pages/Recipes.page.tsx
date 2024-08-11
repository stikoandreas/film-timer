import { Button, Card, Group, Stack, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

import { recipes } from '@/resources/recipes';

export function RecipesPage() {
  return (
    <Stack align="center" mt="md">
      {recipes.map((recipe, index) => (
        <Card w={400} maw="85vw" withBorder key={recipe.key}>
          <Group justify="space-between ">
            <Title order={2}>{recipe.name}</Title>
            <Button component={Link} to={`/recipes/${index}`}>
              Go
            </Button>
          </Group>
        </Card>
      ))}
    </Stack>
  );
}
