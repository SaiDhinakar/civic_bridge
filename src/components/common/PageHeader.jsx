const PageHeader = ({ title, subtitle, children }) => {
    return (
      <section className="page-header">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        {children}
      </section>
    );
  };
  
  export default PageHeader;