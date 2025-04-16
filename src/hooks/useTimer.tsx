import { useEffect, useState, useRef, useCallback } from 'react';

export const formatTime = (seconds: number) => {
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;
	return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
		2,
		'0'
	)}`;
};

const useTimer = (startTimeSeconds: number) => {
	const [secondsTime, setSecondsTime] = useState<number>(startTimeSeconds);
	const [isFinished, setIsFinished] = useState<boolean>(false);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const intervalId = useRef<NodeJS.Timeout | null>(null);

	const startTimer = useCallback(() => {
		if (!isRunning && !isFinished) {
			setIsFinished(false);
			setIsRunning(true);
		}
	}, [isRunning, isFinished]);

	const pauseTimer = useCallback(() => {
		if (isRunning) {
			setIsRunning(false);
		}
	}, [isRunning]);

	const resetTimer = useCallback(() => {
		setSecondsTime(startTimeSeconds);
		setIsFinished(false);
		setIsRunning(false);
		clearInterval(intervalId.current);
		intervalId.current = null;
	}, [startTimeSeconds]);

	const restartTimer = useCallback((newStartTimeSeconds: number) => {
		setSecondsTime(newStartTimeSeconds);
		setIsFinished(false);
		setIsRunning(true);
	}, []);

	useEffect(() => {
		if (secondsTime <= 0) {
			setIsRunning(false);
			setIsFinished(true);
		}
	}, [secondsTime]);

	useEffect(() => {
		if (isRunning) {
			if (!intervalId.current) {
				const id = setInterval(() => {
					setSecondsTime((prev) => {
						return prev - 1;
					});
				}, 10);
				intervalId.current = id;
			}
		} else {
			clearInterval(intervalId.current);
			intervalId.current = null;
		}
		return () => {
			clearInterval(intervalId.current);
			intervalId.current = null;
		};
	}, [isRunning]);

	return {
		secondsTime,
		isFinished,
		isRunning,
		startTimer,
		pauseTimer,
		resetTimer,
		restartTimer,
	};
};

export default useTimer;
