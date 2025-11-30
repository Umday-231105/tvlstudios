import "./globals.css";
import AssistantWidget from "../components/AssistantWidget";

export const metadata = {
  title: "TVL Studios",
  description: "Design, product & web for modern teams.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        {children}
        {/* Floating AI widget on every page */}
        <AssistantWidget />
      </body>
    </html>
  );
}
