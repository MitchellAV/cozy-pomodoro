import React, { useState } from 'react';

import Timer from './components/Timer';

const POMODORO_TIME_LENGTH = 25 * 60; // 25 minutes
const BREAK_TIME_LENGTH = 5 * 60; // 5 minutes
const TEST_TIME_LENGTH = 10; // 10 seconds

const App: React.FC = () => {
	const [timerDuration, setTimerDuration] = useState(TEST_TIME_LENGTH);

	return (
		<div className="app-container">
			<h1 className="app-title">Cozy Pomodoro App</h1>

			<Timer timerDuration={timerDuration} />
		</div>
	);
};

export default App;
