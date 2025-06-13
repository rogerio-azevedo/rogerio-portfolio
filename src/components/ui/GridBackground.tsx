import { cn } from '@/lib/utils'

export function GridBackground() {
  return (
    <div className="bg-black-100 bg-grid-white/[0.05] absolute top-0 left-0 z-0 flex h-screen w-full items-center justify-center">
      <div
        className={cn(
          'absolute inset-0',
          '[background-size:80px_80px]',
          '[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]',
        )}
      />
      <div className="bg-black-100 pointer-events-none absolute inset-0 flex items-center justify-center"></div>
    </div>
  )
}
