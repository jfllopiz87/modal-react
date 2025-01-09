import { beforeAll, describe, vi, expect, test, it, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createPortal } from 'react-dom';
import Modal from '../Modal';

describe('Modal', () => {

    let isOpen = true;
    const mockClose = vi.fn();

    beforeAll(() => {
        mockClose.mockReset().mockImplementation(() => {isOpen = false});  
    });
    
    // set isOpen to true before each test
    // Create a container before each test
    beforeEach(() => {
        isOpen = true;
        const modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal-root');
        modalRoot.setAttribute('data-testid', 'modal-root');
        document.body.appendChild(modalRoot);
    });

    // Clear the mock after each test
    // Remove the container after each test
    afterEach(() => {
        mockClose.mockClear();        
        document.body.removeChild(document.getElementById('modal-root') as Node);
    });

    describe('render or not render modal', () => {

        // Test if the modal is rendered with the expected controls when isOpen is true
        // It should be rendered on modal-root container, wit a dialog div, a heading and a button
        test('renders modal with expected controls if is Opened', async () => {
        
            render(<Modal isOpen={true} containerId='modal-root' />);          
            const modal = await screen.getByRole('dialog');
            const heading = await screen.getByRole('heading');
            const buttom = await screen.getByRole('button', { name: /close/i });
            expect(modal).toBeInTheDocument();
            expect(heading).toBeInTheDocument();
            expect(buttom).toBeInTheDocument();
        });
      
        // Test if the modal is not rendered in its default state
        test('no renders modal if isOpen is not pass', async() => {
          const {container} = render(<Modal />);
          await waitFor(() => {
            expect(container.firstChild).toBeNull();
          });
        });
      
        // Test if the modal is not rendered when isOpen is false
        test('no renders modal if isOpen is not true', async() => {
          const {container} = render(<Modal isOpen={false}/>);
          await waitFor(() => {
            expect(container.firstChild).toBeNull();
          });
        });
    });

    describe('when passed onClose handler', () => {
    
        // Test if the onClose action is called when the escape key is pressed
        // rerender the modal and check if it is not rendered after clicking the close button
        test('calls onClose action when pressing the ESC key', async () => {
            
            const {rerender,container, unmount} = render(<Modal isOpen={isOpen} onClose={mockClose} />);
            fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape', code: 'Escape' });
            expect(mockClose).toHaveBeenCalledTimes(1);

            rerender(<Modal isOpen={isOpen} onClose={mockClose} />);
            await waitFor(() => {
                expect(container.firstChild).toBeNull();
            });
        
            unmount();
        });
    
        // Test if the onClose action is called when the close button is clicked
        // rerender the modal and check if it is not rendered after clicking the close button
        test('renders dismissible button that calls onClose action when clicked', async () => {
          
            const {rerender,container, unmount} = render(<Modal isOpen={isOpen} onClose={mockClose} />);
            const closeButton = screen.getByRole('button', { name: /close/i });
            await userEvent.click(closeButton);
            expect(mockClose).toHaveBeenCalledTimes(1);
          
            rerender(<Modal isOpen={isOpen} onClose={mockClose} />);
            await waitFor(() => {
                expect(container.firstChild).toBeNull();
            });
        
            unmount();
        });
    
        // Test if the onClose action is called when clicking outside the modal
        // rerender the modal and check if it is not rendered after clicking the close button
        test('calls onClock action when clicking outside of the modal', async () => {
          
            const {rerender,container, unmount} = render(<Modal data-testid="modal-root" isOpen={isOpen} onClose={mockClose} />);
            const scrimElement = screen.getByTestId('modal-root');
            await userEvent.click(scrimElement);
            expect(mockClose).toHaveBeenCalledTimes(1);
            
            rerender(<Modal isOpen={isOpen} onClose={mockClose} />);
            await waitFor(() => {
                expect(container.firstChild).toBeNull();
            });
    
            unmount();
        });
      });
});