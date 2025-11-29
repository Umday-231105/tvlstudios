import "./globals.css";
import ThemeProvider from "./ThemeProvider";

export const metadata = {
  title: "TVL Studios",
  description: "Portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
