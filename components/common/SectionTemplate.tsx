/**
 * Copy this file to create a reusable section.
 *
 * 1. Duplicate → components/common/MySection.tsx (shared)
 *    or components/home/sections/MySection.tsx (home only)
 * 2. Rename the function
 * 3. Import it in a page (or HomePage)
 * 4. Add any styles to public/assets/css/custom.css
 * 5. Add any behaviour to public/assets/js/custom.js
 */
export default function SectionTemplate() {
  return (
    <section id="section-template" className="section-block">
      <h2 className="section-heading">Section title</h2>
      <p className="section-body">Replace this markup with your content.</p>
    </section>
  );
}
