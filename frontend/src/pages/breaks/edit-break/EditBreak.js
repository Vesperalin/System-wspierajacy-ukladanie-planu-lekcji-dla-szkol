import { useLocation } from 'react-router-dom';

const EditBreak = () => {
	const location = useLocation();
	return <p>Edit break: {location.state.breakk.ID_Break}</p>;
};

export default EditBreak;
