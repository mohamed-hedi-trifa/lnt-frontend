import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import ReactLoading from "react-loading"
import Modal from '../../../Modal';
import Title from '../../../atoms/titles/Title';
import { Link } from 'gatsby';
import { FacebookOutlined, Instagram, LinkedIn } from '@mui/icons-material';
import { X } from '@mui/icons-material';
import InstagramIcon from '@/assets/icons/InstagramIcon';
import InstagramIconStyle2 from '@/assets/icons/InstagramIconStyle2';

export default function PartnerModal({ partner, show, hide }: { partner: any, show: boolean, hide: () => void }) {




    return (
        <Modal customClassName='!bg-gradient !p-1.5 rounded-xl' contentClassName='rounded-xl' show={show} hide={hide}>
            <div className='max-w-xl mx-auto h-100 flex justify-center items-center'>
                <div className='flex flex-col gap-[30px] w-full'>
                    <div className='flex justify-center'> <img
                        className="h-[150px] object-contain"
                        src={`${process.env.GATSBY_API_URL}${partner.image}`}
                        alt={`Partner`}
                    /></div>
                    <div>{partner.description_en || partner.description_fr}</div>
                    <div className='flex gap-2 items-center'>
                        <Title>Site Web:</Title>
                        <Link to={partner.websiteLink} >
                            <h1 className='text'>
                                {partner.websiteLink}
                            </h1>
                        </Link>
                    </div>
                    <div className='flex gap-4 items-center'>
                        {partner.facebookLink && (
                            <Link to={partner.facebookLink} className='text-[48px] flex items-center '>
                                <FacebookOutlined fontSize='inherit' className='text-blue-500 w-full' />
                            </Link>
                        )}

                        {partner.instagramLink && (
                            <Link to={partner.instagramLink} className='text-[48px] flex items-center '>
                                <InstagramIconStyle2 />
                            </Link>
                        )}

                        {partner.xLink && (
                            <Link className='bg-black h-[40px] w-[40px] flex justify-center items-center ' to={partner.xLink}>
                                <X fontSize='medium' className='text-white' />
                            </Link>
                        )}

                        {partner.linkedinLink && (
                            <Link to={partner.linkedinLink} className='flex items-center text-[48px] '>
                                <LinkedIn className='text-[#007EBB]' fontSize='inherit' />
                            </Link>
                        )}
                    </div>

                </div>
            </div>
        </Modal>
    );
}
