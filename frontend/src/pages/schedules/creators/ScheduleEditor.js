import Toolbox from '../../../components/toolbox/Toolbox';
import style from './Creator.module.scss';

const ScheduleEditor = () => {
	return (
		<div className={style['toolbox-wrapper']}>
			<div className={style['toolbox-wrapper']}>
				<Toolbox />
			</div>
			<div className={style['panel-wrapper']}>tu będzie siatka</div>
		</div>
	);
};

export default ScheduleEditor;
