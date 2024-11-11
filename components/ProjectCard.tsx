import Link from 'next/link'

export function ProjectCard({ project }: { project: any }) {
  return (
    <div className="bg-gradient-to-br from-cyan-900 to-blue-900 border-2 border-cyan-500 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-cyan-300 mb-2">{project.title}</h3>
      <p className="text-cyan-200 mb-4">{project.description}</p>
      <div className="flex justify-between items-center mb-2 text-cyan-200">
        <span>Funding Goal:</span>
        <span>${project.fundingGoal.toLocaleString()}</span>
      </div>
      <div className="w-full bg-cyan-800 rounded-full h-3 mb-4">
        <div 
          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full" 
          style={{ width: `${(project.currentFunding / project.fundingGoal) * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center">
        <span className="bg-cyan-700 text-cyan-200 px-2 py-1 rounded-full text-sm">{project.category}</span>
        <Link href={`/api/projects/${project.id}`} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
          View Details
        </Link>
      </div>
    </div>
  )
}