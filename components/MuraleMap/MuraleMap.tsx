import dynamic from "next/dynamic";

const MuraleMap = dynamic(() => import("./MuraleMapNoSSR"), {
  ssr: false,
});

export default MuraleMap;
