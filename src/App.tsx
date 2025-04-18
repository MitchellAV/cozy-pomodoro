import React from 'react';
import MainForm from './components/MainForm';
import { TimerProvider } from './contexts/TimerContext';
import PomodoroTimer from './components/PomodoroTimer';

const App: React.FC = () => {
	return (
		<div className="app-container">
			<h1 className="app-title">Cozy Pomodoro App</h1>
			<TimerProvider>
				<MainForm />
				<PomodoroTimer />
			</TimerProvider>
		</div>
	);
};

export default App;
