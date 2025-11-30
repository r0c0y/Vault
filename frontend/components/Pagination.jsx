import React from 'react';
import Button from './Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 ${currentPage === i
                            ? 'bg-white text-black shadow-glow scale-105'
                            : 'bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-primary/30'
                        }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-12">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-xl w-10 h-10 border border-border bg-surface disabled:opacity-50"
            >
                <ChevronLeft size={20} />
            </Button>

            <div className="flex items-center gap-2">
                {renderPageNumbers()}
            </div>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-xl w-10 h-10 border border-border bg-surface disabled:opacity-50"
            >
                <ChevronRight size={20} />
            </Button>
        </div>
    );
}
