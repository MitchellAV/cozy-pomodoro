import React, { useContext } from 'react';
import { TimerContext } from '../contexts/TimerContext';

const DEFAULT_DURATION = 30; // in minutes
const MIN_DURATION = 30; // in minutes
const STEP_DURATION = 30; // in minutes

enum TimerState {
	WORK = 'WORK',
	BREAK = 'BREAK',
	STANDBY = 'STANDBY',
}

const MainForm = () => {
	const { setStartTimeDuration, setIsRunning, setCurrentState } =
		useContext(TimerContext);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);
		const duration = formData.get('duration') as string;
		const durationInMinutes = parseInt(duration, 10);
		const durationInSeconds = durationInMinutes * 60;
		setStartTimeDuration(durationInSeconds);
		setCurrentState(TimerState.WORK);
		setIsRunning(true);
	};

	return (
		<form className="main-form" onSubmit={(e) => handleSubmit(e)}>
			<label htmlFor="duration">Study Duration: </label>
			<input
				id="duration"
				name="duration"
				type="number"
				min={MIN_DURATION}
				step={STEP_DURATION}
				defaultValue={DEFAULT_DURATION}
				required
			/>
			<input type="submit" value="Start Session" />
		</form>
	);
};

export default MainForm;
