import React, { createContext, useEffect, useState } from 'react';

enum TimerState {
	WORK = 'WORK',
	BREAK = 'BREAK',
	STANDBY = 'STANDBY',
}

interface TimerContextType {
	startTimeDuration: number;
	setStartTimeDuration: React.Dispatch<React.SetStateAction<number>>;
	numberOfSessions: number;
	currentState: TimerState;
	setCurrentState: React.Dispatch<React.SetStateAction<TimerState>>;
	isStudyFinished: boolean;
	setIsStudyFinished: React.Dispatch<React.SetStateAction<boolean>>;
	isRunning: boolean;
	setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

const POMODORO_TIME_LENGTH = 25 * 60; // 25 minutes
const BREAK_TIME_LENGTH = 5 * 60; // 5 minutes

export const timerLengthMap = {
	[TimerState.WORK]: POMODORO_TIME_LENGTH,
	[TimerState.BREAK]: BREAK_TIME_LENGTH,
	[TimerState.STANDBY]: 0,
};

const DEFAULT_DURATION = 30 * 60; // in seconds
const DEFAULT_STATE = TimerState.WORK;

const DEFAULT_CONTEXT: TimerContextType = {
	startTimeDuration: DEFAULT_DURATION,
	setStartTimeDuration: () => null,
	numberOfSessions: 0,
	currentState: DEFAULT_STATE,
	setCurrentState: () => null,
	isStudyFinished: true,
	setIsStudyFinished: () => null,
	isRunning: false,
	setIsRunning: () => null,
};

const calculateSessionCount = (duration: number) => {
	return Math.floor(
		duration /
			(timerLengthMap[TimerState.WORK] + timerLengthMap[TimerState.BREAK])
	);
};

const TimerContext = createContext<TimerContextType>(DEFAULT_CONTEXT);

const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [startTimeDuration, setStartTimeDuration] =
		useState<number>(DEFAULT_DURATION);

	const [numberOfSessions, setNumberOfSessions] = useState<number>(
		calculateSessionCount(DEFAULT_DURATION)
	);
	const [currentState, setCurrentState] = useState<TimerState>(DEFAULT_STATE);

	const [isStudyFinished, setIsStudyFinished] = useState<boolean>(false);
	const [isRunning, setIsRunning] = useState<boolean>(false);

	useEffect(() => {
		setNumberOfSessions(calculateSessionCount(startTimeDuration));
	}, [startTimeDuration]);

	useEffect(() => {
		if (isStudyFinished) {
			setIsRunning(false);
			setCurrentState(TimerState.STANDBY);
		}
	}, [isStudyFinished]);
	return (
		<TimerContext.Provider
			value={{
				startTimeDuration,
				setStartTimeDuration,
				numberOfSessions,
				currentState,
				setCurrentState,
				isStudyFinished,
				setIsStudyFinished,
				isRunning,
				setIsRunning,
			}}
		>
			{children}
		</TimerContext.Provider>
	);
};

export { TimerContext, TimerProvider };
