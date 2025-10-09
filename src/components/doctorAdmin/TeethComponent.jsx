import React, { useEffect, useMemo, useState } from "react";

const defaultTeeth = [
  { id: 1, name: "UR 3rd Molar (Wisdom)" },
  { id: 2, name: "UR 2nd Molar" },
  { id: 3, name: "UR 1st Molar" },
  { id: 4, name: "UR 2nd Premolar" },
  { id: 5, name: "UR 1st Premolar" },
  { id: 6, name: "UR Canine" },
  { id: 7, name: "UR Lateral Incisor" },
  { id: 8, name: "UR Central Incisor" },
  { id: 9, name: "UL Central Incisor" },
  { id: 10, name: "UL Lateral Incisor" },
  { id: 11, name: "UL Canine" },
  { id: 12, name: "UL 1st Premolar" },
  { id: 13, name: "UL 2nd Premolar" },
  { id: 14, name: "UL 1st Molar" },
  { id: 15, name: "UL 2nd Molar" },
  { id: 16, name: "UL 3rd Molar (Wisdom)" },
  { id: 17, name: "LL 3rd Molar (Wisdom)" },
  { id: 18, name: "LL 2nd Molar" },
  { id: 19, name: "LL 1st Molar" },
  { id: 20, name: "LL 2nd Premolar" },
  { id: 21, name: "LL 1st Premolar" },
  { id: 22, name: "LL Canine" },
  { id: 23, name: "LL Lateral Incisor" },
  { id: 24, name: "LL Central Incisor" },
  { id: 25, name: "LR Central Incisor" },
  { id: 26, name: "LR Lateral Incisor" },
  { id: 27, name: "LR Canine" },
  { id: 28, name: "LR 1st Premolar" },
  { id: 29, name: "LR 2nd Premolar" },
  { id: 30, name: "LR 1st Molar" },
  { id: 31, name: "LR 2nd Molar" },
  { id: 32, name: "LR 3rd Molar (Wisdom)" },
];
const FDI_BY_UNIVERSAL = [
  18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 38, 37, 36,
  35, 34, 33, 32, 31, 41, 42, 43, 44, 45, 46, 47, 48,
];
const PALMER_QTXT = { 1: "UR", 2: "UL", 3: "LL", 4: "LR" };
const PALMER_SYMBOL = { UR: "┘", UL: "└", LL: "┌", LR: "┐" };

const toFDI = (id) => FDI_BY_UNIVERSAL[id - 1];
const toPalmerFromFDI = (fdi) => {
  const q = Math.floor(fdi / 10);
  return `${PALMER_QTXT[q]} ${fdi % 10} ${PALMER_SYMBOL[PALMER_QTXT[q]]}`;
};
export default function TeethChart({
  teeth,
  onSelect,
  initialSelectedIds = [],
  sizePx = 500,
  showIds = false,
  currentToothId = null,
}) {
  const [selectedIds, setSelectedIds] = useState([]);

  // Use API data if provided, otherwise fall back to default teeth
  const teethData = teeth && teeth.length > 0 ? teeth : defaultTeeth;
  const toothSize = Math.max(40, Math.floor(sizePx * 0.1));
  const centerX = sizePx / 2;
  const centerY = sizePx / 2;
  const upper = teethData.slice(0, 16);
  const lower = teethData.slice(16);
  const upperPos = useMemo(
    () =>
      arcPositions(
        upper.length,
        -180,
        0,
        centerX,
        centerY - 80,
        sizePx * 0.42,
        1
      ),
    [upper.length, sizePx]
  );
  const lowerPos = useMemo(
    () =>
      arcPositions(
        lower.length,
        0,
        180,
        centerX,
        centerY + 80,
        sizePx * 0.42,
        17
      ),
    [lower.length, sizePx]
  );

  // const toggle = tooth => {
  //     const next = selectedIds.includes(tooth.id)
  //         ? selectedIds.filter(id => id !== tooth.id)
  //         : [...selectedIds, tooth.id];
  //     setSelectedIds(next);
  //     if (onSelect) {
  //         onSelect(next.map(id => {
  //             const t = teethData.find(x => x.id === id);
  //             const fdi = toFDI(id);
  //             return { ...t, fdi, palmer: toPalmerFromFDI(fdi) };
  //         }));
  //     }
  // };
  // const [selectedIds, setSelectedIds] = useState([]);
  const [currentTooth, setCurrentTooth] = useState(null);

  // const toggle = (tooth) => {
  //     const next = selectedIds.includes(tooth.id)
  //         ? selectedIds.filter((id) => id !== tooth.id)
  //         : [...selectedIds, tooth.id];

  //     setSelectedIds(next);
  //     setCurrentTooth(tooth.id); // ✅ keep the latest as "current"

  //     if (onSelect) {
  //         onSelect(
  //             next.map((id) => {
  //                 const t = teethData.find((x) => x.id === id);
  //                 const fdi = toFDI(id);
  //                 return { ...t, fdi, palmer: toPalmerFromFDI(fdi) };
  //             })
  //         );
  //     }
  // };

  const toggle = (tooth) => {
    const next = selectedIds.includes(tooth.id)
      ? selectedIds.filter((id) => id !== tooth.id)
      : [...selectedIds, tooth.id];

    setSelectedIds(next);
    setCurrentTooth(tooth.id);

    if (onSelect) {
      const fdi = toFDI(tooth.id);
      onSelect({ ...tooth, fdi, palmer: toPalmerFromFDI(fdi) }); // ✅ sirf clicked tooth bhejta hai
    }
  };

  const [leftOffset, setLeftOffset] = useState("left-0");

  useEffect(() => {
    const updateOffset = () => {
      // Get zoom ratio: actual width vs devicePixelRatio
      const zoom = Math.round((window.outerWidth / window.innerWidth) * 100);

      if (zoom === 100) {
        setLeftOffset("-left-2"); // 👈 when 100%
      } else if (zoom <= 80) {
        setLeftOffset("left-14"); // 👈 when 80% or below
      } else {
        setLeftOffset("left-0"); // fallback
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  return (
    <div
      className={`relative top-14 w-full max-w-[700px] aspect-square mx-auto transition-all duration-300 ${leftOffset}`}
    >
      {upper.map((t, i) => (
        <ToothButton
          key={t.id}
          tooth={t}
          fdi={toFDI(t.id)}
          palmer={toPalmerFromFDI(toFDI(t.id))}
          size={toothSize}
          x={upperPos[i].x}
          y={upperPos[i].y}
          selected={selectedIds.includes(t.id)}
          isCurrent={currentToothId === t.id}
          onClick={() => toggle(t)}
          showId={showIds}
        />
      ))}
      {lower.map((t, i) => (
        <ToothButton
          key={t.id}
          tooth={t}
          fdi={toFDI(t.id)}
          palmer={toPalmerFromFDI(toFDI(t.id))}
          size={toothSize}
          x={lowerPos[i].x}
          y={lowerPos[i].y}
          selected={selectedIds.includes(t.id)}
          isCurrent={currentToothId === t.id}
          onClick={() => toggle(t)}
          showId={showIds}
        />
      ))}
    </div>
  );
}

function arcPositions(count, degStart, degEnd, cx, cy, r, startId) {
  const toRad = (d) => (d * Math.PI) / 180;
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const deg = degStart + (degEnd - degStart) * t;
    return {
      x: cx + Math.cos(toRad(deg)) * r,
      y: cy + Math.sin(toRad(deg)) * r,
    };
  });
}

function ToothButton({
  tooth,
  fdi,
  palmer,
  size,
  x,
  y,
  selected,
  isCurrent,
  onClick,
  showId,
}) {
  const getRingColor = () => {
    if (isCurrent) return "ring-2 ring-red-600"; // Red for current
    if (selected) return "ring-2 ring-green-600"; // Green for previous
    return "";
  };

  const getShadowColor = () => {
    if (isCurrent) return "drop-shadow-[0_0_6px_red]"; // Red shadow for current
    if (selected) return "drop-shadow-[0_0_6px_green]"; // Green shadow for previous
    return "";
  };

  return (
    <button
      title={tooth.name}
      onClick={onClick}
      className={`absolute flex items-center justify-center transition-all duration-200
        ${selected ? "scale-110 z-10" : ""} ${getRingColor()}
      `}
      style={{
        width: size,
        height: size,
        left: x - size / 2,
        top: y - size / 2,
      }}
    >
      {/* Tooth image */}

      {tooth.id}

      {/* <img
                src={`/teeth/${tooth.id}.png`}
                alt={tooth.id}
                className={`object-contain mx-auto my-auto ${getShadowColor()}`}
                style={{ width: "100%", height: "100%" }}
            /> */}

      {selected && !isCurrent && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-xs px-2 py-1 rounded shadow-md border">
          <p className="font-semibold">{tooth.name}</p>
          <p>FDI: {fdi}</p>
          <p>Palmer: {palmer}</p>
        </div>
      )}

      {/* Optional ID */}
      {showId && (
        <span className="absolute top-0 left-0 text-[9px] bg-white/90 px-1 rounded shadow ring-1 ring-zinc-300">
          {fdi}
        </span>
      )}
    </button>
  );
}
