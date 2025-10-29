import { ProcessOverview } from '@/components/ProcessOverview/ProcessOverview';
import { ScrollableView } from '@/components/ScrollableView/ScrollableView';
import { useTitle } from '@/context/TitleContext';
import { DevelopingProcess } from '@/types/DevelopingProcess';

const defaultRecipe: DevelopingProcess = {
  id: '394f63d6-e445-4133-8cde-47220544679a',
  process: 'bw',
  steps: [
    {
      name: 'Develop',
      chime_seconds: 30,
      id: '26fc8d0b-9f99-4e71-9252-6049267e2851',
      step_seconds: 6 * 60,
      icon: 'brightness',
    },
    {
      name: 'Stop',
      chime_seconds: '',
      id: '5e50e334-c247-4778-9d1c-e7a8074bf0ac',
      step_seconds: 30,
      icon: 'dropletPause',
      continuous_agitation: 30,
    },
    {
      name: 'Fix',
      chime_seconds: 30,
      id: '88faff90-dddd-4964-8dab-f44608681b25',
      step_seconds: 5 * 60,
      icon: 'shadowOff',
    },
  ],
};

export function HomePage() {
  useTitle(undefined);
  return (
    <ScrollableView>
      <ProcessOverview initialValue={defaultRecipe} />
    </ScrollableView>
  );
}
