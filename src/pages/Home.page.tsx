import { Welcome } from '@/components/Welcome/Welcome';
import { ProcessForm } from '@/components/ProcessForm/ProcessForm';
import { DebugContextProvider } from '@/context/DebugContext';
import { ButtonBar } from '@/components/ButtonBar/ButtonBar';

export function HomePage() {
  return (
    <>
      <DebugContextProvider>
        <ButtonBar />
        <Welcome />
        <ProcessForm />
      </DebugContextProvider>
    </>
  );
}
