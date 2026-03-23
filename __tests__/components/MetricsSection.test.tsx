import { describe, test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { MetricsSection } from "@/components/sections/MetricsSection"

vi.mock("framer-motion")

describe("MetricsSection", () => {
  test("renders the Impact section heading", () => {
    render(<MetricsSection />)
    expect(screen.getByText("Impact")).toBeInTheDocument()
  })

  test("renders all six metric labels", () => {
    render(<MetricsSection />)
    expect(screen.getByText("↓ platform incidents")).toBeInTheDocument()
    expect(screen.getByText("↑ feature delivery speed")).toBeInTheDocument()
    expect(screen.getByText("B2C revenue growth")).toBeInTheDocument()
    expect(screen.getByText("↓ JS bundle size")).toBeInTheDocument()
    expect(screen.getByText("person org led")).toBeInTheDocument()
    expect(screen.getByText("↑ test coverage")).toBeInTheDocument()
  })

  test("renders metric suffixes as static spans", () => {
    render(<MetricsSection />)
    // Three metrics use "%", one uses "×", one uses "pp"
    const percentSigns = screen.getAllByText("%")
    expect(percentSigns.length).toBeGreaterThanOrEqual(3)
    expect(screen.getByText("×")).toBeInTheDocument()
    expect(screen.getByText("pp")).toBeInTheDocument()
  })

  test("AnimatedCounter spans start at 0 before animation runs", () => {
    render(<MetricsSection />)
    // Each AnimatedCounter renders <span ref={ref}>0</span> initially;
    // the mock animate() never calls onUpdate, so textContent stays "0"
    const zeros = screen.getAllByText("0")
    expect(zeros.length).toBeGreaterThanOrEqual(6)
  })
})
