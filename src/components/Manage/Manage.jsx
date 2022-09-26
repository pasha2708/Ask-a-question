import axios from 'axios';
import React from 'react';
import md5 from 'md5';
import { Button } from '@mui/material';
import moment from 'moment';

import { Container } from '../../App';
import { StyledInput, StyledQuestion } from './Manage.styles';

const Manage = () => {
	const [logged, setLogged] = React.useState(false);
	const [inputValue, setInputValue] = React.useState('');
	const [token, setToken] = React.useState('');
	const [questions, setQuestions] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	const fetchData = () => {
		axios
			.get('https://asqaquestion.herokuapp.com/questions', {
				headers: { Authorization: token },
			})
			.then(({ data }) => {
				setQuestions(data);
				setLoading(false);
			})
			.catch((e) => console.error(e));
	};

	React.useEffect(() => {
		const token = document.cookie
			.split('; ')
			.find((row) => row.startsWith('token='))
			?.split('=')[1];
		if (token) {
			setLogged(true);
			setToken(token);
		}
		if (logged) {
			fetchData();
		}
	}, [logged, fetchData]);

	const getToken = () => {
		axios
			.post('https://asqaquestion.herokuapp.com/auth', {
				password: md5(inputValue),
			})
			.then(() => {
				setLogged(true);
				setToken(md5(inputValue));
				document.cookie = `token=${md5(inputValue)}`;
			})
			.catch(() => alert('Невірний пароль'));
	};

	const deleteQuestion = (id) => {
		if (window.confirm('Видалити питання?')) {
			axios
				.delete(`https://asqaquestion.herokuapp.com/questions/${id}`, {
					headers: { Authorization: token },
				})
				.then(({ data }) => setQuestions(data));
		}
	};
	return (
		<Container>
			{!logged && (
				<>
					<StyledInput
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<Button
						style={{ backgroundColor: '#e16f3b' }}
						variant='contained'
						onClick={() => getToken()}
					>
						Вхід
					</Button>
				</>
			)}
			{questions.length === 0 && logged && !loading && (
				<h1>Питань немає</h1>
			)}
			{logged && loading && <h1>Завантажується...</h1>}
			{logged &&
				questions?.map((item) => (
					<StyledQuestion>
						<span>
							Дата: {moment(item.date).format('dd.MM.YYYY HH:mm')}
						</span>
						<span>{item.text}</span>
						<Button
							style={{ backgroundColor: '#e16f3b' }}
							variant='contained'
							onClick={() => deleteQuestion(item._id)}
						>
							Видалити
						</Button>
					</StyledQuestion>
				))}
		</Container>
	);
};

export default Manage;
