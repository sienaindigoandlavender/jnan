/**
 * Izem (ⵉⵣⵎ, "lion" in Tamazight): the lion cub who guides the Tifinagh corner.
 * Flat, round, saffron. Poses: sitting, waving hello, cheering, asleep.
 */
export type IzemPose = "sit" | "hello" | "cheer" | "sleep";

const MANE = "#e39a3b";
const MANE_DARK = "#c97d24";
const FUR = "#f6c97d";
const MUZZLE = "#fde8c4";
const INK = "#2a1f1a";
const BLUSH = "#f4a29a";

export function Izem({
  pose = "sit",
  size = 180,
  className,
}: {
  pose?: IzemPose;
  size?: number;
  className?: string;
}) {
  const asleep = pose === "sleep";
  return (
    <svg
      viewBox="0 0 200 220"
      width={size}
      height={(size * 220) / 200}
      aria-hidden
      className={className}
    >
      {/* tail */}
      <path
        d="M150 190 Q190 186 186 150"
        stroke={FUR}
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="186" cy="146" r="10" fill={MANE_DARK} />

      {/* body */}
      <ellipse cx="100" cy="176" rx="52" ry="40" fill={FUR} />
      <ellipse cx="100" cy="186" rx="30" ry="24" fill={MUZZLE} />
      {/* back paws */}
      <ellipse cx="66" cy="210" rx="18" ry="9" fill={FUR} />
      <ellipse cx="134" cy="210" rx="18" ry="9" fill={FUR} />

      {/* arms */}
      {pose === "hello" ? (
        <>
          <ellipse cx="80" cy="200" rx="11" ry="14" fill={FUR} />
          <path
            d="M138 168 Q160 140 158 116"
            stroke={FUR}
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="158" cy="112" r="12" fill={FUR} />
        </>
      ) : pose === "cheer" ? (
        <>
          <path
            d="M62 168 Q40 140 44 112"
            stroke={FUR}
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="44" cy="108" r="12" fill={FUR} />
          <path
            d="M138 168 Q160 140 156 112"
            stroke={FUR}
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="156" cy="108" r="12" fill={FUR} />
        </>
      ) : (
        <>
          <ellipse cx="80" cy="200" rx="11" ry="14" fill={FUR} />
          <ellipse cx="120" cy="200" rx="11" ry="14" fill={FUR} />
        </>
      )}

      {/* head: scalloped mane, ears, face */}
      <g className={asleep ? undefined : "breathe"}>
        {Array.from({ length: 14 }, (_, i) => {
          const a = (i / 14) * Math.PI * 2;
          const x = Math.round((100 + Math.cos(a) * 54) * 10) / 10;
          const y = Math.round((88 + Math.sin(a) * 50) * 10) / 10;
          return <circle key={i} cx={x} cy={y} r="20" fill={i % 2 ? MANE : MANE_DARK} />;
        })}
        <circle cx="100" cy="88" r="52" fill={MANE} />
        <circle cx="66" cy="50" r="13" fill={FUR} />
        <circle cx="66" cy="50" r="6" fill={BLUSH} />
        <circle cx="134" cy="50" r="13" fill={FUR} />
        <circle cx="134" cy="50" r="6" fill={BLUSH} />
        <circle cx="100" cy="92" r="40" fill={FUR} />
        <ellipse cx="100" cy="108" rx="22" ry="16" fill={MUZZLE} />

        {/* eyes */}
        {asleep ? (
          <g stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round">
            <path d="M76 86 Q84 92 92 86" />
            <path d="M108 86 Q116 92 124 86" />
          </g>
        ) : pose === "cheer" ? (
          <g stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round">
            <path d="M76 90 Q84 80 92 90" />
            <path d="M108 90 Q116 80 124 90" />
          </g>
        ) : (
          <>
            <circle cx="84" cy="86" r="6.5" fill={INK} />
            <circle cx="116" cy="86" r="6.5" fill={INK} />
            <circle cx="86" cy="83.5" r="2" fill="#fff" />
            <circle cx="118" cy="83.5" r="2" fill="#fff" />
          </>
        )}
        {/* cheeks, nose, mouth */}
        <ellipse cx="72" cy="102" rx="7" ry="4.5" fill={BLUSH} opacity="0.8" />
        <ellipse cx="128" cy="102" rx="7" ry="4.5" fill={BLUSH} opacity="0.8" />
        <path d="M93 100 Q100 96 107 100 Q100 108 93 100 Z" fill={INK} />
        <path
          d={
            pose === "cheer"
              ? "M90 110 Q100 124 110 110"
              : "M92 112 Q96 116 100 112 Q104 116 108 112"
          }
          stroke={INK}
          strokeWidth="3"
          fill={pose === "cheer" ? "#d85a5a" : "none"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {asleep ? (
        <text
          x="150"
          y="40"
          fontSize="22"
          fontWeight="700"
          fill={MANE_DARK}
          fontFamily="Arial, sans-serif"
        >
          z z
        </text>
      ) : null}
    </svg>
  );
}
