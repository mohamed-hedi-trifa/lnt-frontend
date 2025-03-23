import React from 'react'
import Contact from '../components/contact/Contact'
import { useTranslation } from '@/contexts/TranslationContext';

export default function ContactPage() {
    const { t } = useTranslation("en");
    return (
        <Contact />
    )
}
