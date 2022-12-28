import React from "react";
import { Form } from "react-bootstrap";
import { debounce } from "lodash";

export default function InputMenu({ callback }) {
  const isSearching = React.useRef(false);
  const inputRef = React.useRef(null);
  const [field, setField] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    const keydownListener = e => { 
      switch (e.key) {
        case "/":
          e.preventDefault();
          inputRef.current?.focus(); 
          break;
        case "Escape": 
          inputRef.current?.blur(); 
          setField("");
          isSearching.current = false;
          setSearchResults([]);
      }
    }
    window.addEventListener("keydown", keydownListener);
    return () => {
      window.removeEventListener("keydown");
    }
  }, [])

  const handleSearchDebounced = React.useCallback(
    debounce((q) => {
      fetch(`/api/search?q=${q}`)
        .then((res) => res.json())
        .then((data) => setSearchResults(isSearching.current ? data : []));
    }, 500),
    []
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    inputRef.current?.blur();
    if (field) { callback(field); }
    isSearching.current = false;
    setSearchResults([]);
  };

  return (
    <div
      className="row bg-red text-white w-100 mx-0"
      style={{ height: "2rem" }}
    >
      <div className="col-3 px-0">
        <Form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="bg-yellow w-100 border-1 px-2"
            style={{ height: "2rem", position: "relative" }}
            placeholder={`Symbol`}
            value={field}
            onChange={(event) => {
              const q = event.target.value.trim().toUpperCase();
              setField(q);
              if (q) {
                isSearching.current = true;
                handleSearchDebounced(q);
              } else {
                isSearching.current = false;
                setSearchResults([])
              }
            }}
          />
        </Form>
        {isSearching.current && searchResults.length > 0 && (
          <div
            className="bg-gray-dark col-3 position-absolute start-0"
            style={{
              top: "5.5rem",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            {searchResults.map(({ exchDisp, symbol, shortname }, i) => (
              <div
                key={i}
                className="hover-bg-gray d-flex"
                onClick={() => {
                  setField(symbol);
                  callback(symbol);
                  inputRef.current?.blur();
                  isSearching.current = false;
                  setSearchResults([])
                }}
              >
                <div className="col-2 py-1 px-2">{`${
                  symbol.length > 8 ? symbol.substring(0, 8) + "..." : symbol
                }`}</div>
                <div className="col-10 py-1 px-2 fw-light">{`${shortname} (${exchDisp})`}</div>
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
