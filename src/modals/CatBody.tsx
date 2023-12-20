import {
  useDeleteFavouritesFavouriteId,
  useGetImages,
  usePostFavourites,
} from "@/api/catsApi";
import FavoriteButton from "@/components/FavoriteButton";
import Spinner from "@/components/Spinner";
import CatDetail from "@/components/cat-detail/CatDetail";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

type ModalBodyProps = {
  catId: string;
  isFavorite: boolean;
  refetchFavorites: () => Promise<void>;
};

const CatModalBody = ({
  catId,
  isFavorite,
  refetchFavorites,
}: ModalBodyProps) => {
  const { data, isFetching } = useGetImages({
    imageId: catId,
  });

  const { mutateAsync: addToFavorite } = usePostFavourites();
  const { mutateAsync: deleteFavorite } = useDeleteFavouritesFavouriteId();

  const breeds = data?.breeds || [];
  const breed = breeds[0];

  if (isFetching) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className={clsx(!breed && "w-full flex justify-center")}>
      <CatDetail
        breed={breed}
        imageUrl={data?.url}
        largeImage={!breed}
        customComponent={
          <div className="flex space-x-4 mt-4">
            {breed && (
              <Link href={`/breeds?breedId=${breed.id}`}>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Show breed info
                </button>
              </Link>
            )}
            <FavoriteButton
              isFavorite={isFavorite}
              onClick={async () => {
                if (isFavorite) {
                  await deleteFavorite({ favouriteId: catId });
                } else {
                  await addToFavorite({
                    data: { image_id: catId, user_id: "test" },
                  });
                }
                await refetchFavorites();
              }}
            />
          </div>
        }
      />
    </div>
  );
};

export default CatModalBody;
