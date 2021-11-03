import React from "react";
import { Form } from "react-bootstrap";

export default function InputMenu({ callback }) {
  const [field, setField] = React.useState("");
  const [search, setSearch] = React.useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (field) {
      callback(field);
    }
    setField("");
  };

  React.useEffect(() => {
    if (field) {
      fetch(`/api/search?q=${field}`)
        .then((res) => res.json())
        .then(setSearch);
    } else {
      setSearch([]);
    }
  }, [field]);

  return (
    <div
      className="row bg-red text-white w-100 mx-0"
      style={{ height: "2rem" }}
    >
      <div className="col-3 px-0">
        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            className="bg-yellow w-100 border-1 px-2"
            style={{ height: "2rem", position: "relative" }}
            placeholder={`Symbol`}
            value={field}
            onChange={(event) =>
              setField(event.target.value.trim().toUpperCase())
            }
          />
        </Form>
        {!!search.length && (
          <div
            className="bg-gray-dark w-100"
            style={{
              position: "absolute",
              top: "2rem",
              left: 0,
              zIndex: "50",
              cursor: "pointer",
            }}
          >
            {search.map(({ exchDisp, symbol, shortname }, i) => (
              <div
                key={i}
                className="hover-bg-gray"
                style={{ display: "flex" }}
                onClick={() => {
                  setField(symbol);
                  callback(symbol);
                  setField("");
                }}
              >
                <div className="col-3 py-1">{`${
                  symbol.length > 8 ? symbol.substring(0, 8) + "..." : symbol
                }`}</div>
                <div className="col-9 py-1 fw-light">{`${shortname} (${exchDisp})`}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="col-2 px-0">
        <button className="w-100 bg-red text-white" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="col-7 px-2">
        <div className="w-100 h-100 d-flex flex-row-reverse align-items-center">
          GPC Candle Chart
        </div>
      </div>
    </div>
  );
}
