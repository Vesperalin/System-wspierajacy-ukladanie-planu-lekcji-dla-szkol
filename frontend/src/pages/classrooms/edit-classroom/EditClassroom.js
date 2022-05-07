import { useLocation } from 'react-router-dom';

const EditClassroom = () => {
	const location = useLocation();
	return <p>Edit classroom: {location.state.classroom.Classroom_no}</p>;
};

export default EditClassroom;
