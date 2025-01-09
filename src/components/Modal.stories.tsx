import { fn } from "@storybook/test";
import Modal from "./Modal";
import '../index.css';

export const ActionsData = {
    onClose: fn(),
};

export default {
    component: Modal,
    title: 'Modal',
    excludeStories: /.*Data$/,
    args: {
        ...ActionsData,
    },
};

export const Default = {args: {title: 'Modal React'}};
export const IsOpen = {args: {isOpen: true, title: 'Modal React'}};
export const Closed = {args: {isOpen: false, title: 'Modal React'}};