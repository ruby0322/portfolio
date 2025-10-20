import { Footer } from '@/components/portfolio/footer';
import { Header } from '@/components/portfolio/header';

export default function TranscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[73px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
