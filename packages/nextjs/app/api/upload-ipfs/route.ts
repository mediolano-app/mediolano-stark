import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
// import { ipfsClient } from '~~/utils/simpleNFT/ipfs';
import { IP } from '~~/app/registerIP/page';
import { pinataClient } from '~~/utils/simpleNFT/pinataClient';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest){
  try{
    const data = await request.formData(); //ta dando alguma merda aqui com o get, ver o tipo 
    //da variavel data que eh o que a gente recebe do request
    // if(data == null){
    //   return NextResponse.json(
    //     { error: "Bad Request" },
    //     { status: 401 }
    //   );
    // } else {
      const file: File | null = data.get("file") as unknown as File;
      const uploadData = await pinataClient.upload.file(file);
      const url = await pinataClient.gateways.convert(uploadData.IpfsHash);

      console.log(url);
      return NextResponse.json(url, { status: 200 });      
    // }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//       const { title, description, authors, ipType }: IP = req.body;
  
//       try {
//         // Upload intellectual property metadata to IPFS
//         const ipMetadata = {
//           title,
//           description,
//           authors,
//           ipType,
//         };
  
//         const added = await ipfsClient.add(JSON.stringify(ipMetadata));
//         const ipfsHash = added.path;
  
//         // Generate NFT metadata
//         const nftMetadata = {
//           name: title,
//           description: description,
//           authors: authors,
//           ipfsHash,
//           image: `https://ipfs.infura.io/ipfs/${ipfsHash}`, // Optional: if file is an image
//         };
  
//         // Optionally: Upload NFT metadata to IPFS
//         const metadataAdded = await ipfsClient.add(JSON.stringify(nftMetadata));
//         const metadataHash = metadataAdded.path;
  
//         res.status(200).json({ metadataHash, nftMetadata });
//       } catch (error) {
//         console.error('Error uploading to IPFS:', error);
//         res.status(500).json({ error: 'Failed to upload to IPFS' });
//       }
//     } else {
//       res.setHeader('Allow', ['POST']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
//   }