import React from "react";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Image
        src="/images/picTen.jpeg"
        alt="Solar"
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default LandingPage;
