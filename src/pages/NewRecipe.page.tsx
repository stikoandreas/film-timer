import { useParams } from 'react-router-dom';

import { ScrollableView } from '@/components/ScrollableView/ScrollableView';
import { useTitle } from '@/context/TitleContext';
import { NewRecipeForm } from '@/components/NewRecipeForm/NewRecipeForm';
import { DevelopingProcess } from '@/types/DevelopingProcess';

export function NewRecipePage() {
  const { type } = useParams();

  useTitle(type ? 'New Recipe' : undefined);

  return (
    <ScrollableView>
      <NewRecipeForm type={type as DevelopingProcess['process']} />
    </ScrollableView>
  );
}
