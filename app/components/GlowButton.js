export default function GlowButton({ href, children, icon = '🚀', className = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group relative inline-flex items-stretch overflow-hidden rounded-xl p-[1.5px] shadow-[0_0_25px_-6px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_40px_-4px_rgba(168,85,247,0.65)] ${className}`}
      style={{ backgroundImage: 'linear-gradient(135deg,#22d3ee,#3b82f6,#a855f7)' }}
    >
      <span className="flex w-full items-stretch divide-x divide-white/10 rounded-[10px] bg-[#040610]">
        {icon && <span className="flex shrink-0 items-center justify-center px-2.5 text-xs sm:text-sm">{icon}</span>}
        <span className="flex w-full items-center justify-center px-3 py-3 font-display text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-white text-center">
          {children}
        </span>
      </span>
    </a>
  );
}
