const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Your React Journey 🚀
        </h1>

        <p className="text-gray-500 text-lg">
          Explore daily tasks, improve your skills, and build amazing projects.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 mt-16">

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-blue-500">Learn</h2>
          <p className="text-gray-500">Understand core React concepts step by step.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-green-500">Build</h2>
          <p className="text-gray-500">Create real-world mini projects.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-purple-500">Grow</h2>
          <p className="text-gray-500">Track your progress and improve daily.</p>
        </div>

      </div>

    </div>
  )
}

export default Home