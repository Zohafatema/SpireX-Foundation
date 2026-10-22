const currencies = {
  AUD:{name:"Australian Dollar",symbol:"A$",flag:"🇦🇺"}, BRL:{name:"Brazilian Real",symbol:"R$",flag:"🇧🇷"},
  CAD:{name:"Canadian Dollar",symbol:"C$",flag:"🇨🇦"}, CHF:{name:"Swiss Franc",symbol:"Fr",flag:"🇨🇭"},
  CNY:{name:"Chinese Yuan",symbol:"¥",flag:"🇨🇳"}, EUR:{name:"Euro",symbol:"€",flag:"🇪🇺"},
  GBP:{name:"British Pound",symbol:"£",flag:"🇬🇧"}, HKD:{name:"Hong Kong Dollar",symbol:"HK$",flag:"🇭🇰"},
  IDR:{name:"Indonesian Rupiah",symbol:"Rp",flag:"🇮🇩"}, INR:{name:"Indian Rupee",symbol:"₹",flag:"🇮🇳"},
  JPY:{name:"Japanese Yen",symbol:"¥",flag:"🇯🇵"}, KRW:{name:"South Korean Won",symbol:"₩",flag:"🇰🇷"},
  MXN:{name:"Mexican Peso",symbol:"$",flag:"🇲🇽"}, NZD:{name:"New Zealand Dollar",symbol:"NZ$",flag:"🇳🇿"},
  SGD:{name:"Singapore Dollar",symbol:"S$",flag:"🇸🇬"}, THB:{name:"Thai Baht",symbol:"฿",flag:"🇹🇭"},
  TRY:{name:"Turkish Lira",symbol:"₺",flag:"🇹🇷"}, USD:{name:"US Dollar",symbol:"$",flag:"🇺🇸"},
  ZAR:{name:"South African Rand",symbol:"R",flag:"🇿🇦"}
};
const $ = id => document.getElementById(id);
const fromSelect=$("fromCurrency"), toSelect=$("toCurrency"), amountInput=$("amount");
let rateCache = new Map();
function populate(select, selected) {
  select.innerHTML = Object.entries(currencies).map(([code,c])=>`<option value="${code}" ${code===selected?"selected":""}>${code} — ${c.name}</option>`).join("");
}
populate(fromSelect,"INR"); populate(toSelect,"USD");
function updateCurrencyUI() {
  const f=currencies[fromSelect.value], t=currencies[toSelect.value];
  $("fromFlag").textContent=f.flag; $("toFlag").textContent=t.flag;
  $("fromSymbol").textContent=f.symbol; $("toSymbol").textContent=t.symbol;
  $("fromCodeLabel").textContent=fromSelect.value; $("toCodeLabel").textContent=toSelect.value;
}
function fmt(value, code) {
  try { return new Intl.NumberFormat("en-US",{style:"currency",currency:code,maximumFractionDigits:2}).format(value); }
  catch { return `${code} ${Number(value).toFixed(2)}`; }
}
async function convert() {
  const amount=Number(amountInput.value), from=fromSelect.value, to=toSelect.value;
  updateCurrencyUI();
  if (!Number.isFinite(amount)||amount<0||amountInput.value==="") {
    $("message").textContent="Please enter a valid amount (zero or more)."; $("message").classList.add("error"); return;
  }
  $("message").classList.remove("error");
  $("rateStatus").textContent="Updating rate…"; $("rateStatus").classList.add("loading");
  $("rateText").textContent="Getting current exchange rate…";
  $("convertBtn").classList.add("loading");
  try {
    let rate;
    if(from===to) rate=1;
    else {
      const key=`${from}-${to}`;
      if(rateCache.has(key)) rate=rateCache.get(key);
      else {
        const response=await fetch(`https://api.frankfurter.dev/v1/latest?base=${encodeURIComponent(from)}&symbols=${encodeURIComponent(to)}`);
        if(!response.ok) throw new Error("The exchange-rate service is temporarily unavailable.");
        const data=await response.json();
        rate=data.rates?.[to];
        if(typeof rate!=="number") throw new Error("No rate was returned for this currency pair.");
        rateCache.set(key,rate);
      }
    }
    $("result").textContent=new Intl.NumberFormat("en-US",{maximumFractionDigits:2,minimumFractionDigits:2}).format(amount*rate);
    $("rateText").textContent=`1 ${from} = ${new Intl.NumberFormat("en-US",{maximumFractionDigits:6}).format(rate)} ${to}`;
    $("updatedText").textContent=from===to?"Same currency — no conversion needed.":`Rate date: ${new Date().toLocaleDateString()} · Source: Frankfurter`;
    $("rateStatus").textContent="Rate loaded"; $("message").textContent="Rates are indicative and may differ from rates offered by banks or payment providers.";
  } catch(err) {
    $("rateStatus").textContent="Rate unavailable"; $("rateText").textContent="Could not load exchange rate.";
    $("updatedText").textContent="Check your internet connection and try again.";
    $("message").textContent=err.message || "Something went wrong. Please try again.";
    $("message").classList.add("error");
  } finally {
    $("rateStatus").classList.remove("loading"); $("convertBtn").classList.remove("loading");
  }
}
$("swapBtn").addEventListener("click",()=>{const old=fromSelect.value;fromSelect.value=toSelect.value;toSelect.value=old;convert();});
$("convertBtn").addEventListener("click",convert);
$("refreshBtn").addEventListener("click",()=>{rateCache.delete(`${fromSelect.value}-${toSelect.value}`);convert();});
fromSelect.addEventListener("change",convert); toSelect.addEventListener("change",convert);
amountInput.addEventListener("input",()=>{if(amountInput.value!=="")convert();});
document.querySelectorAll(".quick-card").forEach(btn=>btn.addEventListener("click",()=>{fromSelect.value=btn.dataset.from;toSelect.value=btn.dataset.to;convert();document.querySelector(".converter-card").scrollIntoView({behavior:"smooth",block:"center"});}));
$("themeToggle").addEventListener("click",()=>{document.body.classList.toggle("light");$("themeToggle").textContent=document.body.classList.contains("light")?"☾":"☼";});
convert();
