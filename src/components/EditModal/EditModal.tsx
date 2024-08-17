import { useDisclosure, useUncontrolled } from '@mantine/hooks';
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
} from '@mantine/core';
import { useState, useContext } from 'react';
import { FormValidationResult } from '@mantine/form/lib/types';

import type { DevelopingStep } from '@/types/DevelopingProcess';

import { TimeInput } from '../TimeInput/TimeInput';
import { DebugContext } from '@/context/DebugContext';

import classes from './EditModal.module.css';

interface CustomInputProps {
  index?: number;
  value?: DevelopingStep;
  defaultValue?: DevelopingStep;
  onChange?: (value: DevelopingStep) => void;
  validate: () => FormValidationResult;
  error?: string;
  durationInputProps?: any;
  nameInputProps?: any;
  chimeInputProps?: any;
}

export function EditModal({
  index,
  value,
  defaultValue,
  onChange,
  durationInputProps,
  validate,
  nameInputProps,
  chimeInputProps,
}: CustomInputProps) {
  const [opened, { open, close }] = useDisclosure(false);

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

  function handleValidate() {
    const result = validate();
    if (!Object.keys(result.errors).some((key) => key.startsWith(`steps.${index}`))) close();
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Edit step"
        classNames={{ overlay: classes.overlay }}
        yOffset={120}
      >
        <Autocomplete
          label="Step name"
          placeholder="Step name"
          inputSize="20"
          spellCheck={false}
          defaultValue={_value?.name && _value.name}
          onChange={(val) => handleChange({ ..._value, name: val })}
          error={nameInputProps.error}
          maxDropdownHeight={200}
          data={['Develop', 'Stop', 'Fix', 'Wash', 'Blix', 'Bleach', 'Prewash', 'Stab']}
        />
        <Space h="lg"></Space>
        <Text size="sm">Duration:</Text>
        <Space h="sm" />
        <Center>
          <TimeInput
            defaultValue={_value?.step_seconds && _value.step_seconds}
            onChange={(val) => handleChange({ ..._value, step_seconds: Number(val) })}
          />
        </Center>
        {durationInputProps.error && (
          <Text size="sm" c="red">
            {durationInputProps.error}
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
        <Space h="md" />
        <Button fullWidth onClick={handleValidate}>
          Submit
        </Button>
      </Modal>
      <Button size="xs" onClick={open}>
        Edit
      </Button>
    </>
  );
}
