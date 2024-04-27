function Kidney() {
  return (
    <div>
      <div className="sketchfab-embed-wrapper">
        <iframe
          title="Kidney"
          allowFullScreen
          mozAllowFullScreen="true"
          webkitAllowFullScreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          src="https://sketchfab.com/models/3aef2741ea754fb486451292b87e159a/embed"
          style={{ width: '100%', height: '250px', borderRadius:"0.6rem" }}
        />
      </div>
    </div>
  );
}

export default Kidney;
