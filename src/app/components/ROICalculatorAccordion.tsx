import React, { useState } from "react";
import { FaqAccordion } from "./ui/faq-chat-accordion";

function formatFt(num: number) {
  return num.toLocaleString("hu-HU") + " Ft";
}

export default function ROICalculatorAccordion() {
  // Alapadatok blokk
  const [dailyQuestions, setDailyQuestions] = useState(0);
  const [avgAnswerTime, setAvgAnswerTime] = useState(0);
  const [hourlyWage, setHourlyWage] = useState(0);

  // Kosárelhagyás blokk
  const [dailyAbandoned, setDailyAbandoned] = useState(0);
  const [avgCartValue, setAvgCartValue] = useState(0);
  const [recoverRate, setRecoverRate] = useState(0);

  // Upsell blokk
  const [monthlyBuyers, setMonthlyBuyers] = useState(0);
  const [upsellValue, setUpsellValue] = useState(0);
  const [upsellRate, setUpsellRate] = useState(10);

  // Számítások
  // 1. Ügyfélszolgálati időmegtakarítás
  const savedHoursPerDay = (dailyQuestions * avgAnswerTime) / 60;
  const savedWagePerDay = savedHoursPerDay * hourlyWage;
  const savedWagePerMonth = savedWagePerDay * 22;

  // 2. Visszaszerzett bevétel
  const recoveredPerDay = dailyAbandoned * avgCartValue * (recoverRate / 100);
  const recoveredPerMonth = recoveredPerDay * 30;

  // 3. Upsell
  const upsellPerMonth = monthlyBuyers * upsellValue * (upsellRate / 100);

  // Totál összesítő
  const total = savedWagePerMonth + recoveredPerMonth + upsellPerMonth;

  const sliderStyle = { width: '100%', marginTop: 8 };
  const labelStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 };

  const accordionData = [
    {
      id: 1,
      question: "Ügyfélszolgálati időmegtakarítás",
      answer: (
        <div>
          <div className="flex flex-col gap-4 mb-2">
            <label style={labelStyle}>
              <span>
                Napi <br />
                ügyfélszolgálati kérdések száma
              </span>
              <span className="font-bold text-white">{dailyQuestions}</span>
            </label>
            <input type="range" min={0} max={200} value={dailyQuestions} onChange={e => setDailyQuestions(Number(e.target.value))} style={sliderStyle} className="roi-slider" />
            <label style={labelStyle}>
              <span>Átlagos válaszidő kérdésenként (perc)</span>
              <span className="font-bold text-white">{avgAnswerTime}</span>
            </label>
            <input type="range" min={0} max={16} value={avgAnswerTime} onChange={e => setAvgAnswerTime(Number(e.target.value))} style={sliderStyle} className="roi-slider" />
            <label style={labelStyle}>
              <span>Kolléga órabére<br /> (Ft)</span>
              <span className="font-bold text-white">{hourlyWage}</span>
            </label>
            <input type="range" min={0} max={5000} step={100} value={hourlyWage} onChange={e => setHourlyWage(Number(e.target.value))} style={sliderStyle} className="roi-slider" />
          </div>
          <div className="mt-4 bg-[#f1f5f9] rounded-lg px-4 py-3 text-[#0f172a] text-base font-semibold">
            <div>Havi megtakarítás:<br /> <span className="font-bold">{formatFt(Math.round(savedWagePerMonth))}</span></div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      question: "Visszaszerzett bevétel (kosárelhagyás)",
      answer: (
        <div>
          <div className="flex flex-col gap-4 mb-2">
            <label style={labelStyle}>
              <span>
                Napi kosárelhagyók száma
              </span>
              <span className="font-bold text-white">{dailyAbandoned}</span>
            </label>
            <input type="range" min={0} max={30} value={dailyAbandoned} onChange={e => setDailyAbandoned(Number(e.target.value))} style={sliderStyle} className="roi-slider" />
            <label style={labelStyle}>
              <span>
                Átlagos<br />
                 kosárérték (Ft)
              </span>
              <span className="font-bold text-white">{avgCartValue}</span>
            </label>
            <input type="range" min={0} max={30000} step={500} value={avgCartValue} onChange={e => setAvgCartValue(Number(e.target.value))} style={sliderStyle} className="roi-slider" />
            <label style={labelStyle}>
              <span>Visszahozási arány (%)</span>
              <span className="font-bold text-white">{recoverRate}%</span>
            </label>
            <input type="range" min={0} max={15} value={recoverRate} onChange={e => setRecoverRate(Number(e.target.value))} style={sliderStyle} className="roi-slider" />
          </div>
          <div className="mt-4 bg-[#f1f5f9] rounded-lg px-4 py-3 text-[#0f172a] text-base font-semibold">
            <div>Havi visszaszerzett bevétel: <span className="font-bold">{formatFt(Math.round(recoveredPerMonth))}</span></div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      question: "Plusz bevétel ajánlatokból (upsell)",
      answer: (
        <div>
          <div className="flex flex-col gap-4 mb-2">
            <label style={labelStyle}>
              <span>Havi<br />
                    vásárlók száma</span>
              <span className="font-bold text-white">{monthlyBuyers}</span>
            </label>
            <input type="range" min={0} max={2000} step={10} value={monthlyBuyers} onChange={e => setMonthlyBuyers(Number(e.target.value))} style={sliderStyle} className="roi-slider" />
            <label style={labelStyle}>
              <span>Upsell extra kosárérték / fő<br /> (Ft)</span>
              <span className="font-bold text-white">{upsellValue}</span>
            </label>
            <input type="range" min={0} max={3000} step={100} value={upsellValue} onChange={e => setUpsellValue(Number(e.target.value))} style={sliderStyle} className="roi-slider" />
            <label style={labelStyle}>
              <span>Upsell arány (%)</span>
              <span className="font-bold text-white">{upsellRate}%</span>
            </label>
            <input type="range" min={0} max={30} value={upsellRate} onChange={e => setUpsellRate(Number(e.target.value))} style={sliderStyle} className="roi-slider" />
          </div>
          <div className="mt-4 bg-[#f1f5f9] rounded-lg px-4 py-3 text-[#0f172a] text-base font-semibold">
            <div>Havi plusz bevétel: <span className="font-bold">{formatFt(Math.round(upsellPerMonth))}</span></div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <FaqAccordion data={accordionData} className="w-full" questionClassName="!text-lg" answerClassName="!text-base" timestamp="Utolsó frissítés: pár másodperce" />
      <div className="mt-6 bg-gradient-to-l from-[#38bdf8] to-[#6366f1] rounded-2xl px-3 py-5 text-white text-xl font-bold text-center shadow-lg">
        Ennyit pénz marad a zsebedben: <span className="text-2xl font-extrabold">{formatFt(Math.round(total))}</span>
      </div>
    </div>
  );
} 