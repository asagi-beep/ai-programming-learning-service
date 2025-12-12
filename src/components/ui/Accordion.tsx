"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/contexts/ThemeContext";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function AccordionItem({ question, answer, isOpen, onClick, index }: AccordionItemProps) {
  const { theme } = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`
        border rounded-xl overflow-hidden
        transition-all duration-300 ease-out
        ${theme === "dark"
          ? isOpen
            ? "border-primary-green/30 shadow-glow-green"
            : "border-dark-border hover:border-white/20"
          : isOpen
            ? "border-emerald-300 shadow-lg shadow-emerald-100"
            : "border-gray-200 hover:border-gray-300"
        }
      `}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        onClick={onClick}
        className={`
          w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between
          text-left transition-colors duration-300
          ${theme === "dark"
            ? isOpen
              ? "bg-white/5"
              : "bg-dark-card hover:bg-white/5"
            : isOpen
              ? "bg-emerald-50"
              : "bg-white hover:bg-gray-50"
          }
        `}
        aria-expanded={isOpen}
      >
        <span className={`font-semibold pr-4 text-sm sm:text-base ${
          theme === "dark"
            ? isOpen ? "text-primary-green" : "text-white"
            : isOpen ? "text-emerald-600" : "text-gray-900"
        }`}>
          {question}
        </span>
        <ChevronDownIcon
          className={`
            w-5 h-5 flex-shrink-0 transition-transform duration-300
            ${isOpen ? "rotate-180" : ""}
            ${theme === "dark"
              ? isOpen ? "text-accent-yellow" : "text-white/60"
              : isOpen ? "text-amber-500" : "text-gray-400"
            }
          `}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ height }}
      >
        <div
          ref={contentRef}
          className={`px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base leading-relaxed ${
            theme === "dark"
              ? "text-white/70 bg-dark-card/50"
              : "text-gray-600 bg-gray-50/50"
          }`}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
  openStates: Record<number, boolean>;
  onToggle: (index: number) => void;
}

export default function Accordion({ items, openStates, onToggle }: AccordionProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={!!openStates[index]}
          onClick={() => onToggle(index)}
          index={index}
        />
      ))}
    </div>
  );
}

