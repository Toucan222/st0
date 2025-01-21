import React, { useCallback, useEffect, useRef } from "react";
export const AudioVisualizer = ({ isPlaying, audioRef, isExpanded }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const analyzerRef = useRef(null);
  const previousTimeRef = useRef(0);
  const draw = useCallback(() => {
    if (!analyzerRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const bufferLength = analyzerRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const animate = (currentTime) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = currentTime - previousTimeRef.current;
        if (deltaTime < 1000 / 30) {
          requestRef.current = requestAnimationFrame(animate);
          return;
        }
      }
      previousTimeRef.current = currentTime;
      requestRef.current = requestAnimationFrame(animate);
      analyzerRef.current.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = isExpanded ? 100 : 60;
      ctx.beginPath();
      for (let i = 0; i < bufferLength; i += 2) {
        const angle = (i * 2 * Math.PI) / bufferLength;
        const amplitude = dataArray[i] / 255;
        const x = centerX + (radius + amplitude * 30) * Math.cos(angle);
        const y = centerY + (radius + amplitude * 30) * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();
    };
    requestRef.current = requestAnimationFrame(animate);
  }, [isExpanded]);
  useEffect(() => {
    if (!audioRef.current) return;
    let audioContext: AudioContext;
    let analyzer: AnalyserNode;
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioSource = audioContext.createMediaElementSource(
        audioRef.current,
      );
      analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 128;
      audioSource.connect(analyzer);
      analyzer.connect(audioContext.destination);
      analyzerRef.current = analyzer;
    } catch (error) {
      console.error("Failed to initialize audio context:", error);
    }
    return () => {
      if (audioContext) {
        audioContext.close();
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [audioRef]);
  useEffect(() => {
    if (isPlaying) {
      draw();
    } else if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, draw]);
  return (
    <canvas
      ref={canvasRef}
      width={isExpanded ? 400 : 200}
      height={isExpanded ? 400 : 200}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
  );
};
