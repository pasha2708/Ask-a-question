import axios from 'axios';
import React from 'react';
import { Container } from '../App';
import md5 from 'md5';

const Manage = () => {
	const [logged, setLogged] = React.useState(false);
	const [inputValue, setInputValue] = React.useState('');
	const [token, setToken] = React.useState('');
	const [questions, setQuestions] = React.useState([]);

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
			.catch(() => alert('error'));
	};

	const deleteQuestion = (id) => {
		if (window.confirm('fnwejfnwef')) {
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
					<input
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button onClick={() => getToken()}>Вхід</button>
				</>
			)}
			{questions.length === 0 && <h1>Питань немає</h1>}
			{logged &&
				questions?.map((item) => (
					<>
						<span>{item._id}</span>
						<span>{item.date}</span>
						<span>{item.text}</span>
						<button onClick={() => deleteQuestion(item._id)}>
							Delete
						</button>
					</>
				))}
		</Container>
	);
};

export default Manage;
