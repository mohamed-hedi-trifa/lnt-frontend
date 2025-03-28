import React from 'react'
import Login from '../components/auth/Login'
import { useTranslation } from '@/contexts/TranslationContext';

export default function LoginPage() {
    const { t } = useTranslation("en");
    return (
        <Login />
    )
}
