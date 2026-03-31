import Hero from "./components/Hero";
import SurpriseMeSection from "./components/SurpriseMeSection";
import RecentFeed from "./components/RecentFeed";
import { HomeContextProvider } from "./context/homeContext";
import SheetBackdrop from "./components/SheetBackdrop";
import ScannerSheet from "./components/ScannerSheet";
import ManualEntrySheet from "./components/ManualEntrySheet";

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
