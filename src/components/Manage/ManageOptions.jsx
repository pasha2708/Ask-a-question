import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Container } from '../../App';
import { Button } from '@mui/material';
import axios from 'axios'
import { StyledTextArea } from './Manage.styles';
import { useState } from 'react';
import {
	NotificationContainer,
	NotificationManager,
} from 'react-notifications';

const ManageOptions = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [inputValue, setInputValue] = useState('')
    const [loading, setLoading] = useState(true)


    const token = location.state.token

    useEffect(() => {
        if (!token) {
            navigate(-1)
        }
}, [token, navigate])

useEffect(() => {
    axios
    .get('https://asq-a-question-be.vercel.app/topic', {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      setInputValue(data.topic);
      setLoading(false);
    })
    .catch((e) => console.error(e));
}, [])

const handleChangeTopic = () => {
    axios
    .post('https://asq-a-question-be.vercel.app/topic', {topic: inputValue}, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
        NotificationManager.success('Тема змінилась, можеш надсилати посилання в чати)');
    })
    .catch((e) => console.error(e));
}

if (loading) {
    return <h1>Завантажується</h1>
}


return (
    <Container>
          <StyledTextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            style={{ backgroundColor: '#e16f3b' }}
            variant='contained'
            onClick={() => handleChangeTopic()}
          >
            Змінити тему
          </Button>
          <NotificationContainer />
    </Container>
)
}

export default ManageOptions