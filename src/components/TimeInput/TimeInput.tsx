import { Input, Stack, Group, rem } from '@mantine/core';
import classes from './TimeInput.module.css';
import React, { useState, useRef } from 'react';

export function TimeInput() {
  const [valueArray, setValueArray] = useState<Array<number | ''>>(['', '', '', '']);

  const [seconds, setSeconds] = useState(0);

  function getPowerOfIndex(index: number) {
    console.log('Index', index);
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
    const newValues = event.target.value.split('').map((item) => (item === '' ? '' : Number(item)));
    const cappedValues = newValues.slice(0, valueArray.length - index);
    valueArray.splice(index, cappedValues.length, ...cappedValues);
    if (index < valueArray.length - cappedValues.length) {
      valueArray[index + cappedValues.length] = '';
      inputsRef.current[index + cappedValues.length].focus();
    }
    if (Number(valueArray[2]) > 5) valueArray[2] = 5;
    setValueArray([...valueArray]);
    const result = valueArray
      .map((v) => Number(v))
      .reduce(
        (accumulator: number, v: number, index: number) => accumulator + v * getPowerOfIndex(index),
        0
      );
    setSeconds(result);
  }

  return (
    <>
      <Stack>
        <Group w="300" gap="xs">
          {valueArray.map((char, index) => (
            <Group key={index} gap="xs">
              <Input
                value={char}
                ref={(node) => {
                  inputsRef.current[index] = node!;
                }}
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
                onBlur={(event) => (event.target.value = valueArray[index].toString())}
                onFocus={(event) => (event.target.value = '')}
                onChange={(event) => handleArrayChange(event, index)}
              ></Input>
              {(index + 1) % 2 == 0 && index !== valueArray.length - 1 && ':'}
            </Group>
          ))}
        </Group>
      </Stack>
      {`${Math.floor(seconds / 60)
        .toString()
        .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`}
    </>
  );
}
