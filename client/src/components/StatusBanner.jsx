function StatusBanner({ status }) {
  if (!status.visible) {
    return null;
  }

  return (
    <section className={`card status${status.isError ? " error" : ""}`}>
      <p>{status.message}</p>
    </section>
  );
}

export default StatusBanner;
