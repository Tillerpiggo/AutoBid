import { Routes, Route, useParams } from 'react-router-dom';
import { FiUsers, FiSettings } from 'react-icons/fi'; // Assuming you are using these icons
import UserDisplay from '../Portal Contacts/UserDisplay';
import SidebarWithHeader from '../Components/SidebarWithHeader';
import Settings from '../Portal Settings/Settings';

const UserPage = () => {
    const { userId } = useParams();

    const items = [
        { name: 'Contacts', icon: FiUsers, route: 'contacts' },
        { name: 'Settings', icon: FiSettings, route: 'settings' },
    ];

    return (
        <SidebarWithHeader
            items={items}
            logoText="Gift Sharp"
            userRole="Gift Extradionaire"
            onLogoutRoute="/admin"
        >
            <Routes>
                <Route path="contacts" element={<UserDisplay />} />
                <Route path="settings" element={<Settings />} />
            </Routes>
        </SidebarWithHeader>
    );
};

export default UserPage;