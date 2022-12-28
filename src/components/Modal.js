import "../modal.css";

export const Modal = ({ handleClose, show, poke }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <p>Name: {poke.name}</p>
        <p>Number: {poke.id}</p>
        <p>Height: {poke.height}</p>
        <p>Weight: {poke.weight}</p>
        {poke.sprites && poke.sprites.front_default && (
          <div ClassName="img-container">
            <img
              src={poke.sprites.front_default}
              alt="pokemon"
              width="150"
              height="150"
            ></img>
          </div>
        )}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};
