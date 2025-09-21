export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={` bg-[#e0e0e0] dark:bg-[#3a3a3a] duration-[.1s] animate-pulse rounded-[6px] ${className}`}
    ></div>
  );
}
