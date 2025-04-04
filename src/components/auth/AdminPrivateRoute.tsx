import axios from 'axios';
import { navigate } from 'gatsby';
import React, { useState, useEffect, ReactNode } from 'react'
import Swal from 'sweetalert2';
import ReactLoading from 'react-loading';
import { useAuthContext } from '../../contexts/AuthProvider';

function AdminPrivateRoute({ children }: { children: ReactNode }) {
    const { user, setUser } = useAuthContext()
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('/api/user/status').then(res => {
            setAuthenticated(true);
            setUser(res.data)
            setLoading(false);
        }).catch(err => {

        });

        return () => {
            setAuthenticated(false);
        }
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            Swal.fire("Not authorized !", err.response.data.message, "warning");
            navigate('/');
        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status === 403) {
            Swal.fire("Interdite !", error.response.data.message, "warning");
            navigate('/403');
        }
        else if (error.response.status === 404) {
            Swal.fire("404 Error", "URL/Page not found", "warning");
            navigate('/404');
        }
        return Promise.reject(error);
    })

    if (loading) {
        return   "Loading...";
    }
    if (!Authenticated) {
        navigate('/login')
    }
    return children
}

export default AdminPrivateRoute
