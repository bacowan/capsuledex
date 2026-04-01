import BrowseSearchBar from "./components/BrowseSearchBar";
import BrowseTabs from "./components/BrowseTabs";
import SeriesPanel from "./components/SeriesPanel";
import CollectorsPanel from "./components/CollectorsPanel";
import Pagination from "./components/Pagination";

export default function BrowsePage() {
  return (
    <main>
      <div className="max-w-[900px] mx-auto">
        <BrowseSearchBar />
        <BrowseTabs />
        <SeriesPanel />
        <CollectorsPanel />
        <Pagination currentPage={1} totalPages={5} />
      </div>
    </main>
  );
}
