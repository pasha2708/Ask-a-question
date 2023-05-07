import React, {useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import { StyledQuestion } from './Manage.styles';
import { Button } from '@mui/material';

const ListOfQuestions = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [questions, setQuestions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const token = location.state.token

    useEffect(() => {
        if (!token) {
            navigate(-1)
        }
}, [token, navigate])

useEffect(() => {
    token &&
      axios
        .get('https://asq-a-question-be.vercel.app/questions', {
          headers: { Authorization: token },
        })
        .then(({ data }) => {
          setQuestions(data);
          setLoading(false);
        })
        .catch((e) => console.error(e));
}, [token])

const deleteQuestion = (id) => {
    if (window.confirm('Видалити питання?')) {
      axios
        .delete(`https://asq-a-question-be.vercel.app/questions/${id}`, {
          headers: { Authorization: token },
        })
        .then(({ data }) => setQuestions(data));
    }
  };

return (
    <>
    {questions.length === 0 && !loading && <h1>Питань немає</h1>}
      {loading && <h1>Завантажується...</h1>}
      {questions?.map((item) => (
          <StyledQuestion>
            <span>Дата: {moment(item.date).format('DD.MM.YYYY HH:mm')}</span>
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
        </>
)
}

export default ListOfQuestions