interface StatCardProps {
  title: string
  value?: number | string
  subValue?: string
  change?: number
  dateRange?: string
  isLoading?: boolean
}

export function StatCard({ title, value, subValue, change, dateRange, isLoading = false }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-2">
        <h3 className="text-sm text-gray-600">{title}</h3>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">
              {isLoading ? "-" : value || "-"}
              <span className="text-sm font-normal">{value ? " 人/今月" : ""}</span>
            </p>
            {!isLoading && change !== undefined && (
              <span className={`text-sm ${change === 0 ? "text-gray-500" : ""}`}>{change}%</span>
            )}
          </div>

          {subValue && (
            <p className="text-sm text-gray-500">
              {isLoading ? "-" : subValue}
              <span className="text-gray-400"> (前月時点の累計)</span>
            </p>
          )}
        </div>

        {dateRange && <p className="text-xs text-gray-400 mt-2">{dateRange}</p>}
      </div>
    </div>
  )
}

