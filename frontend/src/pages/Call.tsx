import { useEffect, useRef, useState } from "react";

import CallSetting from "../Components/Call/CallSetting";
import UserInfo from "../Components/Call/UserInfo";
import { useParams } from "react-router-dom";
import { socketState } from "../store/socket";
import Emoji from "../Components/Call/Emoji";
export default function CallPage() {
  const [height, setHeight] = useState(window.innerHeight);
  const { id } = useParams<{ id: string }>();
  socketState.setID(id || "");
  const ref = useRef(null);
  function isMobile(): boolean {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }
  function toggleFullScreen(elem: HTMLElement) {
    if (!document.fullscreenElement) {
      if (!isMobile()) {
        return;
      }
      // включаем fullscreen
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        // Safari
        (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) {
        // старый IE/Edge
        (elem as any).msRequestFullscreen();
      }
    } else {
      // выходим из fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        // Safari
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  }
  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    // if(!!ref.current) {
    // ref.current
    // }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="containerCall d-flex align-items-center"
      ref={ref}
      // onClick={() => toggleFullScreen(document.body)}
    >
      <div
        className="content w-100  d-flex align-items-center flex-column justify-content-between"
        style={{ height: `${height}px` }}
      >
        <Emoji />
        <UserInfo />
        <CallSetting />
      </div>
    </div>
  );
}
