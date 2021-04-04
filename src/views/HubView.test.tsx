import renderDashboardApp from "../tests/testUtils"
import { wait } from "@testing-library/dom"

describe("HubView integration test", () => {
  it("should render", async () => {
    const { container, getByText } = renderDashboardApp("/hub")
    expect(getByText("Read more")).not.toBeNull()
    expect(getByText("Let's Go")).not.toBeNull()
    await wait(() => {
      expect(getByText("Jina Hub")).not.toBeNull()
      expect(
        container.querySelectorAll('[data-name="hubImage"]').length
      ).toBeGreaterThan(0)
    })
  })
})
