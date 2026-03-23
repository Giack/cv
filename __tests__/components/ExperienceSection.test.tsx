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

  test("expandable cards render a details element", () => {
    const { container } = render(<ExperienceSection />)
    const details = container.querySelectorAll("details")
    expect(details.length).toBeGreaterThan(0)
  })

  test("expandable card is collapsed by default (no open attribute)", () => {
    const { container } = render(<ExperienceSection />)
    const [firstDetails] = container.querySelectorAll("details")
    expect(firstDetails).not.toHaveAttribute("open")
  })

  test("clicking summary expands the card", async () => {
    const user = userEvent.setup()
    const { container } = render(<ExperienceSection />)
    const [firstDetails] = container.querySelectorAll("details")
    const summary = firstDetails.querySelector("summary")!

    await user.click(summary)

    expect(firstDetails).toHaveAttribute("open")
  })

  test("clicking summary again collapses the card", async () => {
    const user = userEvent.setup()
    const { container } = render(<ExperienceSection />)
    const [firstDetails] = container.querySelectorAll("details")
    const summary = firstDetails.querySelector("summary")!

    await user.click(summary)
    await user.click(summary)

    expect(firstDetails).not.toHaveAttribute("open")
  })
})
