import React, { useState, useEffect } from 'react';
import { projectStyles } from '../../styles';
import cartIcon from '../../resources/icons/cart.png';
import cartFilledIcon from '../../resources/icons/cartFilled.png';
import { ProjectItem, CartItem } from '../../types';
import { PROJECT_INFO } from '../../utils/Constants';
import { getCartItems, addToCart, removeFromCart } from '../../utils/CartUtils';
import Image from 'next/image';

type ProjectCardProps = {
    item: ProjectItem;
    cartIconClick?: void | ((projectId: number) => void);
};

const ProjectCard: React.FC<ProjectCardProps> = ({ item, cartIconClick = () => null }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [volume, setVolume] = useState<number>(1);

    const handleAddToCart = (volume: number) => {
        const storedItems = getCartItems();
        if (storedItems?.find((element => element.projectId === item?.id))) {
            removeFromCart(item?.id);
            addToCart({ projectId: item?.id, volume });
        }
        setVolume(volume);
    };

    const onPressIcon = async () => {
        if (!isSelected) {
            addToCart({ projectId: item?.id, volume });
            setIsSelected(true);
        } else {
            removeFromCart(item?.id);
            cartIconClick(item?.id);
            setIsSelected(false);
        }
    };

    useEffect(() => {
        const storedItems = getCartItems();
        setCart(storedItems);
        const isAlreadySelected = storedItems?.find(
            (element: CartItem) => element?.projectId === item?.id,
        );
        if (isAlreadySelected) {
            setIsSelected(true);
            setVolume(isAlreadySelected?.volume)
        }
    }, []);

    return (
        <div key={item.id} className={projectStyles.container}>
            <div key={item.id} className={projectStyles.imageContainer}>
                <img src={item?.image} alt="countryImage" className={projectStyles.image} />
            </div>
            <div className={projectStyles.content}>
                <h2>{item?.country}</h2>
                <div onClick={onPressIcon} data-testid="cartIcon" className={projectStyles.iconContainer}>
                    <Image src={isSelected ? cartFilledIcon : cartIcon} alt="cartIcon"
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
                        onChange={(e) => handleAddToCart(Number(e.target.value))}
                    />
                </p>
                <p>{`${PROJECT_INFO.volumeInTons}: ${item?.offered_volume_in_tons}`}</p>
            </div>
        </div>
    );
};

export default ProjectCard;
