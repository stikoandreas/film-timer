import { Group, TextInput, Button, Center, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconGripVertical } from '@tabler/icons-react';
import { useState } from 'react';

import { Timer } from '@/components/Timer/Timer';

export interface DevelopingProcess {
  steps: Array<{
    name: string;
    step_minutes: number;
    chime_seconds: number | '';
    key: string;
  }>;
}

export function ProcessForm() {
  const form = useForm<DevelopingProcess>({
    mode: 'uncontrolled',
    initialValues: {
      steps: [
        { name: 'Develop', step_minutes: 6, chime_seconds: 30, key: randomId() },
        { name: 'Stop', step_minutes: 1, chime_seconds: '', key: randomId() },
        { name: 'Fix', step_minutes: 1, chime_seconds: 30, key: randomId() },
      ],
    },
    validate: {
      steps: {
        step_minutes: (value) => (value <= 0 ? 'Step must be at least 1 minute' : null),
        chime_seconds: (value) =>
          value !== null && value !== '' && value < 5
            ? 'Chime interval must be at least 5 seconds'
            : null,
      },
    },
  });

  const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  function handleSubmit(values: DevelopingProcess) {
    setSubmittedValues(values);
    setIsRunning(true);
  }

  const fields = form.getValues().steps.map((item, index) => (
    <Draggable key={item.key} index={index} draggableId={item.key}>
      {(provided) => (
        <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
          <Center {...provided.dragHandleProps}>
            <IconGripVertical size="1.2rem" />
          </Center>
          <TextInput
            label="Step name"
            placeholder="Step name"
            key={form.key(`steps.${index}.name`)}
            {...form.getInputProps(`steps.${index}.name`)}
          />
          <NumberInput
            label="Step duration"
            placeholder="Time in minutes"
            min={1}
            max={100}
            pattern="\d*"
            key={form.key(`steps.${index}.step_minutes`)}
            {...form.getInputProps(`steps.${index}.step_minutes`)}
          />
          <NumberInput
            label="Chime every"
            placeholder="Time in seconds"
            min={1}
            max={100}
            pattern="\d*"
            key={form.key(`steps.${index}.chime_seconds`)}
            {...form.getInputProps(`steps.${index}.chime_seconds`)}
          />
          <Button
            onClick={() => {
              form.removeListItem('steps', index);
            }}
          >
            Remove
          </Button>
        </Group>
      )}
    </Draggable>
  ));

  return (
    <Center>
      {!isRunning ? (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <DragDropContext
            onDragEnd={({ destination, source }) =>
              destination?.index !== undefined &&
              form.reorderListItem('steps', { from: source.index, to: destination.index })
            }
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
              onClick={() => form.insertListItem('steps', { name: '', email: '', key: randomId() })}
            >
              Add Step
            </Button>
          </Group>
          <Button type="submit" mt="md" fullWidth>
            Submit
          </Button>

          {/*}<Text mt="md">Form values:</Text>
        <Code block>{JSON.stringify(form.values, null, 2)}</Code>

        <Text mt="md">Submitted values:</Text>
        <Code block>{submittedValues ? JSON.stringify(submittedValues, null, 2) : '–'}</Code>*/}
        </form>
      ) : (
        submittedValues && (
          <>
            <Timer process={submittedValues}></Timer>
          </>
        )
      )}
    </Center>
  );
}
