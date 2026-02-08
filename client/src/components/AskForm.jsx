import { useState } from "react";

function AskForm({ onSubmit, onClear }) {
  const [query, setQuery] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ query: query.trim(), token: token.trim() });
  };

  const handleClear = () => {
    setQuery("");
    setToken("");
    onClear();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="query">Your question</label>
      <textarea
        id="query"
        name="query"
        rows={4}
        placeholder='e.g., "Explain RAG"'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        required
      />

      <label htmlFor="token">Supabase JWT</label>
      <input
        id="token"
        name="token"
        type="password"
        placeholder="Paste JWT for Authorization header"
        value={token}
        onChange={(event) => setToken(event.target.value)}
      />

      <div className="actions">
        <button type="submit">Ask Jiji</button>
        <button type="button" className="secondary" onClick={handleClear}>
          Clear
        </button>
      </div>
    </form>
  );
}

export default AskForm;
