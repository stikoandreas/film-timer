import { useParams } from 'react-router-dom';
import { Center, Title } from '@mantine/core';

import { ProcessForm } from '@/components/ProcessForm/ProcessForm';
import { recipes } from '@/resources/recipes';

export function RecipeDetailsPage() {
  const { id } = useParams();
  if (!Number.isNaN(id) && Number(id) >= 0 && Number(id) <= recipes.length - 1) {
    return (
      <>
        <Center>
          <Title mt="xs">{recipes[Number(id)].name}</Title>
        </Center>
        <ProcessForm initialValues={recipes[Number(id)]} />
      </>
    );
  } else {
    return 'No such recipe';
  }
}
