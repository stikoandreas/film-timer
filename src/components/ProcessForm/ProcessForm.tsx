import { Group, Button, Center, Card, Title, Stack, Avatar } from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconAlarm, IconBell } from '@tabler/icons-react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { EditModal } from '@/components/EditModal/EditModal';

import type { DevelopingProcess } from '@/types/DevelopingProcess';

import { formatSeconds } from '@/lib/time';

import { recipeIcons } from '@/resources/recipes';

import classes from './ProcessForm.module.css';

import { InfoChip } from '@/components/InfoChip/InfoChip';

export function ProcessForm({ initialValues }: { initialValues?: DevelopingProcess }) {
  const navigate = useNavigate();
  const form = useForm<DevelopingProcess>({
    mode: 'uncontrolled',
    initialValues: initialValues || {
      key: randomId(),
      steps: [
        {
          name: 'Develop',
          chime_seconds: 30,
          key: randomId(),
          step_seconds: 6 * 60,
          icon: 'brightness',
        },
        {
          name: 'Stop',
          chime_seconds: '',
          key: randomId(),
          step_seconds: 30,
          icon: 'dropletPause',
        },
        {
          name: 'Fix',
          chime_seconds: 30,
          key: randomId(),
          step_seconds: 5 * 60,
          icon: 'shadowOff',
        },
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
      pathname: '/timer',
      search: createSearchParams({ recipe: JSON.stringify(values) }).toString(),
    });
  }

  const fields = form.getValues().steps.map((item, index) => (
    <Draggable key={item.key} index={index} draggableId={item.key}>
      {(provided, snapshot) => (
        <Card
          shadow="sm"
          mt="xs"
          pl="xs"
          className={[
            classes.draggable,
            snapshot.isDragging ? classes.dragging : undefined,
            Object.keys(form.errors).some((key) => key.startsWith(`steps.${index}`))
              ? classes.carderror
              : undefined,
          ].join(' ')}
          ref={provided.innerRef}
          {...provided.draggableProps}
          w={400}
          maw="90vw"
        >
          <Group gap="xs" justify="space-between" {...provided.dragHandleProps}>
            <Group gap="xs">
              <Center>
                <Avatar
                  size="md"
                  name={form.getTransformedValues().steps[index].name}
                  color="initials"
                >
                  {form.getTransformedValues().steps[index].icon &&
                    recipeIcons[form.getTransformedValues().steps[index].icon!]}
                </Avatar>
              </Center>
              <Stack gap={6}>
                <Title m={0} order={4} ml={3}>
                  {form.getTransformedValues().steps[index].name}
                </Title>
                <Group gap={8}>
                  <InfoChip
                    icon={IconAlarm}
                    primary
                    label={formatSeconds(
                      form.getTransformedValues().steps[index].step_seconds
                    ).concat(
                      '',
                      form.getTransformedValues().steps[index].exhaust_compensation ? '+' : ''
                    )}
                  />
                  {form.getTransformedValues().steps[index].chime_seconds && (
                    <InfoChip
                      icon={IconBell}
                      label={`${form.getTransformedValues().steps[index].chime_seconds}s`}
                    />
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
                onDelete={() => form.removeListItem('steps', index)}
              />
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
