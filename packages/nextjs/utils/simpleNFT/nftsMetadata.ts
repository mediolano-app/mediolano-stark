const nftsMetadata = [
  {
    description: "Content of your IP.",
    external_url: "https://mediolano.app/",
    image: "https://mediolano.app/wp-content/uploads/2024/09/mediolano-feetures-3.jpg",
    name: "Title of your Asset",
    attributes: [
      {
        trait_type: "Author",
        value: "Author name",
      },
      {
        trait_type: "Type",
        value: "Article",
      },
      {
        trait_type: "License",
        value: "Copyright",
      },
    ],
  },
];

export type NFTMetaData = (typeof nftsMetadata)[number];

export default nftsMetadata;
