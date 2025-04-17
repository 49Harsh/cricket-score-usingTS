import SearchBar from "./SearchBar";
import { RiCloseLargeFill } from "react-icons/ri";

export default function Search() {
  return (
    <div className="flex gap-2 mb-4">
      <SearchBar />

      <div className="flex items-center px-5 py-4 bg-[#ff4d4f] rounded-lg cursor-pointer">
        <RiCloseLargeFill size={"17px"} color="white" />
      </div>
    </div>
  );
}
