import ElevenIconSvg from "../icon/teeth/eleven";
import EightIconSvg from "../icon/teeth/eight";
import FifthIconSvg from "../icon/teeth/fifth";
import FouthIconSvg from "../icon/teeth/fouth";
import NineIconSvg from "../icon/teeth/nine";
import OneIconSvg from "../icon/teeth/one";
import SevenIconSvg from "../icon/teeth/seven";
import SixIconSvg from "../icon/teeth/six";
import TenSvgIcon from "../icon/teeth/ten";
import ThreeIconSvg from "../icon/teeth/three";
import TwelveIconSvg from "../icon/teeth/twelve";
import TwoIconSvg from "../icon/teeth/two";
import ThirteenIconSvg from "../icon/teeth/thirteen";
import FourteenIconSvg from "../icon/teeth/fourteen";
import FifteenSvgIcon from "../icon/teeth/fifteen";
import SixteenIconSvg from "../icon/teeth/sixteen";
import SeventeenIconSvg from "../icon/teeth/seventeen";
import EighteenIconSvg from "../icon/teeth/eighteen";
import NinteenIconSvg from "../icon/teeth/ninteen";
import TwentyIconSvg from "../icon/teeth/twenty";
import TwentyOneIconSvg from "../icon/teeth/twenty-one";
import TwentyTwoIconSvg from "../icon/teeth/twenty-two";
import TwentyThreeIconSvg from "../icon/teeth/twenty-three";
import TwentyFourIconSvg from "../icon/teeth/twenty-four";
import TwentyFiveIconSvg from "../icon/teeth/twenty-five";
import TwentySixIconSvg from "../icon/teeth/twenty-six";
import TwentySevenIconSvg from "../icon/teeth/twenty-seven";
import TwentyEightIconSvg from "../icon/teeth/twenty-eight";
import TwentyNineIconSvg from "../icon/teeth/twenty-nine";
import ThirtyIconSvg from "../icon/teeth/thirty";
import ThirtyOneIconSvg from "../icon/teeth/thirty-one";
import ThirtyTwoIconSvg from "../icon/teeth/thirty-two";

// Store all tooth SVG components in an array for dynamic mapping
const toothComponents = [
  OneIconSvg,
  TwoIconSvg,
  ThreeIconSvg,
  FouthIconSvg,
  FifthIconSvg,
  SixIconSvg,
  SevenIconSvg,
  EightIconSvg,
  NineIconSvg,
  TenSvgIcon,
  ElevenIconSvg,
  TwelveIconSvg,
  ThirteenIconSvg,
  FourteenIconSvg,
  FifteenSvgIcon,
  SixteenIconSvg,
  SeventeenIconSvg,
  EighteenIconSvg,
  NinteenIconSvg,
  TwentyIconSvg,
  TwentyOneIconSvg,
  TwentyTwoIconSvg,
  TwentyThreeIconSvg,
  TwentyFourIconSvg,
  TwentyFiveIconSvg,
  TwentySixIconSvg,
  TwentySevenIconSvg,
  TwentyEightIconSvg,
  TwentyNineIconSvg,
  ThirtyIconSvg,
  ThirtyOneIconSvg,
  ThirtyTwoIconSvg,
];

export default function TeethSvg({
  selectedTeeth = [],
  onToothClick = () => {},
  fillColor = "#94D3DD", // ✅ Default highlight color
  defaultColor = "white",
  disabledTeeth = [], // Array of disabled tooth numbers
}) {
  const upperTeeth = Array.from({ length: 16 }, (_, i) => i + 1);
  const lowerTeeth = Array.from({ length: 16 }, (_, i) => i + 17);
  const isSelected = (num) => selectedTeeth.includes(num);
  const isDisabled = (num) => disabledTeeth.includes(num);
  
  // Helper to render each tooth with dynamic props
  const renderTooth = (num, i, isUpper = true) => {
    const ToothComponent = toothComponents[num - 1]; // zero-based index
    if (!ToothComponent) return null;
    const selected = isSelected(num);
    const disabled = isDisabled(num);
    const color = selected ? fillColor : defaultColor;

    const radius = 170; // ↓ smaller = closer curve
    const total = 16;
    const angleStep = Math.PI / (total + 1);
    const angle = isUpper ? Math.PI - angleStep * (i + 1) : angleStep * (i + 1);

    const x = radius + 120 * Math.cos(angle);
    const y = radius * Math.sin(angle) * (isUpper ? 1 : -1);

    const handleClick = () => {
      if (!disabled) {
        onToothClick(num);
      }
    };

    return (
      <div
        key={num}
        onClick={handleClick}
        className={`absolute transition-transform duration-300 ${
          disabled
            ? "cursor-not-allowed opacity-30"
            : "cursor-pointer hover:scale-110"
        }`}
        style={{
          left: `calc(50% + ${x}px)`,
          top: `calc(50% - ${y}px)`,
          transform: `translate(-990%, -10%)`,
        }}
      >
        <ToothComponent fillColor={color} />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-6">
      {/* Upper jaw */}
      <div className="flex justify-center gap-2">
        {upperTeeth.map((num, i) => renderTooth(num, i, true))}
      </div>

      {/* Lower jaw */}
      <div className="flex justify-center gap-2">
        {lowerTeeth.map((num, i) => renderTooth(num, i, false))}
      </div>
    </div>
  );
}
