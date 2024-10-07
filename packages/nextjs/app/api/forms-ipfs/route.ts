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
  if(!request.body || !request.json()){
    return NextResponse.json(
      { error: "Bad-Request" },
      { status: 401 }
    );
  }
  else{
    try{
      const mockedData = {
          title: 'mocktitle',
          description: 'mockdescription',
          authors: 'mockauthors',
          ipType: 'mockiptype',
          uploadFile:''
      };
  
      // const data4 = JSON.parse(await request.json());
      // console.log(data4);
  
      const data = request.json();
      console.log(data);
      console.log("--------------");

      // const data2 = request.body;
      // console.log(data2);

      // console.log("--------------");
      // const data3 = request.text();
      // console.log(data3);
  
      //const file: File | null = data.get("file") as unknown as File;
      // const uploadMockedData = await pinataClient.upload.json(mockedData);
      // const mockedUrl = await pinataClient.gateways.convert(uploadMockedData.IpfsHash);
      // console.log(mockedUrl);
  
      const uploadData = await pinataClient.upload.json(data);
      const url = await pinataClient.gateways.convert(uploadData.IpfsHash);
  
      console.log(url);
  
      return NextResponse.json(url, { status: 200 });  
      
      // const data = await request.formData();
    } catch (e) {
      console.log(e);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    } 
  }
}