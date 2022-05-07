import { useLocation } from 'react-router-dom';

const EditClass = () => {
	const location = useLocation();
	return <p>Edit class: {location.state.school_class.ID_Class}</p>;
};

export default EditClass;
