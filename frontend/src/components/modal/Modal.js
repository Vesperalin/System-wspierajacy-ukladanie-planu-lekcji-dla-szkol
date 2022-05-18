import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import style from './Modal.module.scss';

const Backdrop = props => {
	return <div className={style.backdrop} onClick={props.onClick}></div>;
};

const ModalOverlay = props => {
	return (
		<div className={style.modal}>
			<header className={style.header}>
				<h2>{props.title}</h2>
			</header>
			<div className={style.body}>{props.children}</div>
			<footer className={style.actions}>
				<button onClick={props.onReject} className={style['secondary-button']}>
					{props.onRejectText}
				</button>
				<button className={style['primary-button']} onClick={props.onAccept}>
					{props.onAcceptText}
				</button>
			</footer>
		</div>
	);
};

const Modal = props => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop onClick={props.onClick} />,
				document.getElementById('backdrop-root'),
			)}
			{ReactDOM.createPortal(
				<ModalOverlay
					title={props.title}
					onAcceptText={props.onAcceptText}
					onRejectText={props.onRejectText}
					onAccept={props.onAccept}
					onReject={props.onReject}
				>
					{props.children}
				</ModalOverlay>,
				document.getElementById('overlay-root'),
			)}
		</Fragment>
	);
};

export default Modal;
