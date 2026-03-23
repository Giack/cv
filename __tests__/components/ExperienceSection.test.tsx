import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ExperienceSection } from "@/components/sections/ExperienceSection"

describe("ExperienceSection", () => {
  test("renders the Experience heading", () => {
    render(<ExperienceSection />)
    expect(screen.getByText("Experience")).toBeInTheDocument()
  })

  test("renders role and company names from cv data", () => {
    render(<ExperienceSection />)
    expect(screen.getByText("Director of Product and Engineering")).toBeInTheDocument()
    expect(screen.getAllByText("QA Ltd").length).toBeGreaterThanOrEqual(1)
  })

  test("expandable cards render a toggle button", () => {
    render(<ExperienceSection />)
    // CollapsibleTrigger on expandable cards renders as role="button"
    const buttons = screen.getAllByRole("button")
    expect(buttons.length).toBeGreaterThan(0)
  })

  test("first card starts collapsed (aria-expanded false)", () => {
    render(<ExperienceSection />)
    const [firstTrigger] = screen.getAllByRole("button")
    expect(firstTrigger).toHaveAttribute("aria-expanded", "false")
  })

  test("clicking trigger expands the card (aria-expanded true)", async () => {
    const user = userEvent.setup()
    render(<ExperienceSection />)
    const [firstTrigger] = screen.getAllByRole("button")

    await user.click(firstTrigger)

    expect(firstTrigger).toHaveAttribute("aria-expanded", "true")
  })

  test("clicking trigger again collapses the card", async () => {
    const user = userEvent.setup()
    render(<ExperienceSection />)
    const [firstTrigger] = screen.getAllByRole("button")

    await user.click(firstTrigger)
    await user.click(firstTrigger)

    expect(firstTrigger).toHaveAttribute("aria-expanded", "false")
  })
})
