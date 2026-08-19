export default function ApplicationLogo({ className = 'h-10 w-auto', ...props }) {
    return (
        <img
            src="/images/logo.png"
            alt="FitNinja AI Logo"
            className={`rounded-2xl border border-emerald-500/30 object-cover shadow-lg shadow-emerald-500/20 ${className}`}
            {...props}
        />
    );
}
