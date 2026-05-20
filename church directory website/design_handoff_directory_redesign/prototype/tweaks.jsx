/* global React */
const { useState, useEffect } = React;

window.TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "parchment",
  "displayFont": "Cormorant Garamond",
  "showOrnaments": true,
  "denseList": false,
  "accentColor": "#a87c2f"
}/*EDITMODE-END*/;

function AppTweaks({ tw, setTw }) {
  const Panel = window.TweaksPanel;
  if (!Panel) return null;
  return (
    <Panel title="Tweaks">
      <window.TweakSection title="Theme">
        <window.TweakRadio
          label="Background"
          value={tw.theme}
          options={[
            { value: "parchment", label: "Parchment" },
            { value: "ivory", label: "Ivory" },
            { value: "ink", label: "Ink" },
          ]}
          onChange={(v) => {
            setTw({ theme: v });
            applyTheme(v);
          }}
        />
        <window.TweakColor
          label="Accent"
          value={tw.accentColor}
          onChange={(v) => {
            setTw({ accentColor: v });
            document.documentElement.style.setProperty("--brass", v);
            document.documentElement.style.setProperty("--brass-deep", shade(v, -25));
          }}
        />
      </window.TweakSection>
      <window.TweakSection title="Typography">
        <window.TweakSelect
          label="Display font"
          value={tw.displayFont}
          options={[
            { value: "Cormorant Garamond", label: "Cormorant Garamond" },
            { value: "EB Garamond", label: "EB Garamond" },
            { value: "Playfair Display", label: "Playfair Display" },
            { value: "DM Serif Display", label: "DM Serif Display" },
          ]}
          onChange={(v) => {
            setTw({ displayFont: v });
            document.documentElement.style.setProperty("--serif", `"${v}", Georgia, serif`);
          }}
        />
      </window.TweakSection>
      <window.TweakSection title="Layout">
        <window.TweakToggle
          label="Show ornaments & rule lines"
          value={tw.showOrnaments}
          onChange={(v) => {
            setTw({ showOrnaments: v });
            document.body.classList.toggle("no-ornaments", !v);
          }}
        />
        <window.TweakToggle
          label="Dense list"
          value={tw.denseList}
          onChange={(v) => {
            setTw({ denseList: v });
            document.body.classList.toggle("dense-list", v);
          }}
        />
      </window.TweakSection>
    </Panel>
  );
}

function applyTheme(theme) {
  const r = document.documentElement.style;
  if (theme === "parchment") {
    r.setProperty("--bg", "#f4ede0");
    r.setProperty("--bg-soft", "#ebe2d1");
    r.setProperty("--paper", "#faf6ec");
    r.setProperty("--ink", "#1a1814");
    r.setProperty("--ink-soft", "#3d3830");
    r.setProperty("--ink-mute", "#6b6357");
    r.setProperty("--rule", "#c8bda4");
  } else if (theme === "ivory") {
    r.setProperty("--bg", "#f7f4ec");
    r.setProperty("--bg-soft", "#efe9dc");
    r.setProperty("--paper", "#fffdf6");
    r.setProperty("--ink", "#171614");
    r.setProperty("--ink-soft", "#3a3630");
    r.setProperty("--ink-mute", "#75695a");
    r.setProperty("--rule", "#d6cdba");
  } else if (theme === "ink") {
    r.setProperty("--bg", "#15130f");
    r.setProperty("--bg-soft", "#1f1c17");
    r.setProperty("--paper", "#1a1814");
    r.setProperty("--ink", "#ede4d0");
    r.setProperty("--ink-soft", "#c8beaa");
    r.setProperty("--ink-mute", "#8a8170");
    r.setProperty("--rule", "#3a352c");
  }
}

function shade(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0x00ff) + amt;
  let b = (num & 0x0000ff) + amt;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
}

window.AppTweaks = AppTweaks;
