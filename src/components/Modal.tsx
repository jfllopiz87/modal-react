import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * ModalProps is a type that defines the props that the Modal component will receive. Modal will be rendered as a portal.
 * isOpen: boolean - a prop that will determine if the modal is displayed or not. IsOpen is optional and by default is set to false.
 * title: string - the title of the modal. By default it is set to 'Modal React'.
 * onClose: function - a function that will be called when the modal is closed. onClose is optional and by default and empty function.
 * onClose function is called when the close button is clicked, the escape key is pressed or the user clicks outside the modal.
 * containerId: string - the id of the container where the modal will be rendered. By default it is set to 'modal-container-id'.
 * containerId is used to render the modal in a specific container. If the container does not exist, a new container will be created.
 * children: React.ReactNode - the content of the modal. It can be any valid React node.
 */
export type ModalProps = {
    isOpen?: boolean;
    title?: string;
    onClose?: () => void;
    containerId?: string;
    children?: React.ReactNode;
};

/**
 * Auxiliary function to create a div container and append it to the body in case the div does not exist.
 * This function is used to create a container where the modal will be rendered.
 * @param containerId Id of the container to be created
 * @returns HTMLElement The created div container
 */
export const createContainerAndAppendToDom = (containerId: string) => {
            
    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
    return container;
};

const Modal = ({isOpen = false, title = 'Modal React', onClose = () => {}, containerId = 'modal-container-id', children}: ModalProps) => {

    const [showModal, setShowModal] = useState(isOpen);
    
    // Create a portal div to render the modal in a specific container.
    let parentContainer = document.getElementById(containerId);
    // if container is not found with containerId, create a new container and append it to the body
    if(!parentContainer) 
        parentContainer = createContainerAndAppendToDom(containerId);
    
    useEffect(() => {

        // Close the modal when the user presses the escape key.
        const handleKeyDown = (e: KeyboardEvent) => {

            e.key == 'Escape' && closeModal();
        };

        // Close the modal when the user clicks outside the modal, it can be in the backdrop or outside the portal container.
        const handleClickOutside = (e: MouseEvent) => {
            
            const target = e.target as HTMLElement;
            const classList = target?.role; 
            classList === 'dialog' && closeModal();
            !parentContainer?.contains(target) && closeModal();
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Close the modal and call the onClose function.
    // Doing this to close modal indepdent if the onClose function will close it or not.
    // Just want the functionality to close the modal independent of the onClose function
    // Modal component should not depend on the onClose function to close the modal. Unless thats is the desired behavior.
    // in that case, we can remove the state showModal and just use the isOpen prop to control the modal. 
    const closeModal = () => {

        setShowModal(false);
        onClose && onClose();
    };

    //Close the modal when the close button is clicked
    const handleButtonClose = (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault
        closeModal();
    };

    //prevent rendering if parentContainer is not set yet
    if(!parentContainer) return null;

    //  prevent rendering if showModal is the modal is not open, it can be because isOpen is false or the closeModal function was called
    if(!showModal) return null;

    return createPortal(<div role="dialog" className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div role="content" className="bg-white rounded-lg shadow-lg w-1/2 h-1/2 flex flex-col justify-between">
            <h1 className="border-b-2 border-gray-200 p-4 text-center text-3xl">{title}</h1>
            <div role="content" className="p-4 flex-grow">
                {children}
            </div>
            <div role="footer" className="flex border-t-2 border-gray-200 p-4 justify-end">
                <button onClick={(e) => handleButtonClose(e)} role="button" className="bg-gray-500 uppercase text-white px-4 py-2 rounded-lg">Close</button>
            </div>
        </div>       
    </div>, parentContainer);
};

export default Modal;