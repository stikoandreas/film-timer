import { ActionIcon, Menu } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import { useMatch, useNavigate } from 'react-router-dom';

import { DevelopingProcess } from '@/types/DevelopingProcess';

export function ContextMenu() {
  const customRecipe = useMatch('/recipes/:id');

  const [customRecipes, setCustomRecipes] = useLocalStorage<DevelopingProcess[]>({
    key: 'customRecipes',
    defaultValue: [],
    getInitialValueInEffect: true,
  });

  const navigate = useNavigate();

  const menu =
    customRecipe && customRecipes.find((r) => r.id === customRecipe.params.id) ? (
      <>
        <Menu.Item
          color="red"
          leftSection={<IconTrash size={14} />}
          onClick={() => {
            setCustomRecipes(
              customRecipes.filter((recipe) => recipe.id !== customRecipe.params.id)
            );
            navigate('/recipes', {
              viewTransition: true,
            });
          }}
        >
          Delete recipe
        </Menu.Item>
      </>
    ) : undefined;

  return (
    menu && (
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon variant="default">
            <IconDotsVertical style={{ width: '80%', height: '80%' }} stroke={1} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>{menu}</Menu.Dropdown>
      </Menu>
    )
  );
}
