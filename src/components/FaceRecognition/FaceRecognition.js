import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className='center ma'>
      <div className='absolute mb2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
        {box.map((faceBox, index) => {
        if (
          typeof faceBox.topRow !== 'undefined' &&
          typeof faceBox.rightCol !== 'undefined' &&
          typeof faceBox.bottomRow !== 'undefined' &&
          typeof faceBox.leftCol !== 'undefined'
        ) {
          return (
            <div
              key={index}
              className='bounding-box'
              style={{
                top: faceBox.topRow,
                right: faceBox.rightCol,
                bottom: faceBox.bottomRow,
                left: faceBox.leftCol,
              }}
            ></div>
          );
        } else {
          // Data is not available yet, you can show a loading indicator or handle it in another way
          return <div key={index}>Loading...</div>;
        }
      })}
      </div>
    </div>
  );
};

export default FaceRecognition;