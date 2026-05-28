import { motion } from 'framer-motion'

const Sun = () => {
  return (
    <motion.div
      className="absolute top-10 right-10 md:top-20 md:right-20"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
    >
      <div className="relative">
        {/* Sun rays */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-8 bg-gradient-to-t from-yellow-300 to-yellow-100 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: 'center center',
                transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-45px)`,
              }}
            />
          ))}
        </motion.div>
        
        {/* Sun body */}
        <motion.div
          className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400"
          animate={{
            boxShadow: [
              '0 0 30px rgba(251, 191, 36, 0.5)',
              '0 0 50px rgba(251, 191, 36, 0.7)',
              '0 0 30px rgba(251, 191, 36, 0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Smile */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex gap-3 mb-2">
              <div className="w-3 h-3 bg-orange-600 rounded-full" />
              <div className="w-3 h-3 bg-orange-600 rounded-full" />
            </div>
            <div className="w-8 h-4 border-b-4 border-orange-600 rounded-b-full" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export { Sun }
