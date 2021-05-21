import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MainContainer from './containers/MainContainer';
import GlobalStyle from './globalStyles'
import Login from './Login';
// import Login from './SignUp';


function App() {
	const [user, setUser] = useState('')
	// console.log('REQ AUTH', req)
	useEffect(() => {
		fetch('/users/checkSession')
			.then((res) => res.json())
			.then((data) => {
				console.log('AUTH DATA', data.auth);
				if (data.auth === true) {
					setUser(true);
				} else {
					console.log('not logged in');
				}
			})
			.catch((error) => console.log(error));
	});



	// SAMPLE
	// const [user, setUser] = useState('');
	// useEffect(() => {
	// 	fetch('/api/checkSession')
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			if (data.access_id === '0') {
	// 				setUser('admin');
	// 			} else if (data.access_id === '1') {
	// 				setUser('user');
	// 			}
	// 		})
	// 		.catch((error) => console.log(error));
	// }, []);

	return (
		// <div>
		// 	<Login />
		// 	<MainContainer />
		// </div>

		// SAMPLE
		<main>
			<GlobalStyle />
			{/* {user === 'user' && <Redirect to="/loggedIn" />}
			{user === 'admin' && <Redirect to="/admin" />}
		  if auth===true redirect to jobs page
		  */}
			{user === true && <Redirect to="loggedIn" />}

			<Switch>
				<Route exact path="/" component={Login} />
				<Route path="/loggedIn" component={MainContainer} />
				{/* <Route path="/signUp" component={SignUp} /> */}
			</Switch>
		</main>
	);
}

export default App;
