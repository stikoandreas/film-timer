import { Group, Button, Center, Card, Text, Stack, Avatar, Affix } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconAlarm, IconBell, IconRefresh, IconThermometer } from '@tabler/icons-react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { EditModal } from '@/components/EditModal/EditModal';

import type { DevelopingProcess } from '@/types/DevelopingProcess';

import { formatSeconds } from '@/lib/time';

import { recipeIcons } from '@/resources/recipes';

import classes from './ProcessForm.module.css';

import { InfoChip } from '@/components/InfoChip/InfoChip';
import { TimeInput } from '../TimeInput/TimeInput';
import { useLocalStorage } from '@mantine/hooks';

export function ProcessForm({ initialValues }: { initialValues?: DevelopingProcess }) {
  const [quickEdit] = useLocalStorage({
    key: 'quickEdit',
    defaultValue: false,
    getInitialValueInEffect: true,
  });

  const navigate = useNavigate();
  const form = useForm<DevelopingProcess>({
    mode: 'uncontrolled',
    initialValues: initialValues || {
      id: '394f63d6-e445-4133-8cde-47220544679a',
      process: 'bw',
      steps: [
        {
          name: 'Develop',
          chime_seconds: 30,
          id: '26fc8d0b-9f99-4e71-9252-6049267e2851',
          step_seconds: 6 * 60,
          icon: 'brightness',
        },
        {
          name: 'Stop',
          chime_seconds: '',
          id: '5e50e334-c247-4778-9d1c-e7a8074bf0ac',
          step_seconds: 30,
          icon: 'dropletPause',
          continuous_agitation: 30,
        },
        {
          name: 'Fix',
          chime_seconds: 30,
          id: '88faff90-dddd-4964-8dab-f44608681b25',
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
    const url = `/timer?${createSearchParams({
      recipe: JSON.stringify(values),
    }).toString()}`;

    navigate(url, {
      viewTransition: true,
    });
  }

  const fields = form.getValues().steps.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id}>
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
          <Group gap="xs" wrap="nowrap" justify="space-between" {...provided.dragHandleProps}>
            <Group gap="xs" wrap="nowrap" style={{ flexGrow: 1 }}>
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
              <Stack gap={6} style={{ flexGrow: 1 }}>
                <Text m={0} ml={3} fz={17} fw={500}>
                  {form.getTransformedValues().steps[index].name}
                </Text>
                {quickEdit && (
                  <TimeInput
                    {...form.getInputProps(`steps.${index}.step_seconds`)}
                    size="sm"
                    autoFocus={false}
                  />
                )}
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
                  {form.getTransformedValues().steps[index].temperature && (
                    <InfoChip
                      icon={IconThermometer}
                      label={`${form.getTransformedValues().steps[index].temperature}°C`}
                    />
                  )}
                  {form.getTransformedValues().steps[index].continuous_agitation && (
                    <InfoChip
                      icon={IconRefresh}
                      label={`${form.getTransformedValues().steps[index].continuous_agitation}s`}
                    />
                  )}
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
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack align="center" gap={0} pb={50}>
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
            size="xs"
            onClick={() =>
              form.insertListItem('steps', {
                name: 'New step',
                step_seconds: 60,
                chime_seconds: '',
                id: crypto.randomUUID(),
              })
            }
            variant="outline"
          >
            Add Step
          </Button>
        </Group>
        <Button type="submit" fullWidth visibleFrom="sm" mt="sm" w={400} maw="90vw">
          Start Timer
        </Button>
      </Stack>
      <Affix
        position={{ bottom: 'calc(env(safe-area-inset-bottom, 0) + 65px)' }}
        withinPortal={false}
        hiddenFrom="sm"
        style={{ viewTransitionName: 'affix' }}
      >
        <Center w="100dvw" p="sm" className={classes.action}>
          <Button type="submit" fullWidth size="sm">
            Start Timer
          </Button>
        </Center>
      </Affix>
    </form>
  );
}
