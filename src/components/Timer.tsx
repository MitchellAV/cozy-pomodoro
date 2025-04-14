import useTimer, { formatTime } from '../hooks/useTimer';

import buzzerSound from '../assets/audio/buzzer.wav';

interface Props {
	timerDuration: number;
}

const audio = new Audio(buzzerSound);

const playAudio = () => {
	audio.play().catch((error) => {
		console.error('Error playing audio:', error);
	});
};

const Timer = ({ timerDuration }: Props) => {
	const { secondsTime, isFinished, startTimer, pauseTimer, resetTimer } =
		useTimer(timerDuration);

	if (secondsTime <= 0 && !isFinished) {
		playAudio();
	}

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
