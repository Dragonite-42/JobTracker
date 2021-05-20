import React, { useEffect } from 'react';
import MainContainer from './containers/MainContainer';
import Login from './Login';
// import Login from './SignUp';

function App() {
	// console.log('REQ AUTH', req.)
	useEffect(() => {
		fetch('/users/checkSession')
			.then((res) => res.json())
			.then((data) => {
				console.log('AUTH DATA', data);
				if (data === true) {
					console.log('logged in!!!');
				} else {
					console.log('not logged in');
				}
			})
			.catch((error) => console.log(error));
	});

	return (
		<div>
			{/* <Login /> */}
			<MainContainer />
		</div>

		// <main>
		// 	{/* {user === 'user' && <Redirect to="/loggedIn" />}
		// 	{user === 'admin' && <Redirect to="/admin" />}
		//   if auth===true redirect to jobs page
		//   */}
		// 	<Switch>
		// 		<Route exact path="/" component={Login} />
		// 		<Route path="/loggedIn" component={MainContainer} />
		// 		<Route path="/signUp" component={SignUp} />
		// 	</Switch>
		// </main>
	);
}

export default App;
