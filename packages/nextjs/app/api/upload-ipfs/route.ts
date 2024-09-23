import { NextApiRequest, NextApiResponse } from 'next';
import { ipfsClient } from '~~/utils/simpleNFT/ipfs';
import { IP } from '~~/app/registerIP/page';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { title, description, authors, ipType }: IP = req.body;
  
      try {
        // Upload intellectual property metadata to IPFS
        const ipMetadata = {
          title,
          description,
          authors,
          ipType,
        };
  
        const added = await ipfsClient.add(JSON.stringify(ipMetadata));
        const ipfsHash = added.path;
  
        // Generate NFT metadata
        const nftMetadata = {
          name: title,
          description: description,
          authors: authors,
          ipfsHash,
          image: `https://ipfs.infura.io/ipfs/${ipfsHash}`, // Optional: if file is an image
        };
  
        // Optionally: Upload NFT metadata to IPFS
        const metadataAdded = await ipfsClient.add(JSON.stringify(nftMetadata));
        const metadataHash = metadataAdded.path;
  
        res.status(200).json({ metadataHash, nftMetadata });
      } catch (error) {
        console.error('Error uploading to IPFS:', error);
        res.status(500).json({ error: 'Failed to upload to IPFS' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }