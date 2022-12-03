import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import {
	NotificationContainer,
	NotificationManager,
} from 'react-notifications';

import { Container } from '../App';

const QuestionForm = () => {
	const [data, setData] = useState('');
	const [loading, setLoading] = useState(false);

	const handleClick = () => {
		setLoading(true);
		axios
			.post('https://asqaque-be.onrender.com/questions', {
				date: new Date(),
				text: data,
			})
			.then(() => {
				NotificationManager.success('Запитання надіслано, дякуємо');
				setData('');
				setLoading(false);
			})
			.catch(() => {
				NotificationManager.error('Помилка. Спробуйте пізніше');
				setLoading(false);
			});
	};

	return (
		<Container>
			<textarea
				placeholder='Введіть ваше запитання(анонімно)'
				onChange={(e) => setData(e.target.value)}
				value={data}
			/>
			<Button
				style={{ backgroundColor: '#e16f3b' }}
				variant='contained'
				onClick={handleClick}
				disabled={!data || loading}
			>
				Надіслати
			</Button>
			<NotificationContainer />
		</Container>
	);
};

export default QuestionForm;
