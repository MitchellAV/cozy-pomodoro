import useTimer, { formatTime } from '../hooks/useTimer';

import buzzerSound from '../assets/audio/buzzer.wav';

interface Props {
	timerDuration: number;
}

const Timer = ({ timerDuration }: Props) => {
	const { secondsTime, startTimer, pauseTimer, resetTimer } =
		useTimer(timerDuration);

	const audio = new Audio(buzzerSound);

	const playAudio = () => {
		audio.play().catch((error) => {
			console.error('Error playing audio:', error);
		});
	};

	if (secondsTime <= 0) {
		playAudio();
	}

	return (
		<div className="timer-container">
			<div>Timer</div>
			<div>{formatTime(secondsTime)}</div>
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
