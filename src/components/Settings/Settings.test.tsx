import React from "react"
import userEvent from "@testing-library/user-event"
import { render } from "../../test-utils"
import { screen } from "@testing-library/react"

import SettingsCard from "./Settings"
import { baseOptions, advancedOptions } from "./options"

describe("SettingsCard unit test cases", () => {
  it("should render", () => {
    render(<SettingsCard />)
  })

  it("should render all base options", () => {
    render(<SettingsCard />)

    const baseOptionInputs = baseOptions.map((option) => {
      return screen.getByRole("textbox", {
        name: option.label,
      }) as HTMLInputElement
    })

    baseOptionInputs.forEach((input, index) => {
      expect(input).toBeInTheDocument()
      expect(input.placeholder).toBe(baseOptions[index].placeholder)
    })
  })

  it("should not render advanced options on first render", () => {
    render(<SettingsCard />)

    let advancedOptionsInputs = advancedOptions.map((option) => {
      return screen.queryByRole("textbox", {
        name: option.label,
      }) as HTMLInputElement
    })

    advancedOptionsInputs.forEach((input) => {
      expect(input).toBe(null)
    })
  })

  it("should render all advanced options on clicking Adavenced button", () => {
    render(<SettingsCard />)

    const advancedButton = screen.getByRole("button", {
      name: /Advanced/i,
    })

    userEvent.click(advancedButton)

    const advancedOptionsInputs = advancedOptions.map((option) => {
      return screen.getByRole("textbox", {
        name: option.label,
      }) as HTMLInputElement
    })

    advancedOptionsInputs.forEach((input, index) => {
      expect(input).toBeInTheDocument()
      expect(input.placeholder).toBe(advancedOptions[index].placeholder)
    })
  })
})
