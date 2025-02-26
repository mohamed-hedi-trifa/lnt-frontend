import { HeadFC } from 'gatsby'
import React from 'react'

export default function AdminPage() {
    return (
        <div>You are an admin</div>
    )
}

export const Head: HeadFC = () => <title>Admin Page</title>
