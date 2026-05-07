import { useNavigate } from "react-router-dom";

const Task = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <h1 className="text-3xl font-bold text-gray-800 mb-10">
        Your Tasks 📚
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Day 1 */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-lg mb-4 text-blue-500">Day 1</h2>

          <div className="flex flex-wrap gap-6 mt-2">
            <button 
              onClick={() => navigate("/day1task1")} 
              className="bg-blue-500 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-600 hover:scale-105 transition duration-200 min-w-[120px]"
            >
              Task 1
            </button>

            <button 
              onClick={() => navigate("/day1task2")} 
              className="bg-blue-500 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-600 hover:scale-105 transition duration-200 min-w-[120px]"
            >
              Task 2
            </button>
          </div>
        </div>

        {/* Day 2 */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-lg mb-4 text-green-500">Day 2</h2>

          <div className="flex flex-wrap gap-6 mt-2">
            <button 
              onClick={() => navigate("/day2task1")} 
              className="bg-green-500 text-white px-5 py-2 rounded-xl shadow hover:bg-green-600 hover:scale-105 transition duration-200 min-w-[120px]"
            >
              Timer
            </button>

            <button 
              onClick={() => navigate("/day2task2")} 
              className="bg-green-500 text-white px-5 py-2 rounded-xl shadow hover:bg-green-600 hover:scale-105 transition duration-200 min-w-[120px]"
            >
              Recipes
            </button>

            <button 
              onClick={() => navigate("/day2task3")} 
              className="bg-green-500 text-white px-5 py-2 rounded-xl shadow hover:bg-green-600 hover:scale-105 transition duration-200 min-w-[120px]"
            >
              Todo
            </button>
          </div>
        </div>

        {/* Day 4 */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-lg mb-4 text-purple-500">Day 4</h2>

          <div className="flex flex-wrap gap-6 mt-2">
            <button 
              onClick={() => navigate("/day4task1")} 
              className="bg-purple-500 text-white px-5 py-2 rounded-xl shadow hover:bg-purple-600 hover:scale-105 transition duration-200 min-w-[120px]"
            >
              Counter
            </button>

            <button 
              onClick={() => navigate("/day4task2")} 
              className="bg-purple-500 text-white px-5 py-2 rounded-xl shadow hover:bg-purple-600 hover:scale-105 transition duration-200 min-w-[120px]"
            >
              Form
            </button>
          </div>
        </div>

        {/* Day 5 */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-lg mb-4 text-orange-500">Day 5</h2>

          <div className="flex flex-wrap gap-6 mt-2">
            <button 
              onClick={() => navigate("/day5task1")} 
              className="bg-orange-500 text-white px-5 py-2 rounded-xl shadow hover:bg-orange-600 hover:scale-105 transition duration-200 min-w-[120px]"
            >
              Task
            </button>
          </div>
        </div>

        {/* Day 6 */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-lg mb-4 text-pink-500">Day 6 (useRef)</h2>

          <div className="flex flex-wrap gap-6 mt-2">
            <button 
              onClick={() => navigate("/day6task1")} 
              className="bg-pink-500 text-white px-5 py-2 rounded-xl shadow hover:bg-pink-600 hover:scale-105 transition duration-200 min-w-[120px]"
            >
              Feedback Form
            </button>

            <button 
              onClick={() => navigate("/day6task2")} 
              className="bg-pink-500 text-white px-5 py-2 rounded-xl shadow hover:bg-pink-600 hover:scale-105 transition duration-200 min-w-[120px]"
            >
              Search Form
            </button>
          </div>
        </div>

        {/* Day 7 */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-lg mb-4 text-lime-500">HOC & localStorage</h2>

          <div className="flex flex-wrap gap-6 mt-2">
            <button 
              onClick={() => navigate("/day7task1")} 
              className="bg-lime-500 text-white px-5 py-2 rounded-xl shadow hover:bg-lime-600 hover:scale-105 transition duration-200 min-w-[120px]"
            >
              Login Form
            </button>

            <button 
              onClick={() => navigate("/day7task2")} 
              className="bg-lime-500 text-white px-5 py-2 rounded-xl shadow hover:bg-lime-600 hover:scale-105 transition duration-200 min-w-[120px]"
            >
              Alert
            </button>
          </div>
        </div>

        {/* Day 8 */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-lg mb-4 text-yellow-400">useMemo</h2>

          <div className="flex flex-wrap gap-6 mt-2">
            <button 
              onClick={() => navigate("/day8task1")} 
              className="bg-yellow-400 text-white px-5 py-2 rounded-xl shadow hover:bg-yellow-500 hover:scale-105 transition duration-200 min-w-[120px]"
            >
              Sum
            </button>

            <button 
              onClick={() => navigate("/day8task2")} 
              className="bg-yellow-400 text-white px-5 py-2 rounded-xl shadow hover:bg-yellow-500 hover:scale-105 transition duration-200 min-w-[120px]"
            >
              Sorting
            </button>

               <button 
              onClick={() => navigate("/day8task3")} 
              className="bg-yellow-400 text-white px-5 py-2 rounded-xl shadow hover:bg-yellow-500 hover:scale-105 transition duration-200 min-w-[120px]"
            >
              Filter Name
            </button>
          </div>
        </div>

        {/* Day 9 */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-lg mb-4 text-red-400">Custom Hooks</h2>

          <div className="flex flex-wrap gap-6 mt-2">
            <button 
              onClick={() => navigate("/day9task1")} 
              className="bg-red-400 text-white px-5 py-2 rounded-xl shadow hover:bg-red-500 hover:scale-105 transition duration-200 min-w-[120px]"
            >
              Hooks
            </button>
          </div>
        </div>


   {/* Day 10 */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-lg mb-4 text-black">CRUD</h2>

          <div className="flex flex-wrap gap-6 mt-2">
            <button 
              onClick={() => navigate("/day10task1")} 
              className="bg-black text-white px-5 py-2 rounded-xl shadow hover:bg-black hover:scale-105 transition duration-200 min-w-[120px]"
            >
              Task1
            </button>
          </div>
        </div>

         {/* Day 11 */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="font-bold text-blue-800 text-lg mb-4 ">useReduce</h2>

          <div className="flex flex-wrap gap-6 mt-2">
            <button 
              onClick={() => navigate("/day11task1")} 
              className="bg-blue-800 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-950 hover:scale-105 transition duration-200 min-w-[120px]"
            >
              TextChange
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Task;