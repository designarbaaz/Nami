// @ts-nocheck
"use client";

export default function DrinksFoodPage() {
  return (
    <>
      <main>
      
          {/* Page Header */}
          <section className="menu-page-hero">
            <nav className="menu-breadcrumb" aria-label="Breadcrumb">
              <a href="/">HOME</a>
              <span className="crumb-sep">/</span>
              <span className="crumb-curr">DRINKS &amp; FOOD</span>
            </nav>
            <h1 className="menu-page-title"><span className="text-gradient">Drinks</span> &amp; Food</h1>
            <p className="menu-page-subhead">Bespoke nocturnal cocktails, Japanese robata plates &amp; seasonal desserts.</p>
          </section>
      
          {/* 20% Left Sticky Categories + 80% Right Open Menu Viewer */}
          <div className="menu-split-layout">
      
            {/* Left 20%: Sticky Side Navigation */}
            <aside className="menu-sidebar" aria-label="Menu Categories">
              <nav className="sidebar-nav" id="sidebarNav" role="tablist" aria-orientation="vertical">
                <a href="#cocktails" className="sidebar-nav-item active" data-target="cocktails" role="tab" aria-selected="true">Cocktails</a>
                <a href="#food" className="sidebar-nav-item" data-target="food" role="tab" aria-selected="false">Food</a>
                <a href="#desserts" className="sidebar-nav-item" data-target="desserts" role="tab" aria-selected="false">Desserts</a>
              </nav>
            </aside>
      
            {/* Right 80%: Open Menu Image Panels */}
            <div className="menu-panels" id="menuPanels">
      
              {/* Category 1: Cocktails */}
              <section className="menu-panel-section" id="cocktails" data-category="cocktails" aria-label="Cocktails Menu">
                <div className="menu-sheet-frame">
                  <img src="/assets/Menu-cocktails.avif" alt="Nami Cocktails Menu" className="menu-panel-img" loading="eager" />
                </div>
              </section>
      
              {/* Category 2: Food */}
              <section className="menu-panel-section" id="food" data-category="food" aria-label="Food Menu">
                <div className="menu-sheet-frame">
                  <img src="/assets/Menu-food.avif" alt="Nami Food Menu" className="menu-panel-img" loading="eager" />
                </div>
              </section>
      
              {/* Category 3: Desserts */}
              <section className="menu-panel-section" id="desserts" data-category="desserts" aria-label="Desserts Menu">
                <div className="menu-sheet-frame">
                  <img src="/assets/Menu-desserts.avif" alt="Nami Desserts Menu" className="menu-panel-img" loading="eager" />
                </div>
              </section>
      
            </div>
      
          </div>
      
        </main>
    </>
  );
}
