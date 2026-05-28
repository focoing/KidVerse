import { motion } from 'framer-motion'

const clouds = [
  { id: 1, top: 10, left: 5, size: 'w-32 h-16', delay: 0 },
  { id: 2, top: 20, left: 25, size: 'w-40 h-20', delay: 2 },
  { id: 3, top: 15, left: 50, size: 'w-28 h-14', delay: 4 },
  { id: 4, top: 8, left: 70, size: 'w-36 h-18', delay: 1 },
  { id: 5, top: 25, left: 85, size: 'w-24 h-12', delay: 3 },
]

const Clouds = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className={`absolute ${cloud.size}`}
          style={{
            top: `${cloud.top}%`,
            left: `${cloud.left}%`,
          }}
          animate={{
            x: [-50, 50, -50],
          }}
          transition={{
            duration: 20 + cloud.id * 2,
            delay: cloud.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <ellipse cx="25" cy="35" rx="20" ry="12" fill="white" opacity="0.9" />
            <ellipse cx="50" cy="25" rx="25" ry="18" fill="white" opacity="0.95" />
            <ellipse cx="75" cy="35" rx="20" ry="12" fill="white" opacity="0.9" />
            <ellipse cx="40" cy="30" rx="18" ry="14" fill="white" opacity="0.98" />
            <ellipse cx="60" cy="30" rx="18" ry="14" fill="white" opacity="0.98" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

export { Clouds }
