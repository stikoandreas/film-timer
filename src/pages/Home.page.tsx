import { ProcessForm } from '@/components/ProcessForm/ProcessForm';
import { DebugContextProvider } from '@/context/DebugContext';
import { ButtonBar } from '@/components/ButtonBar/ButtonBar';

import { TimeInput } from '@/components/TimeInput/TimeInput';
import { Center } from '@mantine/core';

export function HomePage() {
  return (
    <>
      <DebugContextProvider>
        <ButtonBar />
        <Center>
          <TimeInput></TimeInput>
        </Center>
        <ProcessForm />
      </DebugContextProvider>
    </>
  );
}
