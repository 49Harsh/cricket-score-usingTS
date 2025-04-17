interface BatterInterface {
  name: string;
  runs: number;
  ballsFaced: number;
  fours: number;
  sixes: number;
}

interface BowlerInterface {
  name: string;
  ballsBowled: number;
  oversBowled: number;
  runsConceded: number;
  wicketsTaken: number;
}

interface ExtrasInterface {
  wide: number;
  noBall: number;
}

interface TeamInterface {
  name: string;
  totalRuns: number;
  extras: ExtrasInterface;
  wicketsLost: number;
  overs: number;
  batters: {
    striker: BatterInterface;
    nonStriker: BatterInterface;
  };
  bowlers: {
    bowler: BowlerInterface;
    nonBowler: BowlerInterface;
  };
}

interface CurrentOver {
  ballsBowled: number;
  overNumber: number;
}

export interface Match {
  teamA: TeamInterface;
  teamB: TeamInterface;
  currentBattingTeam: "teamA" | "teamB";
  innings: 1 | 2;
  currentOver: CurrentOver;
  commentary: Array<{ ball: string; run: number; text: string }>;
}
