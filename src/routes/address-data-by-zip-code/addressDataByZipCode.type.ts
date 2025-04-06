import type { z } from 'zod';

import type zipCodeSchema from './addressDataByZipCode.schemas';

export type ZipCode = z.infer<typeof zipCodeSchema>;

export interface ZipData {
  zip: string;
  prefectures: string;
  city: string;
  other: string;
}

// 検索結果のデータ型
export interface SuccessDataType {
  address: ZipData;
  error: null;
}

export interface ErrorDataType {
  address: null;
  error: {
    loading?: true;
    notReady?: true;
    inValid?: true;
    noFirstThreeDigits?: true;
    notFound?: true;
  };
}

export type EJPCReturnDataType = SuccessDataType | ErrorDataType;
