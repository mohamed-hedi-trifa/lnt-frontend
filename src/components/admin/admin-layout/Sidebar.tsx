import React, { useEffect } from 'react'
import { ChatBubbleLeftRightIcon, ClipboardDocumentCheckIcon, ExclamationTriangleIcon, HomeIcon, InformationCircleIcon, ListBulletIcon, MapPinIcon, PencilSquareIcon, PhotoIcon, PlusIcon, QuestionMarkCircleIcon, TagIcon, TruckIcon, UserPlusIcon, UsersIcon } from '@heroicons/react/24/outline';
import { Link } from 'gatsby';
import { useAuthContext } from '../../../contexts/AuthProvider';

export default function Sidebar() {

    const { user, setUser } = useAuthContext()

    useEffect(() => {
        console.log("user:", user)
    }, [user]);

    return (

        <div className="sidebar pt-[4rem] lg:fixed w-full lg:w-[250px] flex flex-row lg:flex-col lg:flex-nowrap flex-wrap overflow-auto h-full shadow bg-gray-800 text-white">

            <Link to="/admin/" className="flex flex-row gap-4 p-4 no-underline">
                <HomeIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
                <span className='flex-end'>Home</span>
            </Link>
            {user?.role == 1 ? <>
                <Link to="/admin/users" className="flex flex-row gap-4 p-4 no-underline">
                    <UsersIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
                    <span>Users</span>
                </Link>

                <Link to="/admin/users-requests" className="flex flex-row gap-4 p-4 no-underline">
                    <UserPlusIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
                    <span>Users Request</span>
                </Link>


            </>
                : <></>}

            <Link to="/admin/services" className="flex flex-row gap-4 p-4 no-underline">
                <TruckIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
                <span>Services</span>
            </Link>

            <Link to="/admin/posts" className="flex flex-row gap-4 p-4 no-underline">
                <PhotoIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
                <span>Galery</span>
            </Link>

            <Link to="/admin/blog" className="flex flex-row gap-4 p-4 no-underline">
                <PhotoIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
                <span>Blog</span>
            </Link>

        </div>

    )
}
