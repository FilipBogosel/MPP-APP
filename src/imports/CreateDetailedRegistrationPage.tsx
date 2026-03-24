import svgPaths from "./svg-a9z32p2ulu";

function H() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="h1">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#101828] text-[24px] top-0 tracking-[0.0703px] whitespace-nowrap">Maintenance Records</p>
    </div>
  );
}

function P() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">A detailed history of services performed on your vehicle.</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[60px] items-start left-0 top-0 w-[364.492px]" data-name="Container">
      <H />
      <P />
    </div>
  );
}

function Plus() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[10px]" data-name="Plus">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Plus">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#4f39f6] border border-[rgba(0,0,0,0)] border-solid h-[38px] left-[893px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-[11px] w-[137.445px]" data-name="button">
      <Plus />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[80px] not-italic text-[14px] text-center text-white top-[8.5px] tracking-[-0.1504px] whitespace-nowrap">Add Service</p>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[60px] left-[32px] top-[40px] w-[1037px]" data-name="Container">
      <Container1 />
      <div className="absolute h-[31px] left-[405.49px] top-[14.5px] w-[101px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Rectangle 1" />
        </svg>
      </div>
      <Button />
    </div>
  );
}

function Th() {
  return (
    <div className="absolute h-[48.5px] left-0 top-0 w-[362.078px]" data-name="th">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[24px] not-italic text-[#6a7282] text-[12px] top-[17px] tracking-[0.6px] uppercase whitespace-nowrap">Service</p>
    </div>
  );
}

function Th1() {
  return (
    <div className="absolute h-[48.5px] left-[362.08px] top-0 w-[217.016px]" data-name="th">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[24px] not-italic text-[#6a7282] text-[12px] top-[17px] tracking-[0.6px] uppercase whitespace-nowrap">Date</p>
    </div>
  );
}

function Th2() {
  return (
    <div className="absolute h-[48.5px] left-[579.09px] top-0 w-[196.133px]" data-name="th">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[24px] not-italic text-[#6a7282] text-[12px] top-[17px] tracking-[0.6px] uppercase whitespace-nowrap">Mileage</p>
    </div>
  );
}

function Th3() {
  return (
    <div className="absolute h-[48.5px] left-[775.23px] top-0 w-[259.773px]" data-name="th">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[24px] not-italic text-[#6a7282] text-[12px] top-[17px] tracking-[0.6px] uppercase whitespace-nowrap">Next Recommended</p>
    </div>
  );
}

function Tr() {
  return (
    <div className="absolute h-[48.5px] left-0 top-0 w-[1035px]" data-name="tr">
      <Th />
      <Th1 />
      <Th2 />
      <Th3 />
    </div>
  );
}

function Thead() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#e5e7eb] border-b border-solid h-[48.5px] left-0 top-0 w-[1035px]" data-name="thead">
      <Tr />
    </div>
  );
}

function Wrench() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Wrench">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Wrench">
          <path d={svgPaths.p794da00} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#eef2ff] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Wrench />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[72.273px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Oil Change</p>
      </div>
    </div>
  );
}

function Div2() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[40px] items-center left-[24px] top-[16.5px] w-[314.078px]" data-name="div">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Td() {
  return (
    <div className="absolute h-[73px] left-0 top-0 w-[362.078px]" data-name="td">
      <Div2 />
    </div>
  );
}

function Calendar() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Calendar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Calendar">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Div3() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[26.5px] w-[169.016px]" data-name="div">
      <Calendar />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[24px] not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Oct 15, 2025</p>
    </div>
  );
}

function Td1() {
  return (
    <div className="absolute h-[73px] left-[362.08px] top-0 w-[217.016px]" data-name="td">
      <Div3 />
    </div>
  );
}

function Gauge() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Gauge">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Gauge">
          <path d="M8 9.33333L10.6667 6.66667" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17d9eb00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Div4() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[26.5px] w-[148.133px]" data-name="div">
      <Gauge />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[24px] not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">72,000 km</p>
    </div>
  );
}

function Td2() {
  return (
    <div className="absolute h-[73px] left-[579.09px] top-0 w-[196.133px]" data-name="td">
      <Div4 />
    </div>
  );
}

function Div5() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[24px] left-[24px] rounded-[16777200px] top-[25.25px] w-[82.445px]" data-name="div">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1e2939] text-[12px] top-[5px] whitespace-nowrap">80,000 km</p>
    </div>
  );
}

function Td3() {
  return (
    <div className="absolute h-[73px] left-[775.23px] top-0 w-[259.773px]" data-name="td">
      <Div5 />
    </div>
  );
}

function Tr1() {
  return (
    <div className="absolute border-[#e5e7eb] border-b border-solid h-[73px] left-0 top-0 w-[1035px]" data-name="tr">
      <Td />
      <Td1 />
      <Td2 />
      <Td3 />
    </div>
  );
}

function Wrench1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Wrench">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Wrench">
          <path d={svgPaths.p794da00} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#eef2ff] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Wrench1 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[110.43px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Brake Inspection</p>
      </div>
    </div>
  );
}

function Div6() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[40px] items-center left-[24px] top-[16.5px] w-[314.078px]" data-name="div">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Td4() {
  return (
    <div className="absolute h-[73px] left-0 top-0 w-[362.078px]" data-name="td">
      <Div6 />
    </div>
  );
}

function Calendar1() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Calendar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Calendar">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Div7() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[26.5px] w-[169.016px]" data-name="div">
      <Calendar1 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[24px] not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Aug 22, 2025</p>
    </div>
  );
}

function Td5() {
  return (
    <div className="absolute h-[73px] left-[362.08px] top-0 w-[217.016px]" data-name="td">
      <Div7 />
    </div>
  );
}

function Gauge1() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Gauge">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Gauge">
          <path d="M8 9.33333L10.6667 6.66667" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17d9eb00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Div8() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[26.5px] w-[148.133px]" data-name="div">
      <Gauge1 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[24px] not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">68,000 km</p>
    </div>
  );
}

function Td6() {
  return (
    <div className="absolute h-[73px] left-[579.09px] top-0 w-[196.133px]" data-name="td">
      <Div8 />
    </div>
  );
}

function Div9() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[24px] left-[24px] rounded-[16777200px] top-[25.25px] w-[82.766px]" data-name="div">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1e2939] text-[12px] top-[5px] whitespace-nowrap">84,000 km</p>
    </div>
  );
}

function Td7() {
  return (
    <div className="absolute h-[73px] left-[775.23px] top-0 w-[259.773px]" data-name="td">
      <Div9 />
    </div>
  );
}

function Tr2() {
  return (
    <div className="absolute border-[#e5e7eb] border-b border-solid h-[73px] left-0 top-[73px] w-[1035px]" data-name="tr">
      <Td4 />
      <Td5 />
      <Td6 />
      <Td7 />
    </div>
  );
}

function Wrench2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Wrench">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Wrench">
          <path d={svgPaths.p794da00} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[#eef2ff] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Wrench2 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[84.398px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Tire Rotation</p>
      </div>
    </div>
  );
}

function Div10() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[40px] items-center left-[24px] top-[16.5px] w-[314.078px]" data-name="div">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Td8() {
  return (
    <div className="absolute h-[73px] left-0 top-0 w-[362.078px]" data-name="td">
      <Div10 />
    </div>
  );
}

function Calendar2() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Calendar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Calendar">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Div11() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[26.5px] w-[169.016px]" data-name="div">
      <Calendar2 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[24px] not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Aug 22, 2025</p>
    </div>
  );
}

function Td9() {
  return (
    <div className="absolute h-[73px] left-[362.08px] top-0 w-[217.016px]" data-name="td">
      <Div11 />
    </div>
  );
}

function Gauge2() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Gauge">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Gauge">
          <path d="M8 9.33333L10.6667 6.66667" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17d9eb00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Div12() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[26.5px] w-[148.133px]" data-name="div">
      <Gauge2 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[24px] not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">68,000 km</p>
    </div>
  );
}

function Td10() {
  return (
    <div className="absolute h-[73px] left-[579.09px] top-0 w-[196.133px]" data-name="td">
      <Div12 />
    </div>
  );
}

function Div13() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[24px] left-[24px] rounded-[16777200px] top-[25.25px] w-[81.523px]" data-name="div">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1e2939] text-[12px] top-[5px] whitespace-nowrap">76,000 km</p>
    </div>
  );
}

function Td11() {
  return (
    <div className="absolute h-[73px] left-[775.23px] top-0 w-[259.773px]" data-name="td">
      <Div13 />
    </div>
  );
}

function Tr3() {
  return (
    <div className="absolute border-[#e5e7eb] border-b border-solid h-[73px] left-0 top-[146px] w-[1035px]" data-name="tr">
      <Td8 />
      <Td9 />
      <Td10 />
      <Td11 />
    </div>
  );
}

function Wrench3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Wrench">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Wrench">
          <path d={svgPaths.p794da00} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[#eef2ff] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Wrench3 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[145.758px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Air Filter Replacement</p>
      </div>
    </div>
  );
}

function Div14() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[40px] items-center left-[24px] top-[16.5px] w-[314.078px]" data-name="div">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Td12() {
  return (
    <div className="absolute h-[73px] left-0 top-0 w-[362.078px]" data-name="td">
      <Div14 />
    </div>
  );
}

function Calendar3() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Calendar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Calendar">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Div15() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[26.5px] w-[169.016px]" data-name="div">
      <Calendar3 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[24px] not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">May 10, 2025</p>
    </div>
  );
}

function Td13() {
  return (
    <div className="absolute h-[73px] left-[362.08px] top-0 w-[217.016px]" data-name="td">
      <Div15 />
    </div>
  );
}

function Gauge3() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Gauge">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Gauge">
          <path d="M8 9.33333L10.6667 6.66667" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17d9eb00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Div16() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[26.5px] w-[148.133px]" data-name="div">
      <Gauge3 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[24px] not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">61,000 km</p>
    </div>
  );
}

function Td14() {
  return (
    <div className="absolute h-[73px] left-[579.09px] top-0 w-[196.133px]" data-name="td">
      <Div16 />
    </div>
  );
}

function Div17() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[24px] left-[24px] rounded-[16777200px] top-[25.25px] w-[82.375px]" data-name="div">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1e2939] text-[12px] top-[5px] whitespace-nowrap">85,000 km</p>
    </div>
  );
}

function Td15() {
  return (
    <div className="absolute h-[73px] left-[775.23px] top-0 w-[259.773px]" data-name="td">
      <Div17 />
    </div>
  );
}

function Tr4() {
  return (
    <div className="absolute border-[#e5e7eb] border-b border-solid h-[73px] left-0 top-[219px] w-[1035px]" data-name="tr">
      <Td12 />
      <Td13 />
      <Td14 />
      <Td15 />
    </div>
  );
}

function Wrench4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Wrench">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Wrench">
          <path d={svgPaths.p794da00} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#eef2ff] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Wrench4 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[161.422px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Spark Plug Replacement</p>
      </div>
    </div>
  );
}

function Div18() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[40px] items-center left-[24px] top-[16.5px] w-[314.078px]" data-name="div">
      <Container11 />
      <Container12 />
    </div>
  );
}

function Td16() {
  return (
    <div className="absolute h-[73px] left-0 top-0 w-[362.078px]" data-name="td">
      <Div18 />
    </div>
  );
}

function Calendar4() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Calendar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Calendar">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Div19() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[26.5px] w-[169.016px]" data-name="div">
      <Calendar4 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[24px] not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Nov 5, 2024</p>
    </div>
  );
}

function Td17() {
  return (
    <div className="absolute h-[73px] left-[362.08px] top-0 w-[217.016px]" data-name="td">
      <Div19 />
    </div>
  );
}

function Gauge4() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Gauge">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Gauge">
          <path d="M8 9.33333L10.6667 6.66667" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17d9eb00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Div20() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[26.5px] w-[148.133px]" data-name="div">
      <Gauge4 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[24px] not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">48,000 km</p>
    </div>
  );
}

function Td18() {
  return (
    <div className="absolute h-[73px] left-[579.09px] top-0 w-[196.133px]" data-name="td">
      <Div20 />
    </div>
  );
}

function Div21() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[24px] left-[24px] rounded-[16777200px] top-[25.25px] w-[82.547px]" data-name="div">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1e2939] text-[12px] top-[5px] whitespace-nowrap">96,000 km</p>
    </div>
  );
}

function Td19() {
  return (
    <div className="absolute h-[73px] left-[775.23px] top-0 w-[259.773px]" data-name="td">
      <Div21 />
    </div>
  );
}

function Tr5() {
  return (
    <div className="absolute border-[#e5e7eb] border-b border-solid h-[73px] left-0 top-[292px] w-[1035px]" data-name="tr">
      <Td16 />
      <Td17 />
      <Td18 />
      <Td19 />
    </div>
  );
}

function Wrench5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Wrench">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Wrench">
          <path d={svgPaths.p794da00} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#eef2ff] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Wrench5 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[90.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Coolant Flush</p>
      </div>
    </div>
  );
}

function Div22() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[40px] items-center left-[24px] top-[16.5px] w-[314.078px]" data-name="div">
      <Container13 />
      <Container14 />
    </div>
  );
}

function Td20() {
  return (
    <div className="absolute h-[72.5px] left-0 top-0 w-[362.078px]" data-name="td">
      <Div22 />
    </div>
  );
}

function Calendar5() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Calendar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Calendar">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Div23() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[26.5px] w-[169.016px]" data-name="div">
      <Calendar5 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[24px] not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Sep 12, 2024</p>
    </div>
  );
}

function Td21() {
  return (
    <div className="absolute h-[72.5px] left-[362.08px] top-0 w-[217.016px]" data-name="td">
      <Div23 />
    </div>
  );
}

function Gauge5() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Gauge">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Gauge">
          <path d="M8 9.33333L10.6667 6.66667" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17d9eb00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Div24() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[26.5px] w-[148.133px]" data-name="div">
      <Gauge5 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[24px] not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">45,000 km</p>
    </div>
  );
}

function Td22() {
  return (
    <div className="absolute h-[72.5px] left-[579.09px] top-0 w-[196.133px]" data-name="td">
      <Div24 />
    </div>
  );
}

function Div25() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[24px] left-[24px] rounded-[16777200px] top-[25.25px] w-[82.383px]" data-name="div">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1e2939] text-[12px] top-[5px] whitespace-nowrap">93,000 km</p>
    </div>
  );
}

function Td23() {
  return (
    <div className="absolute h-[72.5px] left-[775.23px] top-0 w-[259.773px]" data-name="td">
      <Div25 />
    </div>
  );
}

function Tr6() {
  return (
    <div className="absolute h-[72.5px] left-0 top-[365px] w-[1035px]" data-name="tr">
      <Td20 />
      <Td21 />
      <Td22 />
      <Td23 />
    </div>
  );
}

function Tbody() {
  return (
    <div className="absolute bg-white h-[437.5px] left-0 top-[48.5px] w-[1035px]" data-name="tbody">
      <Tr1 />
      <Tr2 />
      <Tr3 />
      <Tr4 />
      <Tr5 />
      <Tr6 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[486px] overflow-clip relative shrink-0 w-full" data-name="table">
      <Thead />
      <Tbody />
    </div>
  );
}

function P1() {
  return (
    <div className="absolute h-[20px] left-0 top-[9px] w-[178.422px]" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[0] left-0 not-italic text-[#364153] text-[0px] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">
        <span className="leading-[20px]">{`Showing `}</span>
        <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px]">1</span>
        <span className="leading-[20px]">{` to `}</span>
        <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px]">6</span>
        <span className="leading-[20px]">{` of `}</span>
        <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px]">14</span>
        <span className="leading-[20px]">{` results`}</span>
      </p>
    </div>
  );
}

function ChevronLeft() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="ChevronLeft">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 11.6667">
              <path d={svgPaths.p3a0d2780} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-white content-stretch flex items-center left-0 opacity-50 px-[9px] py-px rounded-bl-[8px] rounded-tl-[8px] size-[38px] top-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-bl-[8px] rounded-tl-[8px]" />
      <ChevronLeft />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white content-stretch flex h-[38px] items-center left-[76.57px] px-[17px] py-[9px] top-0 w-[42.484px]" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center tracking-[-0.1504px] whitespace-nowrap">2</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-white content-stretch flex h-[38px] items-center left-[118.05px] px-[17px] py-[9px] top-0 w-[42.828px]" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center tracking-[-0.1504px] whitespace-nowrap">3</p>
    </div>
  );
}

function ChevronRight() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="ChevronRight">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-8.33%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 11.6667">
              <path d={svgPaths.p324d0480} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-white content-stretch flex items-center left-[159.88px] px-[9px] py-px rounded-br-[8px] rounded-tr-[8px] size-[38px] top-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-br-[8px] rounded-tr-[8px]" />
      <ChevronRight />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-[#eef2ff] content-stretch flex h-[38px] items-center left-[37px] px-[17px] py-[9px] top-0 w-[40.57px]" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#615fff] border-solid inset-0 pointer-events-none" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4f39f6] text-[14px] text-center tracking-[-0.1504px] whitespace-nowrap">1</p>
    </div>
  );
}

function Nav() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[38px] left-[789.12px] rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-0 w-[197.883px]" data-name="nav">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Container16() {
  return (
    <div className="flex-[1_0_0] h-[38px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <P1 />
        <Nav />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-white h-[63px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pt-px px-[24px] relative size-full">
          <Container16 />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-white h-[551px] left-[32px] rounded-[14px] top-[202px] w-[1037px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Table />
        <Container15 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Select() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] h-[40px] items-center min-w-[120px] pl-[16px] pr-[12px] py-[12px] relative rounded-[8px] shrink-0 w-[120px]" data-name="Select">
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-none min-h-px min-w-px not-italic relative text-[#1e1e1e] text-[16px]">Golf 6</p>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Chevron down">
        <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Icon">
          <div className="absolute inset-[-20%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6 5.6">
              <path d="M0.8 0.8L4.8 4.8L8.8 0.8" id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div className="absolute bg-[#f4f6f8] h-[809px] left-0 top-0 w-[1101px]" data-name="div">
      <Container />
      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[31px] leading-none left-[33px] text-[18px] text-black top-[113px] w-[287px]">Select your current car</p>
      <Container2 />
      <div className="absolute content-stretch flex flex-col gap-[8px] h-[41px] items-start left-[32px] top-[144px] w-[153px]" data-name="Select Field">
        <Select />
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="absolute h-[809px] left-0 top-[65px] w-[1101px]" data-name="main">
      <Div1 />
    </div>
  );
}

function Div() {
  return (
    <div className="absolute bg-[#f4f6f8] h-[874px] left-0 top-0 w-[1101px]" data-name="div">
      <Main />
    </div>
  );
}

function Span() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-[-20px] not-italic text-[#0056d2] text-[20px] top-0 tracking-[-0.9492px] whitespace-nowrap">MaintenanceRecord</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[64px] relative shrink-0 w-[124.859px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Span />
      </div>
    </div>
  );
}

function Wrench6() {
  return (
    <div className="absolute left-[4px] size-[16px] top-[26px]" data-name="Wrench">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Wrench">
          <path d={svgPaths.p34fe1800} id="Vector" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Link() {
  return (
    <div className="flex-[1_0_0] h-[66px] min-h-px min-w-px relative" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#615fff] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Wrench6 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[28px] not-italic text-[#101828] text-[14px] top-[24.5px] tracking-[-0.1504px] whitespace-nowrap">Maintenance Records</p>
      </div>
    </div>
  );
}

function UserPlus() {
  return (
    <div className="absolute left-[4px] size-[16px] top-[26px]" data-name="UserPlus">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="UserPlus">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[66px] relative shrink-0 w-[145.148px]" data-name="Link">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <UserPlus />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[28px] not-italic text-[#6a7282] text-[14px] top-[24.5px] tracking-[-0.1504px] whitespace-nowrap">Settings</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="flex-[1_0_0] h-[66px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[32px] items-start relative size-full">
        <Link />
        <Link1 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[64px] relative shrink-0 w-[516.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[40px] items-start pt-[-1px] relative size-full">
        <Container18 />
        <Container19 />
      </div>
    </div>
  );
}

function Div26() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="div">
      <div className="content-stretch flex items-start justify-between pr-[520.281px] relative size-full">
        <Container17 />
      </div>
    </div>
  );
}

function Nav1() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[65px] items-start left-0 pb-px px-[32px] top-0 w-[1101px]" data-name="nav">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Div26 />
    </div>
  );
}

export default function CreateDetailedRegistrationPage() {
  return (
    <div className="bg-white relative size-full" data-name="Create detailed registration page">
      <Div />
      <Nav1 />
    </div>
  );
}