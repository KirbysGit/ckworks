import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
