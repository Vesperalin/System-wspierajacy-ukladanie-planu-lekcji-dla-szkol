import googleLogo from '../../assets/google_logo.png';

import style from './Login.module.scss';

const Login = () => {
	return (
		<div className={style.wrapper}>
			<h1>Login</h1>
			<div className={style.panel}>
				<div className={style.action}>
					<h3>Log in to app:</h3>
					<button>
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
