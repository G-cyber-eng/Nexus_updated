import React, { useState, useRef } from 'react';
import { Video, Mic, MicOff, VideoOff, ScreenShare, PhoneOff, User } from 'lucide-react';

const VideoCallPage: React.FC = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const startCall = () => {
    setIsCallActive(true);
    // Frontend mock - real webcam ke liye getUserMedia use kar sakte hain baad mein
    alert('✅ Call started! (Frontend mock - real video call ke liye WebRTC baad mein add karenge)');
  };

  const endCall = () => {
    setIsCallActive(false);
    setScreenSharing(false);
    alert('Call ended');
  };

  const toggleMic = () => setMicOn(!micOn);
  const toggleCamera = () => setCameraOn(!cameraOn);
  const toggleScreenShare = () => {
    setScreenSharing(!screenSharing);
    alert('Screen sharing ' + (!screenSharing ? 'started' : 'stopped') + ' (mock)');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Video className="w-8 h-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900">Video Call</h1>
        </div>
        {isCallActive && (
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-3xl text-sm font-medium">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            Live Call
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Remote Video (Investor/Entrepreneur) */}
        <div className="bg-black rounded-3xl overflow-hidden relative aspect-video shadow-2xl">
          <video
            ref={remoteVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
          {!isCallActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
              <div className="text-center">
                <User className="w-20 h-20 mx-auto text-gray-400 mb-4" />
                <p className="text-white text-xl font-medium">Waiting for other person...</p>
                <p className="text-gray-400 text-sm mt-2">Muhammad Ahmed (Investor)</p>
              </div>
            </div>
          )}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-2xl">
            Remote User
          </div>
        </div>

        {/* Local Video (You) */}
        <div className="bg-black rounded-3xl overflow-hidden relative aspect-video shadow-2xl">
          <video
            ref={localVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
          {!isCallActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
              <div className="text-center">
                <User className="w-20 h-20 mx-auto text-gray-400 mb-4" />
                <p className="text-white text-xl">You</p>
              </div>
            </div>
          )}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-2xl">
            You
          </div>
        </div>
      </div>

      {/* Call Controls */}
      <div className="mt-10 flex justify-center gap-4">
        {!isCallActive ? (
          <button
            onClick={startCall}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-3xl text-xl font-semibold flex items-center gap-3 shadow-lg transition"
          >
            <Video className="w-6 h-6" />
            Start Video Call
          </button>
        ) : (
          <>
            <button
              onClick={toggleMic}
              className={`px-8 py-4 rounded-3xl flex items-center gap-3 text-white transition ${micOn ? 'bg-gray-700' : 'bg-red-600'}`}
            >
              {micOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </button>

            <button
              onClick={toggleCamera}
              className={`px-8 py-4 rounded-3xl flex items-center gap-3 text-white transition ${cameraOn ? 'bg-gray-700' : 'bg-red-600'}`}
            >
              {cameraOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </button>

            <button
              onClick={toggleScreenShare}
              className={`px-8 py-4 rounded-3xl flex items-center gap-3 text-white transition ${screenSharing ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              <ScreenShare className="w-6 h-6" />
            </button>

            <button
              onClick={endCall}
              className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-3xl flex items-center gap-3 text-xl font-semibold transition"
            >
              <PhoneOff className="w-6 h-6" />
              End Call
            </button>
          </>
        )}
      </div>

      <p className="text-center text-gray-400 text-sm mt-8">
        Frontend Mock • Real WebRTC integration Week 2 mein add karenge
      </p>
    </div>
  );
};

export { VideoCallPage };