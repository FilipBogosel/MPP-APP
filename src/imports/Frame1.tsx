export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="-translate-x-1/2 absolute bg-white h-[381px] left-1/2 top-[133px] w-[578px]" />
      <div className="absolute bg-white h-[86px] left-[231px] top-[154px] w-[439px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[106px] justify-center leading-[0] left-[calc(50%-0.5px)] text-[#0056d2] text-[48px] text-center top-[calc(50%-113.5px)] w-[531px]">
        <p className="leading-[normal]">MaintenanceRecord</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[57px] justify-center leading-[0] left-[451px] text-[#1a1a1a] text-[20px] text-center top-[268.5px] w-[398px]">
        <p className="leading-[normal]">Your car’s service history, in one place.</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Radio_Canada:Medium',sans-serif] font-medium h-[78px] justify-center leading-[0] left-[450.5px] text-[#6b7280] text-[16px] text-center top-[336px] w-[477px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">A comprehensive maintenance tracking system for meticulous car owners. Log services, track costs, and plan your next required maintenance interval using our intuitive dashboard.</p>
      </div>
    </div>
  );
}