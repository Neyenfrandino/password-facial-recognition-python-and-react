import { useState, useEffect } from 'react';
import './loading.style.scss';

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setIsLoading(false);
      setData('Some data loaded');
    }, 2000);
  }, []);

  const LoadingComponent = () => (
    <div>
      <p>Loading...</p>
    </div>
  );

  const DataComponent = ({ data }) => (
    <div>
      <h1>Data Loaded!</h1>
      <p>{data}</p>
    </div>
  );

  return (
    <div className='main-component'>
      {isLoading ? <LoadingComponent /> : <DataComponent data={data} />}
    </div>
  );
};

export default Loading;
