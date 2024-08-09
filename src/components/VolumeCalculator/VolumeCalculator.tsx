import { NumberInput, Group, Stack, Input, Center, Title, SegmentedControl } from '@mantine/core';
import { useRef, useState } from 'react';

export function VolumeCalculator() {
  const [partA, setPartA] = useState<string | number>(1);
  const [partB, setPartB] = useState<string | number>(25);
  const [targetVolume, setTargetVolume] = useState<string | number>(500);

  const amountA = (Number(partA) / (Number(partA) + Number(partB))) * Number(targetVolume);
  const amountB = Number(targetVolume) - amountA;

  const targetVolumeRef = useRef<HTMLInputElement>(null);

  function volumeToSelect(value: string | number) {
    switch (value.toString()) {
      case '1000':
        return '1000';
      case '600':
        return '600';
      case '500':
        return '500';
      case '300':
        return '300';
      default:
        return 'custom';
    }
  }

  function onSelect(value: string) {
    switch (value) {
      case '1000':
        setTargetVolume(1000);
        return;
      case '600':
        setTargetVolume(600);
        return;
      case '500':
        setTargetVolume(500);
        return;
      case '300':
        setTargetVolume(300);
        return;
      default:
        setTargetVolume('');
        targetVolumeRef.current!.focus();
    }
  }

  return (
    <>
      <Center>
        <Stack align="left" mt="xl" maw="85vw">
          <Input.Wrapper label="Dilution">
            <Group wrap="nowrap">
              <NumberInput
                inputMode="numeric"
                value={partA}
                onChange={setPartA}
                onFocus={() => setPartA('')}
              />
              +
              <NumberInput
                inputMode="numeric"
                value={partB}
                onChange={setPartB}
                onFocus={() => setPartB('')}
              />
            </Group>
          </Input.Wrapper>
          <SegmentedControl
            size="xs"
            value={volumeToSelect(targetVolume)}
            onChange={onSelect}
            data={[
              {
                label: '300 ml',
                value: '300',
              },
              {
                label: '500 ml',
                value: '500',
              },
              {
                label: '600 ml',
                value: '600',
              },
              {
                label: '1000 ml',
                value: '1000',
              },
              {
                label: 'Custom',
                value: 'custom',
              },
            ]}
          />
          <NumberInput
            ref={targetVolumeRef}
            label="Target volume"
            inputMode="numeric"
            inputSize="4"
            value={targetVolume}
            suffix=" ml"
            onChange={setTargetVolume}
            onFocus={() => setTargetVolume('')}
          />
          <Title order={4}>
            {Math.round(amountA)} ml + {Math.round(amountB)} ml water
          </Title>
        </Stack>
      </Center>
    </>
  );
}
