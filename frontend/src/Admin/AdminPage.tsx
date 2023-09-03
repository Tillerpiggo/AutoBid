import { Routes, Route, useNavigate } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi'; // Assuming you are using these icons
import SidebarWithHeader from '../Components/SidebarWithHeader';
import PersonaPage from './PersonaPage';
import { useEffect } from 'react';

const AdminPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('personas');
    }, [navigate]);

    const items = [
        { name: 'Personas', icon: FiUsers, route: 'personas' },
    ];

    return (
        <SidebarWithHeader
            items={items}
            logoText="Gift Sharp Admin"
            username="autobid@autobid.club"
            userRole="Admin"
            onLogoutRoute="/admin"
        >
            <Routes>
                <Route path="personas" element={<PersonaPage />} />
            </Routes>
        </SidebarWithHeader>
    );
}

export default AdminPage;