import "@/styles/globals.css";

export const metadata = {
  title: "Desktop Date Picker",
  description: "A customizable Desktop Date Picker component",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body
      >
        {children}
      </body>
    </html>
  );
}
