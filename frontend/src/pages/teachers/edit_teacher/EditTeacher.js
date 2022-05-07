import { useLocation } from 'react-router-dom';

const EditTeacher = () => {
	const location = useLocation();
	return <p>Edit teacher: {location.state.teacher.ID_Teacher}</p>;
};

export default EditTeacher;
