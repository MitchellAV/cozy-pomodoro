import useTimer, { formatTime } from '../hooks/useTimer';

import buzzerSound from '../assets/audio/buzzer.wav';

const POMODORO_TIME_LENGTH = 25 * 60; // 25 minutes
const BREAK_TIME_LENGTH = 5 * 60; // 5 minutes

const TEST_TIME_LENGTH = 10; // 10 seconds

const Timer = () => {
	const audio = new Audio(buzzerSound);

	const { secondsTime, startTimer, pauseTimer, resetTimer } =
		useTimer(TEST_TIME_LENGTH);

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
