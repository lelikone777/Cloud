import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { layoutStyles } from "@/lib/theme";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className={layoutStyles.page}>
      <Header />
      <main className="py-8">
        <Container>
          <div className={layoutStyles.section}>{children}</div>
        </Container>
      </main>
    </div>
  );
}
