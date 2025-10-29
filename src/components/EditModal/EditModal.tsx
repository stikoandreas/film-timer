import { useDisclosure } from '@mantine/hooks';
import {
  Modal,
  Button,
  Group,
  Text,
  SegmentedControl,
  Center,
  Space,
  Collapse,
  Code,
  NumberInput,
  Autocomplete,
  ActionIcon,
  FocusTrap,
  InputWrapper,
} from '@mantine/core';
import { useState, useContext } from 'react';
import { IconAdjustmentsHorizontal, IconChevronDown } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

import type { DevelopingStep } from '@/types/DevelopingProcess';
import { TimeInput } from '../TimeInput/TimeInput';
import { DebugContext } from '@/context/DebugContext';
import classes from './EditModal.module.css';

interface CustomInputProps {
  value?: DevelopingStep;
  onSubmit: (value: DevelopingStep) => void;
  onDelete?: () => void;
}

export function EditModal({ value, onSubmit, onDelete }: CustomInputProps) {
  const form = useForm<DevelopingStep>({
    initialValues: value,
    validate: {
      name: (v) => (v.length <= 0 ? 'Name must be at least 1 character long' : null),
      step_seconds: (v) => (v <= 0 ? 'Step must be at least 1 second' : null),
      chime_seconds: (v) =>
        v !== null && v !== '' && v < 5 ? 'Chime interval must be at least 5 seconds' : null,
    },
  });

  const [opened, { open, close }] = useDisclosure(false);

  const [advanced, { toggle: toggleAdvanced }] = useDisclosure(false);

  const [customChime, setCustomChime] = useState(false);
  const [customValue, setCustomValue] = useState<number | ''>('');

  const { debug } = useContext(DebugContext);

  function setSegmentedControl() {
    if (customChime) return 'custom';
    if (form.values.chime_seconds && form.values.chime_seconds) {
      switch (form.values.chime_seconds) {
        case 60:
          return '60';
        case 30:
          return '30';
        case 0:
        case undefined:
          return 'off';
        default:
          setCustomChime(true);
          form.setFieldValue('chime_seconds', customValue);
          return 'custom';
      }
    } else {
      return 'off';
    }
  }

  function handleSegmentedControl(val: string) {
    switch (val) {
      case 'custom':
        setCustomChime(true);
        form.setFieldValue('chime_seconds', customValue || '');
        return;
      case '60':
        setCustomChime(false);
        setCustomValue('');
        form.setFieldValue('chime_seconds', 60);
        return;
      case '30':
        setCustomChime(false);
        setCustomValue('');
        form.setFieldValue('chime_seconds', 30);
        return;
      case 'off':
        setCustomChime(false);
        setCustomValue('');
        form.setFieldValue('chime_seconds', '');
    }
  }

  function handleSubmit(values: DevelopingStep) {
    onSubmit(values);
    close();
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          form.reset();
        }}
        title={
          <Group>
            Edit step{' '}
            {onDelete && (
              <Button size="xs" variant="outline" color="red" onClick={onDelete}>
                Delete step
              </Button>
            )}
          </Group>
        }
        classNames={{ overlay: classes.overlay }}
        yOffset={120}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <FocusTrap.InitialFocus />
          <Autocomplete
            label="Step name"
            placeholder="Step name"
            inputSize="20"
            spellCheck={false}
            {...form.getInputProps('name')}
            maxDropdownHeight={200}
            data={['Develop', 'Stop', 'Fix', 'Wash', 'Blix', 'Bleach', 'Prewash', 'Stab']}
          />
          <Space h="lg"></Space>
          <Text size="sm">Duration:</Text>
          <Space h="sm" />
          <Center>
            <TimeInput
              defaultValue={form.values.step_seconds}
              onChange={(val) => form.setFieldValue('step_seconds', Number(val))}
            />
          </Center>
          {form.errors.step_seconds && (
            <Text size="sm" c="red">
              {form.errors.step_seconds}
            </Text>
          )}
          <Space h="xl" />
          <Group gap="xs">
            <Text size="sm">Chime:</Text>
            <SegmentedControl
              size="xs"
              value={setSegmentedControl()}
              onChange={handleSegmentedControl}
              data={[
                { label: 'Custom', value: 'custom' },
                { label: '1 minute', value: '60' },
                { label: '30 seconds', value: '30' },
                { label: 'Off', value: 'off' },
              ]}
            />
          </Group>

          <Collapse in={customChime}>
            <Space h="sm" />
            <NumberInput
              placeholder="Chime interval in seconds"
              min={1}
              max={100}
              inputMode="numeric"
              suffix=" s"
              inputSize="3"
              value={customValue}
              onChange={(val) => {
                setCustomValue(val === '' ? '' : Number(val));
                setCustomChime(true);
                form.setFieldValue('chime_seconds', val === '' ? '' : Number(val));
              }}
            />
            {form.errors.chime_seconds && (
              <Text size="sm" c="red">
                {form.errors.chime_seconds}
              </Text>
            )}
          </Collapse>
          <Collapse in={debug}>
            <Space h="md" />
            <Code block>{JSON.stringify(form.values, null, 2)}</Code>
          </Collapse>
          <Button
            mt="xs"
            variant="subtle"
            size="xs"
            fullWidth
            color="gray"
            onClick={toggleAdvanced}
            rightSection={
              <IconChevronDown
                size={12}
                style={{
                  transform: advanced ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 200ms',
                }}
              />
            }
          >
            Advanced settings
          </Button>
          <Collapse in={advanced}>
            <NumberInput
              label="Continuous agitation"
              description="Optional first agitation step"
              placeholder="Seconds"
              inputMode="numeric"
              suffix=" s"
              allowNegative={false}
              {...form.getInputProps('continuous_agitation')}
            />
            <Space h="xs" />
            <NumberInput
              label="Temperature"
              description="Target temperature for step"
              placeholder="Degrees Celcius"
              suffix=" &deg;C"
              inputMode="numeric"
              allowNegative={false}
              {...form.getInputProps('temperature')}
            />
            <Space h="xs" />
            <Space h="xs" />
            <InputWrapper
              label="Exhaust compensation"
              description="Extend duration depending on number of films already developed"
            >
              <Group grow mt={4}>
                <NumberInput
                  placeholder="Seconds"
                  suffix=" s"
                  allowNegative={false}
                  inputMode="numeric"
                  inputSize="12"
                  {...form.getInputProps('exhaust_compensation')}
                />

                <NumberInput
                  placeholder="Number of films"
                  prefix="every "
                  suffix=" films"
                  allowNegative={false}
                  inputMode="numeric"
                  {...form.getInputProps('exhaust_compensation_rate')}
                />
              </Group>
            </InputWrapper>
          </Collapse>
          <Button fullWidth mt="xs" type="submit">
            Submit
          </Button>
        </form>
      </Modal>
      <ActionIcon variant="subtle" aria-label="Settings" onClick={open} color="grey">
        <IconAdjustmentsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </>
  );
}
