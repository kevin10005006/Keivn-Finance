import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r h-full">
        <nav className="p-4 space-y-2">
            <Link href="/" className="block p-2 rounded hover:bg-gray-100">
                Dashboard
            </Link>

            <Link href="/investments" className="block p-2 rounded hover:bg-gray-100">
                投資管理
            </Link>

            <Link href="/accounting" className="block p-2 rounded hover:bg-gray-100">            
                記帳
            </Link>

            <Link href="/settings" className="block p-2 rounded hover:bg-gray-100">
                設定
            </Link>
        </nav>
    </aside>
  );
}
      