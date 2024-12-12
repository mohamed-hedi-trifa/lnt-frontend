import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import ReactLoading from "react-loading"
import Modal from '../../../Modal';
import Title from '../../../Title';
import { Link } from 'gatsby';
import { FacebookOutlined, LinkedIn } from '@mui/icons-material';
import { X } from '@mui/icons-material';

export default function PartnerModal({ toview, show, hide }: { toview: any, show: boolean, hide: () => void }) {
    const [partner, setPartner] = useState<any>({
        logo: '',
        description: '',
        links: {
            website:"",
            facebook:"",
            x:"",
            linkedin:""
        }
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (toview) {
            setPartner({
                logo: toview.logo,
                description: toview.description,
                links: toview.links,
            });
            setLoading(false);
        }
    }, [toview]);

    if (loading) {
        return (
            <ReactLoading />
        );
    }

    return (
        <Modal title="Partner Details" show={show} hide={hide}>
            <div className='max-w-xl mx-auto h-100 flex justify-center items-center'>
                <div className='flex flex-col gap-[30px] w-full'>
                    <div className='flex justify-center'> <img
                        className="h-[150px] object-contain"
                        src={`/images/partener_images/${partner.logo}`}
                        alt={`Partner`}
                    /></div>
                   <div>{partner.description}</div>
                   <div className='flex gap-2 items-center'><Title>Site Web:</Title> <Link to={partner.links.website} >{partner.links.website}</Link></div>
                   <div className='flex gap-4 items-center'> <Link to={partner.links.facebook} className='text-[48px] flex items-center'><FacebookOutlined fontSize='inherit' className='text-blue-500' /></Link> <Link className='bg-black h-[40px] w-[40px] flex justify-center items-center rounded-full' to={partner.links.x}><X fontSize='medium' className='text-white' /></Link> <Link to={partner.links.linkedin} className='flex items-center text-[48px]'><LinkedIn className='text-[#007EBB]' fontSize='inherit' /></Link> </div>
                </div>
            </div>
        </Modal>
    );
}
