import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

export default function Routers() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Suspense>
  );
}
