import React from 'react'
import ServicesVisitor from '../components/visitor/ServicesVisitor'
import { useTranslation } from '@/contexts/TranslationContext';

export default function ServicesPageFr() {
    const { t } = useTranslation("fr");
    return (
        <ServicesVisitor lang="fr" />
    )
}
