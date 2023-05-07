import React, {useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { Container } from '../../App';
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
    <Container>
    {questions.length === 0 && !loading && <h1>Питань немає</h1>}
      {loading && <h1>Завантажується...</h1>}
      {questions?.map(({date, topic, text, _id}) => (
          <StyledQuestion>
            <span><b>Дата:</b> {moment(date).format('DD.MM.YYYY HH:mm')}</span>
            {topic && <span><b>Тема:</b> {topic}</span>}
            <span><b>Текст:</b> {text}</span>
            <Button
              style={{ backgroundColor: '#e16f3b' }}
              variant='contained'
              onClick={() => deleteQuestion(_id)}
            >
              Видалити
            </Button>
          </StyledQuestion>
        ))}
        </Container>
)
}

export default ListOfQuestions