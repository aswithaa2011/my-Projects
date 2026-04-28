import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const TodoList = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const todos = await fetch("https://dummyjson.com/todos");
    const res = await todos.json();
    return res.todos ?? [];
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const FilterSearch = list.filter((f) =>
    f.todo.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const todos = await fetchData();
        if (!cancelled) setList(todos);
      } catch {
        if (!cancelled) setList([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 p-6">
      
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
       Todo Dashboard
      </h1>

    
      <div className="flex justify-center mb-8">
        <div className="flex items-center bg-white shadow-md rounded-full px-4 py-2 w-80">
          <CiSearch size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={handleSearch}
            className="ml-2 w-full outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {FilterSearch.map((e) => (
          <div
            key={e.id}
            className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            
            <h2 className="font-semibold text-lg text-gray-800 mb-2">
              {e.todo}
            </h2>

  
            <p
              className={`text-sm font-medium ${
                e.completed ? "text-green-600" : "text-red-500"
              }`}
            >
              {e.completed ? " Completed" : " Pending"}
            </p>
    
            <p className="text-xs text-gray-400 mt-1">
              User ID: {e.userId}
            </p>

            {/* Button */}
            <button className="mt-4 bg-linear-to-r from-black to-gray-800 text-white py-2 rounded-xl text-sm hover:opacity-90">
              {e.completed?"Mark Done":"To be Done"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;