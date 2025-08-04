import { StaticView } from '@/components/StaticView/StaticView';
import { VolumeCalculator } from '@/components/VolumeCalculator/VolumeCalculator';
import { useTitle } from '@/context/TitleContext';

export function VolumePage({ title }: { title?: string }) {
  useTitle('Volume Calculator');
  return (
    <StaticView>
      <VolumeCalculator />
    </StaticView>
  );
}
