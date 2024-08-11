/* eslint-disable jsx-a11y/media-has-caption */
import {
  Stepper,
  Text,
  Progress,
  Stack,
  RingProgress,
  Center,
  Button,
  Box,
  Title,
  Space,
  Transition,
  Avatar,
  Slider,
} from '@mantine/core';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Carousel, Embla } from '@mantine/carousel';
import { useTimer } from 'react-use-precision-timer';

import type { DevelopingProcess, DevelopingStep } from '@/types/DevelopingProcess';

import click from './double_beep.wav';
import tripleBeep from './triple_beep.wav';

import { formatSeconds } from '@/lib/time';

import { recipeIcons } from '@/resources/recipes';

declare global {
  interface Navigator {
    audioSession: {
      type: 'auto' | 'playback' | 'transient' | 'transient-solo' | 'ambient' | 'play-and-record';
    };
  }
}

interface TimerCardProps {
  totalDuration: number;
  interval: number;
  renderSpeed: number;
  callback: () => void;
}

export function TimeCard({ totalDuration, interval, renderSpeed, callback }: TimerCardProps) {
  const [chimeProgress, setChimeProgress] = useState<number>(0);
  const [stepProgress, setStepProgress] = useState<number>(0);

  const audioCallBack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  const renderCallback = useCallback(() => {
    setStepProgress(
      100 - (durationTimer.getRemainingTime() / durationTimer.getEffectiveDelay()) * 100
    );
    setChimeProgress(
      100 - (intervalTimer.getRemainingTime() / intervalTimer.getEffectiveDelay()) * 100
    );
  }, [interval, totalDuration]);

  const durationTimer = useTimer({ delay: totalDuration, runOnce: true }, callback);
  const intervalTimer = useTimer({ delay: interval }, audioCallBack);

  const audioRef = useRef<HTMLMediaElement>(null);

  function startTimer() {
    durationTimer.start();
    intervalTimer.start();
  }

  function handlePlayPause() {
    if (durationTimer.isPaused()) {
      durationTimer.resume();
      intervalTimer.resume();
    } else if (durationTimer.isRunning()) {
      durationTimer.pause();
      intervalTimer.pause();
    }
  }

  function getTimeRemaining() {
    const timeRemaining = durationTimer.getRemainingTime();
    return formatSeconds(Math.floor(timeRemaining / 1000));
  }

  useEffect(() => {
    const intervalId = setInterval(renderCallback, renderSpeed);
    if ('audioSession' in navigator) navigator.audioSession.type = 'transient';
    return () => clearTimeout(intervalId);
  }, []);

  useEffect(() => {
    startTimer();
  }, [interval, totalDuration]);

  return (
    <Stack align="center" justify="space-between" h={300}>
      <audio ref={audioRef}>
        <source src={click} type="audio/wav" />
        <p>Your browser does not support the audio element.</p>
      </audio>
      <Space />
      <Center>
        <RingProgress
          rootColor="var(--mantine-color-blue-9)"
          size={200}
          label={
            <Stack gap={2} align="center">
              <Title c="white">{getTimeRemaining()}</Title>
              <Progress.Root
                transitionDuration={100}
                w={90}
                bg="var(--mantine-color-blue-9)"
                size="xs"
                radius="lg"
              >
                <Progress.Section color="white" value={chimeProgress} />
              </Progress.Root>
            </Stack>
          }
          sections={[{ value: stepProgress, color: 'white' }]}
        />
      </Center>
      <Button variant="white" onClick={handlePlayPause}>
        {durationTimer.isPaused() ? 'Resume' : 'Pause'}
      </Button>
    </Stack>
  );
}

export function Timer({ process }: { process: DevelopingProcess }) {
  const [activeStep, setActiveStep] = useState(0);

  const [embla, setEmbla] = useState<Embla | null>(null);

  const [isIntermission, setIsInterMission] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const [exhaustCompensated, setExhaustCompensated] = useState(false);
  const [numberFilms, setNumberFilms] = useState<number>(0);

  const tripleBeepRef = useRef<HTMLMediaElement>(null);

  /*function handlePrevStep() {
    if (activeStep > 0) {
      setIsFinished(false);
      embla?.scrollPrev();
    }
  }*/

  function handleNextStep() {
    if (activeStep < process.steps.length - 1) {
      embla?.scrollNext();
    } else {
      setActiveStep(process.steps.length);
      setIsFinished(true);
      setIsInterMission(true);
    }
  }

  function handleFinished() {
    if (tripleBeepRef.current) {
      tripleBeepRef.current.play();
    }
    handleNextStep();
  }

  function calculateCompensationAmount(step: DevelopingStep) {
    return (
      step.exhaust_compensation! *
      Math.floor(Math.max(0, numberFilms - 1) / step.exhaust_compensation_rate!)
    );
  }

  function calculateCompensatedValue(step: DevelopingStep) {
    return step.step_seconds + calculateCompensationAmount(step);
  }

  const compensated_steps = process.steps.map((step) =>
    step.exhaust_compensation && step.exhaust_compensation_rate
      ? { ...step, step_seconds: calculateCompensatedValue(step) }
      : { ...step }
  );

  if (
    process.steps.some((item) => item.exhaust_compensation && item.exhaust_compensation_rate) &&
    !exhaustCompensated
  ) {
    return (
      <>
        <Stack maw="85vw" w={450}>
          <Title mt={30}>Time compensation</Title>
          <Text>How many films have you developed so far?</Text>
          <Slider color="blue" value={numberFilms} onChange={setNumberFilms} max={30} />
          <Text>This will extend the following steps:</Text>
          {process.steps
            .filter((item) => item.exhaust_compensation && item.exhaust_compensation_rate)
            .map((item) => (
              <Text key={item.key}>
                {item.name}: {formatSeconds(item.step_seconds)} &rarr;{' '}
                {formatSeconds(calculateCompensatedValue(item))}
              </Text>
            ))}
          <Button onClick={() => setExhaustCompensated(true)}>Submit</Button>
        </Stack>
      </>
    );
  }

  return (
    <>
      <Stack maw="100vw" w="500pt">
        <audio ref={tripleBeepRef}>
          <source src={tripleBeep} type="audio/wav" />
          <p>Your browser does not support the audio element.</p>
        </audio>
        <Stepper active={activeStep} mt="md" mx="lg">
          {compensated_steps.map((item) => (
            <Stepper.Step
              key={item.key}
              label={item.name}
              description={formatSeconds(item.step_seconds)}
              icon={
                <Avatar name={item.name} color="initials">
                  {item.icon && recipeIcons[item.icon]}
                </Avatar>
              }
            />
          ))}
        </Stepper>
        <Carousel
          height={400}
          slideSize="90%"
          slideGap="md"
          align="center"
          getEmblaApi={setEmbla}
          onSlideChange={(index) => {
            setIsInterMission(true);
            setActiveStep(index);
          }}
        >
          {compensated_steps.map((item, index) => (
            <Carousel.Slide key={item.key}>
              <Box bg="blue" h="100%" p="xl" style={{ borderRadius: '10pt' }}>
                <Transition
                  mounted={!isIntermission && activeStep === index}
                  transition="fade-up"
                  duration={150}
                  timingFunction="ease-in-out"
                  enterDelay={150}
                >
                  {(styles) => (
                    <div style={styles}>
                      <Center>
                        <Title c="white">{item.name}</Title>
                      </Center>
                      <TimeCard
                        totalDuration={item.step_seconds * 1000}
                        interval={Number(item.chime_seconds) * 1000}
                        renderSpeed={10}
                        callback={handleFinished}
                      />
                    </div>
                  )}
                </Transition>
                <Transition
                  mounted={isIntermission && activeStep === index}
                  transition="fade-down"
                  duration={150}
                  enterDelay={150}
                  timingFunction="ease-in-out"
                >
                  {(styles) => (
                    <div style={styles}>
                      <Stack align="center" justify="space-between" h={320}>
                        <Center>
                          <Title c="white">Get ready to {item.name}!</Title>
                        </Center>
                        <Button variant="white" onClick={() => setIsInterMission(false)}>
                          Continue
                        </Button>
                      </Stack>
                    </div>
                  )}
                </Transition>
                {!isIntermission && activeStep === index ? (
                  <></>
                ) : !isFinished ? (
                  <></>
                ) : (
                  <Stack>
                    <Text>Wow you are done!</Text>
                  </Stack>
                )}
              </Box>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Stack>
    </>
  );
}
