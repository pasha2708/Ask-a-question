import axios from 'axios';
import React from 'react';
import md5 from 'md5';
import { Button } from '@mui/material';

import { Container } from '../../App';
import { StyledInput } from './Manage.styles';
import { useNavigate } from 'react-router-dom';

const Manage = () => {
  const [logged, setLogged] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [token, setToken] = React.useState('');
  const navigate = useNavigate()

  React.useEffect(() => {
      const tokenCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
      if (tokenCookie) {
        setLogged(true);
        setToken(tokenCookie);
      }
  }, []);

  const getToken = () => {
    axios
      .post('https://asq-a-question-be.vercel.app/auth', {
        password: md5(inputValue),
      })
      .then(() => {
        setLogged(true);
        setToken(md5(inputValue));
        document.cookie = `token=${md5(inputValue)}`;
      })
      .catch(() => alert('Невірний пароль'));
  };

  return (
    <Container>
      {!logged ? (
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
      ) : <>
            <Button
            style={{ backgroundColor: '#e16f3b', margin: 10 }}
            variant='contained'
            onClick={() => navigate('questions', {state: {token}})}
          >
            Запитання та відгуки
          </Button>
          <Button
            style={{ backgroundColor: '#e16f3b',  margin: 10 }}
            variant='contained'
            onClick={() => navigate('options', {state: {token}})}
          >
            Налаштування
          </Button>
      </>}
      
    </Container>
  );
};

export default Manage;
