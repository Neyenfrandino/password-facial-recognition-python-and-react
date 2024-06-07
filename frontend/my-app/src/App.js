import { useContext } from 'react';
import CaptureWebcam from './componets/capture-web-cam/capture-web-cam.component';
import Loading from './componets/loading/loading.component';
import { ContextImg } from './context/context-img/context-img.context';
import './App.scss';

const App = () => {
  const { loading } = useContext(ContextImg);

  return (
    <div className="App">
      {!loading && <CaptureWebcam />}
      {loading && <Loading />}
    </div>
  );
};

export default App;
