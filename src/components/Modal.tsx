import React, { useEffect, useState } from 'react';

/**
 * ModalProps is a type that defines the props that the Modal component will receive.
 * isOpen: boolean - a prop that will determine if the modal is displayed or not. IsOpen is optional and by default is set to false.
 * title: string - the title of the modal. By default it is set to 'Modal React'.
 * onClose: function - a function that will be called when the modal is closed. onClose is optional and by default and empty function.
 * onClose function is called when the close button is clicked, the escape key is pressed or the user clicks outside the modal.
 * children: React.ReactNode - the content of the modal. It can be any valid React node.
 */
type ModalProps = {
    isOpen?: boolean;
    title?: string;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal = ({isOpen = false, title = 'Modal React', onClose, children}: ModalProps) => {

    // If the modal is not open, do not render anything.
    if(!isOpen) {
        return null;
    }

    useEffect(() => {

        const handleKeyDown = (event: KeyboardEvent) => {};
        const handleClickOutside = (event: MouseEvent) => {};

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
};

export default Modal;