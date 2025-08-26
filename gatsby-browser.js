

import React from "react";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";
import "./src/styles/global.css";


import Layout from "./src/components/layout/Layout";
// import { config } from "@fortawesome/fontawesome-svg-core"
// import "@fortawesome/fontawesome-svg-core/styles.css"
// import "animate.css/animate.min.css";
import axios from "axios";
import AuthProvider from "./src/contexts/AuthProvider";
import { register } from "swiper/element/bundle";


register();

export function onClientEntry() {
  /* Prevents fontawesome auto css insertion */
  // config.autoAddCss = false
  axios.defaults.baseURL = process.env.GATSBY_API_URL;
  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });
}

export function wrapPageElement({ element, props }) {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <AuthProvider>

        <Layout {...props}>{element}</Layout>

    </AuthProvider>
  );
}
