import { Match } from "@/interfaces/match";
import { BsThreeDotsVertical } from "react-icons/bs";

interface CommentaryProps {
  match: Match | null;
}

export default function Commentary({ match }: CommentaryProps) {
  return (
    <div className="space-y-2.5">
      {match?.commentary
        ?.slice(-5)
        .map(
          (
            comment: { ball: string; run: number; text: string },
            index: number
          ) => (
            <div key={index} className="flex items-center justify-around">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#bbf7d0]">
                {comment.run}
              </div>

              <div className="max-w-sm flex items-center gap-4">
                <div className="font-medium">{comment.ball}</div>
                <div>{comment.text}.</div>
              </div>

              <div className="cursor-pointer">
                <BsThreeDotsVertical size={"18px"} />
              </div>
            </div>
          )
        )}
    </div>
  );
}
