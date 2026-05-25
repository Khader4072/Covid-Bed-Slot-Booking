import { getBedTypeLabel } from "@/lib/utils";
import { BedType } from "@/lib/types";

interface Props {
  availableBeds: Record<BedType, number>;
  totalBeds: number;
}

const colorMap: Record<BedType, { bar: string; badge: string }> = {
  general: { bar: "bg-blue-500", badge: "bg-blue-100 text-blue-700" },
  icu: { bar: "bg-red-500", badge: "bg-red-100 text-red-700" },
  oxygen: { bar: "bg-cyan-500", badge: "bg-cyan-100 text-cyan-700" },
  ventilator: { bar: "bg-purple-500", badge: "bg-purple-100 text-purple-700" },
};

const bedTypes: BedType[] = ["general", "icu", "oxygen", "ventilator"];

export default function BedAvailabilityBar({ availableBeds, totalBeds }: Props) {
  const perTypeCapacity = Math.floor(totalBeds / 4);

  return (
    <div className="space-y-4">
      {bedTypes.map((bt) => {
        const available = availableBeds[bt];
        const pct = perTypeCapacity > 0 ? Math.min(100, Math.round((available / perTypeCapacity) * 100)) : 0;
        const { bar, badge } = colorMap[bt];

        return (
          <div key={bt}>
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge}`}>
                {getBedTypeLabel(bt)}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">{available}/{perTypeCapacity}</span>
                <span className={`text-xs font-bold ${available === 0 ? "text-red-600" : "text-green-600"}`}>
                  {available === 0 ? "Full" : `${pct}% free`}
                </span>
              </div>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${bar}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
