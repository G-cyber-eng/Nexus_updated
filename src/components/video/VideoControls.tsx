// VideoControls.tsx
import React from 'react';

interface VideoControlsProps {
  callStarted: boolean;
  videoEnabled: boolean;
  audioEnabled: boolean;
  screenSharing: boolean;
  onStartCall: () => void;
  onEndCall: () => void;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
  onToggleScreenShare: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  callStarted,
  videoEnabled,
  audioEnabled,
  screenSharing,
  onStartCall,
  onEndCall,
  onToggleVideo,
  onToggleAudio,
  onToggleScreenShare,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {!callStarted ? (
        <button
          onClick={onStartCall}
          className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg rounded-2xl transition-all active:scale-95 shadow-lg flex items-center gap-2"
        >
          <span></span>
          Start Call
        </button>
      ) : (
        <>
          <button
            onClick={onEndCall}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-2xl transition-all active:scale-95 shadow-lg"
          >
            End Call
          </button>

          <button
            onClick={onToggleVideo}
            className={`px-7 py-4 font-semibold rounded-2xl transition-all active:scale-95 shadow-md ${
              videoEnabled
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            {videoEnabled ? 'Turn Off Video' : 'Turn On Video'}
          </button>

          <button
            onClick={onToggleAudio}
            className={`px-7 py-4 font-semibold rounded-2xl transition-all active:scale-95 shadow-md ${
              audioEnabled
                ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            {audioEnabled ? 'Mute' : 'Unmute'}
          </button>

          <button
            onClick={onToggleScreenShare}
            className={`px-7 py-4 font-semibold rounded-2xl transition-all active:scale-95 shadow-md ${
              screenSharing
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {screenSharing ? 'Stop Sharing' : 'Share Screen'}
          </button>
        </>
      )}
    </div>
  );
};

export default VideoControls;