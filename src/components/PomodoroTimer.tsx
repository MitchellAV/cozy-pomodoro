import { useContext, useEffect, useState } from 'react';
import { TimerContext } from '../contexts/TimerContext';

import Timer from './Timer';
import useTimer from '../hooks/useTimer';

enum TimerState {
	WORK = 'WORK',
	BREAK = 'BREAK',
	STANDBY = 'STANDBY',
}

const PomodoroTimer = () => {
	const {
		startTimeDuration,
		numberOfSessions,
		setNumberOfSessions,
		timerLengthMap,
		currentState,
		setCurrentState,
		isRunning: isRunningContext,
		setIsRunning: setIsRunningContext,
		isStudyFinished,
		setIsStudyFinished,
	} = useContext(TimerContext);

	console.log('PomodoroTimer', {
		startTimeDuration,
		numberOfSessions,
		currentState,
	});

	const [remainingSessions, setRemainingSessions] =
		useState<number>(numberOfSessions);

	const duration = timerLengthMap[currentState];

	const [currentDuration, setCurrentDuration] = useState<number>(duration);

	console.log('currentDuration', currentDuration);

	const {
		isFinished,
		isRunning,
		pauseTimer,
		resetTimer,
		secondsTime,
		startTimer,
	} = useTimer(currentDuration);

	useEffect(() => {
		setRemainingSessions(numberOfSessions);
		setCurrentDuration(duration);
	}, [numberOfSessions, duration]);

	useEffect(() => {
		switch (currentState) {
			case TimerState.WORK:
				if (isFinished) {
					setCurrentState(TimerState.BREAK);
				}
				break;
			case TimerState.BREAK:
				if (isFinished) {
					if (remainingSessions > 1) {
						setCurrentState(TimerState.BREAK);
						setRemainingSessions((prev) => prev - 1);
					} else {
						setIsStudyFinished(true);
						setIsRunningContext(false);
						setCurrentState(TimerState.STANDBY);
						setRemainingSessions(0);
					}
				}
				break;
			case TimerState.STANDBY:
				break;
			default:
				break;
		}
	}, [
		currentState,
		isFinished,
		remainingSessions,
		setCurrentState,
		setIsRunningContext,
		setIsStudyFinished,
	]);

	return (
		<>
			<div>{currentState}</div>
			<div>{remainingSessions}</div>

			<Timer
				secondsTime={secondsTime}
				isFinished={isFinished}
				startTimer={startTimer}
				pauseTimer={pauseTimer}
				resetTimer={resetTimer}
			/>
		</>
	);
};

export default PomodoroTimer;
