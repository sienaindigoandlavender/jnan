import Link from "next/link";
import { Izem } from "./Izem";

/**
 * The garden: the home screen. Each room is a corner. Only the Tifinagh corner
 * is awake for now; the others are sleeping seeds. Flowers bloom around the fig
 * tree as letters become known, and nothing ever wilts.
 */
const FLOWER_SPOTS: [number, number][] = [
  [40, 250],
  [62, 262],
  [86, 256],
  [110, 268],
  [134, 258],
  [158, 266],
  [182, 256],
  [206, 266],
  [230, 258],
  [254, 268],
  [278, 258],
  [300, 266],
  [52, 278],
  [76, 284],
  [100, 280],
  [124, 290],
  [148, 282],
  [172, 290],
  [196, 282],
  [220, 290],
  [244, 282],
  [268, 290],
  [292, 282],
  [30, 270],
  [316, 276],
  [44, 292],
  [88, 296],
  [132, 300],
  [176, 300],
  [220, 302],
  [264, 300],
  [308, 294],
  [20, 286],
];
const PETALS = ["#f4a29a", "#c9b6f2", "#ffd36b", "#9fd3a9", "#f7b6cf"];

function Flower({ x, y, i }: { x: number; y: number; i: number }) {
  const c = PETALS[i % PETALS.length];
  return (
    <g transform={`translate(${x} ${y}) scale(1.45)`}>
      <path d="M0 0 V12" stroke="#5f9a6b" strokeWidth="2" />
      {[0, 72, 144, 216, 288].map((a) => (
        <circle
          key={a}
          cx={Math.round(Math.cos((a * Math.PI) / 180) * 4.5 * 10) / 10}
          cy={Math.round(Math.sin((a * Math.PI) / 180) * 4.5 * 10) / 10}
          r="3.6"
          fill={c}
        />
      ))}
      <circle r="2.6" fill="#fff6d6" />
    </g>
  );
}

export function Garden({ bloomed }: { bloomed: number }) {
  return (
    <div className="relative overflow-hidden rounded-big bg-sky">
      <svg viewBox="0 0 340 320" width="100%" aria-hidden>
        {/* sky, sun, clouds */}
        <circle cx="292" cy="48" r="26" fill="#ffe28a" />
        <g fill="#fff">
          <circle cx="60" cy="52" r="14" />
          <circle cx="78" cy="46" r="18" />
          <circle cx="96" cy="54" r="12" />
          <rect x="48" y="54" width="60" height="12" rx="6" />
        </g>
        {/* the courtyard wall, with a horseshoe arch */}
        <rect x="0" y="150" width="340" height="40" fill="#f1d9c4" />
        <path d="M150 190 V168 Q150 146 170 146 Q190 146 190 168 V190 Z" fill="#e7c3a6" />
        {/* lawn */}
        <path d="M0 190 H340 V320 H0 Z" fill="#cfe8cf" />
        <path d="M0 230 Q90 214 170 226 T340 222 V320 H0 Z" fill="#bfe0c0" />
        {/* fig tree */}
        <path
          d="M84 230 Q82 196 92 172"
          stroke="#8a6a5a"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="72" cy="146" r="30" fill="#7cbf8a" />
        <circle cx="104" cy="138" r="34" fill="#6fb37e" />
        <circle cx="90" cy="112" r="26" fill="#86c995" />
        <circle cx="82" cy="140" r="4" fill="#8a4f7d" />
        <circle cx="112" cy="128" r="4" fill="#8a4f7d" />
        <circle cx="98" cy="156" r="4" fill="#8a4f7d" />
        {/* sleeping seeds in the other corners */}
        {[
          [196, 214],
          [248, 206],
          [298, 216],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <ellipse cx="0" cy="10" rx="18" ry="7" fill="#b7a08d" />
            <path d="M0 8 Q-2 -2 4 -8" stroke="#5f9a6b" strokeWidth="2.5" fill="none" />
            <ellipse cx="7" cy="-9" rx="5" ry="3" fill="#7cbf8a" transform="rotate(-30 7 -9)" />
          </g>
        ))}
        {/* flowers: one per known letter */}
        {FLOWER_SPOTS.slice(0, bloomed).map(([x, y], i) => (
          <Flower key={i} x={x} y={y} i={i} />
        ))}
      </svg>
      <Link
        href="/tifinagh"
        aria-label="Tifinagh"
        className="absolute bottom-[14%] left-[24%] w-[26%]"
      >
        <Izem pose="hello" size={120} className="h-auto w-full" />
      </Link>
    </div>
  );
}
