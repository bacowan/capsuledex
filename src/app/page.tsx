import Hero from "@/components/Hero";
import SurpriseMeSection from "@/components/SurpriseMeSection";
import RecentFeed from "@/components/RecentFeed";

export default function Home() {
  return (
    <main>
      <Hero />
      <SurpriseMeSection />
      <RecentFeed />

      {/* TODO: conditionally show based on open state */}
      {/* <SheetBackdrop /> */}
      {/* <ScannerSheet /> */}
      {/* <ManualEntrySheet /> */}
    </main>
  );
}
