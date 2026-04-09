const ALERTS = [
  {id:'TL-2041',title:'SQL Injection attempt on /api/login',source:'192.168.4.21',type:'Injection',severity:'critical',time:'2m ago',status:'open'},
  {id:'TL-2040',title:'Privilege escalation detected on host',source:'10.0.0.44',type:'Lateral movement',severity:'critical',time:'5m ago',status:'open'},
  {id:'TL-2039',title:'Ransomware signature match — srv-03',source:'172.16.1.8',type:'Malware',severity:'critical',time:'9m ago',status:'investigating'},
  {id:'TL-2038',title:'Port scan from external IP',source:'45.33.32.156',type:'Recon',severity:'high',time:'11m ago',status:'open'},
  {id:'TL-2037',title:'Brute force on SSH — 40 attempts',source:'172.16.0.5',type:'Credential',severity:'high',time:'18m ago',status:'open'},
  {id:'TL-2036',title:'Suspicious PowerShell execution',source:'10.0.0.12',type:'Execution',severity:'high',time:'24m ago',status:'investigating'},
  {id:'TL-2035',title:'Unusual outbound traffic to TOR exit',source:'10.0.0.98',type:'Exfiltration',severity:'high',time:'31m ago',status:'open'},
  {id:'TL-2034',title:'Failed MFA logins — admin account',source:'External',type:'Credential',severity:'high',time:'38m ago',status:'open'},
  {id:'TL-2033',title:'DNS query to known C2 domain',source:'10.0.0.55',type:'C2 Communication',severity:'medium',time:'45m ago',status:'open'},
  {id:'TL-2032',title:'New admin user created outside hours',source:'10.0.0.3',type:'Account',severity:'medium',time:'52m ago',status:'open'},
  {id:'TL-2031',title:'Large file download — 2.4GB',source:'10.0.1.14',type:'Data transfer',severity:'medium',time:'1h ago',status:'open'},
  {id:'TL-2030',title:'Expired SSL certificate — api-gateway',source:'Internal',type:'Config',severity:'medium',time:'2h ago',status:'open'},
  {id:'TL-2029',title:'Login from unusual geolocation',source:'196.203.14.5',type:'Account',severity:'medium',time:'2h ago',status:'resolved'},
  {id:'TL-2028',title:'Repeated 403 errors on /admin',source:'89.44.21.11',type:'Recon',severity:'low',time:'3h ago',status:'resolved'},
  {id:'TL-2027',title:'Outdated package version detected',source:'app-server-02',type:'Config',severity:'low',time:'4h ago',status:'open'},
  {id:'TL-2026',title:'Multiple failed login — non-admin user',source:'10.0.2.8',type:'Credential',severity:'low',time:'5h ago',status:'resolved'},
];

const MITRE = {
  'TL-2041':['T1190 — Exploit public-facing app','T1059 — Command & scripting interpreter'],
  'TL-2040':['T1078 — Valid accounts','T1068 — Exploitation for privilege escalation'],
  'TL-2039':['T1486 — Data encrypted for impact','T1083 — File and directory discovery'],
};

const TARGETS = [
  {name:'api-gateway-01',attempts:34,severity:'critical'},
  {name:'auth-service',attempts:22,severity:'high'},
  {name:'db-prod-02',attempts:18,severity:'medium'},
];

const TEAM = [
  {who:'Riya',action:'resolved SQL injection on auth service',color:'#4ade80'},
  {who:'Aryan',action:'escalated incident #2041 to Karan',color:'#60a5fa'},
  {who:'Karan',action:'updated brute force detection rules',color:'#f59e0b'},
  {who:'Priya',action:'dismissed 12 false positive alerts',color:'#4ade80'},
];

const SYSTEMS = [
  {name:'Firewall',status:'Protected',cls:'status-ok'},
  {name:'IDS / IPS',status:'Active',cls:'status-ok'},
  {name:'SIEM',status:'Synced',cls:'status-ok'},
  {name:'EDR Agent',status:'Warning',cls:'status-warn'},
  {name:'Threat Intel',status:'Updated',cls:'status-ok'},
];

const WEEK_DATA = [42,68,55,91,74,38,61];
const WEEK_DAYS = ['M','T','W','T','F','S','S'];

const ATTACK_TYPES = [
  {label:'SQL Injection',count:82,severity:'critical'},
  {label:'Brute Force',count:67,severity:'high'},
  {label:'Phishing',count:54,severity:'high'},
  {label:'Port Scan',count:41,severity:'medium'},
  {label:'Malware',count:28,severity:'medium'},
];

function sevColor(s){
  return s==='critical'?'#ef4444':s==='high'?'#f59e0b':s==='medium'?'#60a5fa':s==='low'?'#4ade80':'#6b7280';
}

function renderSidebar(active){
  const pages = [
    {href:'../index.html',icon:'<rect x="2" y="2" width="5" height="5" rx="1.5" fill="currentColor"/><rect x="9" y="2" width="5" height="5" rx="1.5" fill="currentColor" opacity=".5"/><rect x="2" y="9" width="5" height="5" rx="1.5" fill="currentColor" opacity=".5"/><rect x="9" y="9" width="5" height="5" rx="1.5" fill="currentColor" opacity=".5"/>',label:'Dashboard',badge:false},
    {href:'../pages/iprep.html',icon:'<circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M8 5.5V8l1.5 1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>',label:'IP Checker',badge:false},
    {href:'../pages/threats.html',icon:'<path d="M8 2L14 5V9C14 12 11 14.5 8 15C5 14.5 2 12 2 9V5L8 2Z" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M8 6V9M8 11H8.01" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>',label:'Threat Feed',badge:true},
    {href:"../pages/prediction.html",icon:"<path d=\"M2 12L6 7L9 10L13 4\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"13\" cy=\"4\" r=\"1.5\" fill=\"currentColor\"/>",label:"Prediction",badge:false},
    {href:"../pages/reports.html",icon:"<rect x=\"3\" y=\"2\" width=\"10\" height=\"12\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"1.2\"/><path d=\"M5.5 6h5M5.5 9h3\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\"/>",label:"Reports",badge:false},
  ];
  return `<aside class="sidebar">
    <div class="logo"><svg viewBox="0 0 18 18" fill="none"><path d="M9 2L16 6V12L9 16L2 12V6L9 2Z" stroke="#378ADD" stroke-width="1.5"/><circle cx="9" cy="9" r="2.5" fill="#378ADD"/></svg></div>
    ${pages.map(p=>`<a href="${p.href}" class="nav-item${active===p.label?' active':''}" title="${p.label}">
      <svg viewBox="0 0 16 16" fill="none">${p.icon}</svg>
      ${p.badge?'<div class="badge"></div>':''}
      <span class="nav-tooltip">${p.label}</span>
    </a>`).join('')}
    <div class="nav-spacer"></div>
    <a href="#" class="nav-item" title="Settings"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" stroke-width="1.2"/><path d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg><span class="nav-tooltip">Settings</span></a>
  </aside>`;
}

function renderTopbar(title){
  const now = new Date();
  return `<div class="topbar">
    <div class="topbar-left">
      <span class="page-title">${title}</span>
      <span class="live-badge">Live</span>
      <span class="timestamp">Updated just now · ${now.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span>
    </div>
    <div class="topbar-right">
      <div class="avatar">RJ</div>
    </div>
  </div>`;
}

function renderAlertRow(a, linkToDetail=true){
  const href = linkToDetail ? `../pages/incident.html?id=${a.id}` : `incident.html?id=${a.id}`;
  return `<a href="${href}" class="alert-row" data-severity="${a.severity}">
    <div class="sev-dot ${a.severity}"></div>
    <div class="alert-info">
      <div class="alert-title">${a.title}</div>
      <div class="alert-meta">${a.source} &nbsp;·&nbsp; ${a.type}</div>
    </div>
    <div class="alert-time">${a.time}</div>
    <div class="alert-actions">
      <button class="btn-sm investigate" onclick="event.preventDefault()">Investigate</button>
      <button class="btn-sm escalate" onclick="event.preventDefault()">Escalate</button>
      <button class="btn-sm dismiss" onclick="event.preventDefault();this.closest('.alert-row').style.display='none'">Dismiss</button>
    </div>
  </a>`;
}

function miniBarChart(data, days, containerId){
  const max = Math.max(...data);
  setTimeout(()=>{
    const el = document.getElementById(containerId);
    if(!el) return;
    el.innerHTML = days.map((d,i)=>{
      const h = Math.round((data[i]/max)*38);
      const color = data[i]===max ? '#ef4444' : '#1e3a5c';
      return `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;flex:1">
        <div class="mini-bar" style="height:${h}px;background:${color}"></div>
        <span style="font-size:9px;color:#6b7280">${d}</span>
      </div>`;
    }).join('');
  }, 100);
}
