import React from "react";
import ColorsPage from "../components/Styleguide/ColorsPage";
import MiscPage from "../components/Styleguide/MIscPage";
import TypographyPage from "../components/Styleguide/TypographyPage";
export const styleGuideRoutes = [
  {
    title: "Colors",
    to: "/colors",
    exact: true,
    component: () => <ColorsPage />,
    matches: [],
  },
  {
    title: "Typography",
    to: "/typography",
    component: () => <TypographyPage />,
    matches: [],
  },
  {
    title: "Misc",
    to: "/misc",
    component: () => <MiscPage />,
    matches: [],
  },
];
