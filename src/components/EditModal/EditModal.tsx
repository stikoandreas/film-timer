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
  ActionIcon,
  FocusTrap,
  rem,
  InputWrapper,
} from '@mantine/core';
import { useState, useContext } from 'react';
import { FormValidationResult } from '@mantine/form/lib/types';
import { IconAdjustmentsHorizontal, IconChevronDown } from '@tabler/icons-react';

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
  onDelete?: () => void;
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
  onDelete,
}: CustomInputProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const [advanced, { toggle: toggleAdvanced }] = useDisclosure(false);

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
        <FocusTrap.InitialFocus />
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
            suffix=" s"
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
        <Button
          mt="xs"
          variant="subtle"
          fullWidth
          color="gray"
          onClick={toggleAdvanced}
          rightSection={
            <IconChevronDown
              size={rem(12)}
              style={{
                transform: advanced ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform',
              }}
            />
          }
        >
          Advanced
        </Button>
        <Collapse in={advanced}>
          <NumberInput
            label="Continuous agitation"
            description="Optional first agitation step"
            placeholder="Seconds"
            inputMode="numeric"
            suffix=" s"
            allowNegative={false}
            defaultValue={_value?.continuous_agitation && _value.continuous_agitation}
            onChange={(val) =>
              handleChange({
                ..._value,
                continuous_agitation: Number(val) ? Number(val) : undefined,
              })
            }
          />
          <Space h="xs" />
          <NumberInput
            label="Temperature"
            description="Target temperature for step"
            placeholder="Degrees Celcius"
            suffix=" &deg;C"
            inputMode="numeric"
            allowNegative={false}
            defaultValue={_value?.temperature && _value.temperature}
            onChange={(val) =>
              handleChange({
                ..._value,
                temperature: Number(val) ? Number(val) : undefined,
              })
            }
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
                defaultValue={_value?.exhaust_compensation && _value.exhaust_compensation}
                onChange={(val) =>
                  handleChange({
                    ..._value,
                    exhaust_compensation: Number(val) ? Number(val) : undefined,
                  })
                }
              />

              <NumberInput
                placeholder="Number of films"
                prefix="every "
                suffix=" films"
                allowNegative={false}
                inputMode="numeric"
                defaultValue={_value?.exhaust_compensation_rate && _value.exhaust_compensation_rate}
                onChange={(val) =>
                  handleChange({
                    ..._value,
                    exhaust_compensation_rate: Number(val) ? Number(val) : undefined,
                  })
                }
              />
            </Group>
          </InputWrapper>
        </Collapse>
        <Button fullWidth onClick={handleValidate} mt="xs">
          Submit
        </Button>
      </Modal>
      <ActionIcon variant="subtle" aria-label="Settings" onClick={open} color="grey">
        <IconAdjustmentsHorizontal style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </>
  );
}
