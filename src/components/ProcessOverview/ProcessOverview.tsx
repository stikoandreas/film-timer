import { Affix, Button, Center } from '@mantine/core';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@mantine/hooks';

import { DevelopingProcess } from '@/types/DevelopingProcess';
import { ProcessForm } from '../ProcessForm/ProcessForm';

export function ProcessOverview({
  initialValue,
  isCustom = false,
}: {
  initialValue?: DevelopingProcess;
  isCustom?: boolean;
}) {
  const [process, setProcess] = useState<DevelopingProcess | undefined>(initialValue);
  const navigate = useNavigate();

  const [customRecipes, setCustomRecipes] = useLocalStorage<DevelopingProcess[]>({
    key: 'customRecipes',
    defaultValue: [],
    getInitialValueInEffect: true,
  });

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
      {isCustom && initialValue && (
        <Center>
          <Button
            color="red"
            variant="outline"
            onClick={() => {
              setCustomRecipes(customRecipes.filter((recipe) => recipe.id !== initialValue.id));
              navigate('/recipes', {
                viewTransition: true,
              });
            }}
          >
            Delete recipe
          </Button>
        </Center>
      )}
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
