import { Button, Text, SegmentedControl, Stack, TextInput, Center } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useLocalStorage } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { ProcessForm } from '../ProcessForm/ProcessForm';
import { DevelopingProcess } from '@/types/DevelopingProcess';

export function NewRecipeForm({ type }: { type?: DevelopingProcess['process'] }) {
  const [customRecipes, setCustomRecipes] = useLocalStorage<DevelopingProcess[]>({
    key: 'customRecipes',
    defaultValue: [],
    getInitialValueInEffect: true,
  });

  const navigate = useNavigate();
  const form = useForm<DevelopingProcess>({
    initialValues: {
      id: uuidv4(),
      name: '',
      process: ['c41', 'bw', 'e6'].includes(type || '')
        ? (type as DevelopingProcess['process'])
        : 'other',
      steps: [],
    },
    validate: {
      name: isNotEmpty('Recipe name cannot be empty'),
    },
  });

  function handleSubmit(values: DevelopingProcess) {
    const newCustomRecipes = [...customRecipes, values];
    setCustomRecipes(newCustomRecipes);
    navigate(`/recipes/${values.id}`, {
      viewTransition: true,
    });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Center mt="md">
        <Stack gap={0} pb={50} w={400} maw="90vw">
          <TextInput
            label="Recipe Name"
            placeholder="Enter recipe name"
            withAsterisk
            {...form.getInputProps('name')}
          />
          <Text size="sm" mb={3} fw={500} mt="md">
            Recipe type
          </Text>
          <SegmentedControl
            data={[
              { label: 'C41', value: 'c41' },
              { label: 'Black and White', value: 'bw' },
              { label: 'E6', value: 'e6' },
              { label: 'Other', value: 'other' },
            ]}
            {...form.getInputProps('process')}
          />
          <Text size="sm" mb={3} fw={500} mt="md">
            Process steps
          </Text>
          <ProcessForm initialValue={form.values} onChange={form.setValues} />
          <Button type="submit" style={{ marginTop: '1rem' }}>
            Create Recipe
          </Button>
        </Stack>
      </Center>
    </form>
  );
}
