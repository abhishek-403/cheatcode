import { TabType } from "./problem-types";

const TABS: TabType[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Problems",
    link: "/problems",
  },
];

enum LS_SETTINGS {
  fontSize = "font-size",
}


const EDITOR_FONT_SIZES_OPTIONS = [
  "12px",
  "13px",
  "14px",
  "15px",
  "16px",
  "17px",
  "18px",
];
export { TABS, LS_SETTINGS,EDITOR_FONT_SIZES_OPTIONS };
