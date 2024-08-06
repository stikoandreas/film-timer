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
} from '@mantine/core';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Carousel, Embla } from '@mantine/carousel';
import { useTimer } from 'react-use-precision-timer';

import type { DevelopingProcess } from '@/types/DevelopingProcess';

import click from './double_beep.wav';
import tripleBeep from './triple_beep.wav';

import { formatSeconds } from '@/lib/time';

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
      intervalTimer.resume();
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
      <Title c="white">{getTimeRemaining()}</Title>
      <Progress.Root
        transitionDuration={100}
        w="80%"
        bg="var(--mantine-color-blue-9)"
        size="lg"
        radius="lg"
      >
        <Progress.Section color="white" value={stepProgress} />
      </Progress.Root>
      <Center>
        <RingProgress
          rootColor="var(--mantine-color-blue-9)"
          roundCaps
          sections={[{ value: chimeProgress, color: 'white' }]}
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

  const tripleBeepRef = useRef<HTMLMediaElement>(null);

  function getDurationForStep(index: number) {
    return process.steps[index].step_seconds * 1000;
  }

  function getIntervalForStep(index: number) {
    return Number(process.steps[index].chime_seconds) * 1000;
  }

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

  return (
    <>
      <Stack maw="100vw" w="500pt">
        <audio ref={tripleBeepRef}>
          <source src={tripleBeep} type="audio/wav" />
          <p>Your browser does not support the audio element.</p>
        </audio>
        <Stepper active={activeStep} mt="md" mx="lg">
          {process.steps.map((item) => (
            <Stepper.Step
              key={item.key}
              label={item.name}
              description={formatSeconds(item.step_seconds)}
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
          {process.steps.map((item, index) => (
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
                        totalDuration={getDurationForStep(index)}
                        interval={getIntervalForStep(index)}
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
