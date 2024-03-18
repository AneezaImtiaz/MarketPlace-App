import React from 'react';
import { noDataModalStyles } from '../../styles';

type NoDataModalProps = {
    title: string;
    description: string;
};

const NoDataModal: React.FC<NoDataModalProps> = ({ title, description }) => {
    return (
        <div className={noDataModalStyles.noDataDialog}>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default NoDataModal;
