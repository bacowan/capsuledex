import Hero from "@/app/components/Hero";
import SurpriseMeSection from "@/app/components/SurpriseMeSection";
import RecentFeed from "@/app/components/RecentFeed";
import { HomeContext, HomeContextProvider } from "./homeContext";
import SheetBackdrop from "@/app/components/SheetBackdrop";
import ScannerSheet from "@/app/components/ScannerSheet";
import ManualEntrySheet from "@/app/components/ManualEntrySheet";

export default function Home() {
  return (
    <main>
      <HomeContextProvider>
        <Hero />
        <SurpriseMeSection />
        <RecentFeed />

        <SheetBackdrop />
        <ScannerSheet />
        <ManualEntrySheet />
      </HomeContextProvider>
    </main>
  );
}
