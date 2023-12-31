import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div style={{zIndex: -5}}>
      <p className='f3 v-mid' style={{paddingTop: '160px'}}>
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='center' style={{paddingTop: '30px'}}>
        <div className='form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='tex' placeholder='insert an image link here' onChange={onInputChange}/>
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;