import React, { useEffect, useRef, useState } from "react";

export default function ContactUs() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function handleSubmit(e: any) {
    e.preventDefault();
  }

  return (
    <section className="relative px-3 py-20 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-10 items-center justify-between max-w-7xl mx-auto">
        <article className="max-w-[600px]">
          <h2 className="text-slate-800 text-2xl md:text-4xl font-bold" style={{ textShadow: "2px 2px 2px rgb(0,0,0,.33)" }}>
            Contactez<span className="text-primary">-Nous</span>
          </h2>
          <p className="mt-4 font-semibold text-sm" style={{ textShadow: "2px 2px 2px rgb(0,0,0,.33)" }}>
            Vous avez des questions ou souhaitez en savoir plus sur nos projets et activités ? N'hésitez pas à nous contacter ! Notre équipe est à votre écoute
            pour toute demande d'information ou de collaboration.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4 ">
            <input
              type="text"
              value={input.name}
              onChange={(e) => setInput((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Nom *"
              className="w-full px-4 py-2 rounded border-[2px] border-slate-400 text-sm"
            />
            <input
              type="email"
              value={input.email}
              onChange={(e) => setInput((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Email"
              className="w-full px-4 py-2 rounded border-[2px] border-slate-400 text-sm"
            />
            <input
              type="text"
              value={input.phone}
              onChange={(e) => setInput((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="Numéro de téléphone *"
              className="w-full px-4 py-2 rounded border-[2px] border-slate-400 text-sm"
            />
            <textarea
              value={input.message}
              onChange={(e) => setInput((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Numéro de téléphone *"
              className="w-full px-4 py-2 rounded border-[2px] border-slate-400 text-sm resize-none"
            ></textarea>
            <button
              type="submit"
              className="rounded-lg bg-sky-700 hover:bg-sky-900 text-white font-semibold py-2 shadow-[-1px_2px_5px_rgb(0,0,0,.3)] duration-200"
            >
              Envoyer
            </button>
            <div className="flex gap-x-8 gap-y-2 flex-wrap">
              <a href="tel:+21654525509" className="flex gap-2 items-center">
                <CallRinging04Icon />
                <div className="text-sm">
                  <p className="font-bold">TÉLÉPHONE</p>
                  <p className="font-medium text-slate-500">+216 54 525 509</p>
                </div>
              </a>
              <a href="mailto:akddcl.kerkennah@gmail.com" className="flex gap-2 items-center">
                <MailOpenIcon />
                <div className="text-sm">
                  <p className="font-bold">EMAIl</p>
                  <p className="font-medium text-slate-500">akddcl.kerkennah@gmail.com</p>
                </div>
              </a>
            </div>
          </form>
        </article>
        <article className="relative flex gap-4 flex-col md:flex-row shrink-0 w-full md:w-5/12 max-w-[400px]">
          <div className="absolute top-1/2 md:top-[-50px] bottom-[-50px] md:left-1/2 -left-1/2 -right-1/2 bg-sky-700"></div>
          <div className="relative z-10 rounded-lg aspect-[7/10] mr-auto overflow-hidden">
            <img src="/kerkennah_map.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="z-10 flex md:flex-col gap-3 justify-center items-center flex-wrap">
            <a href="#" className="shrink-0 flex items-center justify-center size-12 bg-[#0866ff] rounded-full">
              <FacebookIcon />
            </a>
            <a href="#" className="shrink-0 flex items-center justify-center size-12 bg-[#DD2A7B] rounded-full">
              <InstagramIcon />
            </a>
            <a href="#" className="shrink-0 flex items-center justify-center size-12 bg-sky-600 rounded-full">
              <LinkedinIcon />
            </a>
            <a href="#" className="shrink-0 flex items-center justify-center size-12 bg-black rounded-full">
              <XIcon />
            </a>
            <a href="#" className="shrink-0 flex items-center justify-center size-12 bg-red-500 rounded-full">
              <YoutubeIcon />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

const CallRinging04Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#000000"} fill={"none"} {...props}>
    <path d="M14 3V6M19 5L17 7M21 10H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M9.15825 5.71223L8.7556 4.80625C8.49232 4.21388 8.36068 3.91768 8.1638 3.69101C7.91707 3.40694 7.59547 3.19794 7.23567 3.08785C6.94858 3 6.62446 3 5.97621 3C5.02791 3 4.55375 3 4.15573 3.18229C3.68687 3.39702 3.26343 3.86328 3.09473 4.3506C2.95151 4.76429 2.99253 5.18943 3.07458 6.0397C3.94791 15.0902 8.90981 20.0521 17.9603 20.9254C18.8106 21.0075 19.2357 21.0485 19.6494 20.9053C20.1367 20.7366 20.603 20.3131 20.8177 19.8443C21 19.4462 21 18.9721 21 18.0238C21 17.3755 21 17.0514 20.9122 16.7643C20.8021 16.4045 20.5931 16.0829 20.309 15.8362C20.0823 15.6393 19.7861 15.5077 19.1937 15.2444L18.2878 14.8417C17.6462 14.5566 17.3255 14.4141 16.9995 14.3831C16.6876 14.3534 16.3731 14.3972 16.0811 14.5109C15.776 14.6297 15.5063 14.8544 14.967 15.3038C14.4301 15.7512 14.1617 15.9749 13.8337 16.0947C13.543 16.2009 13.1586 16.2403 12.8523 16.1951C12.5069 16.1442 12.2423 16.0029 11.7133 15.7201C10.0672 14.8405 9.15953 13.9328 8.27986 12.2867C7.99714 11.7577 7.85578 11.4931 7.80487 11.1477C7.75974 10.8414 7.79908 10.457 7.9053 10.1663C8.02512 9.83828 8.24881 9.56986 8.69619 9.033C9.14562 8.49368 9.37034 8.22402 9.48915 7.91891C9.60285 7.62694 9.64661 7.3124 9.61694 7.00048C9.58594 6.67452 9.44338 6.35376 9.15825 5.71223Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const MailOpenIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#000000"} fill={"none"} {...props}>
    <path
      d="M5.00035 7L3.78154 7.81253C2.90783 8.39501 2.47097 8.68625 2.23422 9.13041C1.99747 9.57457 1.99923 10.0966 2.00273 11.1406C2.00696 12.3975 2.01864 13.6782 2.05099 14.9741C2.12773 18.0487 2.16611 19.586 3.29651 20.7164C4.42691 21.8469 5.98497 21.8858 9.10108 21.9637C11.0397 22.0121 12.9611 22.0121 14.8996 21.9637C18.0158 21.8858 19.5738 21.8469 20.7042 20.7164C21.8346 19.586 21.873 18.0487 21.9497 14.9741C21.9821 13.6782 21.9937 12.3975 21.998 11.1406C22.0015 10.0966 22.0032 9.57456 21.7665 9.13041C21.5297 8.68625 21.0929 8.39501 20.2191 7.81253L19.0003 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M2 10L8.91302 14.1478C10.417 15.0502 11.169 15.5014 12 15.5014C12.831 15.5014 13.583 15.0502 15.087 14.1478L22 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M4.99998 12V6C4.99998 4.11438 4.99998 3.17157 5.58577 2.58579C6.17156 2 7.11437 2 8.99998 2H15C16.8856 2 17.8284 2 18.4142 2.58579C19 3.17157 19 4.11438 19 6V12"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M10 10H14M10 6H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="white" width={30} height={30}>
    <path d="m279.1 288 14.2-92.7h-88.9v-60.1c0-25.4 12.4-50.1 52.2-50.1H297V6.3S260.4 0 225.4 0c-73.2 0-121.1 44.4-121.1 124.7v70.6H22.9V288h81.4v224h100.2V288z"></path>
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12m0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8" clipRule="evenodd"></path>
    <path d="M18 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2"></path>
    <path
      fillRule="evenodd"
      d="M1.654 4.276C1 5.56 1 7.24 1 10.6v2.8c0 3.36 0 5.04.654 6.324a6 6 0 0 0 2.622 2.622C5.56 23 7.24 23 10.6 23h2.8c3.36 0 5.04 0 6.324-.654a6 6 0 0 0 2.622-2.622C23 18.44 23 16.76 23 13.4v-2.8c0-3.36 0-5.04-.654-6.324a6 6 0 0 0-2.622-2.622C18.44 1 16.76 1 13.4 1h-2.8c-3.36 0-5.04 0-6.324.654a6 6 0 0 0-2.622 2.622M13.4 3h-2.8c-1.713 0-2.878.002-3.778.075-.877.072-1.325.202-1.638.361a4 4 0 0 0-1.748 1.748c-.16.313-.29.761-.36 1.638C3.001 7.722 3 8.887 3 10.6v2.8c0 1.713.002 2.878.075 3.778.072.877.202 1.325.361 1.638a4 4 0 0 0 1.748 1.748c.313.16.761.29 1.638.36.9.074 2.065.076 3.778.076h2.8c1.713 0 2.878-.002 3.778-.075.877-.072 1.325-.202 1.638-.361a4 4 0 0 0 1.748-1.748c.16-.313.29-.761.36-1.638.074-.9.076-2.065.076-3.778v-2.8c0-1.713-.002-2.878-.075-3.778-.072-.877-.202-1.325-.361-1.638a4 4 0 0 0-1.748-1.748c-.313-.16-.761-.29-1.638-.36C16.278 3.001 15.113 3 13.4 3"
      clipRule="evenodd"
    ></path>
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" width={30} height={30}>
    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3M447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"></path>
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" width={30} height={30}>
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z"></path>
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="white" width={30} height={30}>
    <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6C14.9 167 14.9 256.4 14.9 256.4s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3M232.2 337.6V175.2l142.7 81.2z"></path>
  </svg>
);
