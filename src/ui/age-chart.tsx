"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const emptyData = [
  { age: "10代未満" },
  { age: "10代" },
  { age: "20代" },
  { age: "30代" },
  { age: "40代" },
  { age: "50代" },
  { age: "60代" },
  { age: "70代" },
  { age: "80代以上" },
]

interface AgeChartProps {
  data?: Array<{
    age: string
    male?: number
    female?: number
    other?: number
  }>
  isLoading?: boolean
}

export function AgeChart({ data = emptyData, isLoading = false }: AgeChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium">性別・年代比</h3>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-orange-400 rounded-sm"></span>
              男性
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-orange-200 rounded-sm"></span>
              女性
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-gray-200 rounded-sm"></span>
              その他
            </span>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="age" scale="point" padding={{ left: 10, right: 10 }} />
              <YAxis />
              <Bar dataKey="male" stackId="a" fill="#FB923C" />
              <Bar dataKey="female" stackId="a" fill="#FED7AA" />
              <Bar dataKey="other" stackId="a" fill="#E5E7EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

