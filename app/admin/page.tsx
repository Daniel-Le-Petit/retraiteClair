"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  adminLogin,
  adminStats,
  type AdminRange,
  type AdminStatsResponse,
} from "@/lib/admin-api";
import { VisitsChart } from "./VisitsChart";

const TOKEN_KEY = "retraiteclair_admin_jwt";

export default function AdminPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState<AdminRange>("7d");
  const [data, setData] = useState<AdminStatsResponse | null>(null);

  useEffect(() => {
    try {
      const t = sessionStorage.getItem(TOKEN_KEY);
      if (t) setToken(t);
    } catch {
      /* ignore */
    }
  }, []);

  const loadStats = useCallback(
    async (t: string, r: AdminRange) => {
      setLoading(true);
      setErr(null);
      try {
        const d = await adminStats(t, r);
        setData(d);
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Erreur");
        setToken(null);
        sessionStorage.removeItem(TOKEN_KEY);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!token) return;
    void loadStats(token, range);
  }, [token, range, loadStats]);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const { token: t } = await adminLogin(username, password);
      setToken(t);
      sessionStorage.setItem(TOKEN_KEY, t);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setToken(null);
    setData(null);
    sessionStorage.removeItem(TOKEN_KEY);
  }

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl text-green-950">Admin — visites</h1>
            <p className="mt-1 text-sm text-neutral-600">
              Connexions / activité (Supabase + Edge Function). Session 8 h.
            </p>
          </div>
          <Link
            href="/"
            className="shrink-0 rounded-lg border border-green-200 bg-white px-3 py-2 text-sm font-medium text-green-900 shadow-sm transition hover:bg-green-50"
          >
            ← RetraiteClair
          </Link>
        </div>

        {!token ? (
          <form
            onSubmit={onLogin}
            className="mt-8 max-w-md space-y-4 rounded-xl border border-green-200 bg-white p-6 shadow-sm"
          >
            <div>
              <label htmlFor="adm-user" className="text-sm font-medium text-neutral-900">
                Identifiant
              </label>
              <input
                id="adm-user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="adm-pass" className="text-sm font-medium text-neutral-900">
                Mot de passe
              </label>
              <input
                id="adm-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2"
              />
            </div>
            {err && (
              <p className="text-sm text-red-700" role="alert">
                {err}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-900 disabled:opacity-50"
            >
              {loading ? "Connexion…" : "Se connecter"}
            </button>
          </form>
        ) : (
          <>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-sm text-neutral-600">Période :</span>
              {(
                [
                  ["7d", "7 jours"],
                  ["month", "Mois en cours"],
                  ["year", "Année en cours"],
                  ["all", "Tout"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRange(value)}
                  className={`rounded-full px-3 py-1 text-sm ${
                    range === value
                      ? "bg-green-700 text-white"
                      : "bg-white text-neutral-800 ring-1 ring-neutral-200"
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => void loadStats(token, range)}
                className="text-sm text-green-800 underline"
              >
                Actualiser
              </button>
              <button
                type="button"
                onClick={logout}
                className="ml-auto text-sm text-neutral-600 underline"
              >
                Déconnexion
              </button>
            </div>

            {loading && !data && (
              <p className="mt-6 text-sm text-neutral-500">Chargement…</p>
            )}
            {err && (
              <p className="mt-4 text-sm text-red-700" role="alert">
                {err}
              </p>
            )}

            {data && (
              <div className="mt-8 space-y-10">
                <VisitsChart
                  connection_logs={data.connection_logs}
                  range={range}
                  errorNote={data.connectionLogsError}
                  totalInDb={data.connection_logs_total ?? null}
                  countError={data.connectionLogsCountError}
                />

                <section>
                  <h2 className="text-lg font-medium text-green-950">
                    Journal connection_logs
                  </h2>
                  <p className="text-xs text-neutral-500">
                    {data.connectionLogsError ?? `${data.connection_logs.length} ligne(s)`}
                  </p>
                  <Table
                    columns={["Date", "User / @", "IP", "User-Agent"]}
                    rows={data.connection_logs.map((r) => [
                      fmtDate(r.created_at),
                      String(r.user_label ?? "—"),
                      String(r.ip_address ?? "—"),
                      truncate(String(r.user_agent ?? "—"), 48),
                    ])}
                  />
                </section>

                <section>
                  <h2 className="text-lg font-medium text-green-950">user_numbers</h2>
                  <p className="text-xs text-neutral-500">
                    {data.userNumbersError ?? `${data.user_numbers.length} ligne(s)`}
                  </p>
                  <Table
                    columns={["N°", "user_id", "Dernière activité", "IP", "Ville"]}
                    rows={data.user_numbers.map((r) => [
                      String(r.user_number ?? "—"),
                      truncate(String(r.user_id ?? "—"), 24),
                      fmtDate(r.last_seen),
                      String(r.ip_address ?? "—"),
                      String(r.city ?? "—"),
                    ])}
                  />
                </section>

                <section>
                  <h2 className="text-lg font-medium text-green-950">events</h2>
                  <p className="text-xs text-neutral-500">
                    {data.eventsError ?? `${data.events.length} ligne(s)`}
                  </p>
                  <Table
                    columns={["Date", "event", "user_id", "page"]}
                    rows={data.events.map((r) => [
                      fmtDate(r.created_at),
                      truncate(String(r.event_name ?? "—"), 20),
                      truncate(String(r.user_id ?? "—"), 16),
                      truncate(String(r.page_url ?? "—"), 40),
                    ])}
                  />
                </section>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function fmtDate(v: unknown): string {
  if (v == null) return "—";
  const d = new Date(String(v));
  if (Number.isNaN(d.getTime())) return String(v);
  return d.toLocaleString("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function truncate(s: string, n: number): string {
  if (s.length <= n) return s;
  return `${s.slice(0, n)}…`;
}

function Table({
  columns,
  rows,
}: {
  columns: string[];
  rows: string[][];
}) {
  if (rows.length === 0) {
    return <p className="mt-2 text-sm text-neutral-500">Aucune donnée.</p>;
  }
  return (
    <div className="mt-2 overflow-x-auto rounded-lg border border-neutral-200 bg-white text-sm">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50">
            {columns.map((c) => (
              <th key={c} className="px-3 py-2 font-medium text-neutral-800">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-neutral-100">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 font-mono text-xs text-neutral-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
