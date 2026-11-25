// @ts-nocheck
"use client";

export default function Hero() {
  return (
    <>
      <section id="hero" className="hero-entrance">
          {/* Looping Vinyl Video Background (Safari-Optimized, Audio-Free, Zero Ghost Logo) */}
          <video className="hero-bg-media" autoPlay muted loop playsInline disablePictureInPicture preload="auto">
            <source src="/assets/vinyl-loop.mp4" type="video/mp4" />
          </video>
      
          <div className="hero-content">
            {/* Huge Big Center Logo (Max 1024px) */}
            <svg className="hero-big-logo" id="heroMainLogo" width="842" height="171" viewBox="-10 -10 842 171" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="NAMI">
      <defs>
      <style>{`
        .nami-letter { transform-box: fill-box; transform-origin: 50% 50%; will-change: transform; overflow: visible !important; }
        .nami-letter-i-dot { animation: logoWave_i_dot 2000ms infinite cubic-bezier(0.42, 0, 0.58, 1); }
        .nami-letter-n { animation: logoWave_n 2000ms infinite cubic-bezier(0.42, 0, 0.58, 1); }
        .nami-letter-m { animation: logoWave_m 2000ms infinite cubic-bezier(0.42, 0, 0.58, 1); }
        .nami-letter-a { animation: logoWave_a 2000ms infinite cubic-bezier(0.42, 0, 0.58, 1); }
        .nami-letter-i-stem { animation: logoWave_i_stem 2000ms infinite cubic-bezier(0.42, 0, 0.58, 1); }
        @keyframes logoWave_i_dot {
          0.00% { transform: translateY(0.000px) scaleY(1.0000); }
          4.96% { transform: translateY(-0.207px) scaleY(1.0450); }
          10.60% { transform: translateY(0.069px) scaleY(0.9850); }
          16.46% { transform: translateY(-0.161px) scaleY(1.0350); }
          23.00% { transform: translateY(0.046px) scaleY(0.9900); }
          31.57% { transform: translateY(0.000px) scaleY(1.0000); }
          36.53% { transform: translateY(-0.207px) scaleY(1.0450); }
          42.17% { transform: translateY(0.069px) scaleY(0.9850); }
          48.03% { transform: translateY(-0.161px) scaleY(1.0350); }
          54.57% { transform: translateY(0.046px) scaleY(0.9900); }
          55.00% { transform: translateY(0.000px) scaleY(1.0000); }
          59.96% { transform: translateY(-0.207px) scaleY(1.0450); }
          65.60% { transform: translateY(0.069px) scaleY(0.9850); }
          71.46% { transform: translateY(-0.161px) scaleY(1.0350); }
          78.00% { transform: translateY(0.046px) scaleY(0.9900); }
          86.57% { transform: translateY(0.000px) scaleY(1.0000); }
          91.53% { transform: translateY(-0.207px) scaleY(1.0450); }
          97.17% { transform: translateY(0.069px) scaleY(0.9850); }
          100.00% { transform: translateY(0.000px) scaleY(1.0000); }
        }
        @keyframes logoWave_n {
          0.00% { transform: translateY(0.000px) scaleY(1.0000); }
          4.06% { transform: translateY(-0.731px) scaleY(1.0250); }
          9.47% { transform: translateY(0.292px) scaleY(0.9900); }
          15.33% { transform: translateY(-1.169px) scaleY(1.0400); }
          21.65% { transform: translateY(0.438px) scaleY(0.9850); }
          31.57% { transform: translateY(0.000px) scaleY(1.0000); }
          35.63% { transform: translateY(-0.731px) scaleY(1.0250); }
          41.04% { transform: translateY(0.292px) scaleY(0.9900); }
          46.90% { transform: translateY(-1.169px) scaleY(1.0400); }
          53.22% { transform: translateY(0.438px) scaleY(0.9850); }
          55.00% { transform: translateY(0.000px) scaleY(1.0000); }
          59.06% { transform: translateY(-0.731px) scaleY(1.0250); }
          64.47% { transform: translateY(0.292px) scaleY(0.9900); }
          70.33% { transform: translateY(-1.169px) scaleY(1.0400); }
          76.65% { transform: translateY(0.438px) scaleY(0.9850); }
          86.57% { transform: translateY(0.000px) scaleY(1.0000); }
          90.63% { transform: translateY(-0.731px) scaleY(1.0250); }
          96.04% { transform: translateY(0.292px) scaleY(0.9900); }
          100.00% { transform: translateY(0.000px) scaleY(1.0000); }
        }
        @keyframes logoWave_m {
          0.00% { transform: translateY(0.000px) scaleY(1.0000); }
          5.64% { transform: translateY(-0.829px) scaleY(1.0350); }
          11.73% { transform: translateY(0.237px) scaleY(0.9900); }
          17.59% { transform: translateY(-0.592px) scaleY(1.0250); }
          24.35% { transform: translateY(0.237px) scaleY(0.9900); }
          31.57% { transform: translateY(0.000px) scaleY(1.0000); }
          37.21% { transform: translateY(-0.829px) scaleY(1.0350); }
          43.30% { transform: translateY(0.237px) scaleY(0.9900); }
          49.16% { transform: translateY(-0.592px) scaleY(1.0250); }
          55.00% { transform: translateY(0.000px) scaleY(1.0000); }
          60.64% { transform: translateY(-0.829px) scaleY(1.0350); }
          66.73% { transform: translateY(0.237px) scaleY(0.9900); }
          72.59% { transform: translateY(-0.592px) scaleY(1.0250); }
          79.35% { transform: translateY(0.237px) scaleY(0.9900); }
          86.57% { transform: translateY(0.000px) scaleY(1.0000); }
          92.21% { transform: translateY(-0.829px) scaleY(1.0350); }
          98.30% { transform: translateY(0.237px) scaleY(0.9900); }
          100.00% { transform: translateY(0.000px) scaleY(1.0000); }
        }
        @keyframes logoWave_a {
          0.00% { transform: translateY(0.000px) scaleY(1.0000); }
          3.61% { transform: translateY(-0.355px) scaleY(1.0200); }
          8.57% { transform: translateY(0.178px) scaleY(0.9900); }
          14.43% { transform: translateY(-0.622px) scaleY(1.0350); }
          20.75% { transform: translateY(0.178px) scaleY(0.9900); }
          31.57% { transform: translateY(0.000px) scaleY(1.0000); }
          35.18% { transform: translateY(-0.355px) scaleY(1.0200); }
          40.14% { transform: translateY(0.178px) scaleY(0.9900); }
          46.00% { transform: translateY(-0.622px) scaleY(1.0350); }
          52.32% { transform: translateY(0.178px) scaleY(0.9900); }
          55.00% { transform: translateY(0.000px) scaleY(1.0000); }
          58.61% { transform: translateY(-0.355px) scaleY(1.0200); }
          63.57% { transform: translateY(0.178px) scaleY(0.9900); }
          69.43% { transform: translateY(-0.622px) scaleY(1.0350); }
          75.75% { transform: translateY(0.178px) scaleY(0.9900); }
          86.57% { transform: translateY(0.000px) scaleY(1.0000); }
          90.18% { transform: translateY(-0.355px) scaleY(1.0200); }
          95.14% { transform: translateY(0.178px) scaleY(0.9900); }
          100.00% { transform: translateY(0.000px) scaleY(1.0000); }
        }
        @keyframes logoWave_i_stem {
          0.00% { transform: translateY(0.000px) scaleY(1.0000); }
          6.31% { transform: translateY(-0.743px) scaleY(1.0500); }
          12.63% { transform: translateY(0.223px) scaleY(0.9850); }
          18.49% { transform: translateY(-0.446px) scaleY(1.0300); }
          24.81% { transform: translateY(0.149px) scaleY(0.9900); }
          31.57% { transform: translateY(0.000px) scaleY(1.0000); }
          37.88% { transform: translateY(-0.743px) scaleY(1.0500); }
          44.20% { transform: translateY(0.223px) scaleY(0.9850); }
          50.06% { transform: translateY(-0.446px) scaleY(1.0300); }
          55.00% { transform: translateY(0.000px) scaleY(1.0000); }
          61.31% { transform: translateY(-0.743px) scaleY(1.0500); }
          67.63% { transform: translateY(0.223px) scaleY(0.9850); }
          73.49% { transform: translateY(-0.446px) scaleY(1.0300); }
          79.80% { transform: translateY(0.149px) scaleY(0.9900); }
          86.57% { transform: translateY(0.000px) scaleY(1.0000); }
          92.88% { transform: translateY(-0.743px) scaleY(1.0500); }
          100.00% { transform: translateY(0.000px) scaleY(1.0000); }
        }
      `}</style>
      </defs>
      <g className="nami-letter nami-letter-i-dot">
        <path d="M780.391 11.7857C780.391 18.2947 775.956 23.5715 770.488 23.5715C765.019 23.5715 760.568 18.2789 760.568 11.7857C760.568 5.29252 765.019 0 770.488 0C775.956 0 780.391 5.27672 780.391 11.7857Z" fill="white"/>
      </g>
      <g className="nami-letter nami-letter-n">
        <path d="M171.404 149.265C171.308 150.055 170.609 150.639 169.846 150.639C169.766 150.639 169.703 150.639 169.639 150.639C136.782 146.563 118.835 126.31 109.599 110.021C105.148 102.201 102.541 94.8862 100.236 88.4088C99.5365 86.4498 98.853 84.5539 98.1694 82.7371C87.3917 54.6315 68.3161 39.4016 47.1264 41.9768C27.7647 44.3466 12.3929 61.3459 9.73823 83.3375C6.55897 109.516 5.63698 125.488 5.06472 135.03C4.715 141.018 4.50834 144.636 3.96787 146.816C3.92018 146.99 3.8407 147.164 3.74532 147.322L3.45919 147.748C3.04588 148.333 2.28286 148.57 1.59932 148.317C0.931674 148.064 0.502474 147.385 0.581956 146.674C0.788608 144.746 0.677333 141.35 0.502474 135.726C0.152755 124.003 -0.530786 102.138 0.725022 62.3412C1.90135 25.4515 29.5291 2.14861 55.5832 0.947918C68.7135 0.347573 80.6358 5.16614 90.0941 14.8981C100.824 25.9255 107.628 42.435 110.346 63.9368C110.696 66.7806 110.95 69.9877 111.204 73.3528C111.745 80.5885 112.381 88.7722 114.352 98.2829C118.453 118.015 135.51 142.756 170.053 147.495C170.911 147.622 171.515 148.412 171.404 149.265Z" fill="white"/>
      </g>
      <g className="nami-letter nami-letter-m">
        <path d="M698.636 147.954C700.528 148.364 703.151 148.759 704.422 148.87C704.74 148.902 705.074 148.87 705.408 148.87C706.203 148.838 706.934 148.159 706.982 147.369C707.029 146.5 706.378 146.058 705.456 145.9C703.882 145.647 701.72 145.236 699.956 144.794C698.795 144.51 693.629 142.819 692.055 142.156C664.539 130.654 657.958 104.918 657.958 104.918C648.769 72.0099 644.032 47.4905 624.893 47.0956C612.891 46.7954 602.034 59.1657 592.465 86.2602C591.05 90.2889 582.212 118.932 574.311 118.489C565.377 117.984 559.623 82.3106 557.461 71.7887C550.657 38.4379 534.205 29.2906 523.729 29.0852C503.016 28.706 490.983 49.4338 481.572 82.3738C479.013 91.3316 475.039 102.517 473.195 107.415C459.285 144.431 433.978 146.548 429.13 147.306C428.272 147.432 427.699 148.222 427.811 149.075C427.906 149.865 428.605 150.45 429.368 150.45C429.432 150.45 429.496 150.45 429.559 150.45C455.438 147.653 469.252 138.364 485.085 108.505C492.525 94.4755 503.954 69.4663 523.236 69.4663C538.624 69.4663 546.858 87.1607 551.087 101.458C560.291 132.692 573.31 144.304 587.473 123.497C591.924 116.957 600.174 99.6416 602.352 95.8342C607.852 86.2128 618.741 72.4523 630.52 79.1825C639.883 84.5382 646.21 100.684 651.408 111.017C656.829 121.791 669.959 141.855 698.652 148.001" fill="white"/>
      </g>
      <g className="nami-letter nami-letter-a">
        <path d="M419.275 148.775C419.211 149.613 418.48 150.229 417.638 150.213C404.714 149.676 389.803 141.208 383.445 137.574C382.348 136.958 381.505 136.468 380.933 136.168C371.522 131.381 363.654 126.341 356.039 121.459C330.796 105.313 312.563 93.6382 269.866 113.781C264.063 116.53 257.8 119.674 251.203 122.976C226.882 135.157 199.318 148.965 180.878 150.734H180.719C179.956 150.734 179.288 150.197 179.161 149.439C179.018 148.633 179.559 147.875 180.369 147.733C182.038 147.448 183.072 147.243 184.534 146.895C194.883 144.431 205.819 141.524 227.295 124.24C227.327 124.208 227.359 124.193 227.391 124.161C234.019 119.232 241.491 110.385 249.423 101.016C258.897 89.8308 268.673 78.2504 278.179 71.9784C293.662 61.7567 306.077 58.0598 317.3 60.3506C334.818 63.9369 349.156 81.5523 371.077 114.966C371.856 116.135 372.476 117.052 372.953 117.747C373.001 117.778 373.064 117.842 373.096 117.889C373.668 118.616 374.257 119.342 374.845 120.053C377.579 123.355 380.281 126.246 383.111 128.885C383.143 128.916 383.159 128.932 383.19 128.948C385.702 131.191 401.296 145.394 417.94 147.053C418.782 147.132 419.386 147.906 419.307 148.759" fill="white"/>
      </g>
      <g className="nami-letter nami-letter-i-stem">
        <path d="M821.054 147.338C821.054 148.206 820.355 148.902 819.497 148.917C804.602 149.107 791.408 140.718 785.033 131.571C784.159 130.322 781.838 126.294 781.6 125.852C778.786 120.654 772.857 102.675 766.228 112.691C765.624 113.592 764.448 115.235 763.812 116.341C759.456 124.05 749.283 135.899 736.756 142.124C732.973 143.988 729.317 145.426 725.947 146.563C723.689 147.401 719.858 148.175 716.949 148.759C716.806 148.791 715.63 148.933 715.503 148.933C714.803 148.933 714.168 148.475 713.977 147.796C713.738 146.958 714.199 146.105 715.026 145.852L718.221 145.3C720.145 144.952 722.195 144.446 724.643 143.625C749.871 134.256 755.069 114.034 760.108 94.4123L760.33 93.5592C760.521 92.8483 760.712 92.011 760.935 91.1104C763.319 81.2047 765.862 72.3575 771.076 72.8473C771.124 72.8473 771.172 72.8473 771.235 72.8789C776.116 73.653 779.486 86.4183 783.984 109.611C784.747 113.544 785.463 116.562 785.812 117.778C791.487 137.511 805.079 143.467 810.722 144.699C810.769 144.699 810.833 144.699 810.881 144.731H810.913C813.122 145.268 815.443 145.584 817.811 145.679H817.843C817.843 145.679 817.923 145.679 817.955 145.679C818.559 145.71 819.067 145.726 819.512 145.742C820.371 145.773 821.07 146.469 821.07 147.322" fill="white"/>
      </g>
      </svg>
      
      
            {/* Short Subtitle Uppercase */}
            <p className="hero-welcome-strap">
              LISTENING BAR · DRINKS · FOOD
            </p>
          </div>
      
          {/* Scroll down indicator with custom wave arrow */}
          <a href="/#philosophy" className="hero-scroll-cue">
            <span>SCROLL TO EXPLORE</span>
            <img src="/assets/down-arrow-flat.svg" alt="Scroll Down" className="cue-wave-arrow" />
          </a>
        </section>
    </>
  );
}
