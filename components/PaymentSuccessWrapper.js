// components/PaymentSuccessWrapper.js
import React, { Suspense } from "react";
import PaymentSuccess from "./PaymentSucces";

function PaymentSuccessWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccess />
    </Suspense>
  );
}

export default PaymentSuccessWrapper;
