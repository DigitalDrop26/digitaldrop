/** Static asset URLs extracted from Claude Design standalone (UUID blobs → public/bundle). */
const base = import.meta.env.BASE_URL;
const u = (file: string) => `${base}bundle/${file}`;

export const bundleResources = {
  imgSheep600: u("370fbce1-df1e-44d6-8513-155f9f732a8e.jpg"),
  imgWheat900: u("e2315db1-0f45-4efc-8f23-573404282ce2.jpg"),
  imgCode1200: u("0b33cc36-6fcc-4879-948e-3e564b5bda48.jpg"),
  imgCow900: u("667bd28e-7716-4254-ac0c-b9c75163c664.jpg"),
  imgCow800: u("e476b5f3-406f-484c-832f-bee227ee8bef.jpg"),
  imgClass: u("4a50ec7c-1d99-4532-a7bf-f615131cf7d7.jpg"),
  imgWheat1600: u("6c7c39a7-6f9c-489c-8113-569fe9303cdf.jpg"),
  imgVineyard: u("546c2d77-8f59-4ffe-ac1e-cd01bbe01d43.jpg"),
  imgCheese: u("b19b98ad-bb64-4f49-886a-2dc9cefd1c14.jpg"),
  imgPaint: u("584571e2-85c0-4751-ac51-20cacf3042e0.jpg"),
  imgCode900: u("9172b837-32d9-4aa5-be3a-1e564e956794.jpg"),
  imgHands800: u("930f18bb-8918-461d-ab60-3a6acdc14cf5.jpg"),
  imgTractor: u("23590fc4-d0f0-4741-939b-5aa3a0a926b6.jpg"),
  imgHands400: u("5b4336d5-626b-46df-b08c-3014889b0b08.jpg"),
  patternGoccia: u("a493a67a-d42c-455e-a195-8a443e2b16e1.svg"),
  logoFullWhite: u("4dc336b4-474c-440e-a7c8-f9da2bbc02f2.svg"),
  logoColor: u("f518868e-4e89-4688-ba8a-9b62812ce5c2.svg"),
  logoWhiteOrange: u("67b05d4a-6e4a-4579-913d-372c62826ccc.svg"),
} as const;
