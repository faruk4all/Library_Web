
const CONFIG = {
  whatsappNumber: "8801671191073", // Bangladesh country code + official WhatsApp number
  metaPixelId: "",     // Add Meta Pixel ID
  gtmId: "",           // Add GTM-XXXXXXX
  ga4Id: ""            // Add G-XXXXXXXXXX
};

// Optional analytics / advertising integrations. Add IDs in CONFIG before production.
(function initTracking(){
  if (CONFIG.gtmId) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({"gtm.start": new Date().getTime(), event: "gtm.js"});
    const g=document.createElement("script"); g.async=true; g.src=`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(CONFIG.gtmId)}`; document.head.appendChild(g);
  }
  if (CONFIG.ga4Id) {
    const s=document.createElement("script"); s.async=true; s.src=`https://www.googletagmanager.com/gtag/js?id=${CONFIG.ga4Id}`; document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[]; window.gtag=function(){dataLayer.push(arguments)};
    gtag("js", new Date()); gtag("config", CONFIG.ga4Id);
  }
  if (CONFIG.metaPixelId) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", CONFIG.metaPixelId); fbq("track", "PageView");
  }
})();

function track(name, params={}) {
  if (typeof window.gtag === "function") window.gtag("event", name, params);
  if (typeof window.fbq === "function") window.fbq("trackCustom", name, params);
}

function whatsapp(message="Hello eCitizen Digital, I would like to discuss my business growth.") {
  track("WhatsAppClick", {source: location.pathname});
  const encoded = encodeURIComponent(message);
  if (CONFIG.whatsappNumber) {
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`, "_blank", "noopener");
  } else {
    alert("WhatsApp is not configured yet. Please add the official number in script.js.");
  }
}

document.querySelectorAll("[data-wa]").forEach(el => el.addEventListener("click", e => {
  e.preventDefault();
  whatsapp(el.dataset.wa || undefined);
}));

const menu = document.querySelector(".menu");
const mobileNav = document.querySelector(".mobile-nav");
if(menu && mobileNav){
  menu.addEventListener("click",()=>mobileNav.classList.toggle("open"));
  mobileNav.querySelectorAll("a[href^=\"#\"]").forEach(a=>a.addEventListener("click",()=>mobileNav.classList.remove("open")));
}

document.querySelectorAll("[data-lang]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll("[data-lang]").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    const lang=btn.dataset.lang;
    document.querySelectorAll("[data-en]").forEach(el=>{
      el.innerHTML = lang==="bn" ? el.dataset.bn : el.dataset.en;
    });
    document.body.classList.toggle("bn",lang==="bn");
    document.documentElement.lang=lang==="bn"?"bn":"en";
    localStorage.setItem("ecitizen-lang",lang);
  });
});
const saved=localStorage.getItem("ecitizen-lang");
if(saved) document.querySelector(`[data-lang="${saved}"]`)?.click();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.08});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
