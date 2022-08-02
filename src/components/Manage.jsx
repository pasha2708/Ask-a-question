import axios from 'axios';
import React from 'react';
import { Container } from '../App';
import md5 from 'md5';
import { Button } from '@mui/material';
import styled from 'styled-components';

const StyledInput = styled.input`
	font-size: 20px;
	margin-top: 50px;
	margin-bottom: 20px;
`;

const Question = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	margin-bottom: 20px;
	span {
		margin-bottom: 10px;
	}
	button {
		width: 150px;
	}
`;

const Manage = () => {
	const [logged, setLogged] = React.useState(false);
	const [inputValue, setInputValue] = React.useState('');
	const [token, setToken] = React.useState('');
	const [questions, setQuestions] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		const token = document.cookie
			.split('; ')
			.find((row) => row.startsWith('token='))
			?.split('=')[1];
		console.log(token);
		if (token) {
			setLogged(true);
			setToken(token);
		}
		if (logged) {
			fetchData();
		}
	}, [logged]);
	const fetchData = () => {
		axios
			.get('https://asqaquestion.herokuapp.com/questions', {
				headers: { Authorization: token },
			})
			.then(({ data }) => {
				setQuestions(data);
				setLoading(false);
			})
			.catch((e) => console.log(e));
	};

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
			{logged &&
				questions?.map((item) => (
					<Question>
						<span>Дата: {item.date}</span>
						<span>{item.text}</span>
						<Button
							style={{ backgroundColor: '#e16f3b' }}
							variant='contained'
							onClick={() => deleteQuestion(item._id)}
						>
							Видалити
						</Button>
					</Question>
				))}
		</Container>
	);
};

export default Manage;
