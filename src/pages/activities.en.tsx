import React from 'react'
import ServicesVisitor from '../components/visitor/ServicesVisitor'
import { useTranslation } from '@/contexts/TranslationContext';

export default function ServicesPageEn() {
    const { t } = useTranslation("en");
    return (
        <ServicesVisitor lang="en" />
    )
}
