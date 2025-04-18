import { useCallback, useContext, useEffect, useState } from 'react';
import { TimerContext, timerLengthMap } from '../contexts/TimerContext';

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
		setCurrentState,
		setIsStudyFinished,
		currentState,
		isStudyFinished,
		setIsRunning: setIsRunningContext,
	} = useContext(TimerContext);

	const [remainingSessions, setRemainingSessions] =
		useState<number>(numberOfSessions);

	const {
		secondsTime,
		isFinished,
		pauseTimer,
		resetTimer,
		restartTimer,
		startTimer,
	} = useTimer(timerLengthMap[currentState]);

	const restartTimerCallback = useCallback(
		(newState: TimerState) => {
			if (newState === TimerState.WORK) {
				setRemainingSessions((prev) => prev - 1);
			}
			setCurrentState(newState);
			restartTimer(timerLengthMap[newState]);
		},
		[restartTimer, setCurrentState]
	);

	useEffect(() => {
		setRemainingSessions(numberOfSessions);
		setIsStudyFinished(false);
		resetTimer();
	}, [startTimeDuration, numberOfSessions, resetTimer, setIsStudyFinished]);

	useEffect(() => {
		if (isFinished && !isStudyFinished) {
			switch (currentState) {
				case TimerState.WORK:
					restartTimerCallback(TimerState.BREAK);
					break;
				case TimerState.BREAK:
					if (remainingSessions > 1) {
						restartTimerCallback(TimerState.WORK);
					} else {
						setIsStudyFinished(true);
						setCurrentState(TimerState.STANDBY);
						setRemainingSessions(0);
						break;
					}
			}
		}
	}, [
		isFinished,
		currentState,
		restartTimerCallback,
		setIsStudyFinished,
		remainingSessions,
		setCurrentState,
		setIsRunningContext,
		isStudyFinished,
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
