function Star({ filled, size = 14, onClick, className = '' }) {
  return (
    <svg
      onClick={onClick}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? '#F5B301' : 'none'}
      stroke="#F5B301"
      strokeWidth="1.5"
      className={className}
    >
      <polygon points="12 2 15 9 22 9.5 16.5 14.3 18.5 21.5 12 17.5 5.5 21.5 7.5 14.3 2 9.5 9 9" />
    </svg>
  );
}

export function StarRating({ rating = 0, size = 14 }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} filled={i <= Math.round(rating)} />
      ))}
    </span>
  );
}

export function StarPicker({ value, onChange }) {
  return (
    <div className="flex gap-1.5 my-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={26}
          filled={i <= value}
          onClick={() => onChange(i)}
          className="cursor-pointer transition"
        />
      ))}
    </div>
  );
}
