import { NavLink, Outlet } from "react-router-dom";
import ReactModal from "react-modal";
import { useState } from "react";

function Layout() {
  const [modalopen, setisopenmodal] = useState(false);
  const [pomoInput, setpomoInput] = useState(0);
  const [pomochange, setchange] = useState(0);

  const [breakinput, setbreakinput] = useState(0);
  const [brechange, setbrechange] = useState(0);

  const handlePomoInput = (e) => {
    setpomoInput(e.target.value);
  };

  const handleBreakInput = (e) => {
    setbreakinput(e.target.value);
  };

  const handlechanges = () => {
    setchange(pomoInput);
    setbrechange(breakinput);
    localStorage.setItem("setpomo", pomoInput.toString());
    localStorage.setItem("localbreak", breakinput.toString());
    Closemodal();
  };
  const handlereset = () => {
    setbrechange(0);
    setchange(0);
    localStorage.clear();
  };

  const Openmodal = () => {
    setisopenmodal(true);
  };
  const Closemodal = () => {
    setisopenmodal(false);
  };

  const stylehead = {
    fontSize: 18,
    background: "rgb(212 49 49)",
  };
  const stylehead2 = {
    fontSize: 18,
    background: "rgb(38 131 76)",
  };
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Set the desired background color of the modal overlay
    },
    content: {
      width: "410px", // Set the desired width of the modal
      height: "316px", // Set the desired width of the modal
      margin: "auto",
      backgroundColor: "#05000fe0",
      border: "none",
      color: "white",
      borderRadius: "25px",
    },
  };
  // console.log(pomoInput);
  // console.log(pomochange);
  return (
    <div className="main-container" style={{ width: 500, height: 500 }}>
      <header>
        <div className="navlink-container">
          <NavLink
            to="."
            style={({ isActive }) => (isActive ? stylehead2 : null)}
          >
            Pomodoro
          </NavLink>
          <NavLink
            to="break"
            style={({ isActive }) => (isActive ? stylehead : null)}
          >
            Break
          </NavLink>
        </div>

        <div className="setting-container">
          <button className="btn-setting" onClick={Openmodal}>
            <i className="fa-solid fa-gear"></i>
          </button>
          <ReactModal
            isOpen={modalopen}
            onRequestClose={Closemodal}
            contentLabel="Popup Modal"
            style={customStyles}
            ariaHideApp={false}
          >
            <div className="box-setting">
              <div className="boxxx">
                <button className="btn-close" onClick={Closemodal}>
                  <i className="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <div className="seth1">
                  <div style={{ textAlign: "center" }}>
                    <label>Pomodoro</label>
                    <input
                      className="first-input"
                      type="number"
                      min={1}
                      max={90}
                      onChange={handlePomoInput}
                      value={pomoInput}
                    />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <label>Break</label>
                    <input
                      type="number"
                      min={1}
                      max={90}
                      onChange={handleBreakInput}
                      value={breakinput}
                      className="sec-input"
                    />
                  </div>
                </div>
              </div>
              <div
                className="box-container"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <button className="btn-reset" onClick={handlereset}>
                  reset all
                </button>
                <div style={{ display: "flex" }}>
                  <button className="btn-close-box" onClick={Closemodal}>
                    close
                  </button>
                  <button onClick={handlechanges} className="btn-save">
                    save changes
                  </button>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
      </header>
      <main>
        <Outlet context={{ pomochange, brechange }} />
      </main>
    </div>
  );
}

export default Layout;
