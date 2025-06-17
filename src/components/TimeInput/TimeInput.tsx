import { Input, Stack, Group, rem, Code } from '@mantine/core';
import { useState, useContext } from 'react';
import { DataAttributes } from '@mantine/core/lib/core/factory/factory';
import { useUncontrolled } from '@mantine/hooks';
import useDigitInput from 'react-digit-input';

import { formatSeconds } from '@/lib/time';
import { DebugContext } from '@/context/DebugContext';

interface TimeInputProps {
  value?: number;
  defaultValue?: number;
  autoFocus?: boolean;
  onChange?: (value: number) => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export function TimeInput({
  size = 'lg',
  autoFocus = true,
  ...props
}: TimeInputProps & DataAttributes) {
  const { value, defaultValue, onChange } = props;
  const [_value, handleChange] = useUncontrolled<number>({
    value,
    defaultValue,
    finalValue: undefined,
    onChange,
  });

  const sizeWidth = {
    xs: rem(29),
    sm: rem(34),
    md: rem(39),
    lg: rem(44),
    xl: rem(52),
  };

  const sizePadding = {
    xs: rem(4),
    sm: rem(6),
    md: rem(8),
    lg: 'xs',
    xl: rem(12),
  };

  const { debug } = useContext(DebugContext);

  const [valueString, setValueString] = useState<string>(valueToString(defaultValue));

  function handleDigitsChange(digits: string) {
    if (Number(digits[2]) > 5) {
      const digitArray = [...digits];
      digitArray[2] = '5';
      digits = digitArray.join('');
    }
    setValueString(digits);
    const result = [...digits]
      .map((v) => Number(v))
      .reduce(
        (accumulator: number, v: number, i: number) => accumulator + v * getPowerOfIndex(i),
        0
      );
    handleChange(result);
  }

  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length: 4,
    value: valueString,
    onChange: handleDigitsChange,
  });

  function valueToString(seconds?: number) {
    if (!seconds) return '    ';
    return formatSeconds(seconds, '');
  }

  function getPowerOfIndex(index: number) {
    switch (index) {
      case 0:
        return 60 * 10;
      case 1:
        return 60;
      case 2:
        return 10;
      case 3:
      default:
        return 1;
    }
  }
  return (
    <Stack>
      <Group gap={sizePadding[size]}>
        {digits.map((digit, index) => (
          <Group key={index} gap={sizePadding[size]}>
            <Input
              styles={{
                input: {
                  paddingInlineEnd: '0px',
                  textAlign: 'left',
                },
              }}
              autoFocus={(autoFocus && index === 0) || undefined}
              w={sizeWidth[size]}
              size={size}
              placeholder="0"
              inputMode="numeric"
              {...digit}
            />
            {(index + 1) % 2 === 0 && index !== digits.length - 1 && ':'}
          </Group>
        ))}
      </Group>
      {debug && <Code>{formatSeconds(_value)}</Code>}
    </Stack>
  );
}
