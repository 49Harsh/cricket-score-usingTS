import { Match } from "@/interfaces/match";

interface ExtrasProps {
  match: Match | null;
}

export default function Extras({ match }: ExtrasProps) {
  return (
    <div className="bg-[#f3f4f6] border rounded-lg px-4 py-3 flex gap-12 mb-3.5">
      <div className="font-medium">Extra</div>
      <div>
        11 (<span className="font-semibold">b</span> 0,{" "}
        <span className="font-semibold">lb</span> 4,{" "}
        <span className="font-semibold">wd</span>{" "}
        {match?.currentBattingTeam === "teamA"
          ? match.teamA.extras.wide
          : match?.teamB.extras.wide}
        , <span className="font-semibold">nb</span>{" "}
        {match?.currentBattingTeam === "teamA"
          ? match.teamA.extras.noBall
          : match?.teamB.extras.noBall}
        , <span className="font-semibold">P</span> 0)
      </div>
    </div>
  );
}
