import React from 'react';
import { Container } from '../App';

const Manage = () => {
	const [logged, setLogged] = React.useState(false);
	return <Container>{!logged && <input />}</Container>;
};

export default Manage;
