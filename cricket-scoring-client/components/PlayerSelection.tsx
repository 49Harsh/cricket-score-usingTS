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
    <div className="grid grid-cols-6 gap-5 mb-14 font-medium">
      <div className="col-span-4">
        <div className="flex justify-around gap-2">
          <div>
            <div>Batsman (Striker)</div>
            <Select>
              <SelectTrigger className="w-[80px] sm:w-[108px] md:w-[140px] lg:w-[196px] xl:w-[250px] 2xl:w-[386px]">
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

          <div className="flex items-center justify-center">
            <IoMdSwap color="red" size={"25px"} />
          </div>

          <div>
            <div>Batsman (Non Striker)</div>
            <Select>
              <SelectTrigger className="w-[80px] sm:w-[108px] md:w-[140px] lg:w-[196px] xl:w-[250px] 2xl:w-[386px]">
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

      <div className="col-span-2 flex justify-center">
        <div>
          <div>Bowler</div>
          <Select>
            <SelectTrigger className="w-[80px] sm:w-[108px] md:w-[140px] lg:w-[196px] xl:w-[250px] 2xl:w-[390px]">
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
