import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { PinataSDK } from 'pinata';
import path from 'path';

export const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT as string,
  pinataGateway: process.env.HOST as string,
});

