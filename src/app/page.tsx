"use client";
import { useGetFavourites, useGetImagesSearch } from "@/api/catsApi";
import { GetImagesSearch200 } from "@/api/schemas";
import Modal from "@/components/Modal";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import CatModalBody from "@/modals/CatBody";

const INITIAL_CATS_TO_SHOW = 10; // api accepts 1 or 10 values only without token

export default function Home() {
  const [cats, setCats] = useState<GetImagesSearch200>([]);
  const { replace } = useRouter();
  const { get } = useSearchParams();

  const { data, refetch, isFetching } = useGetImagesSearch({
    limit: INITIAL_CATS_TO_SHOW,
  });
  const { data: favorites, refetch: refetchFavorites } = useGetFavourites();

  useEffect(() => {
    data && setCats((prev) => [...prev, ...data]);
  }, [data]);

  const handleLoadMore = async () => {
    await refetch();

    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 300);
  };

  const handleOpenModal = (catId: string) => {
    const params = new URLSearchParams();

    params.append("catId", catId);

    replace(`/?${params.toString()}`);
  };

  const handleCloseModal = () => {
    replace(`/`);
  };

  const catId = get("catId");

  return (
    <main>
      {catId && (
        <Modal onClose={handleCloseModal}>
          <CatModalBody
            catId={catId}
            isFavorite={Boolean(favorites?.find((x) => x.image?.id === catId))}
            refetchFavorites={async () => {
              await refetchFavorites();
            }}
          />
        </Modal>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cats.map((cat) => (
          <Image
            key={cat.id}
            onClick={() => handleOpenModal(cat.id)}
            className="h-[300px] w-full object-cover max-w-full rounded-lg hover:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
            src={cat.url}
            alt=""
            width={300}
            height={300}
          />
        ))}

        {isFetching &&
          Array(INITIAL_CATS_TO_SHOW)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                role="status"
                className="animate-pulse md:flex md:items-center"
              >
                <div className="flex items-center justify-center w-full h-[300px] bg-gray-300 rounded">
                  <svg
                    className="w-10 h-10 text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isFetching}
          aria-disabled={isFetching}
          onClick={handleLoadMore}
        >
          {isFetching ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <p>Load more</p>
          )}
        </button>
      </div>
    </main>
  );
}
