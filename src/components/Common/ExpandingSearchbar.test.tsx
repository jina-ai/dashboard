import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { ExpandingSearchbar } from "./ExpandingSearchbar"
import { theme } from "../../theme"
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles"

let searchQuery = ""
const mockChangeCallback = jest.fn((newValue) => (searchQuery = newValue))
const mockSearchCallback = jest.fn()

const expandingSearchbar = render(
  <MuiThemeProvider theme={theme}>
    <ExpandingSearchbar
      onChange={mockChangeCallback}
      onSearch={mockSearchCallback}
      value={searchQuery}
    />
  </MuiThemeProvider>
)
const input = expandingSearchbar.getByRole("textbox")

describe("ExpandingSearchbar", () => {
  it("renders the value in input box", () => {
    fireEvent.change(input, { target: { value: "con" } })
    expect(mockChangeCallback.mock.calls.length).toBe(1)
    fireEvent.change(input, { target: { value: "way" } })
    expect(mockChangeCallback.mock.calls[1][0]).toEqual("way")
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 })
    expect(mockSearchCallback.mock.calls.length).toBe(1)
  })
})
