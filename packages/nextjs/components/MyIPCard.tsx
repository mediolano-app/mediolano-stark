import React, { useState, useEffect } from 'react';
import { infuraProvider, useContractRead } from "@starknet-react/core";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~~/components/ui/card"

const apiKey = process.env.INFURA_API_KEY;
const provider = infuraProvider({ apiKey });

const abi = [{
  type: "interface",
  name: "openzeppelin::token::erc721::interface::IERC721MetadataCamelOnly",
  items: [
    {
      type: "function",
      name: "tokenURI",
      inputs: [
        {
          name: "tokenId",
          type: "core::integer::u256",
        },
      ],
      outputs: [
        {
          type: "core::byte_array::ByteArray",
        },
      ],
      state_mutability: "view",
    },
  ],
}]; 

interface MyIPCardProps {
  contractAddress: string;
  index: number;
}

const MyIPCard: React.FC<MyIPCardProps> = ({ contractAddress, index }) => {
  const [tokenURI, setTokenURI] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading: isContractLoading, error: contractError } = useContractRead({
    address: contractAddress,
    abi,
    functionName: 'tokenURI',
    args: [index],
    watch: false,
  });
  
  console.log('AAAAAA', {contractError, data});
  useEffect(() => {
    if (isContractLoading) {
      setIsLoading(true);
    } else if (contractError) {
      setIsLoading(false);
      setError("Failed to fetch tokenURI");
    } else if (data) {
      setIsLoading(false);
      setTokenURI(data as string);
      
    }
  }, [data, isContractLoading, contractError]);

  if (isLoading) {
    return <Card><CardContent>Loading...</CardContent></Card>;
  }

  if (error) {
    return <Card><CardContent>Error: {error}</CardContent></Card>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>IP Token #{index}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Token URI: {tokenURI}</p>
        {/* Add more content here based on the tokenURI data */}
      </CardContent>
    </Card>
  );
};

export default MyIPCard;