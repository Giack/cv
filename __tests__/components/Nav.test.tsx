import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Nav } from "@/components/Nav"

describe("Nav", () => {
  test("renders all five navigation links", () => {
    render(<Nav />)
    expect(screen.getByText("About")).toBeInTheDocument()
    expect(screen.getByText("AI Lab")).toBeInTheDocument()
    expect(screen.getByText("Metrics")).toBeInTheDocument()
    expect(screen.getByText("Experience")).toBeInTheDocument()
    expect(screen.getByText("Skills")).toBeInTheDocument()
  })

  test("hamburger button is collapsed by default", () => {
    render(<Nav />)
    const hamburger = screen.getByRole("button", { name: /toggle menu/i })
    expect(hamburger).toHaveAttribute("aria-expanded", "false")
  })

  test("clicking hamburger opens the mobile menu", async () => {
    const user = userEvent.setup()
    render(<Nav />)
    const hamburger = screen.getByRole("button", { name: /toggle menu/i })

    await user.click(hamburger)

    expect(hamburger).toHaveAttribute("aria-expanded", "true")
    // Mobile dropdown adds a second set of links
    expect(screen.getAllByText("About").length).toBe(2)
  })

  test("clicking hamburger again closes the mobile menu", async () => {
    const user = userEvent.setup()
    render(<Nav />)
    const hamburger = screen.getByRole("button", { name: /toggle menu/i })

    await user.click(hamburger)
    await user.click(hamburger)

    expect(hamburger).toHaveAttribute("aria-expanded", "false")
    expect(screen.getAllByText("About").length).toBe(1)
  })
})
