import { useParams } from 'react-router-dom';
import { Center, Title } from '@mantine/core';

import { ProcessForm } from '@/components/ProcessForm/ProcessForm';
import { recipes } from '@/resources/recipes';
import { ScrollableView } from '@/components/ScrollableView/ScrollableView';

export function RecipeDetailsPage() {
  const { id } = useParams();
  const recipe = recipes.find((recipe) => recipe.id === id);
  if (recipe) {
    return (
      <ScrollableView>
        <Center>
          <Title mt="xs">{recipe.name}</Title>
        </Center>
        <ProcessForm initialValues={recipe} />
      </ScrollableView>
    );
  }
  return 'No such recipe';
}
