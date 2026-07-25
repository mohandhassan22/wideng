export function WaveDivider() {
  return (
    <div className="w-full overflow-hidden leading-none">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-16"
      >
        <path
          d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z"
          fill="#ffffff"
          opacity="0.3"
        />
        <path
          d="M0,70 C300,30 600,110 900,70 C1050,50 1150,90 1200,70 L1200,120 L0,120 Z"
          fill="#ffffff"
          opacity="0.5"
        />
        <path
          d="M0,80 C300,50 600,100 900,80 C1050,70 1150,100 1200,80 L1200,120 L0,120 Z"
          fill="#ffffff"
        />
      </svg>
    </div>
  );
}
