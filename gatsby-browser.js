/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

import './src/styles/global.css'
import React from "react"
import AdminLayout from "./src/components/admin/admin-layout/AdminLayout"
import Layout from "./src/components/layout/Layout"
// import { config } from "@fortawesome/fontawesome-svg-core"
// import "@fortawesome/fontawesome-svg-core/styles.css"
// import "animate.css/animate.min.css";
import axios from "axios"
import AdminPrivateRoute from "./src/components/auth/AdminPrivateRoute"
import AuthProvider from "./src/contexts/AuthProvider"

export function onClientEntry() {
    /* Prevents fontawesome auto css insertion */
    // config.autoAddCss = false
    axios.defaults.baseURL = process.env.GATSBY_API_URL
    axios.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config

    })
}

export function wrapPageElement({ element, props }) {
    // props provide same data to Layout as Page element will get
    // including location, data, etc - you don't need to pass it
    return (
        <AuthProvider>
            {props.location.pathname.indexOf("/admin") === 0 ? (
                <AdminPrivateRoute>
                    <AdminLayout>
                        {element}
                    </AdminLayout>
                </AdminPrivateRoute>
            ) : (
                <Layout {...props}>{element}</Layout>
            )}
        </AuthProvider>
    )
}
