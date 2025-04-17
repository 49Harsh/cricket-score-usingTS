import { Match } from "@/interfaces/match";

interface BattersTableProps {
  match: Match | null;
}

export default function BattersTable({ match }: BattersTableProps) {
  return (
    <div className="border mb-3">
      <div className="bg-[#e5e7eb] grid grid-cols-6 font-extrabold text-[#6b7280] px-2 xl:px-4 2xl:px-6 py-1">
        <div className="col-span-2">Batsman</div>
        <div className="text-center">R</div>
        <div className="text-center">B</div>
        <div className="text-center">4s</div>
        <div className="text-center">6s</div>
      </div>
      <div className="grid grid-cols-6  px-2 xl:px-4 2xl:px-6 py-1.5 bg-white">
        <div className="col-span-2 space-y-2">
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamA.batters.striker.name
              : match?.teamB.batters.striker.name}
            *
          </div>
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamA.batters.nonStriker.name
              : match?.teamB.batters.nonStriker.name}
          </div>
        </div>
        <div className="text-center  space-y-2">
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamA.batters.striker.runs
              : match?.teamB.batters.striker.runs}
          </div>
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamA.batters.nonStriker.runs
              : match?.teamB.batters.nonStriker.runs}
          </div>
        </div>
        <div className="text-center  space-y-2">
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamA.batters.striker.ballsFaced
              : match?.teamB.batters.striker.ballsFaced}
          </div>
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamA.batters.nonStriker.ballsFaced
              : match?.teamB.batters.nonStriker.ballsFaced}
          </div>
        </div>
        <div className="text-center  space-y-2">
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamA.batters.striker.fours
              : match?.teamB.batters.striker.fours}
          </div>
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamA.batters.nonStriker.fours
              : match?.teamB.batters.nonStriker.fours}
          </div>
        </div>
        <div className="text-center  space-y-2">
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamA.batters.striker.sixes
              : match?.teamB.batters.striker.sixes}
          </div>
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamA.batters.nonStriker.sixes
              : match?.teamB.batters.nonStriker.sixes}
          </div>
        </div>
      </div>
    </div>
  );
}
