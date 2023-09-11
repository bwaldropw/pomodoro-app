import React, { useState } from 'react';
import { View } from 'react-native';
import Timer from '../components/Timer';

const taskSample = {
  name: 'Study',
  sessionTime: 10,
  breakTime: 5,
}

export default function TimerScreen() {
  const [currentTask, setCurrentTask] = useState(taskSample)

  return (
    <View className='flex-1 justify-center'>
      <Timer task={currentTask}/>
    </View>
  );
}
