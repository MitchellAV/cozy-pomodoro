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
	setNumberOfSessions: React.Dispatch<React.SetStateAction<number>>;
	currentState: TimerState;
	setCurrentState: React.Dispatch<React.SetStateAction<TimerState>>;
	isStudyFinished: boolean;
	setIsStudyFinished: React.Dispatch<React.SetStateAction<boolean>>;
	isRunning: boolean;
	setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
	timerLengthMap: {
		[TimerState.WORK]: number;
		[TimerState.BREAK]: number;
		[TimerState.STANDBY]: number;
	};
}

const POMODORO_TIME_LENGTH = 25 * 60; // 25 minutes
const BREAK_TIME_LENGTH = 5 * 60; // 5 minutes

const timerLengthMap = {
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
	setNumberOfSessions: () => null,
	currentState: DEFAULT_STATE,
	setCurrentState: () => null,
	isStudyFinished: false,
	setIsStudyFinished: () => null,
	isRunning: false,
	setIsRunning: () => null,
	timerLengthMap: timerLengthMap,
};

const calculateSessionCount = (startTimeDuration: number) => {
	return Math.floor(
		startTimeDuration /
			(timerLengthMap[TimerState.WORK] + timerLengthMap[TimerState.BREAK])
	);
};

const TimerContext = createContext<TimerContextType>(DEFAULT_CONTEXT);

const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [startTimeDuration, setStartTimeDuration] =
		useState<number>(DEFAULT_DURATION);

	const [currentState, setCurrentState] = useState<TimerState>(DEFAULT_STATE);

	const [numberOfSessions, setNumberOfSessions] = useState<number>(
		calculateSessionCount(startTimeDuration)
	);

	const [isStudyFinished, setIsStudyFinished] = useState<boolean>(false);
	const [isRunning, setIsRunning] = useState<boolean>(false);

	useEffect(() => {
		const sessionCount = calculateSessionCount(startTimeDuration);
		setNumberOfSessions(sessionCount);
	}, [startTimeDuration]);

	console.log('TimerProvider');

	return (
		<TimerContext.Provider
			value={{
				startTimeDuration,
				setStartTimeDuration,
				numberOfSessions,
				setNumberOfSessions,
				currentState,
				setCurrentState,
				isStudyFinished,
				setIsStudyFinished,
				isRunning,
				setIsRunning,
				timerLengthMap,
			}}
		>
			{children}
		</TimerContext.Provider>
	);
};

export { TimerContext, TimerProvider };
