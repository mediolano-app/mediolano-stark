const nftsMetadata = [
  {
    description: "Movie Review for Transformers: On in Portuguese",
    external_url: "https://ambrosia.com.br/criticas/critica-transformers-o-inicio/",
    image: "https://ambrosia.com.br/wp-content/smush-webp/2024/09/Transformers-O-Inicio-resenha-animacao-AMbrosia-1600x900.jpg.webp",
    name: "Crítica: “Transformers: O Início”",
    attributes: [
      {
        trait_type: "Author",
        value: "Ramon",
      },
      {
        trait_type: "Category",
        value: "Movies",
      },
      {
        trait_type: "Media",
        value: "Ambrosia.com.br",
      },
    ],
  },
  {
    description: "Game review of Black Myth: Wukong",
    external_url: "https://ambrosia.com.br/criticas/resenha-de-black-myth-wukong-uma-grata-surpresa/",
    image: "https://ambrosia.com.br/wp-content/smush-webp/2024/08/black-myth-wukong-critica-games-ambrosia.jpg.webp",
    name: "Black Myth: Wukong",
    attributes: [
      {
        trait_type: "Author",
        value: "Slack",
      },
      {
        trait_type: "Category",
        value: "Games",
      },
      {
        trait_type: "Media",
        value: "Ambrosia.com.br",
      },
    ],
  },
  {
    description: "Alien: Romulus brings tension and vigor back to the franchise",
    external_url: "https://ambrosia.com.br/filmes/alien-romulus-traz-a-tensao-e-o-vigor-de-volta-a-franquia/",
    image: "https://ambrosia.com.br/wp-content/uploads/2024/08/Alien-Romulus-img-800x450.jpg",
    name: "Alien: Romulus movie review",
    attributes: [
      {
        trait_type: "Author",
        value: "Cesar Monteiro",
      },
      {
        trait_type: "Category",
        value: "Movies",
      },
      {
        trait_type: "Media",
        value: "Ambrosia.com.br",
      },
    ],
  },
];

export type NFTMetaData = (typeof nftsMetadata)[number];

export default nftsMetadata;
