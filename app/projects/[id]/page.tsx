import Link from 'next/link'

async function getProject(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ||  'https://' + process.env.NEXT_PUBLIC_VERCEL_URL}/api/projects${id}`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch project')
  }
  return res.json()
}

export default async function ProjectDetails({ params }: { params: any }) {
  const project = await getProject(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-cyan-400 hover:underline mb-4 inline-block">&larr; Back to Projects</Link>
      <div className="bg-black/40 backdrop-blur-sm border border-cyan-500 rounded-lg p-8">
        <h1 className="text-4xl font-bold text-cyan-200 mb-4">{project.title}</h1>
        <p className="text-cyan-100 mb-6">{project.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-cyan-300 font-semibold">Funding Goal</h3>
            <p className="text-white">${project.fundingGoal.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-cyan-300 font-semibold">Current Funding</h3>
            <p className="text-white">${project.currentFunding.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-cyan-300 font-semibold">Category</h3>
            <p className="text-white">{project.category}</p>
          </div>
          <div>
            <h3 className="text-cyan-300 font-semibold">Status</h3>
            <p className="text-white">{project.status.join(', ')}</p>
          </div>
        </div>
        <div className="w-full bg-cyan-800 rounded-full h-4 mb-6">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-4 rounded-full" 
            style={{ width: `${(project.currentFunding / project.fundingGoal) * 100}%` }}
          ></div>
        </div>
        <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
          Fund This Project
        </button>
      </div>
    </div>
  )
}