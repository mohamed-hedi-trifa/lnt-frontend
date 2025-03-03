import React, { ReactNode } from 'react'
import SidebarAdmin from './SidebarAdmin'
import AdminNavbar from './AdminNavbar'

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <AdminNavbar />
            <SidebarAdmin />
            <div className='content ml-0 lg:ml-[250px] lg:pt-[4rem]'>{children}</div>
        </>
    )
}
