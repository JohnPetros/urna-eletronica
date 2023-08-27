'use client'

import { motion } from 'framer-motion'

interface CloseTabButtonProps {
  onClose: () => void
}

export function CloseTabButton({ onClose }: CloseTabButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="p-2 self-start text-3xl -mt-2"
      aria-label="Parar de ver os candidatos desse partido"
    >
      ×
    </motion.button>
  )
}
