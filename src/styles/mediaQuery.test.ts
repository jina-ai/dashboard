import { mediaQuery, BreakPoint } from "./mediaQuery";

describe("mediaQuery", () => {
  const inputs = ["xs", "sm", "md", "lg", "xl", "xxl"];
  const expectedMediaQueries = [0, 576, 768, 992, 1200, 1400].map(
    (windowWidth) => `@media (min-width: ${windowWidth}px)`
  );

  inputs.forEach((input, index) => {
    it(`returns media queries for standard screen size ${input}`, () => {
      expect(mediaQuery(input as BreakPoint)).toEqual(
        expectedMediaQueries[index]
      );
    });
  });
});
