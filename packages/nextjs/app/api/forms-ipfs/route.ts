import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { IP } from '~~/app/registerIP/page';
import { pinataClient } from '~~/utils/simpleNFT/pinataClient';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(request: NextRequest){
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
  
      const data = await request.formData();

      const title = data.get('title') as unknown as string;
      const description = data.get('description') as unknown as string;
      const authors = data.getAll('authors');
      const ipType = data.get('ipType');
      const uploadFile: File | null = data.get('uploadFile') as unknown as File; 

      // const data2 = request.body;
      // console.log(data2);

      // console.log("--------------");
      // const data3 = request.text();
      // console.log(data3);
  
      //const file: File | null = data.get("file") as unknown as File;
      // const uploadMockedData = await pinataClient.upload.json(mockedData);
      // const mockedUrl = await pinataClient.gateways.convert(uploadMockedData.IpfsHash);
      // console.log(mockedUrl);

      const userObject = {
        title: title,
        description: description,
        authors: authors,
        ipType: ipType,
        uploadFile: uploadFile
      };

      const uploadData = await pinataClient.upload.json(userObject);
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
