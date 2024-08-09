import { ActionIcon } from '@mantine/core';
import { IconBug, IconBugOff } from '@tabler/icons-react';
import { useContext } from 'react';
import { notifications } from '@mantine/notifications';

import { DebugContext } from '@/context/DebugContext';

const notificationOn = {
  title: 'Debug: On',
  message: 'Internal details will be shown 🐛',
  icon: <IconBug size={20} />,
};

const notificationOff = {
  title: 'Debug: Off',
  message: 'Unnecessary details will be hidden 😌',
  color: 'gray',
  icon: <IconBugOff size={20} />,
};

export function DebugButton() {
  const { debug, setDebug } = useContext(DebugContext);

  function handleDebug() {
    if (debug) {
      notifications.show(notificationOff);
    } else {
      notifications.show(notificationOn);
    }
    setDebug(!debug);
  }

  return (
    <>
      <ActionIcon variant="default" onClick={handleDebug}>
        {debug ? (
          <IconBug style={{ width: '80%', height: '80%' }} stroke={1.5} />
        ) : (
          <IconBugOff style={{ width: '80%', height: '80%' }} stroke={1.5} />
        )}
      </ActionIcon>
    </>
  );
}
