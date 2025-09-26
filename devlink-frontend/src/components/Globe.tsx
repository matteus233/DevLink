import "../styles.css";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";


export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let phi = 0;

    let globe: ReturnType<typeof createGlobe> | undefined;

    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 1000 * 2,
        height: 1000 * 2,
        phi: 0,
        theta: 0,
        dark: 1,
        diffuse: 0.8,
        mapSamples: 16000,
        mapBrightness: 2,
        baseColor: [0.17, 0.32, 0.40],
        markerColor: [0.6, 0.8, 0.35],
        glowColor: [0.4, 0.6, 0.25],
        markers: [
          { location: [-23.401453321776923, -46.4672114900612], size: 0.06 }
        ],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.003;
        }
      });
    }

    return () => {
      if (globe) {
        globe.destroy();
      }
    };
  }, []);

  return (
    <div className="Globe">
      <canvas
        ref={canvasRef}
        style={{
          width: "1000px",
          height: "1000px",
          maxWidth: "100%",
          aspectRatio: 1
        }}
      />
    </div>
  );
}
