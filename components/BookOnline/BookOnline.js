"use client";
import { useEffect, useState } from "react";
import Button from "../Button";
import Image from "next/image";

const BookOnline = ({ title, description, imageUrl, href }) => {
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
    <div className="m-4 bg-white text-center w-600px h-600px">
      <Image
        src={imageUrl}
        alt={title}
        className="h-3/5"
        width={600}
        height={360}
      />
      <div className="text-custom-gray p-4">
        <h2 className="pt-2 text-2xl">{title}</h2>
        <hr style={{ width: "5%", borderColor: "#333", margin: "15px auto" }} />
        <p className="mt-2">{description}</p>
        <Button type="primary" onClick={onClick}>
          BOOK NOW
        </Button>
      </div>
    </div>
  );
};

export default BookOnline;
