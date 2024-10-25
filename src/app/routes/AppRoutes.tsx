import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Profile } from '../pages/Profile'
import { Admin } from '../pages/Admin'
import { NotFound } from '../pages/NotFound'
import { BaseLayout } from '../components/BaseLayout'
import { Transaction } from '../pages/Transaction'
import { WalletContextProvider } from '../../context/WalletContext'

export const AppRoutes = () => {
    return (
        <WalletContextProvider>
            <BaseLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/transaction" element={<Transaction />} />
                    <Route path="/perfil" element={<Profile />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BaseLayout>
        </WalletContextProvider>
    )
}
