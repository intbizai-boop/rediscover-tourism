/**
 * Luxury CTA button. Renders as <a> when href is provided (navigation),
 * otherwise a real <button> (actions). Pill shape, calm hover states.
 */
export default function Button({
  children,
  href,
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium tracking-wide ' +
    'transition-[background-color,color,border-color,transform] duration-300 ease-out ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-ivory [touch-action:manipulation] hover:-translate-y-0.5';

  const variants = {
    primary: 'bg-forest text-sand hover:bg-forest/90',
    secondary:
      'border border-forest/30 bg-sand/10 text-forest hover:bg-sand/30 hover:border-forest/60',
    dark: 'bg-charcoal text-sand hover:bg-charcoal/90 shadow-sm',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
