import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error("Network error");

      const data = await res.json();
      console.log("API response:", data);

      setResponse(data.choices?.[0]?.message?.content || "No response");
      console.table(data);
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>Chat with GPT</h1>
      <textarea
        rows="4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        disabled={loading}
      />
      <br />
      <button onClick={handleSend} disabled={!input.trim() || loading}>
        {loading ? "Sending..." : "Send"}
      </button>
      <pre>{response}</pre>
    </div>
  );
}

export default App;
