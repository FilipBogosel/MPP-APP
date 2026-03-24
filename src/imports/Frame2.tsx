import svgPaths from "./svg-gwzlv53g56";

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[-2.47%_-3.23%_-3.71%_-3.23%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 659 687">
          <g id="Frame 2">
            <g filter="url(#filter0_d_33_181)" id="Rectangle 2">
              <path d={svgPaths.p21071a80} fill="var(--fill-0, white)" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="687" id="filter0_d_33_181" width="659" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="10" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_33_181" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_33_181" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}