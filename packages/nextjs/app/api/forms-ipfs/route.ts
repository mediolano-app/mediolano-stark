import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { IP } from '~~/app/registerIP/page';
import { pinataClient } from '~~/utils/simpleNFT/pinataClient';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest){
  try{

    // const data = await request.formData(); 

    const mockedData = {
        title: 'mocktitle',
        description: 'mockdescription',
        authors: 'mockauthors',
        ipType: 'mockiptype',
        uploadFile:''
    };

    const data = request.json();
    
    // const file: File | null = data.get("file") as unknown as File;

    console.log(data);
    
    const uploadMockedData = await pinataClient.upload.json(mockedData);
    const mockedUrl = await pinataClient.gateways.convert(uploadMockedData.IpfsHash);

    // console.log(mockedUrl);

    const uploadData = await pinataClient.upload.json(data);
    const url = await pinataClient.gateways.convert(uploadData.IpfsHash);

    console.log(url);

    return NextResponse.json(url, { status: 200 });      
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}