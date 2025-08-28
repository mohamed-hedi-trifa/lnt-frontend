import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import axios from 'axios';

const styles = {
    loaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
    },
    spinner: {
        width: '40px',
        height: '40px',
        border: '4px solid #ccc',
        borderTop: '4px solid #007acc',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
};

const ProtectedRoute = ({ children, requiredRole }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (typeof window !== "undefined") {
                    const token = localStorage.getItem('token');

                    if (!token) {
                        navigate('/login');
                        return;
                    }
                }

                const response = await axios.get('/api/user/status');
                const userRole = response.data.role;

                if (requiredRole && userRole !== requiredRole) {
                    navigate('/login');
                    return;
                }

                setIsAuthorized(true);
            } catch (error) {
                console.error('Auth check failed:', error);
                if (typeof window !== "undefined") {
                    localStorage.removeItem('token');
                }
                delete axios.defaults.headers.common['Authorization'];
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [requiredRole]);

    if (isLoading) {
        return (
            <div style={styles.loaderContainer}>
                <div style={styles.spinner}></div>
            </div>
        );
    }

    return isAuthorized ? children : null;
};

export default ProtectedRoute;
