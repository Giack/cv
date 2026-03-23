import "@testing-library/jest-dom"

// ResizeObserver is used by Radix UI but not available in jsdom
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
