export function clockPad(input: number) {
  return input.toString().padStart(2, '0');
}

export function secondsToMinutes(input: number) {
  return {
    minutes: Math.floor(input / 60),
    seconds: Math.floor(input % 60),
  };
}

export function formatSeconds(input: number, divider: string = ':') {
  const { minutes, seconds } = secondsToMinutes(input);
  return `${clockPad(minutes)}${divider}${clockPad(seconds)}`;
}
