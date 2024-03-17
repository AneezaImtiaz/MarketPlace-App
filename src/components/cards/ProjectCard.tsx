import React, { useState, useEffect } from 'react';
import { projectStyles } from '../../styles';
import cartIcon from '../../resources/icons/cart.png';
import cartFilledIcon from '../../resources/icons/cartFilled.png';
import { ProjectItem, CartItem } from '../../types';
import { PROJECT_INFO } from '../../utlis/Constants';
import { getCartItems, addToCart, removeFromCart } from '../../utlis/Cart';
import Image from 'next/image';

type ProjectCardProps = {
    item: ProjectItem;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ item }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [volume, setVolume] = useState<number>();

    const handleAddToCart = (projectId: number, volume: number) => {
        addToCart({ projectId, volume });
        setVolume(volume)
    };

    const onPressIcon = async () => {
        if (!isSubscribed) {
            handleAddToCart(item?.id, volume ? volume : 1)
            setIsSubscribed(true);
        } else {
            removeFromCart(item?.id);
            setIsSubscribed(false);
        }
    };

    useEffect(() => {
        const storedItems = getCartItems();
        const isAlreadySubscribed = storedItems?.find(
            (element: CartItem) => element?.projectId === item?.id,
        );
        if (isAlreadySubscribed) {
            setIsSubscribed(true);
            setVolume(isAlreadySubscribed?.volume)
        }
    }, []);

    return (
        <div key={item.id} className={projectStyles.container}>
            <div key={item.id} className={projectStyles.imageContainer}>
                <img src={item?.image} alt="countryImage" className={projectStyles.image} />
            </div>
            <div className={projectStyles.content}>
                <h2>{item?.country}</h2>
                <div onClick={onPressIcon} className={projectStyles.iconContainer}>
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
                        value={volume}
                        min="0"
                        onChange={(e) => setVolume(Number(e.target.value))}
                    />
                </p>
                <p>{`${PROJECT_INFO.volumeInTons}: ${item?.offered_volume_in_tons}`}</p>
            </div>
        </div>
    );
};

export default ProjectCard;
