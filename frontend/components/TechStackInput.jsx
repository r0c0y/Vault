import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { TECH_STACKS } from '../lib/constants';



export default function TechStackInput({ value = [], onChange, label, placeholder }) {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setInput(val);
        if (val.trim()) {
            const lowerVal = val.toLowerCase();
            const filtered = TECH_STACKS.filter(s =>
                s.includes(lowerVal) &&
                !value.includes(s)
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const addTech = (tech) => {
        const lowerTech = tech.toLowerCase().trim();
        if (lowerTech && !value.includes(lowerTech)) {
            onChange([...value, lowerTech]);
            setInput('');
            setShowSuggestions(false);
        }
    };

    const removeTech = (techToRemove) => {
        onChange(value.filter(tech => tech !== techToRemove));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (input.trim()) {
                addTech(input);
            }
        } else if (e.key === 'Backspace' && !input && value.length > 0) {
            removeTech(value[value.length - 1]);
        }
    };

    return (
        <div className="w-full" ref={wrapperRef}>
            {label && (
                <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">
                    {label}
                </label>
            )}
            <div className="bg-surface border border-border rounded-xl px-3 py-2 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all duration-200 min-h-[50px] flex flex-wrap gap-2">
                {value.map((tech, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-sm border border-primary/20 animate-in fade-in zoom-in duration-200">
                        {tech}
                        <button
                            type="button"
                            onClick={() => removeTech(tech)}
                            className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                        >
                            <X size={12} />
                        </button>
                    </span>
                ))}
                <div className="relative flex-1 min-w-[120px]">
                    <input
                        type="text"
                        className="w-full bg-transparent border-none outline-none text-text-primary placeholder:text-text-secondary/50 h-8"
                        placeholder={value.length === 0 ? placeholder : ""}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => input.trim() && setShowSuggestions(true)}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 mt-2 w-full bg-card border border-border rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto">
                            {suggestions.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    className="w-full text-left px-4 py-2 text-text-secondary hover:bg-surface hover:text-text-primary transition-colors"
                                    onClick={() => addTech(suggestion)}
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <p className="text-xs text-text-secondary mt-1.5 ml-1">
                Press Enter to add a tag. Tags are automatically converted to lowercase.
            </p>
        </div>
    );
}
