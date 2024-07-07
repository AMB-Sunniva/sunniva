"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../Button";

const AddOnCard = ({ title, description, imageUrl, href }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onClick = () => {
    if (isClient) {
      window.open(href, "_blank", "noopener noreferrer");
    }
  };

  return (
    <div className="m-4 bg-white text-center w-600px">
      <Image
        src={imageUrl}
        alt={title}
        width={300}
        height={300}
        className="w-full h-auto"
      />
      <div className="text-custom-gray p-4">
        <h2 className="pt-2 text-2xl">{title}</h2>
        <hr style={{ width: "5%", borderColor: "#333", margin: "15px auto" }} />
        <p className="mt-2">{description}</p>
        <Button type="primary" onClick={onClick}>
          LEARN MORE
        </Button>
      </div>
    </div>
  );
};

export default AddOnCard;
