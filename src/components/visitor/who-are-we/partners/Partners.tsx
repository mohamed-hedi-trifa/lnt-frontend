import React, { Fragment, useEffect, useState } from "react";
import PartnerModal from "./PartnerModal";
import axios from "axios";
import Swal from "sweetalert2";

const Partners: React.FC = () => {
    const [partners, setParteners] = useState<any[]>([]);

    useEffect(() => {
            axios
                .get('/api/get-all-parteners')
                .then((res) => {
                    setParteners(res.data);
                })
                .catch((err) => {
                    Swal.fire('Error', err.response?.data?.message || 'Failed to fetch parteners', 'error');
                });
    }, []);

        const [modalShow, setModalShow] = useState(false);
        const [toView, setToView] = useState({
            image: "",
            description: "",
            links: {
                website: "",
                facebook:"",
                x:"",
                linkedin:""
            }
        });

    return (
        <Fragment>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 sm:gap-10">
            {partners.map((partner, index) => (
                <div onClick={()=>{setToView(partner);setModalShow(true)}} className="border-[#E8E8EA] border-[1.5px] p-4 box-border rounded-[30px] shadow-[0px_4px_4px_0px_#00000040] flex justify-center">
                    <img
                        key={index}
                        className="h-[150px] object-contain"
                        src={`${process.env.GATSBY_API_URL}storage/${partner.image}`}
                        alt={`Partner ${index + 1}`}
                    />
                </div>
            ))}
        </div>
<PartnerModal show={modalShow} hide={() => { setModalShow(false); }} toview={toView} />
        </Fragment>
    );
};

export default Partners;
