import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const TimerMode = {
  SESSION: 'session',
  BREAK: 'break',
  NULL: 'null',
};

export default function Timer({ task }) {
  const [sessionClock, setSessionClock] = useState(task.sessionTime);
  const [breakClock, setBreakClock] = useState(task.breakTime);

  const [timeRemaining, setTimeRemaining] = useState(sessionClock);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState(TimerMode.SESSION);

  useEffect(() => {
    let interval;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      if (mode === 'session') {
        setMode(TimerMode.BREAK);
        setTimeRemaining(breakClock);
        console.log('session completed');
      } else if (mode === 'break') {
        setMode(TimerMode.SESSION);
        setTimeRemaining(sessionClock);
        console.log('break completed');
      }

      setIsRunning(false);
      clearInterval(interval);
      handleReset();
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeRemaining, isRunning]);

  const formatTime = (timeRemaining) => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const handleSkip = () => {
    setIsRunning(false);
    if (mode === 'session') {
      setMode(TimerMode.BREAK);
      setTimeRemaining(breakClock);
      console.log('session skipped');
    } else if (mode === 'break') {
      setMode(TimerMode.SESSION);
      setTimeRemaining(sessionClock);
      console.log('break skipped');
    }
  };

  return (
    <View className='flex-1 justify-center'>
      <Text className='text-xl font-bold'>Timer: {task.name}</Text>
      <Text className='text-lg font-bold'>Current Mode: {mode}</Text>
      <Text>Timer: {formatTime(timeRemaining)}</Text>
      <View>
        <Button title={isRunning ? 'Pause' : 'Start'} onPress={toggleTimer}>
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        {mode === 'break' ? (
          <Button title='skip' onPress={handleSkip}>
            skip break{' '}
          </Button>
        ) : (
          <Button title='skip' onPress={handleSkip}>
            skip session
          </Button>
        )}
      </View>
    </View>
  )
}