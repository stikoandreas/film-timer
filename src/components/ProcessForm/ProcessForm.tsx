import { Group, Button, Center, Box, rem, Card } from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconGripVertical, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

import { Timer } from '@/components/Timer/Timer';
import { StepInput } from '../StepInput/StepInput';

import type { DevelopingProcess } from '@/types/DevelopingProcess';

export function ProcessForm() {
  const form = useForm<DevelopingProcess>({
    mode: 'uncontrolled',
    initialValues: {
      steps: [
        { name: 'Develop', step_minutes: 6, chime_seconds: 30, key: randomId() },
        { name: 'Stop', step_minutes: 1, chime_seconds: '', key: randomId() },
        { name: 'Fix', step_minutes: 1, chime_seconds: 27, key: randomId() },
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

  const [isDragging, setIsDragging] = useState<boolean>(false);

  function handleSubmit(values: DevelopingProcess) {
    setSubmittedValues(values);
    setIsRunning(true);
  }

  const fields = form.getValues().steps.map((item, index) => (
    <Draggable key={item.key} index={index} draggableId={item.key}>
      {(provided) => (
        <Card shadow="sm" mt="xs" pl={'xs'} ref={provided.innerRef} {...provided.draggableProps}>
          <Group gap="xs">
            <Center {...provided.dragHandleProps}>
              <IconGripVertical size="1.2rem" />
            </Center>
            <StepInput
              key={form.key(`steps.${index}`)}
              {...form.getInputProps(`steps.${index}`)}
              nameInputProps={{ ...form.getInputProps(`steps.${index}.name`) }}
              durationInputProps={{ ...form.getInputProps(`steps.${index}.step_minutes`) }}
              chimeInputProps={{ ...form.getInputProps(`steps.${index}.chime_seconds`) }}
            />
          </Group>
        </Card>
      )}
    </Draggable>
  ));

  return (
    <Center>
      {!isRunning ? (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <DragDropContext
            onDragStart={() => setIsDragging(true)}
            onDragEnd={({ destination, source }) => {
              setIsDragging(false);
              if (destination?.droppableId === 'dnd-delete') {
                form.removeListItem('steps', source.index);
              } else {
                destination?.index !== undefined &&
                  form.reorderListItem('steps', { from: source.index, to: destination.index });
              }
            }}
          >
            <Droppable droppableId="dnd-delete" direction="vertical">
              {(provided) => (
                <>
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <Center>
                      <Box
                        style={{
                          backgroundColor: 'var(--mantine-color-red-2)',
                          color: 'var(--mantine-color-red-6)',
                          borderRadius: '5px',
                          transition: 'width 0.2s ease-in-out',
                          overflow: 'hidden',
                        }}
                        bd={isDragging ? '1px solid var(--mantine-color-red-6)' : undefined}
                        w="100%"
                      >
                        <Center
                          style={{
                            transition: 'height 0.2s ease-in-out',
                            overflow: 'hidden',
                          }}
                          h={isDragging ? rem(35) : 0}
                        >
                          <IconTrash style={{ height: rem(30), width: rem(30), stroke: '1.5' }} />
                        </Center>
                        {provided.placeholder}
                      </Box>
                    </Center>
                  </div>
                </>
              )}
            </Droppable>
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
