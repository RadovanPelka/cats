import React from "react";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onClick: () => Promise<void>;
};

const FavoriteButton = ({ onClick, isFavorite }: FavoriteButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
