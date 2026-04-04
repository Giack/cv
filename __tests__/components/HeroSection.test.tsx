import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { HeroSection } from "@/components/sections/HeroSection"

describe("HeroSection", () => {
  test("renders the Download CV link with correct href and download attribute", () => {
    render(<HeroSection />)
    const link = screen.getByRole("link", { name: /download cv/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/cv/files/giacomo-sortino-cv.pdf")
    expect(link).toHaveAttribute("download")
  })
})
