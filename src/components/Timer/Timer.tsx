/* eslint-disable jsx-a11y/media-has-caption */
import { Stepper, Text, Progress, Stack, RingProgress, Center } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';

import type { DevelopingProcess } from '@/types/DevelopingProcess';

import click from './double_beep.wav';

declare global {
  interface Navigator {
    audioSession: {
      type: 'auto' | 'playback' | 'transient' | 'transient-solo' | 'ambient' | 'play-and-record';
    };
  }
}

export function Timer({ process }: { process: DevelopingProcess }) {
  const [activeStep, setActiveStep] = useState(0);

  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const [chimeProgress, setChimeProgress] = useState<number>(0);
  const [stepProgress, setStepProgress] = useState<number>(0);

  const audioRef = useRef<HTMLMediaElement>(null);
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  function startTimer() {
    const now = new Date();
    setStartTime(now);
    const end = new Date(now.getTime() + process.steps[activeStep].step_minutes * 60 * 1000);
    setEndTime(end);
  }

  function handleNextStep() {
    if (activeStep < process.steps.length - 1) setActiveStep(activeStep + 1);
    startTimer();
  }

  function processTime() {
    const now = new Date();
    if (startTime && endTime) {
      setStepProgress(
        ((now.getTime() - startTime.getTime()) / (endTime.getTime() - startTime.getTime())) * 100
      );
      if (process.steps[activeStep].chime_seconds) {
        const newChime =
          ((now.getTime() - startTime.getTime()) / 1000 / process.steps[activeStep].chime_seconds) *
          100;
        setChimeProgress(newChime % 100);
      }
      if (now > endTime) {
        handleNextStep();
      }
    }
  }

  useEffect(() => {
    startTimer();
    if ('audioSession' in navigator) navigator.audioSession.type = 'transient';
  }, []);

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    intervals.push(setInterval(() => processTime(), 20));

    if (process.steps[activeStep].chime_seconds) {
      intervals.push(
        setInterval(() => handlePlay(), process.steps[activeStep].chime_seconds * 1000)
      );
    }
    return () => {
      intervals.map((interval) => clearInterval(interval));
    };
  }, [startTime]);

  return (
    <>
      <audio ref={audioRef}>
        <source src={click} type="audio/wav" />
        <p>Your browser does not support the audio element.</p>
      </audio>
      <Stack>
        <Stepper active={activeStep}>
          {process.steps.map((item) => (
            <Stepper.Step
              key={item.key}
              label={item.name}
              description={`${item.step_minutes} minutes`}
            />
          ))}
        </Stepper>
        <Text>Progress:</Text>
        <Progress value={stepProgress} transitionDuration={100} />
        <Center>
          <RingProgress sections={[{ value: chimeProgress, color: 'cyan' }]} />
        </Center>
      </Stack>
    </>
  );
}
