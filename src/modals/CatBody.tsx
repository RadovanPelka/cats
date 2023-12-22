import {useDeleteFavouritesFavouriteId, useGetImages, usePostFavourites} from "@/api/catsApi";
import {GetFavourites200} from "@/api/schemas";
import FavoriteButton from "@/components/FavoriteButton";
import Spinner from "@/components/Spinner";
import CatDetail from "@/components/cat-detail/CatDetail";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

type ModalBodyProps = {
  catId: string;
  favorite?: GetFavourites200[0];
  refetchFavorites: () => Promise<void>;
  isFetchingFavorites?: boolean;
};

const CatModalBody = ({catId, favorite, refetchFavorites, isFetchingFavorites}: ModalBodyProps) => {
  const {data, isFetching} = useGetImages({
    imageId: catId,
  });

  const {mutateAsync: addToFavorite, isPending: isPendingAdding} = usePostFavourites();
  const {mutateAsync: deleteFavorite, isPending: isPendingRemoving} =
    useDeleteFavouritesFavouriteId();

  const breeds = data?.breeds || [];
  const breed = breeds[0];

  if (isFetching) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const isUpdatingFavorite = isPendingAdding || isPendingRemoving || isFetchingFavorites;

  const handleClickOnFavoriteButton = async () => {
    if (isUpdatingFavorite) {
      return;
    }

    if (favorite?.id) {
      await deleteFavorite({favouriteId: favorite?.id});
    } else {
      await addToFavorite({
        data: {image_id: catId, user_id: "test"},
      });
    }
    await refetchFavorites();
  };

  return (
    <div className={clsx(!breed && "flex w-full justify-center")}>
      <CatDetail
        breed={breed}
        imageUrl={data?.url}
        largeImage={!breed}
        customComponent={
          <div className="mt-4 flex space-x-4">
            {breed && (
              <Link href={`/breeds?breedId=${breed.id}`}>
                <button
                  type="button"
                  className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Show breed info
                </button>
              </Link>
            )}
            <FavoriteButton
              isFavorite={Boolean(favorite)}
              onClick={handleClickOnFavoriteButton}
              isDisabled={isUpdatingFavorite}
            />
          </div>
        }
      />
    </div>
  );
};

export default CatModalBody;
