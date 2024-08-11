import {
  IconAlarm,
  IconAlarmFilled,
  IconFlask,
  IconFlaskFilled,
  IconList,
} from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { NavLink, Tooltip } from '@mantine/core';
import { randomId } from '@mantine/hooks';

const links = [
  {
    label: 'Timer',
    icon: <IconAlarm />,
    selectedIcon: <IconAlarmFilled />,
    href: '/',
    key: randomId(),
  },
  {
    label: 'Recipes',
    icon: <IconList />,
    selectedIcon: <IconList strokeWidth={2.5} />,
    href: '/recipes',
    key: randomId(),
  },
  {
    label: 'Volume Calculator',
    icon: <IconFlask />,
    selectedIcon: <IconFlaskFilled />,
    href: '/volume',
    key: randomId(),
  },
];

export function Navbar() {
  function isActive(link: string) {
    if (link === '/') return pathname === link || pathname.startsWith('/timer');
    else return pathname.startsWith(link);
  }
  const { pathname } = useLocation();
  return (
    <>
      {links.map((link) => (
        <Tooltip key={link.key} label={link.label} position="right" color="gray">
          <NavLink
            leftSection={isActive(link.href) ? link.selectedIcon : link.icon}
            component={Link}
            to={link.href}
            active={isActive(link.href)}
          />
        </Tooltip>
      ))}
    </>
  );
}
