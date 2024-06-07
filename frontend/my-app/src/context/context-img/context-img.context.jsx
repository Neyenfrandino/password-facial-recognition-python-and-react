import React, { createContext, useEffect, useState } from 'react';
import fetchPostImg from '../../utils/fetch-post/fetch-post-img.component';

export const ContextImg = createContext({
    imageSrcContext: null,
    setImageSrcContext: () => {},
    loading: false,
});

export const ContextImgProvider = ({ children }) => {
  const [imageSrcContext, setImageSrcContext] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (imageSrcContext !== null) {
        setLoading(true);
        try {
          const response = await fetchPostImg(imageSrcContext);
          if (response !== null) {
            console.log('Upload Successful:', response);
          } else {
            console.log('Upload Failed');
            // Aquí podrías actualizar el estado para mostrar un mensaje de error en la UI
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          // Aquí podrías actualizar el estado para mostrar un mensaje de error en la UI
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [imageSrcContext]);
  
  const value = { imageSrcContext, setImageSrcContext, loading };

  return (
    <ContextImg.Provider value={value}>
      {children}
    </ContextImg.Provider>
  );
};
