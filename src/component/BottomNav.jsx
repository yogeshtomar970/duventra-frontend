import React from "react";


import "../styles/BottomNav.css";

import NavBarlinksbottom from "../component/NavBarlinksbottom";


import useBottomNav from "../hooks/useBottomNav";

export default function BottomNav() {
  const {
    profilePath,
  } = useBottomNav();

  return (
    <>
      <NavBarlinksbottom
        profilePath={profilePath}/>
    </>
  );
}
