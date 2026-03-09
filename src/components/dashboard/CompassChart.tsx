import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { subject: 'Career', A: 120, fullMark: 150 },
  { subject: 'Health', A: 98, fullMark: 150 },
  { subject: 'Wealth', A: 86, fullMark: 150 },
  { subject: 'Spirit', A: 99, fullMark: 150 },
  { subject: 'Social', A: 85, fullMark: 150 },
  { subject: 'Hobby', A: 65, fullMark: 150 },
];

export const CompassChart = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#f1f1f1" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} />
          <Radar
            name="Life Balance"
            dataKey="A"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
