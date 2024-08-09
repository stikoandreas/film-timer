import { Group, Button, Center, rem, Card, Title, Stack, Badge } from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconGripVertical, IconBell } from '@tabler/icons-react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import classes from './ProcessForm.module.css';

import { EditModal } from '@/components/EditModal/EditModal';

import type { DevelopingProcess } from '@/types/DevelopingProcess';

import { formatSeconds } from '@/lib/time';

export function ProcessForm() {
  const navigate = useNavigate();
  const form = useForm<DevelopingProcess>({
    mode: 'uncontrolled',
    initialValues: {
      steps: [
        { name: 'Develop', chime_seconds: 30, key: randomId(), step_seconds: 6 * 60 },
        { name: 'Stop', chime_seconds: '', key: randomId(), step_seconds: 30 },
        { name: 'Fix', chime_seconds: 27, key: randomId(), step_seconds: 5 * 60 },
      ],
    },
    validate: {
      steps: {
        name: (value) => (value.length <= 0 ? 'Name must be at least 1 character long' : null),
        step_seconds: (value) => (value <= 0 ? 'Step must be at least 1 second' : null),
        chime_seconds: (value) =>
          value !== null && value !== '' && value < 5
            ? 'Chime interval must be at least 5 seconds'
            : null,
      },
    },
  });

  function handleSubmit(values: DevelopingProcess) {
    navigate({
      pathname: 'timer',
      search: createSearchParams({ recipe: JSON.stringify(values) }).toString(),
    });
  }

  const fields = form.getValues().steps.map((item, index) => (
    <Draggable key={item.key} index={index} draggableId={item.key}>
      {(provided) => (
        <Card
          shadow="sm"
          mt="xs"
          pl="xs"
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={
            Object.keys(form.errors).some((key) => key.startsWith(`steps.${index}`))
              ? classes.carderror
              : undefined
          }
          w={300}
        >
          <Group gap="xs" justify="space-between">
            <Group gap="xs">
              <Center {...provided.dragHandleProps}>
                <IconGripVertical size="1.2rem" />
              </Center>
              <Stack gap={6}>
                <Title m={0} order={3}>
                  {form.getTransformedValues().steps[index].name}
                </Title>
                <Group gap="xs">
                  <Badge size="lg">
                    {formatSeconds(form.getTransformedValues().steps[index].step_seconds)}
                  </Badge>
                  {form.getTransformedValues().steps[index].chime_seconds && (
                    <Badge
                      size="lg"
                      tt="none"
                      color="gray"
                      leftSection={
                        <IconBell style={{ height: rem(15), width: rem(15), strokeWidth: '2.5' }} />
                      }
                    >
                      {form.getTransformedValues().steps[index].chime_seconds}s
                    </Badge>
                  )}
                </Group>
              </Stack>
            </Group>
            <Stack gap="xs">
              <EditModal
                key={form.key(`steps.${index}`)}
                index={index}
                {...form.getInputProps(`steps.${index}`)}
                nameInputProps={{ ...form.getInputProps(`steps.${index}.name`) }}
                durationInputProps={{ ...form.getInputProps(`steps.${index}.step_seconds`) }}
                chimeInputProps={{ ...form.getInputProps(`steps.${index}.chime_seconds`) }}
                validate={form.validate}
              />
              <Button
                color="red"
                variant="default"
                size="xs"
                onClick={() => form.removeListItem('steps', index)}
              >
                Delete
              </Button>
            </Stack>
          </Group>
        </Card>
      )}
    </Draggable>
  ));

  return (
    <Center>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <DragDropContext
          onDragEnd={({ destination, source }) => {
            destination?.index !== undefined &&
              form.reorderListItem('steps', { from: source.index, to: destination.index });
          }}
        >
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {fields}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Group justify="center" mt="md">
          <Button
            onClick={() =>
              form.insertListItem('steps', {
                name: 'New step',
                step_seconds: 60,
                chime_seconds: '',
                key: randomId(),
              })
            }
          >
            Add Step
          </Button>
        </Group>
        <Button type="submit" mt="md" fullWidth>
          Submit
        </Button>
      </form>
    </Center>
  );
}
