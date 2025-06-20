export const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-black via-[#00110f] to-black" />

    <div className="absolute inset-0">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
              linear-gradient(rgba(52, 211, 153, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(52, 211, 153, 0.08) 1px, transparent 1px)
            `,
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />
    </div>
  </div>
)
