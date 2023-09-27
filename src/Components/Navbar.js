import '../index.css';

const Navbar = (props) => {
  return (
    <div>
      <div className="Nav_bar">
        <span>TODO List</span>
      </div>
      <div className="Reset">
        <button onClick={props.resetList}>RESET LIST</button>
      </div>
    </div>
  );
};

export default Navbar;
