// HOC - hiegher Order Component

// -- normal component
const Info = props => (
  <div>
    <h2>Info of Company</h2>
    <p>{props.info}</p>
  </div>
);

// -- HOC component
const requireAuthentication = WrappedComponent => {
  return props => (
    <div>
      <h1>HOC Auth Component</h1>
      {props.authenticated}
      {props.authenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>You are not authenticated</p>
      )}
    </div>
  );
};

// build HOC react component
const AuthInfo = requireAuthentication(Info);

// finally render to screen
ReactDOM.render(
  <AuthInfo authenticated={false} info="some private info" />,
  document.getElementById("app")
);
