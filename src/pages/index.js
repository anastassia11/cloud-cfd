import Header from "@/components/header/Header";
import TreePanel from "@/components/tree-panel/TreePanel";

export default function Home() {
  return (
    <div className="bg-gray-100 w-screen h-screen">
      <Header />
      <div className="p-3">
        <TreePanel />
      </div>
    </div>
  )
}