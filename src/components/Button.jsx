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
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-ink [touch-action:manipulation] hover:-translate-y-0.5';

  const variants = {
    primary: 'bg-gold text-ink hover:bg-sunset-gold',
    secondary:
      'border border-hairline bg-glass text-cream backdrop-blur-sm hover:border-gold/60 hover:text-sunset-gold',
    dark: 'bg-ink text-cream hover:bg-ink-soft hover:text-sunset-gold shadow-lg',
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
