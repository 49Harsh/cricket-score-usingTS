import { Match } from "@/interfaces/match";

interface BallsTableProps {
  match: Match | null;
}

export default function BallsTable({ match }: BallsTableProps) {
  return (
    <div className="border rounded-lg bg-[#f3f4f6] flex flex-col sm:flex-row items-center justify-between p-4 mb-2 gap-3">
      <div className="font-medium">
        {match
          ? match?.currentOver.overNumber * 6 + match?.currentOver.ballsBowled
          : 0}{" "}
        Balls
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {[1, 1, 2, 0, 1, 1, 4, 1, 1, 0, 0, 4, 0, 0, 4].map((runs, index) => (
          <div key={index} className="bg-[#e5e7eb] rounded-md border px-1.5">
            {runs}
          </div>
        ))}
      </div>
    </div>
  );
}