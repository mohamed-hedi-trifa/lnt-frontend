import React, { Fragment, useState } from "react";
import PartnerModal from "./PartnerModal";

const PARTNERS = [
    {
        logo: "part1.png",
        description:"The MedFund est une institution privée à but non lucratif, basée à Monaco qui octroie des financements durables pour la conservation de la biodiversité marine. Ce fonds fiduciaire pour la conservation mobilise et investit des ressources financières dont les intérêts servent à accorder des subventions aux ONG et aux autorités de gestion nationales des aires marines protégées des différents pays de la Méditerranée.",
        links:{
            website:"https://themedfund.org/",
            facebook: "https://www.facebook.com/themedfund/",
            x: "https://x.com/themedfund",
            linkedin: "https://www.linkedin.com/company/the-medfund/"
        }
    },
    {
        logo: "part2.png",
        description:"The MedFund est une institution privée à but non lucratif, basée à Monaco qui octroie des financements durables pour la conservation de la biodiversité marine. Ce fonds fiduciaire pour la conservation mobilise et investit des ressources financières dont les intérêts servent à accorder des subventions aux ONG et aux autorités de gestion nationales des aires marines protégées des différents pays de la Méditerranée.",
        links:{
            website:"https://themedfund.org/",
            facebook: "https://www.facebook.com/themedfund/",
            x: "https://x.com/themedfund",
            linkedin: "https://www.linkedin.com/company/the-medfund/"
        }
    },
    {
        logo: "part3.png",
        description:"The MedFund est une institution privée à but non lucratif, basée à Monaco qui octroie des financements durables pour la conservation de la biodiversité marine. Ce fonds fiduciaire pour la conservation mobilise et investit des ressources financières dont les intérêts servent à accorder des subventions aux ONG et aux autorités de gestion nationales des aires marines protégées des différents pays de la Méditerranée.",
        links:{
            website:"https://themedfund.org/",
            facebook: "https://www.facebook.com/themedfund/",
            x: "https://x.com/themedfund",
            linkedin: "https://www.linkedin.com/company/the-medfund/"
        }
    },
    {
        logo: "part4.png",
        description:"The MedFund est une institution privée à but non lucratif, basée à Monaco qui octroie des financements durables pour la conservation de la biodiversité marine. Ce fonds fiduciaire pour la conservation mobilise et investit des ressources financières dont les intérêts servent à accorder des subventions aux ONG et aux autorités de gestion nationales des aires marines protégées des différents pays de la Méditerranée.",
        links:{
            website:"https://themedfund.org/",
            facebook: "https://www.facebook.com/themedfund/",
            x: "https://x.com/themedfund",
            linkedin: "https://www.linkedin.com/company/the-medfund/"
        }
    },
    {
        logo: "part5.png",
        description:"The MedFund est une institution privée à but non lucratif, basée à Monaco qui octroie des financements durables pour la conservation de la biodiversité marine. Ce fonds fiduciaire pour la conservation mobilise et investit des ressources financières dont les intérêts servent à accorder des subventions aux ONG et aux autorités de gestion nationales des aires marines protégées des différents pays de la Méditerranée.",
        links:{
            website:"https://themedfund.org/",
            facebook: "https://www.facebook.com/themedfund/",
            x: "https://x.com/themedfund",
            linkedin: "https://www.linkedin.com/company/the-medfund/"
        }
    },
    {
        logo: "part6.png",
        description:"The MedFund est une institution privée à but non lucratif, basée à Monaco qui octroie des financements durables pour la conservation de la biodiversité marine. Ce fonds fiduciaire pour la conservation mobilise et investit des ressources financières dont les intérêts servent à accorder des subventions aux ONG et aux autorités de gestion nationales des aires marines protégées des différents pays de la Méditerranée.",
        links:{
            website:"https://themedfund.org/",
            facebook: "https://www.facebook.com/themedfund/",
            x: "https://x.com/themedfund",
            linkedin: "https://www.linkedin.com/company/the-medfund/"
        }
    }
]

const Partners: React.FC = () => {
        const [modalShow, setModalShow] = useState(false);
        const [toView, setToView] = useState({
            logo: "",
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
            {PARTNERS.map((partner, index) => (
                <div onClick={()=>{setToView(partner);setModalShow(true)}} className="border-[#E8E8EA] border-[1.5px] p-4 box-border rounded-[30px] shadow-[0px_4px_4px_0px_#00000040] flex justify-center">
                    <img
                        key={index}
                        className="h-[150px] object-contain"
                        src={`/images/partener_images/${partner.logo}`}
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
