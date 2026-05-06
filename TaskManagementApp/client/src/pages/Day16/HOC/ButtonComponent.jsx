
const Buttoncomponent = ({ handleClick }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg"
      >
        Click Me
      </button>
    </div>
  );
};

export default Buttoncomponent;