import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TranslationContextProps {
    t: (key: string) => string;
    setLanguage: (lang: "en" | "fr") => void;
    language: "en" | "fr";
}

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

const translations: { [key: string]: { [key: string]: string } } = {
    en: {
        services: 'services',
        home: "home",
        aboutUs: "about us",
        gallery: "gallery",
        contact: "contact",
        certificates: "certificates",
        ourServices: 'our services',
        ourCertificates: 'our certificates',
        ourGallery: 'our gallery',
        ourContact: 'our contact',
        callUsNow: "call us now",
        contactUsNow: "contact us now",
        sendMessageNow: "send message now",
        dropUsAnEmail: "drop us an email",
        officeOpeningHours: "office opening hours",
        welcomeToOurWebsite: "welcome to our website",
        seeMore: "see more",
        name: "name",
        email: "email",
        subject: "subject",
        message: "message",
        links: "links",
        allRightReserved: "all rights reserved"
    },
    fr: {
        services: 'services',
        home: "accueil",
        aboutUs: "à propos de nous",
        gallery: "galerie",
        contact: "contact",
        certificates: "certificats",
        ourServices: 'nos services',
        ourCertificates: 'nos certificats',
        ourGallery: 'notre galerie',
        ourContact: 'notre contact',
        callUsNow: "appelez-nous maintenant",
        contactUsNow: "contactez-nous maintenant",
        sendMessageNow: "envoyer un message maintenant",
        dropUsAnEmail: "envoyez-nous un email",
        officeOpeningHours: "heures d'ouverture",
        welcomeToOurWebsite: "bienvenue sur notre site",
        seeMore: "voir plus",
        name: "nom",
        email: "e-mail",
        subject: "sujet",
        message: "message",
        links: "liens",
        allRightsReserved: "tous droits réservés"
    }
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<"en" | "fr">('en');

    const t = (key: string): string => {
        return translations[language]?.[key] || key;
    };

    return (
        <TranslationContext.Provider value={{ t, setLanguage, language }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = (lang?: "en" | "fr") => {
    const context = useContext(TranslationContext);

    const fallbackT = (key: string) => key;
    if (!context) {
        return { t: fallbackT, lang: lang || 'en', setLanguage: () => { } };
    }

    // Automatically set the language if `lang` is provided as an argument
    if (lang && lang !== context?.language) {
        context?.setLanguage(lang);
    }

    return { t: context?.t, lang: context?.language, setLanguage: context?.setLanguage };
};
