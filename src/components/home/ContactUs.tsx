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
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl mx-auto">
        <article className="max-w-[600px] flex flex-col gap-6">
          <h2 className="text-slate-800 text-2xl md:text-4xl font-bold" style={{ textShadow: "2px 2px 2px rgb(0,0,0,.33)" }}>
            Contactez<span className="text-primary">-Nous</span>
          </h2>
          <p className="font-semibold text-sm" style={{ textShadow: "2px 2px 2px rgb(0,0,0,.33)" }}>
            Vous avez des questions ou souhaitez en savoir plus sur nos projets et activités ? N'hésitez pas à nous contacter ! Notre équipe est à votre écoute
            pour toute demande d'information ou de collaboration.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <section className="flex flex-col gap-3">
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
                placeholder="Message *"
                className="w-full px-4 py-2 rounded border-[2px] border-slate-400 text-sm resize-none min-h-[140px]"
              ></textarea>
              <button
                type="submit"
                className="rounded-lg bg-sky-700 hover:bg-sky-900 text-white font-semibold py-2 shadow-[-1px_2px_5px_rgb(0,0,0,.3)] duration-200"
              >
                Envoyer
              </button>
            </section>
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
        <article className="relative flex gap-8 flex-col md:flex-row shrink-0 w-full max-w-[400px] lg:max-w-[450px]">
          <div className="relative z-10 w-full rounded-lg aspect-[7/10] mr-auto overflow-hidden">
            {/* <img src="/kerkennah_map.png" alt="" className="w-full h-full object-cover" /> */}
            <iframe
              // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15287.114129610636!2d11.250828264314954!3d34.82118199375824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1301af003fa3e687%3A0x2cdfb1354d9f1c47!2sPhare%20Ras%20Jelija!5e0!3m2!1sen!2stn!4v1735253439321!5m2!1sen!2stn"
              // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15287.114129610636!2d11.2500271!3d34.8217164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1301af003fa3e687%3A0x2cdfb1354d9f1c47!2sPhare%20Ras%20Jelija!5e0!3m2!1sen!2stn!4v1735253439321!5m2!1sen!2stn"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14563.116032879212!2d11.254996129929653!3d34.81668553451732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2stn!4v1735279113765!5m2!1sen!2stn"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="flex md:flex-col gap-12 justify-center items-center flex-wrap">
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
      <div className="z-[-1] absolute md:top-[20px] top-2/3 bottom-[20px] right-0 left-0 md:left-auto md:w-[400px] bg-sky-700"></div>
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

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0px_4px_2px_rgb(0,0,0,.3)]">
      <path
        d="M50 24.6721C50 37.1326 40.6404 47.434 28.4816 49.1057C27.3447 49.2612 26.1816 49.3425 25.0009 49.3425C23.638 49.3425 22.2997 49.2353 20.9964 49.0279C9.09155 47.1367 0 36.9511 0 24.6721C0 11.0464 11.1936 0 24.9991 0C38.8046 0 50 11.0464 50 24.6721Z"
        fill="#1877F2"
      />
      <path
        d="M28.4816 19.8087V25.1832H35.2188L34.152 32.4231H28.4816V49.1034C27.3447 49.2589 26.1816 49.3402 25.0009 49.3402C23.638 49.3402 22.2997 49.233 20.9964 49.0256V32.4231H14.783L14.783 25.1832H20.9964V18.6072C20.9964 14.5275 24.3475 11.2188 28.4834 11.2188V11.2222C28.4956 11.2222 28.5061 11.2188 28.5184 11.2188L35.2206 11.2188V17.4801H30.8412C29.5397 17.4801 28.4834 18.5225 28.4834 19.807L28.4816 19.8087Z"
        fill="white"
      />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0px_4px_2px_rgb(0,0,0,.3)]">
      <path
        d="M25.0569 0.342773H24.9431C11.1674 0.342773 0 11.2868 0 24.787L0 24.8986C0 38.3987 11.1674 49.3428 24.9431 49.3428H25.0569C38.8326 49.3428 50 38.3987 50 24.8986V24.787C50 11.2868 38.8326 0.342773 25.0569 0.342773Z"
        fill="url(#paint0_linear_356_4182)"
      />
      <path
        d="M32.4924 10.3428L17.5076 10.3428C13.3678 10.3428 10 13.743 10 17.9225L10 31.763C10 35.9426 13.3678 39.3428 17.5076 39.3428H32.4924C36.6322 39.3428 40 35.9426 40 31.763V17.9225C40 13.743 36.6322 10.3428 32.4924 10.3428ZM12.6485 17.9225C12.6485 15.2178 14.8286 13.0167 17.5076 13.0167H32.4924C35.1714 13.0167 37.3515 15.2178 37.3515 17.9225V31.763C37.3515 34.4678 35.1714 36.6689 32.4924 36.6689H17.5076C14.8286 36.6689 12.6485 34.4678 12.6485 31.763V17.9225Z"
        fill="white"
      />
      <path
        d="M24.5 32.3428C28.6345 32.3428 32 28.9791 32 24.8428C32 20.7065 28.6363 17.3428 24.5 17.3428C20.3637 17.3428 17 20.7065 17 24.8428C17 28.9791 20.3637 32.3428 24.5 32.3428ZM24.5 20.189C27.0674 20.189 29.1556 22.2772 29.1556 24.8446C29.1556 27.412 27.0674 29.5002 24.5 29.5002C21.9326 29.5002 19.8444 27.412 19.8444 24.8446C19.8444 22.2772 21.9326 20.189 24.5 20.189Z"
        fill="white"
      />
      <defs>
        <linearGradient id="paint0_linear_356_4182" x1="7.30477" y1="42.1841" x2="41.9804" y2="6.80258" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FAAD4F" />
          <stop offset="0.35" stop-color="#DD2A7B" />
          <stop offset="0.62" stop-color="#9537B0" />
          <stop offset="1" stop-color="#515BD4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0px_4px_2px_rgb(0,0,0,.3)]">
      <path
        d="M25.0569 0.342773H24.9431C11.1674 0.342773 0 11.3633 0 24.9578L0 25.0702C0 38.6647 11.1674 49.6852 24.9431 49.6852H25.0569C38.8326 49.6852 50 38.6647 50 25.0702V24.9578C50 11.3633 38.8326 0.342773 25.0569 0.342773Z"
        fill="#007EBB"
      />
      <path
        d="M11.924 16.7439C11.2653 16.1406 10.9378 15.3938 10.9378 14.5053C10.9378 13.6167 11.2671 12.8371 11.924 12.232C12.5826 11.6287 13.4305 11.3262 14.4693 11.3262C15.508 11.3262 16.3226 11.6287 16.9795 12.232C17.6382 12.8353 17.9657 13.5942 17.9657 14.5053C17.9657 15.4163 17.6364 16.1406 16.9795 16.7439C16.3209 17.3473 15.4853 17.6498 14.4693 17.6498C13.4533 17.6498 12.5826 17.3473 11.924 16.7439ZM17.4122 20.2048V38.702H11.4895L11.4895 20.2048H17.4122Z"
        fill="#FEFFFC"
      />
      <path
        d="M37.128 22.0325C38.4191 23.4154 39.0637 25.3135 39.0637 27.7303V38.3756H33.4389V28.4805C33.4389 27.2618 33.1183 26.3145 32.479 25.6403C31.8396 24.9661 30.9777 24.6272 29.8986 24.6272C28.8196 24.6272 27.9577 24.9643 27.3183 25.6403C26.6789 26.3145 26.3583 27.2618 26.3583 28.4805V38.3756H20.7002V20.1534H26.3583V22.5701C26.9312 21.7645 27.7037 21.1283 28.6742 20.6599C29.6446 20.1914 30.736 19.958 31.9499 19.958C34.1116 19.958 35.8388 20.6495 37.128 22.0325Z"
        fill="#FEFFFC"
      />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0px_4px_2px_rgb(0,0,0,.3)]">
      <path
        d="M49.9965 25.3558C49.9965 37.8159 40.6373 48.1169 28.4788 49.7885C27.342 49.9441 26.1789 50.0253 24.9982 50.0253C23.6354 50.0253 22.2972 49.9182 20.9939 49.7107C9.09123 47.8196 0 37.6344 0 25.3558C0 11.7306 11.1932 0.68457 25 0.68457C38.8068 0.68457 50 11.7306 50 25.3558H49.9965Z"
        fill="#1C1C1B"
      />
      <path
        d="M10.1388 11.5645L21.6683 26.7765L10.0669 39.145H12.6787L22.8367 28.3168L31.0433 39.145H39.9296L27.7519 23.0772L38.551 11.5645H35.9393L26.5853 21.537L19.0268 11.5645H10.1405H10.1388ZM13.9784 13.4625H18.0599L36.0864 37.247H32.005L13.9784 13.4625Z"
        fill="white"
      />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0px_4px_2px_rgb(0,0,0,.3)]">
      <path
        d="M50 24.6966C50 11.0711 38.8071 0.0253906 25 0.0253906C11.1929 0.0253906 0 11.0711 0 24.6966C0 38.3222 11.1929 49.3679 25 49.3679C38.8071 49.3679 50 38.3222 50 24.6966Z"
        fill="#FF0209"
      />
      <path
        d="M35.6126 35.6231C34.8677 35.7028 34.1053 35.7167 33.3745 35.715C27.6739 35.7098 21.9733 35.7045 16.2745 35.7011C14.4809 35.7011 12.5274 35.6439 11.1413 34.5188C9.57958 33.248 9.2546 31.0446 9.12811 29.0509C8.95244 26.3187 8.93838 23.5778 9.08243 20.8439C9.16149 19.3426 9.30026 17.8048 9.95552 16.4457C10.4263 15.4696 11.2116 14.5924 12.2164 14.1313C13.3847 13.5956 14.6073 13.6909 15.8652 13.6892C18.8762 13.6857 21.8872 13.684 24.8983 13.6805C28.0288 13.6771 31.161 13.6753 34.2915 13.6719C35.7707 13.6719 37.3588 13.7013 38.5656 14.5456C40.1238 15.6343 40.5472 17.706 40.7422 19.5801C41.1023 23.0317 41.1076 26.5198 40.7563 29.9714C40.6105 31.3948 40.368 32.8995 39.4176 33.9796C38.476 35.051 37.0794 35.4636 35.6143 35.6213L35.6126 35.6231Z"
        fill="white"
      />
      <path d="M30.0982 24.6958L21.6027 19.8555V29.536L30.0982 24.6958Z" fill="#FF0209" />
    </svg>
  );
}
