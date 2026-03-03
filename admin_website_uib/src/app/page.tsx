import prisma from "@/lib/prisma";

export default async function Dashboard() {

  const totalNews = await prisma.news.count();
  const publisheCount = totalNews;
  const draftCount = 0;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
          <span className="text-gray-500 font-medium">Total News</span>
          <span className="text-4xl font-bold text-slate-800">{totalNews}</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
          <span className="text-gray-500 font-medium">Published</span>
          <span className="text-4xl font-bold text-green-600">{publisheCount}</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
          <span className="text-gray-500 font-medium">Drafts</span>
          <span className="text-4xl font-bold text-amber-500">{draftCount}</span>
        </div>
      </div>
    </div>
  );
}
