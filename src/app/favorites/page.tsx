"use client";
import {useGetFavourites} from "@/api/catsApi";
import Modal from "@/components/Modal";
import Image from "next/image";
import {useRouter, useSearchParams} from "next/navigation";
import Spinner from "@/components/Spinner";
import CatModalBody from "@/modals/CatBody";

export default function Favorites() {
  const {replace} = useRouter();
  const {get} = useSearchParams();

  const {data, isFetching, refetch: refetchFavorites} = useGetFavourites();

  const handleOpenModal = (breedId: string) => {
    const params = new URLSearchParams();

    params.append("catId", breedId);

    replace(`/favorites?${params.toString()}`);
  };

  const handleCloseModal = () => {
    replace(`/favorites`);
  };

  const catId = get("catId");

  return (
    <main>
      {catId && (
        <Modal onClose={handleCloseModal}>
          <CatModalBody
            catId={catId}
            favorite={data?.find((x) => x.image?.id === catId)}
            refetchFavorites={async () => {
              await refetchFavorites();
            }}
          />
        </Modal>
      )}

      {data?.length === 0 && isFetching && (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {data && data?.length !== 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {data.map((cat) => (
            <Image
              key={cat.id}
              onClick={() => {
                if (cat.image?.id) {
                  handleOpenModal(cat.image.id);
                }
              }}
              className="h-[300px] w-full max-w-full cursor-pointer rounded-lg object-cover transition-all duration-300 ease-in-out hover:scale-95"
              src={cat?.image?.url || ""}
              alt=""
              width={300}
              height={300}
            />
          ))}
        </div>
      )}
    </main>
  );
}
