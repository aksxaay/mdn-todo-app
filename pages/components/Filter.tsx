import React, { Dispatch, SetStateAction } from "react";
import { Types } from "../types";

interface FilterProps {
  name: Types.FilterType;
  isPressed: boolean;
  setFilter: Dispatch<SetStateAction<"All" | "Active" | "Completed">>;
}
export function Filter({ name, isPressed, setFilter }: FilterProps) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}
