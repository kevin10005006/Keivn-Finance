import Card from "@/components/ui/Card";

interface SummaryCardsProps {
    shares: number;
    avgCost: number;
    totalCost: number;
    totalDividend: number;
    dividendYield: number;
}   

export default function SummaryCards({ 
    shares,
    avgCost,
    totalCost,
    totalDividend,
    dividendYield,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <Card title="持有張數" value={`${shares} 張`} />
      <Card title="平均成本" value={avgCost.toFixed(2)} />
      <Card title="投入成本" value={totalCost.toLocaleString()} />
      <Card title="累積配息" value={totalDividend.toLocaleString()} color="text-green-600" />
      <Card title="成本殖利率" value={`${dividendYield.toFixed(2)}%`} color="text-green-600" />
    </div>
  );
}   