"use client";

interface ProgressRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function ProgressRing({
  score,
  size = 56,
  strokeWidth = 4,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const strokeColor =
    score >= 90
      ? "#56BD77"
      : score >= 75
        ? "#8FC6EB"
        : score >= 60
          ? "#FBE557"
          : "#EF9349";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute font-headline text-base font-bold text-white drop-shadow-sm">
        {score}
      </span>
    </div>
  );
}
