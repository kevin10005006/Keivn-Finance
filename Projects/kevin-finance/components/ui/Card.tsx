interface CardProps {
  title: string;
  value: string | number;
  color?: string;
}   

export default function Card({ title, value, color = "text-black" }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  );
}   