import React, { useEffect, useState } from 'react';
import FaceRecognition from '../FaceRecognition/FaceRecognition';

const HistoryList = ({ images, faceboxes }) => {
    const [heights, setHeights] = useState([]);

    useEffect(() => {
        const calculateHeights = async () => {
            const newHeights = await Promise.all(images.map(getHeight));
            setHeights(newHeights);
        };
        calculateHeights();
    }, [images]);

    const getHeight = async (image) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = function () {
                const originalWidth = img.width;
                const originalHeight = img.height;
                const targetWidth = 500;
                const aspectRatio = originalWidth / originalHeight;
                const newHeight = targetWidth / aspectRatio;
                resolve(newHeight);
            };
            img.src = image;
        });
    };

    return (
        <div>
            {images.map((image, i) => (
                <div key={i} style={{ paddingBottom: (heights[i] + 40) + 'px' }}>
                    <div style={{margin: '20px'}}>{image}</div>
                    <FaceRecognition imageUrl={image} box={faceboxes[i]} />
                    
                </div>
            ))}
        </div>
    );
};

export default HistoryList;
