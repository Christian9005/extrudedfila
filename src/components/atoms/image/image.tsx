import React, {FC} from 'react';
import './image.scss';

interface ImageProps {
    urlImage: string;
}
const Image: FC<ImageProps> = ({ urlImage}) => {
    return (
        <div className="image-container">
            <img src={urlImage} alt="Logo"/>
        </div>
    );
};

export default Image;