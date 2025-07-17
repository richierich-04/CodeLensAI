import { useState } from 'react';
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import axios from 'axios';
import Markdown from 'react-markdown';
import rehypeHighlight from "rehype-highlight";

// Styles
import "prismjs/themes/prism-tomorrow.css"; // This is dark
import "highlight.js/styles/github-dark.css";
import './App.css';

function App() {
  // State variables
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("review"); // Modes: raw | review | fix

  // Dark mode state (stored in localStorage)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "false" ? false : true;
  });

  // Toggle light/dark mode
  function toggleTheme() {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  }

  // Send code to backend for review
  async function reviewCode() {
    setLoading(true);
    setReview('');
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", { code });
      setReview(response.data);
    } catch (error) {
      setReview("❌ Failed to fetch review.");
    } finally {
      setLoading(false);
    }
  }

  // Extract the desired section from review (raw, review, or fix)
  function extractSection(type) {
    if (!review) return "";

    const reviewLines = review.split('\n');

    if (type === "fix") {
      const start = reviewLines.findIndex(line => line.trim().startsWith("✅"));
      const end = reviewLines.findIndex((line, i) => i > start && line.trim().startsWith("💡"));
      return start !== -1
        ? reviewLines.slice(start, end > -1 ? end : undefined).join('\n')
        : "⚠️ No suggested fix found.";
    }

    if (type === "review") {
      return review;
    }

    if (type === "raw") {
      return `\`\`\`js\n${code}\n\`\`\``;
    }

    return "";
  }

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      {/* Top Bar with Theme Toggle */}
      <div className="top-bar">
        <div className="app-title">🧠 CodeLens AI</div> {/* <-- your cool name here */}
        <div className="theme-toggle">
          <button onClick={toggleTheme}>
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>


      {/* Main Layout */}
      <main>
        {/* Left Panel: Code Editor */}
        <div className='left'>
          <div className='code'>
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
            padding={10}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 15,
              height: '100%',
              width: '100%',
              backgroundColor: darkMode ? '#0f172a' : '#f3f4f6', // ✨ pastel light background
              color: darkMode ? '#e2e8f0' : '#1e293b',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
          />

          </div>
          <div
            className={`review ${loading ? 'disabled' : ''}`}
            onClick={!loading ? reviewCode : null}
          >
            {loading ? 'Processing...' : 'Review'}
          </div>
        </div>

        {/* Right Panel: Output/Review */}
        <div className='right'>
          {loading ? (
            <div className="loader-container">
              <div className="loader"></div>
              <p className="loading-text">Analyzing code...</p>
            </div>
          ) : (
            <>
              {/* Mode Switch */}
              <div className="mode-toggle">
                <button
                  onClick={() => setMode("review")}
                  className={mode === "review" ? "active" : ""}
                >
                  Review
                </button>
                <button
                  onClick={() => setMode("fix")}
                  className={mode === "fix" ? "active" : ""}
                >
                  Fix
                </button>
              </div>

              {/* Render Markdown Output */}
              <div className="review-card">
                <Markdown rehypePlugins={[rehypeHighlight]}>
                  {extractSection(mode)}
                </Markdown>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

