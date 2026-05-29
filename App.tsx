import React, { useState } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  const [roastStyle, setRoastStyle] = useState("witty");
  const [loading, setLoading] = useState(false);
  const [roast, setRoast] = useState("");
  const [error, setError] = useState("");

  const handleRoast = async () => {
    if (!username.trim()) {
      setError("Te lutem shkruaj nje username valid.");
      return;
    }

    setLoading(true);
    setError("");
    setRoast("");

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`,
      );

      if (response.status === 404) {
        throw new Error("Ky perdorues nuk ekziston ne GitHub!");
      }

      const repos = await response.json();

      if (!repos || repos.length === 0) {
        throw new Error(
          "Ky perdorues ka 0 repozitore publike. Ska cka me u roast!",
        );
      }

      const languages = repos.map((r: any) => r.language).filter(Boolean);
      const topLanguages =
        [...new Set(languages)].slice(0, 3).join(", ") || "HTML/CSS";
      const totalStars = repos.reduce(
        (acc: number, repo: any) => acc + repo.stargazers_count,
        0,
      );

      setTimeout(() => {
        let generatedRoast = "";

        if (roastStyle === "corporate") {
          generatedRoast = `🚨 CORPORATE AUDIT FOR @${username}: After deep-diving into your deliverables, your synergy with ${topLanguages} is sub-optimal. With a grand total of ${totalStars} stars, your repositories are currently facing negative growth. We suggest pivoting your strategy from pushing broken code to scheduled synergy meetings.`;
        } else if (roastStyle === "pirate") {
          generatedRoast = `🏴‍☠️ AHOY MATEY! @${username}'s ship is sinking! Navigating through the stormy seas of ${topLanguages}, we found nothing but empty chests and ${totalStars} tiny stars. Your commit history looks like a drunk sailor trying to write code. Fix the leaks before the kraken takes your repos!`;
        } else {
          generatedRoast = `🔥 ROAST FOR @${username}: Looking at your profile, it seems you are trying to change the world with ${topLanguages}, but nobody told you that your ${repos.length} repositories are mostly dead templates. You have accumulated exactly ${totalStars} stars, which is probably just your alternative accounts supporting you. Keep pushing to main, maybe someone will notice!`;
        }

        setRoast(generatedRoast);
        setLoading(false);
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Dicka shkoi gabim.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          backgroundColor: "#1e293b",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
          Roast My GitHub 🔥
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
          Zbuloni te verteten e hidhur per kodin tuaj.
        </p>

        <input
          type="text"
          placeholder="GitHub Username (e.g. torvalds)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "12px",
            width: "80%",
            borderRadius: "6px",
            border: "1px solid #475569",
            backgroundColor: "#0f172a",
            color: "white",
            fontSize: "1rem",
            marginBottom: "15px",
          }}
        />

        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px", color: "#cbd5e1" }}>
            Zgjidh Stilin:
          </label>
          <select
            value={roastStyle}
            onChange={(e) => setRoastStyle(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "#0f172a",
              color: "white",
              border: "1px solid #475569",
            }}
          >
            <option value="witty">Witty (Standard)</option>
            <option value="corporate">Corporate Jargon</option>
            <option value="pirate">Pirate</option>
          </select>
        </div>

        <button
          onClick={handleRoast}
          disabled={loading}
          style={{
            padding: "12px 30px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: loading ? "#64748b" : "#ef4444",
            color: "white",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "0.2s",
          }}
        >
          {loading ? "Duke lexuar kodin tënd të keq..." : "Roast Me! 🔥"}
        </button>

        {error && (
          <div
            style={{ color: "#f87171", marginTop: "20px", fontWeight: "bold" }}
          >
            ❌ {error}
          </div>
        )}

        {roast && (
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              backgroundColor: "#0f172a",
              borderRadius: "8px",
              borderLeft: "4px solid #ef4444",
              textAlign: "left",
              line67Height: "1.6",
              fontStyle: "italic",
            }}
          >
            {roast}
          </div>
        )}
      </div>
    </div>
  );
}

