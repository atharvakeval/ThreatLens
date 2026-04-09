
const ML = (() => {

  const TYPE_WEIGHTS = {
    'Injection': 0.95, 'Lateral movement': 0.92, 'Malware': 0.90,
    'Privilege Escalation': 0.88, 'Exfiltration': 0.86, 'C2 Communication': 0.85,
    'Credential': 0.72, 'Execution': 0.75, 'Recon': 0.55,
    'Account': 0.50, 'Data transfer': 0.45, 'Config': 0.30,
  };

  const SEV_WEIGHTS = { critical: 1.0, high: 0.75, medium: 0.45, low: 0.20 };

  function timeScore(timeStr) {
    const m = timeStr.match(/(\d+)(m|h) ago/);
    if (!m) return 0.6;
    const mins = m[2] === 'h' ? parseInt(m[1]) * 60 : parseInt(m[1]);
    if (mins <= 5) return 1.0;
    if (mins <= 15) return 0.85;
    if (mins <= 60) return 0.65;
    return 0.40;
  }

  function sourceScore(source) {
    if (source === 'External') return 0.90;
    if (/^45\.|^89\.|^196\./.test(source)) return 0.95;
    if (/^10\.|^172\.|^192\.168/.test(source)) return 0.50;
    return 0.70;
  }

  function repeatScore(alert, allAlerts) {
    const sameSource = allAlerts.filter(a => a.source === alert.source && a.id !== alert.id).length;
    const sameType = allAlerts.filter(a => a.type === alert.type && a.id !== alert.id).length;
    return Math.min(1.0, 0.5 + sameSource * 0.1 + sameType * 0.05);
  }

  function computeAnomaly(alert, allAlerts) {
    const tw = TYPE_WEIGHTS[alert.type] || 0.50;
    const sw = SEV_WEIGHTS[alert.severity] || 0.30;
    const ts = timeScore(alert.time);
    const ss = sourceScore(alert.source);
    const rs = repeatScore(alert, allAlerts);
    const raw = tw * 0.30 + sw * 0.25 + ts * 0.20 + ss * 0.15 + rs * 0.10;
    return Math.min(99, Math.round(raw * 100));
  }

  function scoreAll(alerts) {
    return alerts.map(a => ({ ...a, anomaly: computeAnomaly(a, alerts) }));
  }

  function anomalyLabel(score) {
    if (score >= 85) return { label: 'Critical risk', color: '#ef4444' };
    if (score >= 65) return { label: 'High risk',     color: '#f59e0b' };
    if (score >= 40) return { label: 'Moderate',      color: '#60a5fa' };
    return              { label: 'Low risk',          color: '#4ade80' };
  }

  // --- Linear Regression ---
  function linearRegression(y) {
    const n = y.length;
    const x = y.map((_, i) => i);
    const sumX  = x.reduce((a, b) => a + b, 0);
    const sumY  = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((s, xi, i) => s + xi * y[i], 0);
    const sumX2 = x.reduce((s, xi) => s + xi * xi, 0);
    const slope     = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    return { slope, intercept };
  }

  function predict(historicalData, daysAhead = 3) {
    const { slope, intercept } = linearRegression(historicalData);
    const n = historicalData.length;
    const predictions = [];
    for (let i = 0; i < daysAhead; i++) {
      const val = Math.max(0, Math.round(intercept + slope * (n + i)));
      const noise = Math.round((Math.random() - 0.5) * 8);
      predictions.push(Math.max(0, val + noise));
    }
    return predictions;
  }

  function rSquared(data) {
    const { slope, intercept } = linearRegression(data);
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const ssTot = data.reduce((s, y) => s + (y - mean) ** 2, 0);
    const ssRes = data.reduce((s, y, i) => {
      const yHat = intercept + slope * i;
      return s + (y - yHat) ** 2;
    }, 0);
    return Math.max(0, Math.min(1, 1 - ssRes / ssTot));
  }

  function trendDirection(data) {
    const { slope } = linearRegression(data);
    if (slope > 3)  return { label: 'Increasing',  color: '#ef4444', arrow: '↑' };
    if (slope < -3) return { label: 'Decreasing',  color: '#4ade80', arrow: '↓' };
    return             { label: 'Stable',          color: '#60a5fa', arrow: '→' };
  }

  return { scoreAll, anomalyLabel, predict, rSquared, trendDirection, linearRegression };
})();
