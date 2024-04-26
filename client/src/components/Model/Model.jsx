function Model() {
  return (
    <div>
      <div className="sketchfab-embed-wrapper">
        <iframe
          title="Brain Project"
          allowFullScreen
          mozAllowFullScreen
          webkitAllowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          src="https://sketchfab.com/models/24ec03412dd8432bb0d3e750a72608e0/embed"
          style={{ width: '90%', height: '250px' }}
        />
      </div>

      {/* <ThreeDModel /> */}
    </div>
  );
}

export default Model;
