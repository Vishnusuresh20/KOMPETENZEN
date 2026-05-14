export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground tracking-[0.2em] uppercase opacity-50 mb-8">
          Access Restricted · Login Required
        </p>
        <a 
          href="/" 
          className="text-[11px] text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-widest transition-colors"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}
