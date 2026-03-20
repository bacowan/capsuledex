import Hero from "@/components/Hero";
import SurpriseMeSection from "@/components/SurpriseMeSection";
import RecentFeed from "@/components/RecentFeed";
import ScannerSheet from "@/components/ScannerSheet";
import ManualEntrySheet from "@/components/ManualEntrySheet";
import SheetBackdrop from "@/components/SheetBackdrop";

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
