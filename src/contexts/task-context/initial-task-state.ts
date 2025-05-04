export const initialTaskState = {
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 1,
    shortBreakTime: 1,
    longBreakTime: 1,
  },
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: '00:00',
}
