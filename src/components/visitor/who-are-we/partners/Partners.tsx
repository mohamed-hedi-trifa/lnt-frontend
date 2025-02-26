import React, { Fragment, useState } from "react";
import PartnerModal from "./PartnerModal";

const Partners: React.FC<{ partners: any[] }> = ({ partners = [] }) => {
    const [modalShow, setModalShow] = useState(false);
    const [toView, setToView] = useState({
        image: "",
        description: "",
        links: {
            website: "",
            facebook: "",
            x: "",
            linkedin: ""
        }
    });

    const handleOpenModal = (partner: any) => {
        setToView(partner);
        setModalShow(true);
    };

    return (
        <Fragment>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 sm:gap-10">
                {partners.map((partner, index) => (
                    <div
                        key={index}
                        onClick={() => handleOpenModal(partner)}
                        className="border-[#E8E8EA] border-[1.5px] p-4 box-border rounded-[30px] shadow-helmi flex justify-center"
                    >
                        <img
                            className="h-[150px] object-contain"
                            src={`${process.env.GATSBY_API_URL}${partner?.image}`}
                            alt={`Partner ${index + 1}`}
                        />
                    </div>
                ))}
            </div>

            {/* Render the modal only once outside the loop */}
            {modalShow && (
                <PartnerModal partner={toView} show={modalShow} hide={() => setModalShow(false)} />
            )}
        </Fragment>
    );
};

export default Partners;
