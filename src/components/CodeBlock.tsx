import { Check, Copy } from "lucide-react";
import { useMemo } from "react";
import { useCopy } from "../lib/hooks";

const KEYWORDS: Record<string, string[]> = {
  dax: ["VAR", "RETURN", "CALCULATE", "CALCULATETABLE", "DIVIDE", "COUNTROWS", "SUM", "SUMX",
        "SAMEPERIODLASTYEAR", "VALUES", "FILTER", "ALL", "ALLEXCEPT", "USERPRINCIPALNAME",
        "IF", "SWITCH", "TRUE", "FALSE", "IN", "SELECTEDVALUE", "DATESYTD", "AVERAGEX"],
  m:    ["let", "in", "each", "type", "true", "false", "null", "Table", "Sql", "Text", "Date",
         "Currency", "List", "Number", "Record"],
  sql:  ["WITH", "AS", "SELECT", "FROM", "WHERE", "ORDER", "BY", "PARTITION", "OVER", "GROUP",
         "HAVING", "JOIN", "LEFT", "INNER", "ON", "ROW_NUMBER", "DESC", "ASC", "AND", "OR", "NOT"],
  powershell: ["Connect-PowerBIServiceAccount", "Get-PowerBIWorkspace", "Where-Object",
               "ForEach-Object", "Export-Csv", "PSCustomObject"],
  model: [],
};

const LANG_LABEL: Record<string, string> = {
  dax: "DAX", m: "Power Query · M", sql: "T-SQL", powershell: "PowerShell", model: "Model diagram",
};

type Tok = { t: string; c: string };

function tokenize(code: string, lang: string): Tok[][] {
  const kw = KEYWORDS[lang] ?? [];
  return code.split("\n").map((line) => {
    // comments first, whole-line
    const commentIdx = (() => {
      if (lang === "dax" || lang === "sql") return line.indexOf("--");
      if (lang === "m") return line.indexOf("//");
      if (lang === "powershell") return line.indexOf("#");
      return -1;
    })();

    if (commentIdx === 0) return [{ t: line, c: "cmt" }];

    const body = commentIdx > 0 ? line.slice(0, commentIdx) : line;
    const tail = commentIdx > 0 ? line.slice(commentIdx) : "";

    const out: Tok[] = [];
    const re = /("[^"]*"|'[^']*'|\[[^\]]*\]|\b\d+(?:\.\d+)?\b|[A-Za-z_][A-Za-z0-9_.-]*|\s+|.)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(body))) {
      const tk = m[0];
      let c = "txt";
      if (/^["']/.test(tk)) c = "str";
      else if (/^\[/.test(tk)) c = "col";
      else if (/^\d/.test(tk)) c = "num";
      else if (kw.some((k) => k.toLowerCase() === tk.toLowerCase())) c = "kw";
      else if (/^[A-Za-z_]/.test(tk) && /^[A-Z]/.test(tk) && tk.length > 2) c = "id";
      else if (/^[=<>+\-*/(),.$@|:]/.test(tk)) c = "op";
      out.push({ t: tk, c });
    }
    if (tail) out.push({ t: tail, c: "cmt" });
    return out;
  });
}

const COLOR: Record<string, string> = {
  kw: "var(--accent)",
  str: "var(--mint)",
  col: "var(--cyan)",
  num: "var(--violet)",
  id: "var(--text)",
  op: "var(--text-faint)",
  cmt: "var(--text-faint)",
  txt: "var(--text-muted)",
};

export default function CodeBlock({
  code, lang, compact = false,
}: { code: string; lang: string; compact?: boolean }) {
  const lines = useMemo(() => tokenize(code, lang), [code, lang]);
  const { copy, copied } = useCopy();

  return (
    <div className="overflow-hidden rounded-xl" style={{ border: "1px solid var(--border)", background: "color-mix(in oklab, var(--ink-900, #06080f) 42%, var(--panel-solid))" }}>
      <div className="flex items-center justify-between px-3.5 py-2" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: "color-mix(in oklab, var(--rose) 70%, transparent)" }} />
            <span className="h-2 w-2 rounded-full" style={{ background: "color-mix(in oklab, var(--accent) 70%, transparent)" }} />
            <span className="h-2 w-2 rounded-full" style={{ background: "color-mix(in oklab, var(--mint) 70%, transparent)" }} />
          </span>
          <span className="ml-1 font-mono text-[9.5px] tracking-[0.18em] uppercase text-faint">{LANG_LABEL[lang] ?? lang}</span>
        </div>
        <button onClick={() => copy(code, "c")} aria-label="Copy code"
          className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[9.5px] tracking-wide uppercase transition-colors"
          style={{ color: copied === "c" ? "var(--mint)" : "var(--text-faint)" }}>
          {copied === "c" ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
        </button>
      </div>
      <pre className={`overflow-x-auto ${compact ? "p-3" : "p-4"} font-mono leading-[1.72]`} style={{ fontSize: compact ? 11 : 11.8 }}>
        <code>
          {lines.map((toks, i) => (
            <div key={i} className="flex">
              <span className="mr-4 w-5 shrink-0 text-right select-none" style={{ color: "color-mix(in oklab, var(--text) 22%, transparent)" }}>
                {i + 1}
              </span>
              <span className="whitespace-pre">
                {toks.map((t, j) => (
                  <span key={j} style={{ color: COLOR[t.c], fontStyle: t.c === "cmt" ? "italic" : undefined }}>{t.t}</span>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
