// @ts-nocheck
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <>
          <footer className="site-footer">
              <div className="footer-container">
                <div>
                  <img src="/assets/Main-logo.svg" alt="NAMI" className="footer-logo" />
                  <p style={{maxWidth: '340px', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem'}}>
                    A sensory provocateur in sound, dining, and nocturnal culture. 
                    Part listening room, part bar, part cultural gathering.
                  </p>

                  {/* WhatsApp Community Link (Replaces Newsletter) */}
                  <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-footer">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.586 1.761.882 2.796.882 3.183 0 5.769-2.587 5.77-5.767 0-3.181-2.587-5.768-5.77-5.768zm0 10.375c-.911 0-1.637-.251-2.457-.75l-.176-.107-1.579.414.421-1.54-.117-.186c-.544-.863-.834-1.572-.833-2.44 0-2.541 2.067-4.608 4.609-4.608 2.541 0 4.609 2.067 4.609 4.608 0 2.541-2.068 4.609-4.609 4.609z"/>
                    </svg>
                    Join WhatsApp Community
                  </a>
                </div>

                <div className="footer-col">
                  <h5>HOURS</h5>
                  <p>Wednesday – Sunday<br />7:00 PM – Late</p>
                  <p>Listening Sessions<br />8:30 PM Onwards</p>
                </div>

                <div className="footer-col">
                  <h5>LOCATION & CONTACT</h5>
                  <p>{siteConfig.address.street}, {siteConfig.address.locality},<br />{siteConfig.address.region} {siteConfig.address.postal}</p>
                  <p>{siteConfig.email}</p>
                </div>

                <div className="footer-col">
                  <h5>SOCIAL & GROUP</h5>
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">Instagram (@nami.hifi)</a>
                  <a href="#programming">Resident Advisor</a>
                  <a href="https://abnah.com/" target="_blank" style={{marginTop: '1rem', color: 'var(--c-orange)'}}>ABNAH Group →</a>
                </div>
              </div>

              <div className="footer-bottom-bar">
                <span>© 2026 NAMI HI-FI. ALL RIGHTS RESERVED.</span>
                <span>DESIGNED FOR SENSORY PROVOCATION</span>
              </div>
            </footer>
          <div id="toast">Copied to clipboard</div>
        </>
  );
}
