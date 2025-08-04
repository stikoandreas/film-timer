import { useParams } from 'react-router-dom';

import { ProcessForm } from '@/components/ProcessForm/ProcessForm';
import { recipes } from '@/resources/recipes';
import { ScrollableView } from '@/components/ScrollableView/ScrollableView';
import { useTitle } from '@/context/TitleContext';

export function RecipeDetailsPage() {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id);
  useTitle(recipe ? recipe.name : undefined);
  if (recipe) {
    return (
      <ScrollableView>
        <ProcessForm initialValues={recipe} />
      </ScrollableView>
    );
  }
  return 'No such recipe';
}
