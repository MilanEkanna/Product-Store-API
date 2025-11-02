// This is our Product details page component.




const renderStars = (rate) => {
    const fullStars = Math.floor(rate); // Math.floor(4.3) → 4, gives the number of complete (filled) stars.
    const hasHalf = rate % 1 >= 0.5; // Check if there's a half star, // 4.3 % 1 = 0.3 → 0.3 >= 0.5? → false
    const stars = [];

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<span key={i} className="text-yellow-400">★</span>);
        } else if (i === fullStars && hasHalf) {
            stars.push(<span key={i} className="text-yellow-400">★</span>); // Simplified half-star
        } else {
            stars.push(<span key={i} className="text-gray-300">☆</span>);
        }
    }
    return <span className="inline-flex">{stars}</span>;
};

