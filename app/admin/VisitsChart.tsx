"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AdminRange } from "@/lib/admin-api";
import {
  buildDaySeries,
  buildMonthSeries,
  buildWeekSeries,
  prepareLogsForChart,
} from "@/lib/parisVisits";

const BAR_COLORS = [
  "#14532d",
  "#166534",
  "#15803d",
  "#16a34a",
  "#22c55e",
  "#4ade80",
  "#86efac",
];

const CHART_HEIGHT = 300;

type Granularity = "day" | "month";

type ChartGranularity = "day" | "week" | "month";

type Props = {
  connection_logs: Record<string, unknown>[];
  range: AdminRange;
  errorNote?: string;
  totalInDb?: number | null;
  countError?: string;
};

export function VisitsChart({
  connection_logs,
  range,
  errorNote,
  totalInDb,
  countError,
}: Props) {
  const [granularity, setGranularity] = useState<Granularity>("day");
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    setChartReady(true);
  }, []);

  const chartGranularity = useMemo<ChartGranularity>(() => {
    if (granularity === "month") return "month";
    if (range === "year" || range === "all") return "week";
    return "day";
  }, [range, granularity]);

  const logsForChart = useMemo(
    () => prepareLogsForChart(connection_logs, range, chartGranularity),
    [connection_logs, range, chartGranularity],
  );

  const series = useMemo(() => {
    if (chartGranularity === "month") {
      return buildMonthSeries(logsForChart, range);
    }
    if (chartGranularity === "week") {
      return buildWeekSeries(logsForChart, range);
    }
    return buildDaySeries(logsForChart, range);
  }, [logsForChart, range, chartGranularity]);

  const useWeekScale = range === "year" || range === "all";

  const sumChart = useMemo(
    () => series.reduce((s, p) => s + p.count, 0),
    [series],
  );

  const maxY = useMemo(
    () => Math.max(5, ...series.map((p) => p.count)),
    [series],
  );

  const angledTicks = granularity === "day" && series.length > 10;

  const truncated =
    connection_logs.length >= 2500 &&
    typeof totalInDb === "number" &&
    totalInDb > connection_logs.length;

  return (
    <section className="rounded-xl border border-green-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-medium text-green-950">
            Visites (connection_logs)
          </h2>
          <p className="text-xs text-neutral-500">
            {typeof totalInDb === "number" && (
              <>
                Total en base : <strong>{totalInDb}</strong>
                {" · "}
              </>
            )}
            Somme des barres (Europe/Paris) : <strong>{sumChart}</strong>
            {chartGranularity === "day" && sumChart !== logsForChart.length ? (
              <span className="text-amber-800">
                {" "}
                (incohérence avec {logsForChart.length} lignes — signalez ce cas)
              </span>
            ) : null}
            {countError ? ` — ${countError}` : ""}
            {errorNote ? ` — ${errorNote}` : ""}
            {truncated ? (
              <span className="text-amber-800">
                {" "}
                — L’échantillon est plafonné à 2500 lignes : le graphique peut
                sous-estimer si le total en base est plus élevé.
              </span>
            ) : null}
          </p>
        </div>
        <div className="flex rounded-lg bg-neutral-100 p-0.5 text-sm">
          <button
            type="button"
            onClick={() => setGranularity("day")}
            className={`rounded-md px-3 py-1.5 font-medium transition ${
              granularity === "day"
                ? "bg-white text-green-900 shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            {useWeekScale ? "Par semaine" : "Par jour"}
          </button>
          <button
            type="button"
            onClick={() => setGranularity("month")}
            className={`rounded-md px-3 py-1.5 font-medium transition ${
              granularity === "month"
                ? "bg-white text-green-900 shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Par mois
          </button>
        </div>
      </div>

      <div className="mt-4 w-full" style={{ minHeight: CHART_HEIGHT }}>
        {!chartReady ? (
          <div
            className="flex items-center justify-center text-sm text-neutral-500"
            style={{ height: CHART_HEIGHT }}
          >
            Préparation du graphique…
          </div>
        ) : series.length === 0 ? (
          <p className="py-12 text-center text-sm text-neutral-500">
            Aucune visite sur cette période.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
            <BarChart
              data={series}
              margin={{ top: 8, right: 12, left: 4, bottom: angledTicks ? 48 : 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#44403c" }}
                interval={0}
                angle={angledTicks ? -40 : 0}
                textAnchor={angledTicks ? "end" : "middle"}
                height={angledTicks ? 56 : 32}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: "#44403c" }}
                width={44}
                domain={[0, maxY]}
                label={{
                  value: "Visites",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "#57534e", fontSize: 11 },
                }}
              />
              <Tooltip
                cursor={{ fill: "rgba(22, 101, 52, 0.06)" }}
                formatter={(value: number | string) => [
                  `${typeof value === "number" ? value : Number(value)}`,
                  "Visites",
                ]}
                labelFormatter={(label) => String(label)}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #d6d3d1",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
              <Bar
                dataKey="count"
                name="Visites"
                radius={[6, 6, 0, 0]}
                maxBarSize={chartGranularity === "month" ? 48 : 28}
              >
                {series.map((_, i) => (
                  <Cell
                    key={`cell-${i}`}
                    fill={BAR_COLORS[i % BAR_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
