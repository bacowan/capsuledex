import BrowseSearchBar from "./components/BrowseSearchBar";
import BrowseTabs from "./components/BrowseTabs";
import SeriesPanel from "./components/SeriesPanel";
import CollectorsPanel from "./components/CollectorsPanel";
import Pagination from "./components/Pagination";
import { listSeries } from "@/services/series";

const maxQueryLength = Number(process.env.NEXT_PUBLIC_MAX_SERIES_SEARCH_QUERY_LENGTH) || 100
const pageSize = Number(process.env.NEXT_PUBLIC_MAX_SERIES_SEARCH_PAGE_SIZE) || 20

const SEARCH_TYPES = ["collectors", "series"] as const
type SearchType = (typeof SEARCH_TYPES)[number]
const isSearchType = (value: any): value is SearchType => {
  return SEARCH_TYPES.includes(value as SearchType)
}

const SORT_TYPES = ["recent", "popular", "alphabetical"] as const
type SortType = (typeof SORT_TYPES)[number]
const isSortType = (value: any): value is SortType => {
  return SORT_TYPES.includes(value as SortType)
}
  
export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const type = isSearchType(params.type) ? params.type : "series"
  const query = (typeof params.q === "string" ? params.q : "").slice(0, maxQueryLength)
  const sort = isSortType(params.sort) ? params.sort : "popular"
  const page = Math.max(
    typeof params.page === "string" ? parseInt(params.page) : 0,
    0)

  const series = await listSeries(query, sort, page, pageSize)

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
