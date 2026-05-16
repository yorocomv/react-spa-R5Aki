export default function SvgSpinnersLoader5({
  size,
}: {
  size: string;
}) {
  // 内部の仮想サイズ（単位なしの純粋な数値）
  const baseSize = 100;

  // https://magecdn.com
  return (
    <svg
      // 表示サイズ（remなど）はstyleで制御することでFirefoxの警告を回避
      style={{ width: size, height: size }}
      version="1.1"
      id="L5"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://w3.org"
      x="0px"
      y="0px"
      // viewBoxには単位なしの数値を指定する（仕様通りの正しい書き方）
      viewBox={`0 0 ${baseSize} ${baseSize}`}
      enableBackground="new 0 0 0 0"
      xmlSpace="preserve"
    >
      <circle
        fill="currentColor"
        stroke="none"
        style={{
          cx: `calc(${baseSize}px / 3 - ${baseSize}px / 9 * 1.5)`,
          cy: `calc(${baseSize}px / 2)`,
          r: `calc(${baseSize}px / 18)`,
        } as React.CSSProperties}
      >
        <animateTransform attributeName="transform" dur="1s" type="translate" values="0 21 ; 0 -21; 0 21" repeatCount="indefinite" begin="0.1" />
      </circle>

      <circle
        fill="currentColor"
        stroke="none"
        style={{
          cx: `calc(${baseSize}px / 3 * 2 - ${baseSize}px / 9 * 1.5)`,
          cy: `calc(${baseSize}px / 2)`,
          r: `calc(${baseSize}px / 18)`,
        } as React.CSSProperties}
      >
        <animateTransform attributeName="transform" dur="1s" type="translate" values="0 14 ; 0 -14; 0 14" repeatCount="indefinite" begin="0.2" />
      </circle>

      <circle
        fill="currentColor"
        stroke="none"
        style={{
          cx: `calc(${baseSize}px - ${baseSize}px / 9 * 1.5)`,
          cy: `calc(${baseSize}px / 2)`,
          r: `calc(${baseSize}px / 18)`,
        } as React.CSSProperties}
      >
        <animateTransform attributeName="transform" dur="1s" type="translate" values="0 7 ; 0 -7; 0 7" repeatCount="indefinite" begin="0.3" />
      </circle>
    </svg>
  );
}
