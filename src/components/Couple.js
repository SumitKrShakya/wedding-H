import { motion } from "framer-motion";
import CoverFlow from "./CoverFlow";
import { SectionHeading } from "./Ornaments";

const PHOTOS = [1, 2, 3, 4].map((n) => `/images/couple/couple-0${n}.jpg`);

export default function Couple() {
  return (
    <section id="couple" className="relative py-24 md:py-32 bg-ivory overflow-hidden" data-testid="couple-section">
      <SectionHeading
        eyebrow="Meet us"
        title="The Happy Couple"
        sub="A few glimpses of our journey together."
      />
      <div className="max-w-5xl mx-auto mt-14 px-2">
        <CoverFlow
          items={PHOTOS}
          testidPrefix="couple"
          cardHeight={420}
          renderItem={(src, i) => (
            <div
              className="royal-frame rounded-lg overflow-hidden bg-ivory shadow-gold-soft aspect-[3/4]"
              data-testid={`couple-photo-${i + 1}`}
            >
              <img
                src={src}
                alt="Tanishk and Aishwarya"
                loading="lazy"
                decoding="async"
                draggable={false}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        />
      </div>
    </section>
  );
}
