import { Affix, Button, Center } from '@mantine/core';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { DevelopingProcess } from '@/types/DevelopingProcess';
import { ProcessForm } from '../ProcessForm/ProcessForm';

export function ProcessOverview({
  initialValue,
}: {
  initialValue?: DevelopingProcess;
  isCustom?: boolean;
}) {
  const [process, setProcess] = useState<DevelopingProcess | undefined>(initialValue);
  const navigate = useNavigate();

  function handleSubmit() {
    const url = `/timer?${createSearchParams({
      recipe: JSON.stringify(process),
    }).toString()}`;

    navigate(url, {
      viewTransition: true,
    });
  }
  return (
    <>
      <ProcessForm initialValue={process} onChange={setProcess} />
      <Center>
        <Button
          onClick={handleSubmit}
          disabled={!process || process?.steps.length < 1}
          fullWidth
          visibleFrom="sm"
          mt="sm"
          w={400}
          maw="90vw"
        >
          Start Timer
        </Button>
      </Center>
      <Affix
        position={{ bottom: 'calc(env(safe-area-inset-bottom, 0) + 65px)' }}
        withinPortal={false}
        hiddenFrom="sm"
        style={{ viewTransitionName: 'affix' }}
      >
        <Center w="100dvw" p="sm">
          <Button
            onClick={handleSubmit}
            fullWidth
            size="sm"
            disabled={!process || process?.steps.length < 1}
          >
            Start Timer
          </Button>
        </Center>
      </Affix>
    </>
  );
}
