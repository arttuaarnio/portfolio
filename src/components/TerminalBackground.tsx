// Faint shell sessions about my setup and interests, scrolling in the empty side gutters on wide screens.
type Line =
  | [kind: "cmd" | "out" | "ok" | "warn" | "dim", text: string]
  | [kind: "kv", key: string, value: string]
  | [kind: "swatches"];

const left: Line[] = [
  ["cmd", "neofetch"],
  ["ok", "arttu@helsinki"],
  ["dim", "--------------"],
  ["kv", "OS", "macOS"],
  ["kv", "WM", "AeroSpace"],
  ["kv", "Terminal", "WezTerm"],
  ["kv", "Shell", "zsh"],
  ["kv", "Editor", "LazyVim"],
  ["kv", "Agent", "Claude Code"],
  ["kv", "Theme", "Catppuccin Macchiato"],
  ["kv", "Font", "JetBrains Mono"],
  ["swatches"],
  ["out", ""],
  ["cmd", "cat ~/dotfiles/README.md | head -1"],
  ["out", "My macOS setup, installed with one script."],
  ["cmd", "./install.sh"],
  ["ok", "✓ AeroSpace   ✓ WezTerm   ✓ LazyVim"],
  ["ok", "✓ zsh         ✓ Claude Code"],
];

const right: Line[] = [
  ["cmd", "whoami"],
  ["out", "arttu"],
  ["cmd", "ls ~/likes"],
  ["out", "billiards  coffee  food  music"],
  ["cmd", "brew coffee --strong"],
  ["dim", "==> Brewing coffee"],
  ["ok", "☕ coffee is ready"],
  ["cmd", "cat ~/.plan"],
  ["out", "- finish the thesis"],
  ["out", "- keep building small tools"],
  ["out", "- more billiards"],
  ["cmd", "uptime"],
  ["dim", "Helsinki, Finland. Running on coffee."],
  ["cmd", "play --shuffle ~/music"],
  ["warn", "♫ now playing"],
];

const colors = {
  cmd: "text-[#cad3f5]",
  out: "text-[#a5adcb]",
  ok: "text-[#a6da95]",
  warn: "text-[#eed49f]",
  dim: "text-[#6e738d]",
};

const swatches = [
  "#ed8796",
  "#f5a97f",
  "#eed49f",
  "#a6da95",
  "#8bd5ca",
  "#8aadf4",
  "#c6a0f6",
  "#f5bde6",
];

function render(line: Line, i: number) {
  if (line[0] === "kv") {
    return (
      <div key={i}>
        <span className="text-[#c6a0f6]">{line[1]}</span>
        <span className="text-[#6e738d]">: </span>
        <span className="text-[#cad3f5]">{line[2]}</span>
      </div>
    );
  }
  if (line[0] === "swatches") {
    return (
      <div key={i} className="flex gap-0 pt-2">
        {swatches.map((c) => (
          <span key={c} className="h-3 w-5" style={{ background: c }} />
        ))}
      </div>
    );
  }
  const [kind, text] = line;
  return (
    <div key={i} className={colors[kind]}>
      {kind === "cmd" && <span className="text-[#c6a0f6]">❯ </span>}
      {text}
    </div>
  );
}

function Session({ lines, side }: { lines: Line[]; side: string }) {
  // Rendered twice so the -50% scroll loops seamlessly.
  const block = lines.map(render);
  return (
    <div className={`terminal-gutter ${side}`}>
      <div className="terminal-scroll">
        {block}
        <div className="h-[70vh]" />
        {block}
        <div className="h-[70vh]" />
      </div>
    </div>
  );
}

export default function TerminalBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <Session lines={left} side="left-0" />
      <Session lines={right} side="right-0" />
    </div>
  );
}
