import React, { useEffect } from "react";
import { navigate } from "gatsby";

const IndexPage = () => {
    useEffect(() => {
        const userLang = navigator.language || (navigator as any).userLanguage; // Get user's language
        const langCode = userLang.split('-')[0]; // Get the language code (e.g., 'fr')

        // Redirect if the language is supported
        const supportedLanguages = [`en`, `fr`]; // Add your supported languages here
        if (supportedLanguages.includes(langCode)) {
            // @ts-ignore
            navigate(`/${langCode}`); // Redirect to the corresponding language page
        }
    }, []);

    return (
        <div>
            <h1>Welcome to my website!</h1>
            {/* Other content */}
        </div>
    );
};

export default IndexPage;
