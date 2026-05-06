export default function SummaryCard({ title, count, variant }) {
  const styles = {
    completed: "bg-card-mint-bg text-card-mint-text border-card-mint-text/20",
    inProgress: "bg-card-peach-bg text-card-peach-text border-card-peach-text/20",
    todo: "bg-card-purple-bg text-card-purple-text border-card-purple-text/20",
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border p-6 shadow-sm flex flex-col justify-between h-[120px] ${styles[variant]}`}>
      {/* Decorative circle */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-black/5 rounded-full" />
      
      <h3 className="text-sm font-bold tracking-widest uppercase opacity-90 z-10">
        {title}
      </h3>
      <div className="text-5xl font-black z-10 leading-none tracking-tight mt-2">
        {count}
      </div>
    </div>
  );
}
