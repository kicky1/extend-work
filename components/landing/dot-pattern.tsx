export function DotPattern({
  id,
  size = 40,
  dotRadius = 1,
  dotX,
  dotY,
  opacity = 0.02,
  fill = '#1a4a4a',
  className,
}: {
  id: string
  size?: number
  dotRadius?: number
  dotX?: number
  dotY?: number
  opacity?: number
  fill?: string
  className?: string
}) {
  const cx = dotX ?? dotRadius
  const cy = dotY ?? dotRadius

  return (
    <div className={className ?? 'absolute inset-0'} style={{ opacity }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
            <circle cx={cx} cy={cy} r={dotRadius} fill={fill} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  )
}
