import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';

const PrivateRoute = () => {
	const { isLoggedIn, isLoading } = useContext(AuthContext);

	if (isLoading) {
		return <Spinner />;
	}

	if (!isLoggedIn) {
		return <Navigate to="/" />;
	}

	return <Outlet />;
};

export default PrivateRoute;
