import React, { useState } from 'react';
import styled from 'styled-components';
import './index.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import QuestionForm from './components/QuestionForm';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Manage from './components/Manage';

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
      </Routes>
    </>
  );
};

export default App;
