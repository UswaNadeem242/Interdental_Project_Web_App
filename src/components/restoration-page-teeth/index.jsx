import OneIconSvg from "../../icon/teeth/one";
import TwoIconSvg from "../../icon/teeth/two";
import ThreeIconSvg from "../../icon/teeth/three";

import FouthIconSvg from "../../icon/teeth/fouth";
import FifthIconSvg from "../../icon/teeth/fifth";
import SixIconSvg from "../../icon/teeth/six";
import SevenIconSvg from "../../icon/teeth/seven";
import EightIconSvg from "../../icon/teeth/eight";
import NineIconSvg from "../../icon/teeth/nine";
import TenSvgIcon from "../../icon/teeth/ten";
import ElevenIconSvg from "../../icon/teeth/eleven";
import TwelveIconSvg from "../../icon/teeth/twelve";
import ThirteenIconSvg from "../../icon/teeth/thirteen";
import FourteenIconSvg from "../../icon/teeth/fourteen";
import FifteenSvgIcon from "../../icon/teeth/fifteen";
import SixteenIconSvg from "../../icon/teeth/sixteen";
import SeventeenIconSvg from "../../icon/teeth/seventeen";
import EighteenIconSvg from "../../icon/teeth/eighteen";
import NinteenIconSvg from "../../icon/teeth/ninteen";
import TwentyIconSvg from "../../icon/teeth/twenty";
import TwentyOneIconSvg from "../../icon/teeth/twenty-one";
import TwentyTwoIconSvg from "../../icon/teeth/twenty-two";
import TwentyThreeIconSvg from "../../icon/teeth/twenty-three";
import TwentyFourIconSvg from "../../icon/teeth/twenty-four";
import TwentyFiveIconSvg from "../../icon/teeth/twenty-five";
import TwentySixIconSvg from "../../icon/teeth/twenty-six";
import TwentySevenIconSvg from "../../icon/teeth/twenty-seven";
import TwentyEightIconSvg from "../../icon/teeth/twenty-eight";
import TwentyNineIconSvg from "../../icon/teeth/twenty-nine";
import ThirtyIconSvg from "../../icon/teeth/thirty";
import ThirtyOneIconSvg from "../../icon/teeth/thirty-one";
import ThirtyTwoIconSvg from "../../icon/teeth/thirty-two";

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

/* ---------------------------
   Tooth names + FDI / Palmer helpers
   (kept inline so popup can show accurate info)
   --------------------------- */
const defaultTeeth = [
  { id: 1, name: "Upper Right 3rd Molar (Wisdom)" },
  { id: 2, name: "Upper Right 2nd Molar" },
  { id: 3, name: "Upper Right 1st Molar" },
  { id: 4, name: "Upper Right 2nd Premolar" },
  { id: 5, name: "Upper Right 1st Premolar" },
  { id: 6, name: "Upper Right Canine" },
  { id: 7, name: "Upper Right Lateral Incisor" },
  { id: 8, name: "Upper Right Central Incisor" },
  { id: 9, name: "Upper Left Central Incisor" },
  { id: 10, name: "Upper Left Lateral Incisor" },
  { id: 11, name: "Upper Left Canine" },
  { id: 12, name: "Upper Left 1st Premolar" },
  { id: 13, name: "Upper Left 2nd Premolar" },
  { id: 14, name: "Upper Left 1st Molar" },
  { id: 15, name: "Upper Left 2nd Molar" },
  { id: 16, name: "Upper Left 3rd Molar (Wisdom)" },
  { id: 17, name: "Lower Left 3rd Molar (Wisdom)" },
  { id: 18, name: "Lower Left 2nd Molar" },
  { id: 19, name: "Lower Left 1st Molar" },
  { id: 20, name: "Lower Left 2nd Premolar" },
  { id: 21, name: "Lower Left 1st Premolar" },
  { id: 22, name: "Lower Left Canine" },
  { id: 23, name: "Lower Left Lateral Incisor" },
  { id: 24, name: "Lower Left Central Incisor" },
  { id: 25, name: "Lower Right Central Incisor" },
  { id: 26, name: "Lower Right Lateral Incisor" },
  { id: 27, name: "Lower Right Canine" },
  { id: 28, name: "Lower Right 1st Premolar" },
  { id: 29, name: "Lower Right 2nd Premolar" },
  { id: 30, name: "Lower Right 1st Molar" },
  { id: 31, name: "Lower Right 2nd Molar" },
  { id: 32, name: "Lower Right 3rd Molar (Wisdom)" },
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

/* ---------------------------
   Component: TeethSvg (with popup on selected)
   - selectedTeeth: array of selected tooth ids
   - onToothClick: handler toggling selection in parent
   --------------------------- */
export default function RestorationTeethSvg({
  selectedTeeth = [],
  onToothClick = () => {},
  fillColor = "#94D3DD",
  defaultColor = "white",
}) {
  const upperTeeth = Array.from({ length: 16 }, (_, i) => i + 1);
  const lowerTeeth = Array.from({ length: 16 }, (_, i) => i + 17);
  const isSelected = (num) => selectedTeeth.includes(num);

  // Helper: render single tooth with popup when selected
  const renderTooth = (num, i, isUpper = true) => {
    const ToothComponent = toothComponents[num - 1];
    if (!ToothComponent) return null;

    const color = isSelected(num) ? fillColor : defaultColor;
    const name =
      (defaultTeeth[num - 1] && defaultTeeth[num - 1].name) || `Tooth ${num}`;
    const fdi = toFDI(num);
    const palmer = toPalmerFromFDI(fdi);

    // arc math (kept from your previous implementation)
    const radius = 170;
    const total = 16;
    const angleStep = Math.PI / (total + 1);
    const angle = isUpper ? Math.PI - angleStep * (i + 1) : angleStep * (i + 1);
    const x = radius + 120 * Math.cos(angle);
    const y = radius * Math.sin(angle) * (isUpper ? 1 : -1);

    const popupAbove = isUpper; // smart positioning: upper -> above, lower -> below

    return (
      <div
        key={num}
        // also keep native tooltip on hover that shows the name
        title={`${name}`}
        onClick={() => onToothClick(num)}
        className="absolute cursor-pointer transition-transform duration-300"
        style={{
          left: `calc(50% + ${x}px)`,
          top: `calc(50% - ${y}px)`,
          transform: `translate(-990%, -10%)`,
        }}
      >
        {/* SVG */}
        <div className="inline-block transform-gpu transition-transform duration-200 hover:scale-110">
          <ToothComponent fillColor={color} />
        </div>

        {/* Popup shown only when selected */}
        {/* {isSelected(num) && (
          <div
            className={`absolute left-1/2 z-30 w-max min-w-[140px] max-w-xs -translate-x-1/2 rounded bg-white border shadow-md text-xs`}
            style={
              popupAbove
                ? { bottom: `calc(100% + 10px)` } // above the tooth
                : { top: `calc(100% + 10px)` } // below the tooth
            }
          >
            <div className="p-2">
              <p className="font-semibold text-sm leading-tight">{name}</p>
              <p className="text-[11px] leading-tight mt-1">FDI: {fdi}</p>
              <p className="text-[11px] leading-tight">Palmer: {palmer}</p>
            </div>
          </div>
        )} */}
      </div>
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-10 p-6">
      {/* Upper jaw (rendered first so popups appear above lower if overlap) */}
      <div className="relative w-full h-0">
        {upperTeeth.map((num, i) => renderTooth(num, i, true))}
      </div>

      {/* Lower jaw */}
      <div className="relative w-full h-0">
        {lowerTeeth.map((num, i) => renderTooth(num, i, false))}
      </div>
    </div>
  );
}
