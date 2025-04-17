import { IoSearchSharp } from "react-icons/io5";

export default function SearchBar() {
  return (
    <div className="w-full flex border rounded-lg">
      <div className="flex items-center p-2 border-y rounded-lg">
        <IoSearchSharp size={"20px"} />
      </div>
      <input
        id="default-search"
        className="w-full bg-white text-[#bfbfbf] border-y rounded-lg border-r outline-none"
        placeholder="default size"
        required
      />
    </div>
  );
}
