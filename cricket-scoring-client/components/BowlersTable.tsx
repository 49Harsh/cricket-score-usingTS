import { Match } from "@/interfaces/match";

interface BowlersTableProps {
  match: Match | null;
}

export default function BowlersTable({ match }: BowlersTableProps) {
  return (
    <div className="border mb-3">
      <div className="bg-[#e5e7eb] grid grid-cols-6 font-extrabold text-[#6b7280] px-2 xl:px-4 2xl:px-6 py-1">
        <div className="col-span-2">Bowler</div>
        <div className="text-center">O</div>
        <div className="text-center">M</div>
        <div className="text-center">R</div>
        <div className="text-center">W</div>
      </div>
      <div className="grid grid-cols-6  px-2 xl:px-4 2xl:px-6 py-1.5 bg-white">
        <div className="col-span-2 space-y-2">
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamB.bowlers.bowler.name
              : match?.teamA.bowlers.bowler.name}
            *
          </div>
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamB.bowlers.nonBowler.name
              : match?.teamA.bowlers.nonBowler.name}
          </div>
        </div>
        <div className="text-center  space-y-2">
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamB.bowlers.bowler.oversBowled
              : match?.teamA.bowlers.bowler.oversBowled}
            .
            {match?.currentBattingTeam === "teamA"
              ? match.teamB.bowlers.bowler.ballsBowled
              : match?.teamA.bowlers.bowler.ballsBowled}
          </div>
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamB.bowlers.nonBowler.oversBowled
              : match?.teamA.bowlers.nonBowler.oversBowled}
            .
            {match?.currentBattingTeam === "teamA"
              ? match.teamB.bowlers.nonBowler.ballsBowled
              : match?.teamA.bowlers.nonBowler.ballsBowled}
          </div>
        </div>
        <div className="text-center  space-y-2">
          <div>0</div>
          <div>0</div>
        </div>
        <div className="text-center  space-y-2">
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamB.bowlers.bowler.runsConceded
              : match?.teamA.bowlers.bowler.runsConceded}
          </div>
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamB.bowlers.nonBowler.runsConceded
              : match?.teamA.bowlers.nonBowler.runsConceded}
          </div>
        </div>
        <div className="text-center  space-y-2">
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamB.bowlers.bowler.wicketsTaken
              : match?.teamA.bowlers.bowler.wicketsTaken}
          </div>
          <div>
            {match?.currentBattingTeam === "teamA"
              ? match.teamB.bowlers.nonBowler.wicketsTaken
              : match?.teamA.bowlers.nonBowler.wicketsTaken}
          </div>
        </div>
      </div>
    </div>
  );
}
