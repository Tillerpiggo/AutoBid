import { Box, Heading, useBreakpointValue } from '@chakra-ui/react';
import PersonaPage from './PersonaPage';

const AdminPage: React.FC = () => {
    const boxWidth = useBreakpointValue({ base: '100%', md: '1/3' });

    return (
        <Box width={boxWidth} mx="auto" p={4}>
            <Heading><PersonaPage /></Heading>
        </Box>
    );
}

export default AdminPage;