import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-white sticky top-0 z-50 shadow-sm border-b">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Assignments
        </h1>

        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full w-1/3">
          <span className="mr-2 text-gray-500">🔍</span>
          <input
            type="text"
            placeholder="Search tasks..."
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* Menu */}
        <div className="flex items-center gap-8 text-gray-600 font-medium">

          <Link 
            to="/" 
            className="relative hover:text-blue-500 transition group"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>

          <Link 
            to="/tasks" 
            className="relative hover:text-blue-500 transition group"
          >
            Tasks
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>

          {/* Profile */}
          <span className="cursor-pointer hover:text-blue-500 transition text-lg">
            👤
          </span>

        </div>

      </div>

    </div>
  );
};

export default Navbar;