import { IconAlarm, IconAlarmFilled, IconFlask, IconFlaskFilled } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { NavLink, Tooltip } from '@mantine/core';

const links = [
  {
    label: 'Timer',
    icon: <IconAlarm />,
    selectedIcon: <IconAlarmFilled />,
    href: '/',
    id: 'footer-index',
  },
  {
    label: 'Volume Calculator',
    icon: <IconFlask />,
    selectedIcon: <IconFlaskFilled />,
    href: '/volume',
    id: 'footer-volume',
  },
];

export function Navbar() {
  function isActive(link: string) {
    return pathname === link;
  }
  const { pathname } = useLocation();
  return (
    <>
      {links.map((link) => (
        <Tooltip key={link.id} label={link.label} position="right" color="gray">
          <NavLink
            leftSection={isActive(link.href) ? link.selectedIcon : link.icon}
            component={Link}
            key={link.id}
            to={link.href}
            active={isActive(link.href)}
          />
        </Tooltip>
      ))}
    </>
  );
}
