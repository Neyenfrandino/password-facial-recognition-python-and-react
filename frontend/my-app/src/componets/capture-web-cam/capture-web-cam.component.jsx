import { useRef, useState, useContext, useEffect } from 'react';
import Webcam from 'react-webcam';
import { ContextImg } from '../../context/context-img/context-img.context';
import './capture-web-cam.style.scss';

const CaptureWebcam = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const { setImageSrcContext } = useContext(ContextImg);
  const [webcamActive, setWebcamActive] = useState(false);

  const drawFaceIndicator = () => {
    if (!webcamActive) return;

    const video = webcamRef.current?.video;
    if (!video) return;

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const context = canvasRef.current.getContext('2d');

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const centerX = videoWidth / 2;
    const centerY = videoHeight / 2;
    const radiusX = videoWidth * 0.15;
    const radiusY = videoHeight * 0.25;

    context.strokeStyle = 'yellow';
    context.lineWidth = 2;
    context.setLineDash([5, 5]);
    context.beginPath();
    context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    context.stroke();

    const mask = new Path2D();
    mask.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 5 * Math.PI);

    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    const rectWidth = 500;
    const rectHeight = 385;
    const rectX = (videoWidth - rectWidth) / 2;
    const rectY = (videoHeight - rectHeight) / 2;
    
    context.fillRect(rectX, rectY, rectWidth, rectHeight);
    
    context.globalCompositeOperation = 'destination-out';
    context.fill(mask);
    context.globalCompositeOperation = 'source-over';
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrcContext(imageSrc);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      drawFaceIndicator();
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [webcamActive]);

  return (
    <div className="capture-web-cam-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={500}
        height={480}
        className='capture-web-cam'
        onUserMedia={() => setWebcamActive(true)}
        onUserMediaError={() => setWebcamActive(false)}
      />
      <canvas
        ref={canvasRef}
        className='canvas-container'
      />
      <button onClick={capture}>Capture Photo</button>
    </div>
  );
};

export default CaptureWebcam;
