import clsx from "clsx";
import React from "react";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onClick: () => Promise<void>;
  isDisabled?: boolean;
};

const FavoriteButton = ({onClick, isFavorite, isDisabled}: FavoriteButtonProps) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      onClick={onClick}
      className={clsx(
        "rounded bg-blue-500 px-4 py-2 font-bold text-white",
        "hover:bg-blue-700",
        "disabled:cursor-not-allowed disabled:opacity-50"
      )}
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
