"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { ChevronDown } from "lucide-react";

/**
 * Shared listbox select for the inquiry modal and the contact form.
 *
 * Both surfaces previously carried their own near-identical copy of this, and
 * both were incomplete in the same ways: ArrowUp, Home, and End did nothing,
 * there was no `aria-activedescendant` or `aria-controls`, and the options were
 * `<button>`s, which is the wrong role inside a listbox and made every option a
 * separate tab stop.
 *
 * This follows the APG listbox pattern with `aria-activedescendant`: DOM focus
 * moves to the listbox itself when it opens, and the arrow keys move an active
 * index that the listbox points at. The options are `<li role="option">` and are
 * deliberately not focusable, which is what makes the whole list one tab stop
 * instead of six.
 *
 * Styling is passed in rather than baked here, so each surface keeps its own
 * look while the behaviour stays in one place. If a third select appears, use
 * this one; do not copy it again.
 */
type OptionState = { selected: boolean; active: boolean };

export default function SelectField({
  label,
  labelSuffix,
  value,
  placeholder,
  options,
  onChange,
  labelClassName = "",
  triggerClassName = "",
  valueClassName = "",
  listboxClassName = "",
  optionClassName,
  chevronClassName = "",
}: {
  label: string;
  labelSuffix?: ReactNode;
  value: string;
  placeholder: string;
  options: readonly string[];
  onChange: (value: string) => void;
  labelClassName?: string;
  triggerClassName?: string;
  valueClassName?: string;
  listboxClassName?: string;
  optionClassName: (state: OptionState) => string;
  chevronClassName?: string;
}) {
  const reactId = useId();
  const labelId = `${reactId}-label`;
  const valueId = `${reactId}-value`;
  const listboxId = `${reactId}-listbox`;
  const optionId = (index: number) => `${reactId}-option-${index}`;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const typeahead = useRef({ buffer: "", timer: 0 });

  const selectedIndex = options.indexOf(value);
  const lastIndex = options.length - 1;

  function openList(index: number) {
    setActiveIndex(index);
    setOpen(true);
  }

  function closeList({ returnFocus = true } = {}) {
    setOpen(false);
    setActiveIndex(-1);
    if (returnFocus) triggerRef.current?.focus();
  }

  function commit(index: number) {
    const option = options[index];
    if (option === undefined) return;
    onChange(option);
    closeList();
  }

  // Focus the listbox itself; `aria-activedescendant` carries the active option,
  // so the options never take DOM focus.
  useEffect(() => {
    if (open) listboxRef.current?.focus();
  }, [open]);

  // Keep the active option in view when arrowing past the visible edge.
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  useEffect(() => {
    const timers = typeahead.current;
    return () => window.clearTimeout(timers.timer);
  }, []);

  /** First-letter jump, the way a native select behaves. */
  function runTypeahead(key: string) {
    const state = typeahead.current;
    window.clearTimeout(state.timer);
    state.buffer += key.toLowerCase();
    state.timer = window.setTimeout(() => {
      state.buffer = "";
    }, 600);

    const match = options.findIndex((option) =>
      option.toLowerCase().startsWith(state.buffer),
    );
    if (match >= 0) setActiveIndex(match);
  }

  function onTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openList(selectedIndex >= 0 ? selectedIndex : 0);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      openList(selectedIndex >= 0 ? selectedIndex : lastIndex);
    }
  }

  function onListboxKeyDown(event: ReactKeyboardEvent<HTMLUListElement>) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((current) => Math.min(current + 1, lastIndex));
        return;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((current) => Math.max(current - 1, 0));
        return;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        return;
      case "End":
        event.preventDefault();
        setActiveIndex(lastIndex);
        return;
      case "Enter":
      case " ":
        event.preventDefault();
        commit(activeIndex);
        return;
      case "Escape":
        event.preventDefault();
        closeList();
        return;
      case "Tab":
        // Let focus leave naturally, but do not leave an orphaned popup behind.
        closeList({ returnFocus: false });
        return;
      default:
        if (event.key.length === 1 && !event.metaKey && !event.ctrlKey) {
          runTypeahead(event.key);
        }
    }
  }

  return (
    <div
      className="relative block min-w-0"
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (!next || !event.currentTarget.contains(next as Node)) {
          setOpen(false);
          setActiveIndex(-1);
        }
      }}
    >
      <span id={labelId} className={labelClassName}>
        {label}
        {labelSuffix}
      </span>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-labelledby={`${labelId} ${valueId}`}
        onClick={() =>
          open ? closeList({ returnFocus: false }) : openList(
            selectedIndex >= 0 ? selectedIndex : 0,
          )
        }
        onKeyDown={onTriggerKeyDown}
        className={triggerClassName}
      >
        <span id={valueId} className={valueClassName}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`${chevronClassName} ${open ? "rotate-180" : ""}`}
          strokeWidth={1.8}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={labelId}
          aria-activedescendant={
            activeIndex >= 0 ? optionId(activeIndex) : undefined
          }
          onKeyDown={onListboxKeyDown}
          className={`${listboxClassName} focus:outline-none`}
        >
          {options.map((option, index) => {
            const selected = value === option;
            const active = activeIndex === index;
            return (
              <li
                key={option}
                id={optionId(index)}
                role="option"
                aria-selected={selected}
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => commit(index)}
                className={optionClassName({ selected, active })}
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
