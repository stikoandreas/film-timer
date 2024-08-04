import { ActionIcon } from '@mantine/core';
import { IconBug, IconBugOff } from '@tabler/icons-react';
import { useContext } from 'react';

import { DebugContext } from '@/context/DebugContext';

export function DebugButton() {
  const { debug, setDebug } = useContext(DebugContext);

  return (
    <>
      <ActionIcon variant="default" onClick={() => setDebug(!debug)}>
        {debug ? (
          <IconBug style={{ width: '80%', height: '80%' }} stroke={1.5} />
        ) : (
          <IconBugOff style={{ width: '80%', height: '80%' }} stroke={1.5} />
        )}
      </ActionIcon>
    </>
  );
}
