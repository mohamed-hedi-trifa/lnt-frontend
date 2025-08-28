import React from "react";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";
import "./src/styles/global.css";

import Layout from "./src/components/layout/Layout";
import axios from "axios";
import AuthProvider from "./src/contexts/AuthProvider";
import { register } from "swiper/element/bundle";

register();

export function onClientEntry() {
  // Set base URL
  axios.defaults.baseURL = process.env.GATSBY_API_URL;

  // Add token to requests if available
  axios.interceptors.request.use(function (config) {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  // Handle auth errors globally
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Unauthorized - remove token and redirect
        localStorage.removeItem("token");
        delete axios.defaults.headers.common['Authorization'];

        // Only redirect if we're on a protected page
        if (window.location.pathname.startsWith('/admin') ||
          window.location.pathname.startsWith('/owner')) {
          window.location.href = '/';
        }
      }
      return Promise.reject(error);
    }
  );
}

export function wrapPageElement({ element, props }) {
  return (
    <AuthProvider>
      <Layout {...props}>{element}</Layout>
    </AuthProvider>
  );
}