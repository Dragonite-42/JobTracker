import React, { useState } from 'react';
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Login = () => {
	const classes = useStyles();
	const login = (username, password) => {
		fetch('/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('LOGIN Data:', data)
				window.location.reload();
			});
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
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
		    </Typography>
				<form className={classes.form} noValidate>
					<TextField
						value={usernameVal}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="Username"
						label="Username"
						name="Username"
						autoComplete="Username"
						autoFocus
						onChange={handleUsernameChange}
						type="text"
						placeholder="username"
						className='username'
					/>
					<TextField
						value={passwordVal}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handlePasswordChange}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={() => {
							// console.log('clicked');
							// console.log(usernameVal, passwordVal);
							login(usernameVal, passwordVal);
						}}
					>
						Sign In
		      </Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
		          </Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default Login;

const StyledDiv = styled.div`
	height: 100vh;
	background-color: red;
	display: flex;
	justify-content: center;
	align-items: center; 
`;


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

/*
<StyledDiv>
			<input
				// value={usernameVal}
				onChange={handleUsernameChange}
				type="text"
				placeholder="username"
				className='username'
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
		</StyledDiv>
*/