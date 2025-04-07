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
  Modal,
  InputWrapper,
  Badge,
  ScrollArea,
} from '@mantine/core';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Carousel, Embla } from '@mantine/carousel';
import { useTimer } from 'react-use-precision-timer';
import { IconMoodHappyFilled } from '@tabler/icons-react';

import type { DevelopingProcess, DevelopingStep } from '@/types/DevelopingProcess';

import click from './double_beep.wav';
import tripleBeep from './triple_beep.wav';

import { formatSeconds } from '@/lib/time';

import { recipeIcons } from '@/resources/recipes';

import classes from './Timer.module.css';

declare global {
  interface Navigator {
    audioSession: {
      type: 'auto' | 'playback' | 'transient' | 'transient-solo' | 'ambient' | 'play-and-record';
    };
  }
}

interface TimerCardProps {
  totalDuration: number;
  continuous_agitation?: number;
  interval: number;
  renderSpeed: number;
  callback: () => void;
}

export function TimeCard({
  totalDuration,
  interval,
  continuous_agitation,
  renderSpeed,
  callback,
}: TimerCardProps) {
  const [chimeProgress, setChimeProgress] = useState<number>(0);
  const [stepProgress, setStepProgress] = useState<number>(0);

  const audioRef = useRef<HTMLMediaElement>(null);

  const audioCallBack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [audioRef]);

  const durationTimer = useTimer({ delay: totalDuration, runOnce: true }, callback);
  const intervalTimer = useTimer({ delay: interval }, audioCallBack);

  const continuousCallback = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    intervalTimer.start();
  }, [audioRef, intervalTimer]);

  const continuousTimer = useTimer(
    { delay: continuous_agitation, runOnce: true },
    continuousCallback
  );

  const renderCallback = useCallback(() => {
    setStepProgress(
      100 - (durationTimer.getRemainingTime() / durationTimer.getEffectiveDelay()) * 100
    );
    if (continuousTimer.isStarted()) {
      setChimeProgress(
        100 - (continuousTimer.getRemainingTime() / continuousTimer.getEffectiveDelay()) * 100
      );
    } else {
      setChimeProgress(
        100 - (intervalTimer.getRemainingTime() / intervalTimer.getEffectiveDelay()) * 100
      );
    }
  }, [interval, totalDuration]);

  function startTimer() {
    durationTimer.start();
    if (continuous_agitation) {
      continuousTimer.start();
    } else {
      intervalTimer.start();
    }
  }

  function handlePlayPause() {
    if (durationTimer.isPaused()) {
      durationTimer.resume();
      continuousTimer.resume();
      intervalTimer.resume();
    } else if (durationTimer.isRunning()) {
      durationTimer.pause();
      intervalTimer.pause();
      continuousTimer.pause();
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
  }, [interval, totalDuration, continuous_agitation]);

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
              <Progress.Root w={90} bg="var(--mantine-color-blue-9)" size="xs" radius="lg">
                <Progress.Section
                  animated={continuousTimer.isStarted()}
                  color="white"
                  value={chimeProgress}
                  className={classes.progress}
                />
                {continuousTimer.isStarted() && (
                  <Progress.Section
                    animated
                    color="blue-9"
                    value={100 - chimeProgress}
                    className={classes.progress}
                  />
                )}
              </Progress.Root>
              {continuousTimer.isStarted() && (
                <Badge color="blue" variant="white" size="xs" radius="sm" mt={3}>
                  Continuous
                </Badge>
              )}
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

  const viewportRef = useRef<HTMLDivElement>(null);

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

  function close() {
    setNumberFilms(0);
    setExhaustCompensated(true);
  }

  return (
    <>
      <Modal
        opened={
          process.steps.some(
            (item) => item.exhaust_compensation && item.exhaust_compensation_rate
          ) && !exhaustCompensated
        }
        onClose={close}
        title="Time Compensation"
        classNames={{ overlay: classes.overlay }}
        yOffset={120}
      >
        <Stack>
          <Text size="sm">
            This recipe will adjust itself depending on how many films you have developed so far.
          </Text>
          <InputWrapper
            label="Films developed"
            description="How many films have you developed so far?"
          >
            <Slider color="blue" value={numberFilms} onChange={setNumberFilms} max={30} mt="md" />
          </InputWrapper>
          <Text size="sm">This will extend the following steps:</Text>
          {process.steps
            .filter((item) => item.exhaust_compensation && item.exhaust_compensation_rate)
            .map((item) => (
              <Text key={item.key}>
                {item.name}: {formatSeconds(item.step_seconds)} &rarr;{' '}
                {formatSeconds(calculateCompensatedValue(item))}
              </Text>
            ))}
          <Button onClick={() => setExhaustCompensated(true)}>Start</Button>
        </Stack>
      </Modal>

      <Stack maw="100vw" w="500pt">
        <audio ref={tripleBeepRef}>
          <source src={tripleBeep} type="audio/wav" />
          <p>Your browser does not support the audio element.</p>
        </audio>
        <ScrollArea
          scrollbars="x"
          offsetScrollbars="x"
          scrollbarSize={8}
          viewportRef={viewportRef}
          styles={{ viewport: { scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' } }}
        >
          <Stepper active={activeStep} mt="md" mx="lg" size="sm" wrap={false}>
            {compensated_steps.map((item) => (
              <Stepper.Step
                data-list-item
                key={item.key}
                label={item.name}
                style={{ scrollSnapAlign: 'center' }}
                description={formatSeconds(item.step_seconds)}
                icon={
                  <Avatar name={item.name} color="initials">
                    {item.icon && recipeIcons[item.icon]}
                  </Avatar>
                }
              />
            ))}
          </Stepper>
        </ScrollArea>
        <Carousel
          height={400}
          slideSize="90%"
          slideGap="md"
          align="center"
          getEmblaApi={setEmbla}
          onSlideChange={(index) => {
            viewportRef.current
              ?.querySelectorAll('[data-list-item]')
              ?.[index]?.scrollIntoView({ inline: 'center', behavior: 'smooth' });
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
                        continuous_agitation={
                          item.continuous_agitation ? item.continuous_agitation * 1000 : undefined
                        }
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
                  <Stack h="100%" align="center" c="white" justify="center">
                    <IconMoodHappyFilled size={150} />
                    <Text size="xl">You are done!</Text>
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
