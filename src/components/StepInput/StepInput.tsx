import {
  Group,
  TextInput,
  Stack,
  Space,
  NumberInput,
  Code,
  Collapse,
  SegmentedControl,
  Text,
} from '@mantine/core';
import { useState, useContext } from 'react';
import { useUncontrolled } from '@mantine/hooks';

import type { DevelopingStep } from '@/types/DevelopingProcess';

import { DebugContext } from '@/context/DebugContext';

interface CustomInputProps {
  value?: DevelopingStep;
  defaultValue?: DevelopingStep;
  onChange?: (value: DevelopingStep) => void;
  error?: string;
  durationInputProps?: any;
  nameInputProps?: any;
  chimeInputProps?: any;
}

export function StepInput({
  value,
  defaultValue,
  onChange,
  durationInputProps,
  nameInputProps,
  chimeInputProps,
}: CustomInputProps) {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: undefined,
    onChange,
  });

  const [customChime, setCustomChime] = useState(false);
  const [customValue, setCustomValue] = useState<number | ''>('');

  const { debug } = useContext(DebugContext);

  function setSegmentedControl() {
    if (customChime) return 'custom';
    if (_value && _value.chime_seconds) {
      switch (_value.chime_seconds) {
        case 60:
          return '60';
        case 30:
          return '30';
        case 0:
        case undefined:
          return 'off';
        default:
          setCustomChime(true);
          setCustomValue(_value.chime_seconds);
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
        handleChange({ ..._value, chime_seconds: customValue });
        return;
      case '60':
        setCustomChime(false);
        handleChange({ ..._value, chime_seconds: 60 });
        return;
      case '30':
        setCustomChime(false);
        handleChange({ ..._value, chime_seconds: 30 });
        return;
      case 'off':
        setCustomChime(false);
        handleChange({ ..._value, chime_seconds: '' });
    }
  }

  return (
    <Stack gap={0}>
      <Group>
        <TextInput
          label="Step name"
          placeholder="Step name"
          defaultValue={_value?.name && _value.name}
          onChange={(e) => handleChange({ ..._value, name: e.currentTarget.value })}
          error={nameInputProps.error}
        />
        <NumberInput
          label="Step duration"
          placeholder="Time in minutes"
          defaultValue={_value?.step_minutes && _value.step_minutes}
          min={1}
          max={100}
          inputSize="3"
          pattern="\d*"
          onChange={(val) => handleChange({ ..._value, step_minutes: Number(val) })}
          error={durationInputProps.error}
        />
      </Group>
      <Space h="md" />
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
          inputSize="3"
          pattern="\d*"
          value={customValue}
          onChange={(val) => {
            setCustomValue(val === '' ? '' : Number(val));
            setCustomChime(true);
            handleChange({ ..._value, chime_seconds: val === '' ? '' : Number(val) });
          }}
        />
        {chimeInputProps.error && (
          <Text size="sm" c="red">
            {chimeInputProps.error}
          </Text>
        )}
      </Collapse>
      <Collapse in={debug}>
        <Space h="md" />
        <Code block>{JSON.stringify(_value, null, 2)}</Code>
      </Collapse>
    </Stack>
  );
}
