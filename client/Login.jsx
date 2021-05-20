import React, { useState } from 'react';

const Login = () => {
	const login = (username, password) => {
		fetch('/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		})
			.then((res) => res.json())
			.then((data) => console.log('LOGIN Data:', data));
	};

	const handleUsernameChange = (event) => {
		setUsernameVal(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPasswordVal(event.target.value);
	};

	const [usernameVal, setUsernameVal] = useState('');
	const [passwordVal, setPasswordVal] = useState('');

	return (
		<div>
			<input
				// value={usernameVal}
				onChange={handleUsernameChange}
				type="text"
				placeholder="username"
			></input>
			<input
				// value={passwordVal}
				onChange={handlePasswordChange}
				type="text"
				placeholder="password"
			></input>
			<button
				onClick={() => {
					// console.log('clicked');
					// console.log(usernameVal, passwordVal);
					login(usernameVal, passwordVal);
				}}
			>
				Login
			</button>
		</div>
	);
};

export default Login;

// // import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
// class Login extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			username: '',
// 			password: '',
// 		};
// 	}
// 	render() {
// 		return (
// 			<div>
// 				<MuiThemeProvider>
// 					<div>
// 						<AppBar title="Login" />
// 						<TextField
// 							hintText="Enter your Username"
// 							floatingLabelText="Username"
// 							onChange={(event, newValue) =>
// 								this.setState({ username: newValue })
// 							}
// 						/>
// 						<br />
// 						<TextField
// 							type="password"
// 							hintText="Enter your Password"
// 							floatingLabelText="Password"
// 							onChange={(event, newValue) =>
// 								this.setState({ password: newValue })
// 							}
// 						/>
// 						<br />
// 						<RaisedButton
// 							label="Submit"
// 							primary={true}
// 							style={style}
// 							onClick={(event) => this.handleClick(event)}
// 						/>
// 					</div>
// 				</MuiThemeProvider>
// 			</div>
// 		);
// 	}
// }
// const style = {
// 	margin: 15,
// };
// export default Login;
