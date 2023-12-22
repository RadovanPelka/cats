"use client";
import {useGetBreeds, useGetImagesSearch} from "@/api/catsApi";
import {BreedDetail, GetBreeds200} from "@/api/schemas";
import Modal from "@/components/Modal";
import clsx from "clsx";
import Image from "next/image";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import StarIcon from "../icons/StarIcon";
import CatDetail from "@/components/cat-detail/CatDetail";
import Spinner from "@/components/Spinner";
import Link from "next/link";

type ModalBodyProps = {
  breedId: string;
  breed: BreedDetail;
};

const ModalBody = ({breedId, breed}: ModalBodyProps) => {
  const {data} = useGetImagesSearch({
    breed_ids: breedId,
  });

  return (
    <div>
      <CatDetail breed={breed} imageUrl={breed.image?.url} />

      <h3 className="mb-2 text-sm">Photos</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data?.map((cat) => (
          <Link href={`/?catId=${cat.id}`} key={cat.id}>
            <Image
              key={cat.id}
              className="h-[200px] w-full max-w-full cursor-pointer rounded-lg object-cover transition-all duration-300 ease-in-out hover:scale-95"
              src={cat.url}
              alt=""
              width={200}
              height={200}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function Breeds() {
  const [breeds, setBreeds] = useState<GetBreeds200>([]);
  const {replace} = useRouter();
  const {get} = useSearchParams();

  const {data, refetch, isFetching} = useGetBreeds();

  useEffect(() => {
    data && setBreeds((prev) => [...prev, ...data]);
  }, [data]);

  const handleOpenModal = (breedId: string) => {
    const params = new URLSearchParams();

    params.append("breedId", breedId);

    replace(`/breeds?${params.toString()}`);
  };

  const handleCloseModal = () => {
    replace(`/breeds`);
  };

  const breedId = get("breedId");
  const breedDetail = breedId && breeds.find((breed) => breed.id === breedId);

  return (
    <main>
      {breedDetail && (
        <Modal onClose={handleCloseModal}>
          <ModalBody breedId={breedId} breed={breedDetail} />
        </Modal>
      )}

      {breeds.length === 0 && isFetching && (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {breeds.length !== 0 && (
        <div className="relative overflow-hidden bg-white shadow-md sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="whitespace-nowrap px-4 py-3 text-center">
                    User
                  </th>
                  <th scope="col" className="whitespace-nowrap px-4 py-3 text-center">
                    Origin
                  </th>
                  <th scope="col" className="whitespace-nowrap px-4 py-3 text-center">
                    Intelligence
                  </th>
                  <th scope="col" className="whitespace-nowrap px-4 py-3 text-center">
                    Life span
                  </th>
                  <th scope="col" className="whitespace-nowrap px-4 py-3 text-center">
                    Energy level
                  </th>
                  <th scope="col" className="whitespace-nowrap px-4 py-3 text-center">
                    Weight
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Wikipedia
                  </th>
                </tr>
              </thead>
              <tbody>
                {breeds.map((breed) => (
                  <tr
                    key={breed.id}
                    onClick={() => handleOpenModal(breed.id)}
                    className="border-b hover:bg-gray-100"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                    >
                      <div className="flex items-center">
                        {breed.image?.url && (
                          <Image
                            src={breed.image?.url}
                            alt="iMac Front Image"
                            className="mr-3 h-14 w-14 rounded-full"
                            width={32}
                            height={32}
                          />
                        )}
                        {breed.name}
                      </div>
                    </th>
                    <td className="px-4 py-2 text-center">{breed.origin}</td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      <div className="flex items-center justify-center">
                        {Array(breed.intelligence)
                          .fill(0)
                          .map((_, i) => (
                            <StarIcon key={i} />
                          ))}
                        {breed.energy_level === 1 && "Super lazzzyy"}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center">
                      {breed.life_span} years
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      <div className="flex items-center justify-center">
                        {Array(breed.energy_level)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className={clsx(
                                "mr-1 h-3 w-3 rounded-full",
                                breed.energy_level >= 4 && "bg-green-500",
                                breed.energy_level <= 3 && "bg-orange-500",
                                breed.energy_level <= 2 && "bg-red-500"
                              )}
                            ></div>
                          ))}
                        {breed.energy_level === 1 && "Super lazzzyy"}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center">
                      <div className="flex flex-col text-sm">
                        <p className="text-xs">{breed.weight.metric} kg</p>
                        <p className="text-xs">{breed.weight.imperial} lbs</p>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-2">
                      <a
                        target="_blank"
                        className="flex items-center space-x-2 whitespace-nowrap underline transition hover:text-gray-900"
                        href={breed.wikipedia_url}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M6.563.75C3.352.75.75 3.375.75 6.563a5.811 5.811 0 0 0 5.813 5.812c3.187 0 5.812-2.602 5.812-5.813C12.375 3.376 9.75.75 6.562.75Zm3.82 2.695a4.818 4.818 0 0 1 1.125 3.094c-.164-.047-1.805-.375-3.445-.164-.141-.328-.258-.61-.446-.984 1.852-.75 2.672-1.805 2.766-1.946Zm-.54-.586C9.75 3 9 4.008 7.244 4.664c-.821-1.5-1.712-2.719-1.852-2.906a4.972 4.972 0 0 1 4.453 1.101ZM4.43 2.086A28.23 28.23 0 0 1 6.28 4.969c-2.32.61-4.36.61-4.593.586a5.03 5.03 0 0 1 2.742-3.47Zm-2.836 4.5v-.164c.21.023 2.625.047 5.086-.703.164.281.28.562.422.843-1.805.516-3.446 1.97-4.243 3.329a4.873 4.873 0 0 1-1.265-3.305ZM3.492 10.5c.54-1.055 1.946-2.438 3.938-3.117a19.382 19.382 0 0 1 1.054 3.773 4.965 4.965 0 0 1-4.992-.656Zm5.836.188c-.047-.282-.328-1.735-.96-3.54 1.546-.234 2.905.165 3.093.211a5.06 5.06 0 0 1-2.133 3.329Z" />
                        </svg>
                        <p>Wikipedia</p>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
