"use client";

import { apiClient, apiClient2 } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Match } from "@/interfaces/match";

import { Switch } from "@/components/ui/switch";
import { BsChevronDown } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loader from "@/components/Loader";
import PlayerSelection from "@/components/PlayerSelection";
import Commentary from "@/components/Commentary";
import Search from "@/components/Search";
import CurrentInnings from "@/components/CurrentInnings";
import Extras from "@/components/Extras";
import BallsTable from "@/components/BallsTable";
import BowlersTable from "@/components/BowlersTable";
import BattersTable from "@/components/BattersTable";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [, setSocket] = useState<WebSocket | null>(null);
  const [match, setMatch] = useState<Match | null>(null);
  const [run, setRun] = useState(0);
  const [extras, setExtras] = useState("");
  const [isWicket, setIsWicket] = useState(false);
  const [matchOverMessage, setMatchOverMessage] = useState("");

  const updateScore = (run: number, extras: string, isWicket: boolean) => {
    apiClient2
      .post(
        "/update-score",
        { run, extras, isWicket },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.matchOver) {
          setMatchOverMessage(res.data.matchOver);
          alert(res.data.matchOver);
        }
      })
      .catch((error) => console.error("Error updating score", error));
  };

  useEffect(() => {
    apiClient
      .get("/user/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => setLoading(false))
      .catch(() => router.push("/auth/signup"));
  }, [router]);

  useEffect(() => {
    // WebSocket Connection
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    const reconnectDelay = 3000; // 3 seconds

    const connectWebSocket = () => {
      const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL?.split("//")[1];
      const wsUrl = backend_url 
        ? `${backend_url.startsWith("localhost") ? "ws" : "wss"}://${backend_url}` 
        : "ws://localhost:3001";
      
      const newWs = new WebSocket(wsUrl);
      
      newWs.onopen = () => {
        console.log("WebSocket connected");
        reconnectAttempts = 0;
        updateScore(0, "start", false);
      };

      newWs.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "scoreUpdate") {
          setMatch(data.match);
        }
      };

      newWs.onerror = (error) => {
        console.log("WebSocket error - attempting to reconnect");
      };

      newWs.onclose = () => {
        console.log("WebSocket disconnected");
        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          setTimeout(connectWebSocket, reconnectDelay);
        }
      };

      setSocket(newWs);
      return newWs;
    };

    const ws = connectWebSocket();

    return () => {
      ws?.close();
    };
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="">
      <div className="min-h-screen lg:grid grid-cols-3 gap-5 px-6 py-4">
        <div className="col-span-2 px-2 pt-8 border shadow-lg rounded-lg">
          <PlayerSelection match={match} />

          <div className="flex justify-between items-center mb-16">
            <div className="pl-3 space-y-3.5 font-bold">
              <div>
                Score:{" "}
                {match?.currentBattingTeam === "teamA"
                  ? match.teamA.totalRuns
                  : match?.teamB.totalRuns}
              </div>
              <div>
                Extra:{" "}
                {match?.currentBattingTeam === "teamA"
                  ? match.teamA.extras.wide + match.teamA.extras.noBall
                  : (match?.teamB?.extras?.wide ?? 5) +
                    (match?.teamB?.extras?.noBall ?? 3)}
              </div>
            </div>

            <div className="mr-4 lg:mr-10 px-2 py-1 flex flex-col justify-center items-center border rounded-lg font-medium text-sm gap-1">
              <div>
                <Switch />
              </div>
              <div>Mute & Text Off</div>
            </div>
          </div>

          <div className="space-y-2 font-bold text-white text-xl text-center">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-1 grid gap-2">
                <button className="bg-[#2c7b0d] py-7 flex justify-center items-center rounded-lg">
                  Ball Start
                </button>
                <button
                  className="bg-[#b36b34] py-7 flex justify-center items-center rounded-lg border-2 border-black"
                  onClick={() => {
                    setRun(0);
                    setExtras("wide");
                    setIsWicket(false);
                  }}
                >
                  Wide
                </button>
                <button
                  className="bg-[#003e57] py-7 flex justify-center items-center rounded-lg border-2 border-black"
                  onClick={() => {
                    setRun(0);
                    setExtras("noBall");
                    setIsWicket(false);
                  }}
                >
                  No Ball
                </button>
              </div>

              <div className="col-span-1 grid gap-2">
                <button
                  className="bg-[#1b00ff] flex justify-center items-center rounded-lg border-2 border-black"
                  onClick={() => {
                    setRun(0);
                    setExtras("");
                    setIsWicket(false);
                  }}
                >
                  0
                </button>
                <button
                  className="bg-[#008380] flex justify-center items-center rounded-lg border-2 border-black"
                  onClick={() => {
                    setRun(2);
                    setExtras("");
                    setIsWicket(false);
                  }}
                >
                  2
                </button>
              </div>

              <div className="col-span-1 grid gap-2">
                <button
                  className="bg-[#003e57] flex justify-center items-center rounded-lg border-2 border-black"
                  onClick={() => {
                    setRun(1);
                    setExtras("");
                    setIsWicket(false);
                  }}
                >
                  1
                </button>
                <button
                  className="bg-[#86efac] flex justify-center items-center rounded-lg border-2 border-black"
                  onClick={() => {
                    setRun(4);
                    setExtras("");
                    setIsWicket(false);
                  }}
                >
                  4
                </button>
              </div>

              <div className="col-span-1 grid gap-2">
                <button
                  className="bg-[#c40004] flex justify-center items-center rounded-lg border-2 border-black"
                  onClick={() => {
                    setRun(0);
                    setExtras("");
                    setIsWicket(true);
                  }}
                >
                  Wicket
                </button>
                <button
                  className="bg-[#9ca3af] flex justify-center items-center rounded-lg border-2 border-black"
                  onClick={() => {
                    setRun(6);
                    setExtras("");
                    setIsWicket(false);
                  }}
                >
                  6
                </button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              <div className="grid gap-2">
                <button className="bg-[#6d00a8] py-7 flex justify-center items-center rounded-lg">
                  Bowler Stop
                </button>
                <button className="bg-[#003e57] py-7 flex justify-center items-center rounded-lg">
                  Others
                </button>
              </div>

              <div className="grid gap-2">
                <button className="bg-[#1b00ff] py-7 flex justify-center items-center rounded-lg">
                  1 or 2
                </button>
                <button className="bg-[#6d00a8] py-7 flex justify-center items-center rounded-lg">
                  3
                </button>
              </div>

              <div className="grid gap-2">
                <button className="bg-[#6d00a8] py-7 flex justify-center items-center rounded-lg">
                  2 or 4
                </button>
                <button className="bg-[#003e57] py-7 flex justify-center items-center rounded-lg">
                  Boundary Check
                </button>
              </div>

              <div className="grid gap-2">
                <button className="bg-[#964100] py-7 flex justify-center items-center rounded-lg">
                  4 or 6
                </button>
                <button className="bg-[#47787b] py-7 flex justify-center items-center rounded-lg">
                  Appeal
                </button>
              </div>

              <div className="grid gap-2">
                <button className="bg-[#6d00a8] py-7 flex justify-center items-center rounded-lg">
                  Ball In Air
                </button>
                <button className="bg-[#003e57] py-7 flex justify-center items-center rounded-lg">
                  Catch Drop
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div className="grid gap-2">
                <button className="bg-[#00b7dd] py-7 flex justify-center items-center rounded-lg">
                  Leg Bye
                </button>
                <button
                  className="bg-[#36532b] py-7 flex justify-center items-center rounded-lg border-2 border-black"
                  onClick={() => updateScore(run, extras, isWicket)}
                >
                  Done
                </button>
              </div>

              <div className="grid gap-2">
                <button className="bg-[#00af3e] py-7 flex justify-center items-center rounded-lg">
                  Bye
                </button>
                <button className="bg-[#003e57] py-7 flex justify-center items-center rounded-lg">
                  Misfield
                </button>
              </div>

              <div className="grid gap-2">
                <button className="bg-[#47787b] py-7 flex justify-center items-center rounded-lg">
                  Third Umpire
                </button>
                <button className="bg-[#6500dd] py-7 flex justify-center items-center rounded-lg">
                  Overthrow
                </button>
              </div>

              <div className="grid gap-2">
                <button className="bg-[#c40004] py-7 flex justify-center items-center rounded-lg">
                  Review
                </button>
                <button className="bg-[#c40004] py-7 flex justify-center items-center rounded-lg">
                  Wicket Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#fafafa] border shadow-lg p-4 col-span-1 rounded-lg">
          <div className="flex items-center gap-5 px-1 mb-4">
            <div>
              <BsChevronDown size={"20px"} />
            </div>
            <div>Scorecard</div>
          </div>

          <div className="border rounded-t-xl mb-2">
            <div className="bg-[#f3f4f6] border rounded-t-xl text-end font-extrabold text-[#0271f0] pr-2 py-1.5 cursor-pointer">
              View Full Score Card
            </div>

            <div className="flex justify-around items-center py-2">
              <div className="flex flex-col items-center gap-2">
                <div>IND</div>
                <div>
                  <Avatar className="size-14">
                    <AvatarImage src="/india.webp" alt="India flag" />
                    <AvatarFallback>IND</AvatarFallback>
                  </Avatar>
                </div>
                <div className="border rounded-lg text-center px-2 py-1">
                  <div>
                    {match?.teamA.totalRuns} / {match?.teamA.wicketsLost}
                  </div>
                  <div>
                    Over {match?.teamA.overs}.
                    {match?.innings === 1 ? match.currentOver.ballsBowled : 0}
                  </div>
                </div>
              </div>

              <div className="text-red-600 font-bold text-xl">vs</div>

              <div className="flex flex-col items-center gap-2">
                <div>BAN</div>
                <div>
                  <Avatar className="size-14">
                    <AvatarImage src="/bangladesh.webp" alt="Bangladesh flag" />
                    <AvatarFallback>BAN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="border rounded-lg text-center px-2 py-1">
                  <div>
                    {match?.teamB.totalRuns} / {match?.teamB.wicketsLost}
                  </div>
                  <div>
                    Over {match?.teamB.overs}.
                    {match?.innings === 2 ? match.currentOver.ballsBowled : 0}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#e5e7eb] border font-bold text-center py-3">
              {matchOverMessage}
            </div>
          </div>

          <BattersTable match={match} />

          <BowlersTable match={match} />

          <BallsTable match={match} />

          <Extras match={match} />

          <CurrentInnings match={match} />

          <Search />

          <div className="border mb-3"></div>

          <Commentary match={match} />
        </div>
      </div>
    </div>
  );
}
