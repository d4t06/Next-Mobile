

export default function Skeleton ({className}: {className?: string}) {
     return <div className={`bg-[#f1f1f1] duration-[.1s] animate-pulse rounded-[6px] ${className}`}></div>
}