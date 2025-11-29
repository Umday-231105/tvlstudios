import "./globals.css";
import ThemeProvider from "./ThemeProvider";

export const metadata = {
  title: "Your Website",
  description: "Your description",
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
