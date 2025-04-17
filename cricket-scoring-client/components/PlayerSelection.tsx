import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Match } from "@/interfaces/match";
import { IoMdSwap } from "react-icons/io";

interface PlayerSelectionProps {
  match: Match | null;
}

export default function PlayerSelection({ match }: PlayerSelectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-5 mb-14 font-medium">
      {/* Batsmen Section - Full width on mobile, 4/6 on larger screens */}
      <div className="col-span-1 md:col-span-4">
        <div className="flex flex-col sm:flex-row justify-around gap-4">
          {/* Striker Section */}
          <div className="flex-1">
            <div className="mb-2">Batsman (Striker)</div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={`${
                    match?.currentBattingTeam === "teamA"
                      ? match.teamA.batters.striker.name
                      : match?.teamB.batters.striker.name
                  }`}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Tanzim Hasan Sakib</SelectItem>
                <SelectItem value="banana">Towhid Hridoy</SelectItem>
                <SelectItem value="blueberry">Virat Kohli</SelectItem>
                <SelectItem value="grapes">M.S. Dhoni</SelectItem>
                <SelectItem value="pineapple">Sachin Tendulkar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Swap Icon - Center vertically and horizontally */}
          <div className="flex items-center justify-center self-center">
            <IoMdSwap color="red" size={25} />
          </div>

          {/* Non Striker Section */}
          <div className="flex-1">
            <div className="mb-2">Batsman (Non Striker)</div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={`${
                    match?.currentBattingTeam === "teamA"
                      ? match.teamA.batters.nonStriker.name
                      : match?.teamB.batters.nonStriker.name
                  }`}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Tohid Hridoy</SelectItem>
                <SelectItem value="banana">Tanzim Hasan Sakib</SelectItem>
                <SelectItem value="blueberry">Virat Kohli</SelectItem>
                <SelectItem value="grapes">M.S. Dhoni</SelectItem>
                <SelectItem value="pineapple">Sachin Tendulkar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Bowler Section - Full width on mobile, 2/6 on larger screens */}
      <div className="col-span-1 md:col-span-2 flex justify-center">
        <div className="w-full md:max-w-sm">
          <div className="mb-2">Bowler</div>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={`${
                  match?.currentBattingTeam === "teamA"
                    ? match.teamB.bowlers.bowler.name
                    : match?.teamA.bowlers.bowler.name
                }`}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="banana">Nitish Kumar Reddy</SelectItem>
              <SelectItem value="apple">Jasprit Bumrah</SelectItem>
              <SelectItem value="blueberry">Trent Boult</SelectItem>
              <SelectItem value="grapes">Adam Zampa</SelectItem>
              <SelectItem value="pineapple">Sachin Tendulkar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}