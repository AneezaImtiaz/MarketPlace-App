import React from 'react';
import { messageDialogStyles } from '../../styles';

type MessageDialogProps = {
  title: string;
  button: string;
  onButtonClick: (() => void);
  description: string;
  closeButton?: string;
  onClose?: (() => void);
};

const MessageDialog: React.FC<MessageDialogProps> = ({ title, description, button, closeButton, onClose = () => null, onButtonClick = () => null, }) => {
  return (
    <div className={messageDialogStyles.overlay}>
      <div className={messageDialogStyles.content}>
        <h2>{title}</h2>
        <p>{description}</p>
        {closeButton && <button onClick={onClose}>{closeButton}</button>}
        <button onClick={onButtonClick}>{button}</button>
      </div>
    </div>
  );
};

export default MessageDialog;
