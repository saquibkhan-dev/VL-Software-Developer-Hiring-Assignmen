import { useState } from "react";
import AskForm from "./components/AskForm.jsx";
import ResponsePanel from "./components/ResponsePanel.jsx";
import StatusBanner from "./components/StatusBanner.jsx";

const initialResponse = {
  requestId: "",
  answer: "",
  resources: []
};

function App() {
  const [response, setResponse] = useState(initialResponse);
  const [status, setStatus] = useState({ message: "", isError: false, visible: false });

  const reset = () => {
    setResponse(initialResponse);
    setStatus({ message: "", isError: false, visible: false });
  };

  const handleSubmit = async ({ query, token }) => {
    reset();

    if (!query) {
      setStatus({ message: "Please enter a question before submitting.", isError: true, visible: true });
      return;
    }

    setStatus({ message: "Submitting your question...", isError: false, visible: true });

    try {
      const result = await fetch("/ask-jiji", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ query })
      });

      const payload = await result.json();

      if (!result.ok) {
        setStatus({ message: payload.error || "Something went wrong.", isError: true, visible: true });
        return;
      }

      setResponse(payload);
      setStatus({ message: "Response received.", isError: false, visible: true });
    } catch (error) {
      setStatus({ message: "Network error. Please try again.", isError: true, visible: true });
    }
  };

  return (
    <main className="container">
      <header>
        <p className="eyebrow">Learn with Jiji</p>
        <h1>Ask Jiji</h1>
        <p className="subtitle">
          Submit a learning question, fetch curated resources, and receive a structured response.
        </p>
      </header>

      <section className="card">
        <AskForm onSubmit={handleSubmit} onClear={reset} />
      </section>

      <ResponsePanel response={response} />

      <StatusBanner status={status} />
    </main>
  );
}

export default App;
