import React, { useState } from 'react';

import Timer from './components/Timer';

const POMODORO_TIME_LENGTH = 25 * 60; // 25 minutes
const BREAK_TIME_LENGTH = 5 * 60; // 5 minutes
const TEST_TIME_LENGTH = 10; // 10 seconds

const App: React.FC = () => {
	const [isFinished, setIsFinished] = useState(false);

	const [pomodoroState, setPomodoroState] = useState('pomodoro');
	const [timerDuration, setTimerDuration] = useState(POMODORO_TIME_LENGTH);

	console.log(timerDuration);

	return (
		<div>
			<h1>Timer App</h1>

			<Timer timerDuration={TEST_TIME_LENGTH} />
		</div>
	);
};

export default App;
