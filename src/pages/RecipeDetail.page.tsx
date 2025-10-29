import { useParams } from 'react-router-dom';
import { useLocalStorage } from '@mantine/hooks';

import { recipes } from '@/resources/recipes';
import { ScrollableView } from '@/components/ScrollableView/ScrollableView';
import { useTitle } from '@/context/TitleContext';
import { DevelopingProcess } from '@/types/DevelopingProcess';
import { ProcessOverview } from '@/components/ProcessOverview/ProcessOverview';

export function RecipeDetailsPage() {
  const { id } = useParams();
  const [customRecipes] = useLocalStorage<DevelopingProcess[]>({
    key: 'customRecipes',
    defaultValue: [],
    getInitialValueInEffect: true,
  });

  const allRecipes = [...recipes, ...customRecipes];

  const recipe = allRecipes.find((r) => r.id === id);
  useTitle(recipe ? recipe.name : undefined);
  if (recipe) {
    return (
      <ScrollableView>
        <ProcessOverview initialValue={recipe} />
      </ScrollableView>
    );
  }
  return 'No such recipe';
}
