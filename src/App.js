import React from 'react';
import styled from 'styled-components';
import './index.css';
import 'react-notifications/lib/notifications.css';
import QuestionForm from './components/QuestionForm';
import { Route, Routes } from "react-router-dom";
import Manage from './components/Manage/Manage';
import ManageOptions from './components/Manage/ManageOptions';
import ListOfQuestions from './components/Manage/ListOfQuestions';

const Header = styled.div`
  background-color: #e16f3b;
  height: 50px;
`;

const HeaderText = styled.p`
  margin: auto;
  color: white;
  font-size: 22px;
  font-family: 'Roboto', sans-serif;
  padding-top: 10px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 800px;
  text-align: center;
`;

const App = () => {

  return (
    <>
      <Header>
        <Container>
          <HeaderText>Ask a question</HeaderText>
        </Container>
      </Header>
      <Routes>
        <Route exact path="/" element={<QuestionForm />} />
        <Route exact path="manage" element={<Manage />} />
        <Route exact path="manage/options" element={<ManageOptions />} />
        <Route exact path="manage/questions" element={<ListOfQuestions />} />

      </Routes>
    </>
  );
};

export default App;
