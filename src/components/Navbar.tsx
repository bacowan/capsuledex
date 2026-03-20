export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full bg-surface border-b border-edge h-13 flex items-center px-4">
      {/* TODO: use Next.js <Link href="/"> */}
      <a className="flex items-center gap-2 mr-auto cursor-pointer">
        <div className="w-[22px] h-[22px] rounded-full border-2 border-brand flex items-center justify-center">
          <div className="w-[10px] h-[10px] rounded-full bg-brand" />
        </div>
        <span className="text-base font-medium tracking-tight">gacha.db</span>
      </a>

      <nav className="flex items-center gap-1">
        {/* TODO: replace with <Link> and active state logic */}
        <button className="px-3 py-1.5 text-sm rounded-lg font-medium text-fg">
          Home
        </button>
        <button className="px-3 py-1.5 text-sm rounded-lg text-fg-secondary hover:bg-subtle hover:text-fg">
          Browse
        </button>
        <button className="px-3 py-1.5 text-sm rounded-lg text-fg-secondary hover:bg-subtle hover:text-fg">
          Collection
        </button>

        <div className="w-px h-[18px] bg-edge mx-1" />

        <button className="px-3.5 py-1.5 text-sm border border-edge rounded-lg text-fg hover:bg-subtle">
          Sign in
        </button>
      </nav>
    </header>
  );
}
