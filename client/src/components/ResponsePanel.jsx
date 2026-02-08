function ResponsePanel({ response }) {
  if (!response.answer && response.resources.length === 0) {
    return null;
  }

  return (
    <section className="card">
      <div className="response-header">
        <h2>Response</h2>
        {response.requestId ? <span className="pill">{response.requestId}</span> : null}
      </div>
      <p>{response.answer}</p>
      <div>
        <h3>Resources</h3>
        <ul>
          {response.resources.length === 0 ? (
            <li>No matching resources found.</li>
          ) : (
            response.resources.map((resource) => (
              <li key={resource.id}>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  {resource.title} ({resource.type.toUpperCase()})
                </a>
                <p>{resource.description || ""}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}

export default ResponsePanel;
