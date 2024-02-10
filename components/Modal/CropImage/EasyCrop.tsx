import React, { useState } from "react";
import Cropper from 'react-easy-crop';

const EasyCrop = () => {
 const [crop, setCrop] = useState({ x: 0, y: 0 });

  return (
    <Cropper
      image="https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706__340.jpg"
      crop={crop}
      onCropChange={setCrop}
    />
  )
}

export default EasyCrop;