import React from "react"

// Lightweight framer-motion mock for jsdom tests.
// Renders motion.* as plain HTML elements, stubs hooks to return static values.
const motion = new Proxy({} as Record<string, React.FC<Record<string, unknown>>>, {
  get:
    (_, tag: string) =>
    ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) =>
      React.createElement(tag, props as React.HTMLAttributes<HTMLElement>, children),
})

const useInView = () => true
const useMotionValue = (initial: number) => ({ get: () => initial, set: () => {} })
const useTransform = (_: unknown, __: unknown, output: number[]) => ({
  get: () => output[0],
})
const animate = () => Promise.resolve()

export { motion, useInView, useMotionValue, useTransform, animate }
