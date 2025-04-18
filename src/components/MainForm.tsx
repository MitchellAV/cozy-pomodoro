import React, { useContext } from 'react';
import { TimerContext } from '../contexts/TimerContext';

const DEFAULT_DURATION = 1; // in hours
const MIN_DURATION = 0.5; // in hours
const STEP_DURATION = 0.5; // in hours

enum TimerState {
	WORK = 'WORK',
	BREAK = 'BREAK',
	STANDBY = 'STANDBY',
}

const MainForm = () => {
	const {
		setStartTimeDuration,
		setIsStudyFinished,
		setIsRunning,
		setCurrentState,
	} = useContext(TimerContext);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);
		const duration = formData.get('duration') as string;
		const durationInHours = parseFloat(duration);
		const durationInSeconds = durationInHours * 60 * 60;
		setStartTimeDuration(durationInSeconds);
		setCurrentState(TimerState.WORK);
		setIsStudyFinished(false);
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
