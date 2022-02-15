import React from "react";
import Error from "../../components/Error";

export default function NotFound() {
  return (
    <>
      <Error errorCode={404} />
    </>
  );
}
