// @ts-nocheck
"use client";

export default function NotFoundPage() {
  return (
    <>
      <main className="error-stage" role="main" aria-labelledby="errorHeadline">
          <div className="error-bg-numerals-wrap" aria-hidden="true">
            <div className="error-bg-glow"></div>
            <div className="error-bg-numerals">404</div>
          </div>
      
          <div className="error-center-overlay">
            <nav className="header-breadcrumb" aria-label="Breadcrumb">
              <a href="/" className="breadcrumb-link">Home</a>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-active">404</span>
            </nav>
      
            <h1 className="error-center-msg" id="errorHeadline">Page Not <span className="text-gradient">Found</span></h1>
      
            <p className="error-subtitle">
              The page you are looking for doesn’t exist or has moved to another frequency.
            </p>
      
            <a href="/" className="btn-go-back" id="goBackBtn">
              <img src="/assets/Arrow-left.svg" alt="" aria-hidden="true" width="18" height="18" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
              <span>GO BACK</span>
            </a>
          </div>
        </main>
    </>
  );
}
