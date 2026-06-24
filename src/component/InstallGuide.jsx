import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Detect which browser/OS the user is on
function detectPlatform() {
  const ua = navigator.userAgent || "";
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  const isAndroid = /Android/.test(ua);
  const isSamsung = /SamsungBrowser/.test(ua);
  const isChrome = /Chrome/.test(ua) && !/Edg|OPR/.test(ua);
  const isFirefox = /Firefox/.test(ua);
  const isSafari = /Safari/.test(ua) && !isChrome;

  if (isIOS && isSafari) return "ios-safari";
  if (isIOS && isChrome) return "ios-chrome";
  if (isAndroid && isSamsung) return "android-samsung";
  if (isAndroid && isChrome) return "android-chrome";
  if (isAndroid && isFirefox) return "android-firefox";
  return "desktop";
}

// Steps for each platform
const STEPS = {
  "android-chrome": {
    browser: "Chrome (Android)",
    icon: "🌐",
    steps: [
      { icon: "⋮", text: 'Tap the three dots (⋮) in the upper right corner' },
      { icon: "📲", text: 'Find the "Add to Home Screen" or "Install App" option.' },
      { icon: "✅", text: 'If a pop-up appears, tap "Install" or "Add"' },
      { icon: "🏠", text: 'The app is now on your home screen!' },
    ],
  },
  "android-samsung": {
    browser: "Samsung Internet",
    icon: "🌐",
    steps: [
      { icon: "☰", text: 'Tap on the bottom menu icon (≡)' },
      { icon: "➕", text: 'By selecting "Add page to" → "Home screen"' },
      { icon: "✅", text: 'Tap the "Add" button' },
      { icon: "🏠", text: 'The app is installed on the home screen!' },
    ],
  },
  "android-firefox": {
    browser: "Firefox (Android)",
    icon: "🦊",
    steps: [
      { icon: "⋮", text: 'Tap on the three dots in the right corner' },
      { icon: "📲", text: 'Find "Install" or "Add to Home Screen"' },
      { icon: "✅", text: 'Please confirm' },
      { icon: "🏠", text: 'Shortcut created on home screen!' },
    ],
  },
  "ios-safari": {
    browser: "Safari (iPhone/iPad)",
    icon: "🧭",
    steps: [
      { icon: "⬆️", text: 'Tap on the Share button (⬆️) below' },
      { icon: "📲", text: 'Scroll to find "Add to Home Screen"' },
      { icon: "✏️", text: 'Change the name or leave it as is, then tap "Add"' },
      { icon: "🏠", text: 'The app appears on the home screen just like a native app!' },
    ],
  },
  "ios-chrome": {
    browser: "Chrome (iPhone)",
    icon: "🌐",
    steps: [
      { icon: "⬆️", text: 'Tap on the Share icon (⬆️) below' },
      { icon: "📲", text: 'By selecting "Add to Home Screen" option' },
      { icon: "✅", text: 'Tap "Add"' },
      { icon: "🏠", text: 'Done! The app is available on the home screen.' },
    ],
  },
  desktop: {
    browser: "Desktop / Chrome",
    icon: "💻",
    steps: [
      { icon: "⋮", text: 'Click on the three dots on the top right of the browser.' },
      { icon: "📲", text: 'Click "Cast, save, and share" → "Install page as app"' },
      { icon: "✅", text: 'Click "Install" in the pop-up' },
      { icon: "🏠", text: 'The app will open as a shortcut on the desktop!' },
    ],
  },
};

export default function InstallGuide() {
  const navigate = useNavigate();
  const [platform, setPlatform] = useState("android-chrome");
  const [currentStep, setCurrentStep] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const info = STEPS[platform] || STEPS["android-chrome"];

  function handleSkip() {
    localStorage.setItem("installGuideShown", "true");
    navigate("/");
  }

  function nextStep() {
    if (currentStep < info.steps.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentStep((s) => s + 1);
        setAnimating(false);
      }, 200);
    } else {
      handleSkip();
    }
  }

  const step = info.steps[currentStep];
  const isLast = currentStep === info.steps.length - 1;

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>

        {/* Top: Logo + Title */}
        <div style={styles.header}>
          <img src="/logo.png" alt="logo" style={styles.logo} />
          <h1 style={styles.title}>Install App 📲</h1>
          <p style={styles.subtitle}>
           Use Duventra <strong>directly as an app</strong> on your phone — absolutely free!
          </p>
        </div>

        {/* Browser badge */}
        <div style={styles.browserBadge}>
          <span style={{ fontSize: 16 }}>{info.icon}</span>
          <span style={styles.browserText}> for {info.browser}</span>
        </div>

        {/* Step progress dots */}
        <div style={styles.dots}>
          {info.steps.map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.dot,
                background: i === currentStep ? "#b5651d" : i < currentStep ? "#b5651d" : "#e0e0e0",
                width: i === currentStep ? 20 : 8,
              }}
            />
          ))}
        </div>

        {/* Current step card */}
        <div
          style={{
            ...styles.stepCard,
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(8px)" : "translateY(0)",
          }}
        >
          <div style={styles.stepNum}>Step {currentStep + 1}</div>
          <div style={styles.stepIcon}>{step.icon}</div>
          <p style={styles.stepText}>{step.text}</p>
        </div>

        {/* Buttons */}
        <div style={styles.buttonRow}>
          <button onClick={handleSkip} style={styles.skipBtn}>
            Later
          </button>
          <button onClick={nextStep} style={styles.nextBtn}>
            {isLast ? "Done! 🎉" : "Next Step →"}
          </button>
        </div>

        {/* Tip */}
        <p style={styles.tip}>
          💡Once installed, this guide will not appear again.
        </p>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    minHeight: "100vh",
    background: "#b5651d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: 24,
    padding: "28px 24px 20px",
    maxWidth: 400,
    width: "100%",
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  header: {
    textAlign: "center",
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginBottom: 10,
    objectFit: "contain",
  },
  title: {
    margin: "0 0 6px",
    fontSize: 22,
    fontWeight: 700,
    color: "#1a1a2e",
  },
  subtitle: {
    margin: 0,
    fontSize: 14,
    color: "#555",
    lineHeight: 1.5,
  },
  browserBadge: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f0eeff",
    borderRadius: 20,
    padding: "6px 14px",
  },
  browserText: {
    fontSize: 13,
    color: "#b5651d",
    fontWeight: 600,
  },
  dots: {
    display: "flex",
    gap: 6,
    alignItems: "center",
  },
  dot: {
    height: 8,
    borderRadius: 4,
    transition: "all 0.3s ease",
  },
  stepCard: {
    width: "100%",
    background: "#f7f6ff",
    borderRadius: 16,
    padding: "20px 16px",
    textAlign: "center",
    transition: "all 0.2s ease",
    border: "2px solid #e8e5ff",
  },
  stepNum: {
    fontSize: 11,
    fontWeight: 700,
    color: "#b5651d",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  stepIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  stepText: {
    margin: 0,
    fontSize: 15,
    color: "#333",
    lineHeight: 1.6,
    fontWeight: 500,
  },
  buttonRow: {
    display: "flex",
    gap: 10,
    width: "100%",
  },
  skipBtn: {
    flex: 1,
    padding: "12px 0",
    borderRadius: 12,
    border: "2px solid #e0e0e0",
    background: "transparent",
    color: "#888",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  nextBtn: {
    flex: 2,
    padding: "12px 0",
    borderRadius: 12,
    border: "none",
    background: "#b5651d",
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 4px 15px #b5641d59",
  },
  tip: {
    margin: 0,
    fontSize: 12,
    color: "#aaa",
    textAlign: "center",
  },
};
