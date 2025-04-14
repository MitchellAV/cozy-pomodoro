import { useEffect } from 'react';
import { formatTime } from '../hooks/useTimer';

import buzzerSound from '../assets/audio/buzzer.wav';

interface Props {
	secondsTime: number;
	isFinished: boolean;
	startTimer: () => void;
	pauseTimer: () => void;
	resetTimer: () => void;
}

const audio = new Audio(buzzerSound);

const playAudio = () => {
	audio.play().catch((error) => {
		console.error('Error playing audio:', error);
	});
};

const Timer = ({
	isFinished,
	pauseTimer,
	resetTimer,
	secondsTime,
	startTimer,
}: Props) => {
	useEffect(() => {
		if (isFinished && secondsTime <= 0) {
			console.log('Timer finished!');
			playAudio();
		}
	}, [isFinished, secondsTime]);

	return (
		<div className="timer-container">
			<h2 className="timer-display">{formatTime(secondsTime)}</h2>
			<div className="timer-controls">
				<button className="timer-button" onClick={() => startTimer()}>
					Start
				</button>
				<button className="timer-button" onClick={() => pauseTimer()}>
					Pause
				</button>
				<button className="timer-button" onClick={() => resetTimer()}>
					Reset
				</button>
			</div>
		</div>
	);
};

export default Timer;
