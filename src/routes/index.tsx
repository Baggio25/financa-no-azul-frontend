
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../pages';

import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                label: "Início",
                icon: "home",
                path: "/dashboard"
            },
            {
                label: "Movimentações",
                icon: "paid",
                path: "/movimentacoes"
            },
            {
                label: "Operações",
                icon: "payments",
                path: "/operacoes"
            },
            {
                label: "Pessoas",
                icon: "people",
                path: "/pessoas"
            },
            {
                label: "Contas",
                icon: "savings",
                path: "/contas"
            },
            {
                label: "Bancos",
                icon: "account_balance",
                path: "/bancos"
            },
            {
                label: "Usuários",
                icon: "account_circle",
                path: "/usuarios"
            },
        ])
    }, [setDrawerOptions]);

    return (
        <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='*' element={<Navigate to="/dashboard" />} />
        </Routes>
    )
}