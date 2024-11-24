import React from 'react';

// The component
const KeyMoments = () => {
  const items = [
    "2014 : Création de l'association et premières actions de sensibilisation.",
    "2016 : Organisation du premier Festival de la Culture des Îles Méditerranéennes de Kerkennah.",
    "2020 : Lancement du partenariat avec Le MedFund pour la protection marine.",
    "2023 : Création d’une aire marine protégée pour les îles Kerkennah."
  ];

  return (
    <div className='px-3'>
      <h3 className='text-primary font-bold text-4xl leading-10 flex justify-center'>Moments Clés :</h3>
      <br></br>
      <ul className='flex flex-col gap-7 sm:gap-10'>
        {items.map((item, index) => (
          <li className=' !pl-0 flex gap-6 text-lg sm:text-2xl font-medium leading-9' key={index}>
            <div className='shrink-0 pt-1'>
            <img src={'/icons/certificate.png'} width="20px" height="25px"/>
            </div>
            <div className=''>{item}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KeyMoments;
