import React, { useCallback } from 'react'
import googleLogo from '../../assets/google_logo.png';

import style from './Login.module.scss';

const Login = () => {
	const openGoogleLoginPage = useCallback(() => {
		const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
		const redirectUri = 'auth/login/google/';

		const scope = [
			'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/userinfo.profile'
		].join(' ');

		const params = {
			response_type: 'code',
			client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
			redirect_uri: `http://localhost:8000/${redirectUri}`,
			prompt: 'select_account',
			access_type: 'offline',
			scope
		};

		const urlParams = new URLSearchParams(params).toString();

		window.location = `${googleAuthUrl}?${urlParams}`;
	}, []);

	return (
		<div className={style.wrapper}>
			<h1>Login</h1>
			<div className={style.panel}>
				<div className={style.action}>
					<h3>Log in to app:</h3>
					<button onClick={openGoogleLoginPage}>
						<img className={style.logo} src={googleLogo} alt='google' />
						<p>Sign In with Google</p>
					</button>
				</div>
				<div className={style.action}>
					<h3>Don't have an account? Sign up!</h3>
					<button>
						<img className={style.logo} src={googleLogo} alt='google' />
						<p>Sign Up with Google</p>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
