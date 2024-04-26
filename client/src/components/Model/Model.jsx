

function Model() {
  return (
    <div>
    
      <div className="sketchfab-embed-wrapper">
        <iframe
          title="Heart"
          frameBorder="0"
          allowFullScreen
          mozAllowFullScreen
          webkitAllowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          src="https://sketchfab.com/models/40973a6b8f6d485c8d78e536ac2ec168/embed"
          style={{ width: '100%', height: '400px' }} // Update inline style here
        />
      </div>
      {/* <ThreeDModel /> */}
    </div>
  );
}

export default Model;
