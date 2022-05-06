import style from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
	return (
		<div className={style.container}>
			<div className={style['loading-spinner']}></div>
		</div>
	);
};

export default LoadingSpinner;
