import React from "react";
import { Dropdown } from "react-bootstrap";

export default function Select({ selected, setSelected, options }) {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
        {selected}
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        {options.map((option, i) => (
          <Dropdown.Item
            key={i}
            onSelect={() => setSelected(option)}
            active={selected === option}
          >
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
