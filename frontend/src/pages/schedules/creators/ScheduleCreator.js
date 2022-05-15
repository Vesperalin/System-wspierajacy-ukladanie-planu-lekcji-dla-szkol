import Toolbox from '../../../components/toolbox/Toolbox';
import style from './Creator.module.scss';

const ScheduleCreator = () => {
	return (
		<div className={style['wrapper']}>
			<div className={style['toolbox-wrapper']}>
				<Toolbox />
			</div>
			<div className={style['panel-wrapper']}>tu będzie siatka</div>
		</div>
	);
};

export default ScheduleCreator;
