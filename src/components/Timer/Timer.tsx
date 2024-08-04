/* eslint-disable jsx-a11y/media-has-caption */
import { Stepper, Text, Progress, Stack, RingProgress, Center, Button, Group } from '@mantine/core';
import { useState, useEffect, useRef, useCallback } from 'react';

import type { DevelopingProcess } from '@/types/DevelopingProcess';

import click from './double_beep.wav';
import tripleBeep from './triple_beep.wav';

import { useTimer } from 'react-use-precision-timer';

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
  const [renderTime, setRenderTime] = useState<number>(0);

  const audioCallBack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  const renderCallback = useCallback(() => {
    if (timer.getElapsedRunningTime() > totalDuration) {
      callback();
    }
    setStepProgress((timer.getElapsedRunningTime() / totalDuration) * 100);
    setChimeProgress(100 - (timer.getRemainingTime() / timer.getEffectiveDelay()) * 100);
    setRenderTime(renderTimer.getRemainingTime());
  }, [interval, totalDuration]);

  // The callback will be called every 1000 milliseconds.
  const timer = useTimer({ delay: interval }, audioCallBack);

  const renderTimer = useTimer({ delay: renderSpeed }, renderCallback);

  const audioRef = useRef<HTMLMediaElement>(null);

  function startTimer() {
    timer.start();
    renderTimer.start();
  }

  function handlePlayPause() {
    if (timer.isPaused()) {
      timer.resume();
    } else if (timer.isRunning()) {
      timer.pause();
    }
  }

  useEffect(() => {
    startTimer();
    if ('audioSession' in navigator) navigator.audioSession.type = 'transient';
  }, [interval, totalDuration]);

  return (
    <Stack>
      <audio ref={audioRef}>
        <source src={click} type="audio/wav" />
        <p>Your browser does not support the audio element.</p>
      </audio>
      <Text>Progress:</Text>
      {timer.getElapsedRunningTime()} {timer.getRemainingTime()} {timer.getEffectiveDelay()}{' '}
      {renderTime}
      <Progress value={stepProgress} transitionDuration={100} />
      <Center>
        <RingProgress sections={[{ value: chimeProgress, color: 'cyan' }]} />
      </Center>
      <Button onClick={handlePlayPause}>{timer.isPaused() ? 'Resume' : 'Pause'}</Button>
    </Stack>
  );
}

export function Timer({ process }: { process: DevelopingProcess }) {
  const [activeStep, setActiveStep] = useState(0);

  const [stepTime, setStepTime] = useState(0);
  const [intervalTime, setIntervalTime] = useState(0);

  const [isIntermission, setIsInterMission] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const tripleBeepRef = useRef<HTMLMediaElement>(null);

  useEffect(() => {
    if (activeStep < process.steps.length) {
      setStepTime((process.steps[activeStep].step_minutes * 60 * 1000) / 8);
      setIntervalTime(Number(process.steps[activeStep].chime_seconds) * 1000);
    }
  }, [activeStep]);

  function handlePrevStep() {
    if (activeStep > 0) {
      setIsFinished(false);
      setActiveStep(activeStep - 1);
      setIsInterMission(true);
    }
  }

  function handleNextStep() {
    if (activeStep < process.steps.length - 1) {
      setActiveStep(activeStep + 1);
      setIsInterMission(true);
    } else {
      setActiveStep(activeStep + 1);
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
      <Stack>
        <audio ref={tripleBeepRef}>
          <source src={tripleBeep} type="audio/wav" />
          <p>Your browser does not support the audio element.</p>
        </audio>
        <Stepper active={activeStep}>
          {process.steps.map((item) => (
            <Stepper.Step
              key={item.key}
              label={item.name}
              description={`${item.step_minutes} minutes`}
            />
          ))}
        </Stepper>
        {stepTime} {intervalTime}
        {!isIntermission ? (
          <TimeCard
            totalDuration={stepTime}
            interval={intervalTime}
            renderSpeed={10}
            callback={handleFinished}
          ></TimeCard>
        ) : !isFinished ? (
          <Stack>
            <Text>Get ready to {process.steps[activeStep].name}!</Text>
            <Button onClick={() => setIsInterMission(false)}>Continue</Button>
          </Stack>
        ) : (
          <Stack>
            <Text>Wow you are done!</Text>
          </Stack>
        )}
        <Group grow>
          <Button onClick={handlePrevStep}>Previous</Button>
          <Button onClick={handleNextStep}>Next</Button>
        </Group>
      </Stack>
    </>
  );
}
