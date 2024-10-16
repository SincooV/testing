import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import './Webcam.css';

const VideoRecorder = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [streamAvailable, setStreamAvailable] = useState(false);

  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: "user",
  };

  const requestMediaPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStreamAvailable(true);
      webcamRef.current.srcObject = stream;
    } catch (err) {
      console.error("Erro ao acessar a câmera e/ou microfone:", err);
      switch (err.name) {
        case "NotFoundError":
          console.error("Nenhum dispositivo de câmera ou microfone encontrado.");
          break;
        case "NotAllowedError":
          console.error("Permissão para acessar a câmera e/ou microfone foi negada.");
          break;
        case "NotReadableError":
          console.error("A câmera ou microfone estão em uso por outro aplicativo.");
          break;
        default:
          console.error("Erro desconhecido:", err);
      }
    }
  };

  useEffect(() => {
    requestMediaPermissions();
  }, []);

  const handleStartCaptureClick = useCallback(() => {
    if (webcamRef.current && streamAvailable) {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.srcObject, {
        mimeType: "video/webm",
      });

      mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
      mediaRecorderRef.current.start();
    } else {
      console.error("Stream da webcam não está disponível.");
    }
  }, [streamAvailable]);

  const handleDataAvailable = useCallback(({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  }, []);

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    } else {
      console.error("MediaRecorder não está inicializado.");
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = url;
      a.download = "recorded-video.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    } else {
      console.error("Nenhum chunk gravado para download.");
    }
  }, [recordedChunks]);

  return (
    <div className="video-recorder">
      <Webcam
        audio={true}
        ref={webcamRef}
        className='webcam'
        videoConstraints={videoConstraints}
      />
      <div className="controls">
        {capturing ? (
          <button className="video-recorder-button stop" onClick={handleStopCaptureClick}>Parar Gravação</button>
        ) : (
          <button className="video-recorder-button start" onClick={handleStartCaptureClick}>Iniciar Gravação</button>
        )}
        {recordedChunks.length > 0 && (
          <button className="video-recorder-button download" onClick={handleDownload}>Download Vídeo</button>
        )}
      </div>
    </div>
  );
};

export default VideoRecorder;
