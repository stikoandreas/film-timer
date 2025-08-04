import { ProcessForm } from '@/components/ProcessForm/ProcessForm';
import { ScrollableView } from '@/components/ScrollableView/ScrollableView';
import { useTitle } from '@/context/TitleContext';

export function HomePage() {
  useTitle(undefined);
  return (
    <ScrollableView>
      <ProcessForm />
    </ScrollableView>
  );
}
