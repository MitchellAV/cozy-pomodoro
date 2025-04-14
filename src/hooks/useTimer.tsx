import { useEffect, useState } from 'react';

export const formatTime = (seconds: number) => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;
	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
		2,
		'0'
	)}:${String(secs).padStart(2, '0')}`;
};

const useTimer = (startTimeSeconds: number) => {
	if (startTimeSeconds <= 0) {
		throw new Error('startTimeSeconds must be greater than 0');
	}

	const [secondsTime, setSecondsTime] = useState<number>(startTimeSeconds);
	const [isFinished, setIsFinished] = useState<boolean>(false);

	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (isRunning && secondsTime > 0) {
			const id = setInterval(() => {
				setSecondsTime((prev) => {
					return prev - 1;
				});
			}, 1000);
			setIntervalId(id);
		} else {
			clearInterval(intervalId);
		}
		return () => {
			clearInterval(intervalId);
		};
	}, [isRunning]);

	useEffect(() => {
		if (secondsTime <= 0) {
			setIsRunning(false);
			setIsFinished(true);
			setSecondsTime(0);
			clearInterval(intervalId);
		}
	}, [secondsTime]);

	useEffect(() => {
		setSecondsTime(startTimeSeconds);
		setIsRunning(false);
		setIsFinished(false);
		clearInterval(intervalId);
	}, [startTimeSeconds]);

	const startTimer = () => {
		if (!isRunning && secondsTime > 0 && !isFinished) {
			setIsRunning(true);
		}
	};

	const pauseTimer = () => {
		if (isRunning) {
			setIsRunning(false);
		}
	};

	const resetTimer = () => {
		setIsRunning(false);
		setIsFinished(false);
		setSecondsTime(startTimeSeconds);
		clearInterval(intervalId);
	};

	return {
		secondsTime,
		isFinished,
		isRunning,
		startTimer,
		pauseTimer,
		resetTimer,
	};
};

export default useTimer;
