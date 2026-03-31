// TODO: toggle active tab with useState

export default function BrowseTabs() {
  return (
    <div className="flex border-b border-edge-subtle px-4 md:px-6">
      <button className="flex-1 md:flex-none md:mr-5 py-2.5 text-sm font-medium text-fg border-b-2 border-pink-500 bg-transparent border-x-0 border-t-0 cursor-pointer">
        Series
      </button>
      <button className="flex-1 md:flex-none md:mr-5 py-2.5 text-sm text-fg-secondary border-b-2 border-transparent bg-transparent border-x-0 border-t-0 cursor-pointer hover:text-fg">
        Collectors
      </button>
    </div>
  );
}
