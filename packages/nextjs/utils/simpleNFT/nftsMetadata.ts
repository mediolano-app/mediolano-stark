import { FormData } from "~~/app/register/page";

const nftsMetadata = (
  // formdata: FormData
) => {
  
  return [
  {
    description: "",
    external_url: "https://austingriffith.com/portfolio/paintings/", // <-- this can link to a page for the specific file too
    image: "",
    name: "Buffalo",
    attributes: [
      {
        trait_type: "IP type",
        value: "",
      },
      {
        trait_type: "Stamina",
        value: 42,
      },
    ],
  },];
}
export type NFTMetaData = (typeof nftsMetadata);
export default nftsMetadata;

// const customizeNftMetadata = (formData: FormData) => {
//   const { title, briefDescription, detailedDescription, date, authors} = formData;

//   const customizedMetadata = nftsMetadata.map(nft => ({
//     ...nft, // Spread existing properties
//     description: detailedDescription, // Map description from form
//     image: "", // This can be updated with user-provided image link
//     name: title, // Custom name from the form
//     attributes: nft.attributes.map(attr => ({
//       ...attr,
//       value: briefDescription, // Set trait to something from formData
//     })),
//   }));

//   return customizedMetadata;
// };
// export type NFTMetaData = (typeof customizeNftMetadata);
// export default customizeNftMetadata;


