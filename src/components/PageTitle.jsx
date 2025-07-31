function PageTitle({ children }) {
  return (
    <div className="page-title">
      <h2>{children}</h2>
      <div className="divider"></div>
    </div>
  );
}

export default PageTitle;
