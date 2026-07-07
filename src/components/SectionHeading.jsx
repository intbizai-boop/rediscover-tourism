import { motion } from 'framer-motion';
import { fadeUp } from '../lib/motion.js';

/**
 * Editorial section heading: micro label + Playfair headline + optional sub copy.
 * Centred by default; pass align="left" for left-aligned blocks.
 */
export default function SectionHeading({
  label,
  title,
  children,
  align = 'center',
  as: Tag = 'h2',
  className = '',
}) {
  const alignment =
    align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={`flex max-w-2xl flex-col gap-6 ${alignment} ${
        align === 'center' ? 'mx-auto' : ''
      } ${className}`}
    >
      {label && <span className="micro-label">{label}</span>}
      <Tag className="text-balance font-display text-3xl font-medium leading-tight text-cream md:text-4xl lg:text-5xl">
        {title}
      </Tag>
      {children && (
        <p className="text-pretty text-base leading-relaxed text-cream/70 md:text-lg">
          {children}
        </p>
      )}
    </motion.div>
  );
}
