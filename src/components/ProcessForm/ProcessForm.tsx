import { Group, Button, Center, Card, Text, Stack, Avatar } from '@mantine/core';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconAlarm, IconBell, IconRefresh, IconThermometer } from '@tabler/icons-react';
import { useLocalStorage, useUncontrolled } from '@mantine/hooks';
import { clsx } from 'clsx';

import { v4 as uuidv4 } from 'uuid';

import { EditModal } from '@/components/EditModal/EditModal';

import type { DevelopingProcess } from '@/types/DevelopingProcess';

import { formatSeconds } from '@/lib/time';

import { recipeIcons } from '@/resources/recipes';

import classes from './ProcessForm.module.css';

import { InfoChip } from '@/components/InfoChip/InfoChip';
import { TimeInput } from '../TimeInput/TimeInput';

export function ProcessForm({
  initialValue,
  onChange,
}: {
  initialValue?: DevelopingProcess;
  onChange?: (value: DevelopingProcess) => void;
}) {
  const [quickEdit] = useLocalStorage({
    key: 'quickEdit',
    defaultValue: false,
    getInitialValueInEffect: true,
  });

  const [_value, handleChange] = useUncontrolled<DevelopingProcess>({
    value: initialValue,
    defaultValue: initialValue,
    finalValue: undefined,
    onChange,
  });

  const fields = _value.steps.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id}>
      {(provided, snapshot) => (
        <Card
          shadow="sm"
          mt="xs"
          pl="xs"
          className={clsx(classes.draggable, snapshot.isDragging ? classes.dragging : undefined)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          w={400}
          maw="90vw"
        >
          <Group gap="xs" wrap="nowrap" justify="space-between" {...provided.dragHandleProps}>
            <Group gap="xs" wrap="nowrap" style={{ flexGrow: 1 }}>
              <Center>
                <Avatar size="md" name={item.name} color="initials">
                  {item.icon && recipeIcons[item.icon]}
                </Avatar>
              </Center>
              <Stack gap={6} style={{ flexGrow: 1 }}>
                <Text m={0} ml={3} fz={17} fw={500}>
                  {item.name}
                </Text>
                {quickEdit && (
                  <TimeInput
                    defaultValue={item.step_seconds}
                    onChange={(val) => {
                      const newSteps = [..._value.steps];
                      newSteps[index] = { ...newSteps[index], step_seconds: Number(val) };
                      handleChange({ ..._value, steps: newSteps });
                    }}
                    size="sm"
                    autoFocus={false}
                  />
                )}
                <Group gap={8}>
                  <InfoChip
                    icon={IconAlarm}
                    primary
                    label={formatSeconds(item.step_seconds).concat(
                      '',
                      item.exhaust_compensation ? '+' : ''
                    )}
                  />
                  {item.temperature && (
                    <InfoChip icon={IconThermometer} label={`${item.temperature}°C`} />
                  )}
                  {item.continuous_agitation && (
                    <InfoChip icon={IconRefresh} label={`${item.continuous_agitation}s`} />
                  )}
                  {item.chime_seconds && (
                    <InfoChip icon={IconBell} label={`${item.chime_seconds}s`} />
                  )}
                </Group>
              </Stack>
            </Group>
            <Stack gap="xs">
              <EditModal
                key={item.id}
                value={item}
                onSubmit={(updatedStep) => {
                  const newSteps = [..._value.steps];
                  newSteps[index] = updatedStep;
                  handleChange({ ..._value, steps: newSteps });
                }}
                onDelete={() => {
                  const newSteps = _value.steps.filter((_, i) => i !== index);
                  handleChange({ ..._value, steps: newSteps });
                }}
              />
            </Stack>
          </Group>
        </Card>
      )}
    </Draggable>
  ));

  return (
    <>
      <Stack align="center" gap={0} pb={50}>
        <DragDropContext
          onDragEnd={({ destination, source }) => {
            if (destination?.index !== undefined) {
              const newSteps = Array.from(_value.steps);
              const [movedItem] = newSteps.splice(source.index, 1);
              newSteps.splice(destination.index, 0, movedItem);

              handleChange({ ..._value, steps: newSteps });
            }
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
              handleChange({
                ..._value,
                steps: [
                  ..._value.steps,
                  {
                    name: 'New step',
                    step_seconds: 60,
                    chime_seconds: '',
                    id: uuidv4(),
                  },
                ],
              })
            }
            variant="outline"
          >
            Add Step
          </Button>
        </Group>
      </Stack>
    </>
  );
}
