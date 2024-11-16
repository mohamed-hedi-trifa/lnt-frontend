import React from 'react';
import './keywordsStyle.css'

// The component
const Keyword = () => {
  const items = [
    "2014 : Création de l'association et premières actions de sensibilisation.",
    "2016 : Organisation du premier Festival de la Culture des Îles Méditerranéennes de Kerkennah.",
    "2020 : Lancement du partenariat avec Le MedFund pour la protection marine.",
    "2023 : Création d’une aire marine protégée pour les îles Kerkennah."
  ];

  return (
    <div>
      <h3 className='keywords'>Moments Clés :</h3>
      <br></br>
      <ul>
        {items.map((item, index) => (
          <li className='itemsCertifications' key={index} style={{
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '36px',
            textAlign: 'left',
            textUnderlinePosition: 'from-font',
            textDecorationSkipInk: 'none',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <img src={'/icons/certificate.png'} width="20px" height="25px"/>
            <p className='itemDescription'>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Keyword;
