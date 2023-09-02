import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner, Box } from '@chakra-ui/react';
import useAuth from './auth'; // your custom auth hook

interface PrivateRouteProps {
    children: ReactElement;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
    const { user, loading } = useAuth(); // Get the loading state from your auth hook
    const location = useLocation();

    console.log("PrivateRoute, current user: ", user);
    console.log("PrivateRoute, current location: ", location);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" /> {/* Show a loading spinner */}
            </Box>
        );
    }

    return (
        user
            ? (console.log('User is authenticated, rendering children components'), children)
            : (console.log('User is not authenticated, redirecting to /login'), <Navigate to="/login" state={{ from: location }} />)
    );
};

export default PrivateRoute;