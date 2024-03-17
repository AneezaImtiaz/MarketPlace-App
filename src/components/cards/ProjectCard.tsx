import React, { useState } from 'react';
import { projectStyles } from '../../styles';
import cartIcon from '../../resources/icons/cart.png';
import cartFilledIcon from '../../resources/icons/cartFilled.png';
import { ProjectItem } from '../../types';
import { PROJECT_INFO } from '../../utlis/Constants';
import Image from 'next/image';

type ProjectCardProps = {
    item: ProjectItem;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ item }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);

    return (
        <div key={item.id} className={projectStyles.container}>
            <div key={item.id} className={projectStyles.imageContainer}>
                <img src={item?.image} alt="countryImage" className={projectStyles.image} />
            </div>
            <div className={projectStyles.content}>
                <h2>{item?.country}</h2>
                <div className={projectStyles.iconContainer}>
                    <Image src={isSubscribed ? cartFilledIcon : cartIcon} alt="cartIcon"
                        width={30}
                        height={30}
                        className={projectStyles.icon} />
                </div>
            </div>
            <p>{item?.description}</p>
            <div className={projectStyles.content}>
                <p>{`${PROJECT_INFO.distributionWeight}: ${item?.distribution_weight}`}</p>
                <p>{`${PROJECT_INFO.earliesDelivery}: ${item?.earliest_delivery}`}</p>
            </div>
            <div className={projectStyles.content}>
                <p>
                    {`${PROJECT_INFO.volume}:`}
                    <input
                        className={projectStyles.volume}
                        type="number"
                        name="volume"
                        min="0"
                        onChange={(e) => null}
                    />
                </p>
                <p>{`${PROJECT_INFO.volumeInTons}: ${item?.offered_volume_in_tons}`}</p>
            </div>
        </div>
    );
};

export default ProjectCard;
