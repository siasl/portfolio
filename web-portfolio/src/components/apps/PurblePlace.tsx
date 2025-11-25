import React, { useState, useEffect } from 'react';

interface Card {
    id: number;
    icon: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const ICONS = ['🍀', '🍄', '🍰', '🏠', '🚗', '🎈', '🎁', '💎'];

const PurblePlace: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [isWon, setIsWon] = useState(false);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const shuffledIcons = [...ICONS, ...ICONS]
            .sort(() => Math.random() - 0.5)
            .map((icon, index) => ({
                id: index,
                icon,
                isFlipped: false,
                isMatched: false,
            }));
        setCards(shuffledIcons);
        setFlippedCards([]);
        setMoves(0);
        setIsWon(false);
    };

    const handleCardClick = (id: number) => {
        if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

        const newCards = [...cards];
        newCards[id].isFlipped = true;
        setCards(newCards);

        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            const [firstId, secondId] = newFlipped;
            if (newCards[firstId].icon === newCards[secondId].icon) {
                newCards[firstId].isMatched = true;
                newCards[secondId].isMatched = true;
                setCards(newCards);
                setFlippedCards([]);
                if (newCards.every(c => c.isMatched)) {
                    setIsWon(true);
                }
            } else {
                setTimeout(() => {
                    const resetCards = [...cards];
                    resetCards[firstId].isFlipped = false;
                    resetCards[secondId].isFlipped = false;
                    setCards(resetCards);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    return (
        <div className="h-full bg-[#90ee90] p-4 flex flex-col items-center justify-center font-comic relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)', backgroundSize: '20px 20px' }}
            />

            <div className="bg-white/80 p-2 rounded-lg shadow-md mb-4 flex gap-4 text-xl font-bold text-[#d34646] z-10">
                <span>Moves: {moves}</span>
                <button
                    onClick={initializeGame}
                    className="bg-[#3c7fb1] text-white px-2 rounded-sm text-sm hover:bg-[#2c5f85] transition-colors"
                >
                    Restart
                </button>
            </div>

            <div className="grid grid-cols-4 gap-2 z-10">
                {cards.map(card => (
                    <button
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-lg shadow-md text-3xl md:text-4xl flex items-center justify-center transition-all duration-300 transform ${card.isFlipped || card.isMatched ? 'bg-white rotate-y-180' : 'bg-gradient-to-br from-[#d34646] to-[#8b0000] hover:scale-105'}`}
                        disabled={card.isMatched}
                    >
                        {(card.isFlipped || card.isMatched) ? card.icon : <span className="text-white text-2xl">?</span>}
                    </button>
                ))}
            </div>

            {isWon && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-xl shadow-2xl text-center animate-bounce">
                        <h2 className="text-4xl font-bold text-[#d34646] mb-4">You Won!</h2>
                        <p className="text-xl mb-4">Moves: {moves}</p>
                        <button
                            onClick={initializeGame}
                            className="bg-[#3c7fb1] text-white px-6 py-2 rounded-full font-bold hover:bg-[#2c5f85] transition-colors shadow-lg"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurblePlace;
