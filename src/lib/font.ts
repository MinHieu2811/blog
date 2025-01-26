import {
  Fira_Code as FontMono,
  M_PLUS_Rounded_1c as FontSans,
} from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
export { fontMono, fontSans };

