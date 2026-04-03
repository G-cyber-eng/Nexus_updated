
import React, { useRef, useState, useCallback, useEffect } from 'react';
import VideoControls from './VideoControls';

const VideoCall: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [callStarted, setCallStarted] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  const stopAllTracks = useCallback((stream: MediaStream | null) => {
    stream?.getTracks().forEach(track => track.stop());
  }, []);

  const startCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      setLocalStream(mediaStream);
      setCallStarted(true);
    } catch (error) {
      alert('Camera/Microphone access denied.');
      console.error(error);
    }
  };

  const endCall = useCallback(() => {
    stopAllTracks(localStream);
    stopAllTracks(screenStream);
    if (videoRef.current) videoRef.current.srcObject = null;
    setLocalStream(null);
    setScreenStream(null);
    setCallStarted(false);
    setScreenSharing(false);
  }, [localStream, screenStream]);

  const toggleVideo = useCallback(() => {
    localStream?.getVideoTracks().forEach(track => track.enabled = !videoEnabled);
    setVideoEnabled(prev => !prev);
  }, [localStream, videoEnabled]);

  const toggleAudio = useCallback(() => {
    localStream?.getAudioTracks().forEach(track => track.enabled = !audioEnabled);
    setAudioEnabled(prev => !prev);
  }, [localStream, audioEnabled]);

  const toggleScreenShare = async () => {
    // ... (same as before - toggleScreenShare logic)
    // Main ne pehle wala clean version rakh sakta hoon
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-5 text-white rounded-t-3xl">
        <h2 className="text-xl font-semibold">Video Call</h2>
        <p className="text-purple-100 text-sm mt-0.5">Connect with your team or investors</p>
      </div>

      {/* Video Area - Better Height */}
      <div className="flex-1 p-6 bg-gray-50 flex items-center justify-center min-h-[320px]">
        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-inner">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover rounded-2xl"
          />

          {!callStarted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/70">
              <div className="text-6xl mb-4">📹</div>
              <p className="text-lg font-medium">Ready to start video call?</p>
              <p className="text-purple-200 text-sm mt-1">Click "Start Call" to begin</p>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 pt-2 border-t">
        <VideoControls
          callStarted={callStarted}
          videoEnabled={videoEnabled}
          audioEnabled={audioEnabled}
          screenSharing={screenSharing}
          onStartCall={startCall}
          onEndCall={endCall}
          onToggleVideo={toggleVideo}
          onToggleAudio={toggleAudio}
          onToggleScreenShare={toggleScreenShare}
        />
      </div>
    </div>
  );
};

export default VideoCall;