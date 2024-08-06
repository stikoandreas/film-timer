import { Input, Stack, Group, rem, Center } from '@mantine/core';
import React, { useState, useRef } from 'react';
import { DataAttributes } from '@mantine/core/lib/core/factory/factory';
import { useUncontrolled } from '@mantine/hooks';

import classes from './TimeInput.module.css';

import { formatSeconds } from '@/lib/time';

interface TimeInputProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export function TimeInput(props: TimeInputProps & DataAttributes) {
  const { value, defaultValue, onChange } = props;
  const [_value, handleChange] = useUncontrolled<number>({
    value,
    defaultValue,
    finalValue: undefined,
    onChange,
  });

  function valueToArray(seconds?: number): Array<number | ''> {
    if (!seconds) return ['', '', '', ''];

    const minute_part = Math.floor(seconds / 60);
    const second_part = Math.floor(seconds % 60);

    return [
      Math.floor(minute_part / 10),
      minute_part % 10,
      Math.floor(second_part / 10),
      second_part % 10,
    ];
  }

  const [valueArray, setValueArray] = useState<Array<number | ''>>(valueToArray(defaultValue));

  function getPowerOfIndex(index: number) {
    switch (index) {
      case 0:
        return 60 * 10;
      case 1:
        return 60;
      case 2:
        return 10;
      case 3:
        return 1;
      default:
        return 1;
    }
  }

  const inputsRef = useRef<Array<HTMLInputElement>>([]);

  function handleArrayChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    // Construct array out of input characters
    const newValues = event.target.value.split('').map((item) => (item === '' ? '' : Number(item)));
    // Cap so that new array cannot overflow
    const cappedValues = newValues.slice(0, valueArray.length - index);
    // Splice into value array
    valueArray.splice(index, cappedValues.length, ...cappedValues);
    // Move focus
    if (index < valueArray.length - cappedValues.length) {
      valueArray[index + cappedValues.length] = '';
      inputsRef.current[index + cappedValues.length].focus();
    }
    // Cleanup
    if (Number(valueArray[2]) > 5) valueArray[2] = 5;
    // Apply
    setValueArray([...valueArray]);
    const result = valueArray
      .map((v) => Number(v))
      .reduce(
        (accumulator: number, v: number, i: number) => accumulator + v * getPowerOfIndex(i),
        0
      );
    handleChange(result);
  }

  return (
    <Stack>
      <Group gap="xs">
        {valueArray.map((char, index) => (
          <Group key={index} gap="xs">
            <Input
              value={char}
              ref={(node) => {
                inputsRef.current[index] = node!;
              }}
              //data-autofocus={index === 0 && props['data-autofocus']}
              //ta="center"
              styles={{
                input: {
                  //paddingInlineStart: '0px',
                  paddingInlineEnd: '0px',
                  textAlign: 'left',
                },
              }}
              classNames={{ input: classes.digitinput }}
              w={rem(45)}
              size="lg"
              placeholder={char === '' ? '0' : char.toString()}
              pattern="[0-9]*"
              onBlur={(event) => {
                event.target.value = valueArray[index].toString();
              }}
              onFocus={(event) => {
                event.target.value = '';
              }}
              onChange={(event) => handleArrayChange(event, index)}
            />
            {(index + 1) % 2 === 0 && index !== valueArray.length - 1 && ':'}
          </Group>
        ))}
      </Group>
      <Center>{formatSeconds(_value)}</Center>
    </Stack>
  );
}
