'use client'
export default function Shimmer({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-neutral-200/80 dark:bg-neutral-800/60 ${className}`}
    />
  )
}
