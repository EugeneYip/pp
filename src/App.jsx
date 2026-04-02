import React, { useMemo, useState } from "react";

const ICON_PATHS = {
  menu: "M4 6h16M4 12h16M4 18h16",
  book: "M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3V4zm0 0v18",
  chart: "M5 18V9m7 9V6m7 12v-4",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 8a7 7 0 0 1 14 0",
  shield: "M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z",
  compass: "M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6z",
  check: "M5 12l4 4L19 6",
  clock: "M12 8v5l3 2M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16z",
  alert: "M12 8v5m0 4h.01M10.3 3.9 3.8 15.1A1 1 0 0 0 4.7 16.6h14.6a1 1 0 0 0 .9-1.5L13.7 3.9a1 1 0 0 0-1.8 0z",
  message: "M4 5h16v10H8l-4 4V5z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  scales: "M12 4v15M7 7h10M7 7l-3 5h6l-3-5zm10 0-3 5h6l-3-5zM8 19h8",
  briefcase: "M9 6V4h6v2m-9 3h12m-14 0h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9z",
  eye: "M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
};

function Icon({ name, className = "h-5 w-5", strokeWidth = 1.8 }) {
  const path = ICON_PATHS[name] || ICON_PATHS.menu;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function useDisplay(mode) {
  return useMemo(() => {
    return function render(en, zh) {
      if (mode === "en") return <>{en}</>;
      if (mode === "zh") return <>{zh}</>;
      return (
        <div className="space-y-2.5">
          <div>{en}</div>
          <div>{zh}</div>
        </div>
      );
    };
  }, [mode]);
}

function label(mode, en, zh) {
  if (mode === "zh") return zh;
  if (mode === "bi") return `${en} / ${zh}`;
  return en;
}

function Pill({ children, tone = "slate", small = false }) {
  const tones = {
    slate: "border-slate-200 bg-white text-slate-700",
    plum: "border-[#d6c7dd] bg-[#f6f1f8] text-[#5b3a67]",
    teal: "border-[#c3d5d9] bg-[#eef4f5] text-[#305c6b]",
    amber: "border-[#eadbbd] bg-[#fbf7ec] text-[#8b6a2e]"
  };

  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border font-medium whitespace-nowrap",
        small ? "px-2.5 py-1 text-[11px]" : "px-2.5 py-1 text-xs",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

function LangButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded-full border px-3 py-1.5 text-sm transition",
        active
          ? "border-slate-800 bg-slate-800 text-[#FCFAF2] shadow-sm"
          : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
      )}
    >
      {children}
    </button>
  );
}

function Section({ id, title, subtitle, icon, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-[26px] border border-slate-200/90 bg-white/82 px-4 py-5 shadow-sm sm:px-6 sm:py-6 lg:px-7"
    >
      <div className="mb-5 flex items-start gap-3.5 sm:gap-4">
        <div className="mt-0.5 shrink-0 rounded-2xl border border-slate-200 bg-[#F8F4EA] p-2.5 text-slate-700">
          <Icon name={icon} className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
        </div>
        <div className="min-w-0 max-w-[78ch]">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl lg:text-[1.35rem]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1.5 text-[13px] leading-6 text-slate-600 sm:text-sm">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  );
}

function Card({ title, icon, children, dense = false }) {
  return (
    <div className="h-full rounded-[24px] border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-5 sm:py-5">
      <div className="mb-3 flex items-start gap-3">
        <div className="mt-0.5 shrink-0 rounded-2xl bg-[#F8F4EA] p-2 text-slate-700">
          <Icon name={icon} className="h-4 w-4" />
        </div>
        <h3 className="max-w-[34ch] text-[15px] font-semibold leading-6 text-slate-900 sm:text-base">{title}</h3>
      </div>
      <div className={cx("max-w-[72ch] text-slate-700", dense ? "text-[14px] leading-6.5 sm:text-[15px]" : "text-[14px] leading-7 sm:text-[15px]")}>
        {children}
      </div>
    </div>
  );
}

function SimpleTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-left">
        <thead className="bg-[#F8F4EA] text-slate-700">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="border-b border-slate-200 px-3 py-2.5 text-[12px] font-semibold leading-5 sm:px-4 sm:text-[13px]"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="align-top text-slate-700">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cx(
                    "border-b border-slate-100 px-3 py-2.5 text-[12.5px] leading-5.5 sm:px-4 sm:text-[13.5px] sm:leading-6",
                    j === 0 ? "min-w-[160px] font-medium text-slate-900 sm:min-w-[220px]" : "min-w-[132px]"
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="list-disc space-y-2.5 pl-5 text-[14px] leading-7 text-slate-700 sm:text-[15px]">
      {items.map((item, i) => (
        <li key={i} className="max-w-[72ch]">{item}</li>
      ))}
    </ul>
  );
}

const navItems = [
  { id: "overview", en: "Overview", zh: "總覽", icon: "book" },
  { id: "facts", en: "Facts", zh: "事實", icon: "briefcase" },
  { id: "analysis", en: "Analysis", zh: "分析", icon: "chart" },
  { id: "prepare", en: "Prepare", zh: "準備", icon: "check" },
  { id: "expect", en: "Expect", zh: "預期", icon: "eye" },
  { id: "ethics", en: "Ethics", zh: "倫理", icon: "scales" },
  { id: "scripts", en: "Scripts", zh: "發言稿", icon: "message" }
];

export default function PetitePlaythingsCaseInfrastructure() {
  const [mode, setMode] = useState("en");
  const t = useDisplay(mode);

  const metricColumns = mode === "zh"
    ? ["項目", "數值", "證據層級"]
    : mode === "bi"
    ? ["Item / 項目", "Value / 數值", "Evidence tier / 證據層級"]
    : ["Item", "Value", "Evidence tier"];

  const metricRows = [
    [label(mode, "Company sales", "公司營收"), "$50,000,000", "[CASE FACT]"],
    [label(mode, "Salespeople", "業務人數"), "25", "[CASE FACT]"],
    [label(mode, "Commission rate", "佣金率"), "4% straight commission", "[CASE FACT]"],
    [label(mode, "Texas territory", "Texas 轄區"), "Slightly over $1,750,000", "[CASE FACT]"],
    [label(mode, "Autry's commissions", "Autry 佣金"), "Over $70,000", "[CASE FACT]"],
    [label(mode, "Carson purchases", "Carson 採購額"), "Over $200,000", "[CASE FACT]"],
    [label(mode, "Carson share of territory", "Carson 佔轄區比重"), "~11.4%", "[ARITHMETIC]"],
    [label(mode, "Dinner date", "晚餐日期"), "Tuesday, Sept. 11, 1984", "[ARITHMETIC]"]
  ];

  return (
    <div className="min-h-screen bg-[#FCFAF2] text-slate-900">
      <div className="mx-auto max-w-[1320px] px-4 pb-28 pt-5 sm:px-6 lg:px-8">
        <header className="mb-4 sm:mb-5">
          <div className="max-w-[72ch]">
            <div className="mb-3 flex flex-wrap gap-2">
              <Pill tone="plum">Petite Playthings (A)</Pill>
              <Pill tone="teal">1984</Pill>
              <Pill tone="amber">Ethical Issues in Marketing</Pill>
            </div>
            <h1 className="text-[1.9rem] font-semibold tracking-tight text-slate-950 sm:text-[2.2rem] lg:text-[2.5rem]">
              Petite Playthings Case
            </h1>
          </div>
        </header>

        <div className="sticky top-3 z-30 mb-5 overflow-hidden rounded-[22px] border border-slate-200/90 bg-[#FCFAF2]/92 shadow-sm backdrop-blur">
          <div className="flex gap-2 overflow-x-auto px-3 py-3 sm:px-4">
            <Pill small tone="plum">$50M company</Pill>
            <Pill small tone="teal">25 salespeople</Pill>
            <Pill small tone="teal">4% commission</Pill>
            <Pill small tone="amber">Texas &gt; $1.75M</Pill>
            <Pill small tone="amber">Carson &gt; $200K</Pill>
            <Pill small>Sept. 11 dinner</Pill>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:border-slate-500 sm:text-xs"
              >
                <Icon name={item.icon} className="h-3.5 w-3.5" />
                <span>{label(mode, item.en, item.zh)}</span>
              </a>
            ))}
          </div>
        </div>

        <main className="space-y-5 sm:space-y-6">
          <Section
            id="overview"
            icon="book"
            title={label(mode, "Overview", "總覽")}
            subtitle={label(
              mode,
              "Start here. This section establishes the decision setting, the evidence standard, and the fastest path through the case.",
              "先從這裡開始。這一段先把決策情境、證據標準，以及最快的閱讀路徑整理好。"
            )}
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Card title={label(mode, "Core issue", "核心問題")} icon="compass">
                {t(
                  "The real issue is not dinner etiquette by itself. The real issue is whether Cassady can protect and begin growing a valuable inherited territory through a high-stakes transition meeting with a major account while he has limited experience, limited support, and no formal introduction from his boss.",
                  "真正的問題不是晚餐禮節本身，而是 Cassady 能不能在自己經驗有限、內部支援有限、主管又無法正式引介的情況下，透過一場高風險的重要客戶交接會面，先穩住，再開始經營一個有價值的既有市場。"
                )}
              </Card>

              <Card title={label(mode, "Evidence tiers", "證據標準")} icon="shield" dense>
                <div className="mb-3 flex flex-wrap gap-2">
                  <Pill tone="plum">[CASE FACT]</Pill>
                  <Pill tone="teal">[COURSE FILE]</Pill>
                  <Pill tone="amber">[ARITHMETIC]</Pill>
                  <Pill>[INFERENCE]</Pill>
                </div>
                {t(
                  "Speak most directly on case facts. Use course files to show framework discipline. Use arithmetic only when the math is transparent. On inference, keep a careful tone and never pretend the case states more than it does.",
                  "在案例直接事實層可以講得最直接。課程資料層用來展現框架紀律。算術推導只在計算清楚時使用。推論層要保守，不能把案例沒有明講的內容講成既定事實。"
                )}
              </Card>

              <Card title={label(mode, "Timeline", "時間線")} icon="clock" dense>
                <BulletList
                  items={[
                    t("June 1984. Cassady joins after completing his MBA.", "1984 年 6 月。Cassady 在 MBA 畢業後加入公司。"),
                    t("Early September 1984. Ed Autry dies suddenly.", "1984 年 9 月初。Ed Autry 突然過世。"),
                    t("Sunday, Sept. 9. Cassady arrives in Texas.", "9 月 9 日，星期日。Cassady 抵達 Texas。"),
                    t("Tuesday evening, Sept. 11. Dinner with Jim Carson.", "9 月 11 日，星期二晚上。與 Jim Carson 晚餐。")
                  ]}
                />
              </Card>
            </div>
          </Section>

          <Section
            id="facts"
            icon="briefcase"
            title={label(mode, "Facts", "事實")}
            subtitle={label(
              mode,
              "This section keeps the factual spine clean before interpretation begins.",
              "這一段先把案例的事實骨架整理乾淨，再進入解讀。"
            )}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Card title={label(mode, "Company", "公司")} icon="briefcase">
                {t(
                  "Petite Playthings, Inc. is a New York City children's wear manufacturer with $50 million in sales, large by industry standards. It employs 25 salespeople, all on straight commission of 4% of sales, and all report to national sales manager Fred Rodgers.",
                  "Petite Playthings, Inc. 是一家位於紐約市的兒童服飾製造商，年營收 5,000 萬美元，以產業標準來看規模不小。公司有 25 位業務人員，全部採用 4% 純佣金制，並全都向全國業務經理 Fred Rodgers 匯報。"
                )}
              </Card>

              <Card title={label(mode, "Protagonist", "主角")} icon="user">
                {t(
                  "Harold 'Hal' Cassady joined the company after finishing his MBA in June 1984. His expected path was six months as a marketing analyst, then one to two years in a sales territory, and later a return to New York in sales or marketing management.",
                  "Harold 'Hal' Cassady 於 1984 年 6 月 MBA 畢業後加入公司。他原本的安排是先做六個月 marketing analyst，再進 sales territory 一到兩年，之後回紐約擔任業務或行銷管理職。"
                )}
              </Card>

              <Card title={label(mode, "Trigger event", "觸發事件")} icon="alert">
                {t(
                  "Ed Autry, the Texas salesperson, dies suddenly in early September 1984. He was a long-term employee with a strong reputation for both sales skill and service quality. The Texas territory shipped slightly over $1.75 million in the prior fiscal year, implying more than $70,000 in commissions.",
                  "Texas 轄區業務 Ed Autry 於 1984 年 9 月初突然過世。他是資深員工，且在銷售能力與服務能力上口碑良好。Texas 轄區在前一會計年度的出貨額略高於 175 萬美元，對應佣金超過 7 萬美元。"
                )}
              </Card>

              <Card title={label(mode, "The Carson dinner", "與 Carson 的晚餐")} icon="message">
                {t(
                  "Jim Carson is the children's wear buyer for a large department store and the territory's second-largest customer. He purchased over $200,000 from Petite in the prior fiscal year. Cassady wants to discuss the upcoming winter line and learn how the fall line is selling, but he does not want the dinner to become too weighty.",
                  "Jim Carson 是一家大型百貨公司的童裝採購，也是該轄區第二大客戶。他在前一會計年度向 Petite 採購超過 20 萬美元。Cassady 想談即將推出的 winter line，也想了解 fall line 的銷售狀況，但不希望整場晚餐變得太沉重。"
                )}
              </Card>
            </div>

            <div className="mt-5">
              <SimpleTable columns={metricColumns} rows={metricRows} />
            </div>
          </Section>

          <Section
            id="analysis"
            icon="chart"
            title={label(mode, "Analysis", "分析")}
            subtitle={label(
              mode,
              "The case becomes clearer once customer risk, company structure, and the limits of competitive knowledge are separated.",
              "把顧客風險、公司結構，以及競爭資訊的邊界拆開後，案例的邏輯會更清楚。"
            )}
          >
            <div className="grid gap-4 lg:grid-cols-3">
              <Card title={label(mode, "Customer", "顧客")} icon="user">
                {t(
                  "Carson is a major department store buyer and the territory's second-largest customer. He is likely to evaluate reliability, continuity, service quality, and the credibility of the new representative. Because Autry had a strong service reputation, Carson's expectations for Cassady are probably high.",
                  "Carson 是大型百貨採購，也是轄區第二大客戶。他很可能會評估供貨可靠性、服務延續性，以及新業務的可信度。由於 Autry 在服務能力上口碑很好，Carson 對 Cassady 的期待也很可能偏高。"
                )}
              </Card>

              <Card title={label(mode, "Company", "公司")} icon="briefcase">
                {t(
                  "Petite has meaningful scale but a traditional sales structure: 25 reps, one national sales manager, and straight commission. The case mentions no key account teams, no formal transition mechanism, and no support system around the handoff. Rodgers's absence therefore raises real customer-side risk.",
                  "Petite 的規模不小，但銷售架構相當傳統，也就是 25 位業務、單一 national sales manager，加上 straight commission。案例沒有提到 key account team、正式交接機制，或任何支援交接的系統，因此 Rodgers 的離開會直接拉高客戶端風險。"
                )}
              </Card>

              <Card title={label(mode, "Competition", "競爭")} icon="alert">
                {t(
                  "The case provides no named competitors. The disciplined move is to stay restrained. A large department store buyer almost certainly has alternative supplier options and may reassess supplier mix during a transition, but there is no basis for naming or profiling specific competitors.",
                  "案例沒有提供具名競爭者。最有紀律的做法是保持克制。大型百貨採購幾乎一定有其他供應商選項，也可能在供應商交接時重新評估 supplier mix，但沒有基礎去命名或描繪具體對手。"
                )}
              </Card>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <Card title={label(mode, "The real risks to manage", "本案真正需要管理的風險")} icon="shield" dense>
                <BulletList
                  items={[
                    t("Relationship risk. Carson may not automatically transfer trust from Autry to Cassady.", "關係風險。Carson 不會自動把對 Autry 的信任轉移到 Cassady 身上。"),
                    t("Capability risk. Cassady may not yet have the product and process depth to answer detailed account questions well.", "能力風險。Cassady 可能還沒有足夠的產品與流程深度，無法穩定回答細節問題。"),
                    t("Management risk. Rodgers cannot personally stabilize the transition with major accounts because he is away for two weeks.", "管理風險。由於 Rodgers 要離開兩週，他無法親自穩住 major accounts 的交接。"),
                    t("Behavioral risk. A straight-commission structure may quietly push Cassady toward the wrong objective for this first dinner.", "行為風險。純佣金制可能在不知不覺中把 Cassady 推向不適合這場晚餐的目標。")
                  ]}
                />
              </Card>

              <Card title={label(mode, "Safest judgment line", "最穩的判斷線")} icon="compass">
                {t(
                  "The dinner should be treated first as a relationship-stabilization and information-gathering meeting, not as a selling session. That framing fits the case facts, the customer risk, the training gap, and the ethical context of the class.",
                  "這場晚餐首先應被界定為穩定關係並蒐集資訊的會面，而不是銷售場合。這樣的界定同時符合案例事實、顧客風險、訓練落差，以及本課的倫理討論脈絡。"
                )}
              </Card>
            </div>
          </Section>

          <Section
            id="prepare"
            icon="check"
            title={label(mode, "Prepare", "準備")}
            subtitle={label(
              mode,
              "Use preapproach logic, but adapt it to a sensitive major-account transition rather than a standard selling call.",
              "可以套用 preapproach 邏輯，但要把它調整成重要帳戶的敏感交接，而不是一般銷售拜訪。"
            )}
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <Card title={label(mode, "1. Set the right role", "1. 先定對自己的角色")} icon="compass" dense>
                {t(
                  "Treat the dinner as a relationship transition, not a sales push. Carson needs reassurance and credibility before persuasion.",
                  "把晚餐視為關係交接，而不是推銷場合。Carson 在被說服之前，先需要安心與可信度。"
                )}
              </Card>

              <Card title={label(mode, "2. Do real preapproach work", "2. 做紮實的 preapproach")} icon="book" dense>
                {t(
                  "Learn purchase history, fall line status, unresolved issues, and the practical boundaries of what can honestly be said about the winter line.",
                  "事前要掌握採購紀錄、fall line 狀況、是否有未處理問題，以及對 winter line 能誠實講到哪裡。"
                )}
              </Card>

              <Card title={label(mode, "3. Set realistic objectives", "3. 設定合理目標")} icon="shield" dense>
                {t(
                  "Reasonable success means credible introduction, account learning, continuity reassurance, and a path to a better second conversation. Not an immediate close.",
                  "合理的成功是可信的自我介紹、帳戶學習、延續性安撫，以及為更好的第二次會面鋪路，不是當場成交。"
                )}
              </Card>

              <Card title={label(mode, "4. Prepare questions, not just lines", "4. 準備問題，不只是話術")} icon="message" dense>
                {t(
                  "He should be ready to ask how the fall line is moving, what is working, what is not, what Carson is worried about, and what Carson expects from the next Petite rep.",
                  "他要準備問 fall line 目前走得如何、哪些品項強或弱、Carson 擔心甚麼，以及他期待下一位 Petite 業務具備甚麼。"
                )}
              </Card>

              <Card title={label(mode, "5. Control tone", "5. 控制語氣")} icon="eye" dense>
                {t(
                  "This is neither a showroom pitch nor a performance review. He should sound respectful, composed, attentive, and business-capable.",
                  "這既不是 showroom pitch，也不是業績檢討會。他應該展現尊重、沉穩、會聽，且具備商務能力。"
                )}
              </Card>
            </div>
          </Section>

          <Section
            id="expect"
            icon="eye"
            title={label(mode, "Expect", "預期")}
            subtitle={label(
              mode,
              "He is not entering a neutral dinner. He is entering an evaluation environment with social and business layers mixed together.",
              "這不是一場中性的晚餐，而是一個社交與商務交錯、同時帶有評估性的情境。"
            )}
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Card title={label(mode, "He will be evaluated", "他會被評估")} icon="eye" dense>
                {t(
                  "Carson is not only listening. He is judging whether Cassady is prepared, trustworthy, and able to maintain service quality after Autry.",
                  "Carson 不只是在聽，他也在判斷 Cassady 是否準備充分、值得信任，並且能否維持 Autry 之後的服務水準。"
                )}
              </Card>

              <Card title={label(mode, "Continuity will matter", "延續性會是重點")} icon="shield" dense>
                {t(
                  "The conversation is likely to turn toward what is selling, what is not, and whether account service will remain stable under the new rep.",
                  "對話很可能會圍繞甚麼在賣、甚麼沒在賣，以及交接之後服務能否維持穩定。"
                )}
              </Card>

              <Card title={label(mode, "One dinner will not solve everything", "一場晚餐不會解決一切")} icon="clock" dense>
                {t(
                  "The best realistic outcome is a steadier relationship, deeper account understanding, and permission for a stronger next meeting.",
                  "最合理的成果是關係更穩、對帳戶理解更深，並取得下一次更有內容會面的空間。"
                )}
              </Card>

              <Card title={label(mode, "Social and business will interleave", "社交與商務會交錯")} icon="message" dense>
                {t(
                  "Too light wastes the opportunity. Too heavy damages rapport. The real skill is moving carefully between comfort and diagnosis.",
                  "太輕會浪費機會，太重則可能傷害關係。真正的技巧是小心拿捏舒適感與診斷之間的平衡。"
                )}
              </Card>
            </div>
          </Section>

          <Section
            id="ethics"
            icon="scales"
            title={label(mode, "Ethics", "倫理")}
            subtitle={label(
              mode,
              "The ethics lens matters here, but it should sit alongside personal selling, sales management, and buyer behavior rather than replacing them.",
              "這一案確實要用倫理視角，但倫理分析應與 personal selling、sales management、buyer behavior 並行，而不是取代它們。"
            )}
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Card title={label(mode, "A. Compensation tension", "A. 薪酬結構的張力")} icon="chart" dense>
                {t(
                  "Petite uses straight commission. Variable compensation tends to emphasize getting the sale over building the relationship. That does not prove Cassady will behave badly, but it does create structural pressure in the wrong direction for this first dinner.",
                  "Petite 採用 straight commission。Variable compensation 傾向強調成交，而非關係建立。這不代表 Cassady 一定會做出不當行為，但它確實在這場第一次晚餐裡製造出方向不完全對的結構性壓力。"
                )}
              </Card>

              <Card title={label(mode, "B. Management responsibility", "B. 管理層責任")} icon="briefcase" dense>
                {t(
                  "Rodgers sends a newly accelerated employee into a major account transition and then leaves for Europe for two weeks. From a sales management perspective, that raises legitimate questions about training, supervision, and transition planning.",
                  "Rodgers 把一位被提前推上前線的新人送進重大帳戶交接，接著又離開兩週。從 sales management 角度看，這合理引發對 training、supervising 與交接規劃的疑問。"
                )}
              </Card>

              <Card title={label(mode, "C. Inheriting another person's relationship", "C. 繼承他人建立的關係")} icon="user" dense>
                {t(
                  "Cassady is stepping into a relationship built by Autry over years. The ethical question is not only what he says, but what posture he takes. Does he rush to harvest the relationship, or acknowledge that trust must be rebuilt?",
                  "Cassady 接手的是 Autry 多年建立起來的關係。倫理問題不只在於他會說甚麼，也在於他的姿態應該是甚麼。是急著收割既有關係，還是坦誠承認信任需要重新建立。"
                )}
              </Card>

              <Card title={label(mode, "D. Confidence and judgment", "D. 自信與判斷")} icon="alert" dense>
                {t(
                  "The case says Cassady feels pleased and confident. But two days of visiting smaller accounts may not justify full confidence before a major-account dinner. Self-awareness is part of the ethical and managerial issue.",
                  "案例明寫 Cassady 覺得滿意且自信。但兩天的小客戶拜訪，未必足以支撐他在面對 major account 晚餐前的高度自信。自我認知本身就是倫理與管理問題的一部分。"
                )}
              </Card>
            </div>
          </Section>

          <Section
            id="scripts"
            icon="message"
            title={label(mode, "Scripts", "發言稿")}
            subtitle={label(
              mode,
              "Short speaking blocks for class participation rather than memo writing.",
              "這些是為課堂口頭參與設計的短發言，不是 memo 文風。"
            )}
          >
            <div className="grid gap-4 xl:grid-cols-3">
              <Card title={label(mode, "30-second opening", "30 秒開場")} icon="message">
                {t(
                  "The core issue is how Cassady should manage his first major-account transition after unexpectedly inheriting the Texas territory. He should treat the dinner with Carson primarily as a relationship-stabilization and information-gathering meeting, not as a selling session. Carson is too important to approach casually. But because this is also a dinner, the right balance is to build credibility, learn the account, reassure on continuity, and only lightly introduce the winter line as a bridge to future business.",
                  "本案核心是 Cassady 在臨時接手 Texas 轄區後，如何處理第一場重要客戶交接。我認為他應把和 Carson 的晚餐主要當成穩定關係與蒐集資訊的會面，而不是銷售場合。Carson 太重要，不能隨便應對。但這也是晚餐，因此正確平衡是建立可信度、了解帳戶、安撫交接疑慮，並且適時輕度帶入 winter line，作為未來業務討論的起點。"
                )}
              </Card>

              <Card title={label(mode, "15-second addition", "15 秒追加")} icon="arrow" dense>
                {t(
                  "I would also flag the compensation structure. On straight commission, Cassady faces a structural incentive to push for an order, even though the better move here may be to invest in the relationship first.",
                  "我也想補充薪酬結構。在純佣金制下，Cassady 面臨一種結構性的成交誘因，但在這個情境中，更好的做法其實可能是先投資關係。"
                )}
              </Card>

              <Card title={label(mode, "5-second interjection", "5 秒插話")} icon="alert" dense>
                {t(
                  "Rodgers leaving Cassady unsupported in front of a major account for two weeks is itself a management issue worth examining.",
                  "Rodgers 讓 Cassady 在重要客戶面前無支援地獨自運作兩週，這本身就是一個值得檢視的管理問題。"
                )}
              </Card>
            </div>
          </Section>
        </main>
      </div>

      <div className="fixed bottom-4 right-4 z-40 sm:bottom-5 sm:right-5">
        <div className="rounded-full border border-slate-300 bg-[#FCFAF2]/92 p-1.5 shadow-lg backdrop-blur">
          <div className="flex items-center gap-1">
            <LangButton active={mode === "en"} onClick={() => setMode("en")}>EN</LangButton>
            <LangButton active={mode === "zh"} onClick={() => setMode("zh")}>中文</LangButton>
            <LangButton active={mode === "bi"} onClick={() => setMode("bi")}>Bi</LangButton>
          </div>
        </div>
      </div>
    </div>
  );
}
