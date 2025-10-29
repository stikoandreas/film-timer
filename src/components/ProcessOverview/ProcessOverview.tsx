import { Affix, Button, Center } from '@mantine/core';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@mantine/hooks';

import { DevelopingProcess } from '@/types/DevelopingProcess';
import { ProcessForm } from '../ProcessForm/ProcessForm';

export function ProcessOverview({ initialValue }: { initialValue?: DevelopingProcess }) {
  const [customRecipes, setCustomRecipes] = useLocalStorage<DevelopingProcess[]>({
    key: 'customRecipes',
    defaultValue: [],
    getInitialValueInEffect: true,
  });

  const isCustom = initialValue && customRecipes.some((r) => r.id === initialValue.id);

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

  function handleChange(value: DevelopingProcess) {
    setProcess(value);
    if (isCustom) {
      const updatedRecipes = customRecipes.map((r) => (r.id === value.id ? value : r));
      setCustomRecipes(updatedRecipes);
    }
  }

  return (
    <>
      <ProcessForm initialValue={process} onChange={handleChange} />
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
