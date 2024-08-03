import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { ProcessForm } from '@/components/ProcessForm/ProcessForm';
import { WakeLock } from '@/components/WakeLock/WakeLock';

export function HomePage() {
  return (
    <>
      <WakeLock />
      <Welcome />
      <ProcessForm />
      <ColorSchemeToggle />
    </>
  );
}
