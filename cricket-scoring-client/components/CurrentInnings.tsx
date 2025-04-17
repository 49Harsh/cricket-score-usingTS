import { Match } from "@/interfaces/match";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CurrentInningsProps {
  match: Match | null;
}

export default function CurrentInnings({ match }: CurrentInningsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-1.5">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={`${
              match?.innings === 1 ? match.teamA.name : match?.teamB.name
            }`}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="banana">Bangladeshy</SelectItem>
          <SelectItem value="apple">India</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`${match?.innings}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="banana">1</SelectItem>
          <SelectItem value="apple">2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
