import React from "react";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Image
        src="/images/EILC1335.jpg"
        alt="Solar"
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default LandingPage;
