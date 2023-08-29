import React, { useState } from 'react';
import ContactForm, { ContactFormProps } from './ContactForm';
import { Contact } from './interfaces';
import ActionButton from './ActionButton';
import GrayButton from './GrayButton';
import { Center } from '@chakra-ui/react';

const ContactFormModal: React.FC<ContactFormProps> = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOpenModal = () => setIsModalVisible(true);
    const handleCloseModal = () => setIsModalVisible(false);

    const handleSubmitAndCloseModal = async (contact: Contact) => {
        await props.onSubmit(contact);
        handleCloseModal();
    };

    return (
        <>
            {props.contact ? (
                <GrayButton
                label="Edit"
                handleClick={handleOpenModal}
                />
            ) : (
                <ActionButton
                label="Add Contact"
                handleClick={handleOpenModal}
                />
            )}
    
            {isModalVisible && (
                <div onClick={handleCloseModal}
                    style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Center onClick={e => e.stopPropagation()} 
                        style={{ backgroundColor: '#fff', padding: '1em', width: '80%', maxHeight: '80%', overflow: 'auto' }}>
                        <button onClick={handleCloseModal}>Close</button>
                        <ContactForm {...props} onSubmit={handleSubmitAndCloseModal} />
                    </Center>
                </div>
            )}
        </>
    );
};

export default ContactFormModal;