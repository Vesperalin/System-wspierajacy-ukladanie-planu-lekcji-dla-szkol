import { useLocation } from 'react-router-dom';

const EditSubject = () => {
	const location = useLocation();
	return <p>Edit subject: {location.state.subject.ID_Subject}</p>;
};

export default EditSubject;
