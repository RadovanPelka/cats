import {BreedDetail} from "@/api/schemas";
import React from "react";
import Image from "next/image";
import StarIcon from "@/app/icons/StarIcon";

type CatDetailProps = {
  breed?: BreedDetail;
  imageUrl?: string;
  customComponent?: React.ReactNode;
  largeImage?: boolean;
};

const CatDetail = ({breed, imageUrl, customComponent, largeImage}: CatDetailProps) => {
  if (!breed && !imageUrl) return null;

  const imageSize = largeImage ? 400 : 200;

  return (
    <div className="mb-4 flex flex-row items-center space-x-4">
      {imageUrl && (
        <Image
          alt={breed?.name || "Cat"}
          width={imageSize}
          height={imageSize}
          className="min-h-[200px] rounded-lg object-cover"
          src={imageUrl}
        />
      )}
      <div>
        {breed && (
          <>
            <h2 className="mb-2 text-lg">
              {breed.name}, {breed.life_span} years
            </h2>
            <p className="text-xs">Intelligence</p>
            <div className="flex items-center">
              {Array(breed.intelligence)
                .fill(0)
                .map((_, i) => (
                  <StarIcon key={i} />
                ))}
              {breed.energy_level === 1 && "Super lazzzyy"}
            </div>
          </>
        )}
        {customComponent}
      </div>
    </div>
  );
};

export default CatDetail;
