"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts"

const data = [
  { ageGroup: "10代未満", 男性: 200, 女性: 150, その他: 50, 回答なし: 20 },
  { ageGroup: "10代", 男性: 400, 女性: 300, その他: 100, 回答なし: 50 },
  { ageGroup: "20代", 男性: 600, 女性: 500, その他: 200, 回答なし: 100 },
  { ageGroup: "30代", 男性: 800, 女性: 700, その他: 300, 回答なし: 150 },
  { ageGroup: "40代", 男性: 900, 女性: 800, その他: 400, 回答なし: 200 },
  { ageGroup: "50代", 男性: 700, 女性: 600, その他: 300, 回答なし: 150 },
  { ageGroup: "60代", 男性: 400, 女性: 300, その他: 150, 回答なし: 80 },
  { ageGroup: "70代", 男性: 200, 女性: 150, その他: 100, 回答なし: 50 },
  { ageGroup: "80代", 男性: 100, 女性: 80, その他: 50, 回答なし: 20 },
  { ageGroup: "90代以上", 男性: 50, 女性: 30, その他: 20, 回答なし: 10 },
]

export function AgeChart({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="bg-white p-5 rounded-lg shadow animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-4" />
        <div className="h-[300px] bg-gray-100 rounded" />
      </div>
    )
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">性別・年代比</h3>
      <div className="h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="ageGroup" tick={{ fill: "#666" }} interval={0} angle={-45} textAnchor="end" height={60} />
            <YAxis tick={{ fill: "#666" }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "12px" }} verticalAlign="top" height={36} />
            <Bar dataKey="男性" stackId="a" fill="#FFA500" name="男性" />
            <Bar dataKey="女性" stackId="a" fill="#FFB74D" name="女性" />
            <Bar dataKey="その他" stackId="a" fill="#FFD700" name="その他" />
            <Bar dataKey="回答なし" stackId="a" fill="#D3D3D3" name="回答なし" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

