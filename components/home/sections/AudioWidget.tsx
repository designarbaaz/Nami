// @ts-nocheck

export default function AudioWidget() {
  return (
    <div className="now-playing-widget" aria-label="Music Player">
      <button
        className="btn-audio-toggle"
        id="audioToggleBtn"
        onClick={(e) => {
          const event = e;
          (window as any).toggleAudio?.();
        }}
        aria-label="Play/Pause track"
      >
        <svg id="playIcon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
        <svg
          id="pauseIcon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ display: "none" }}
        >
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      </button>

      <div className="now-playing-text">
        <span className="track-title">On & On</span>
        <span className="track-artist">Erykah Badu</span>
      </div>

      <div className="audio-badge-circle" title="Horn Sound System Active">
        <div className="waveform-bars" id="eqBars">
          <div className="waveform-bar"></div>
          <div className="waveform-bar"></div>
          <div className="waveform-bar"></div>
          <div className="waveform-bar"></div>
        </div>
      </div>
    </div>
  );
}
