import { useSuspenseQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import axiosInst from '../../../../util/axios-instance';
import { EJPCReturnDataType, ErrorDataType, ZipCode } from '../../addressDataByZipCode.type';
import zipCodeSchema from '../../addressDataByZipCode.schemas';

// eslint-disable-next-line import/prefer-default-export
export const useFetchAddressData = () => {
  const [zipCodeStr, setZipCodeStr] = useState<ZipCode>('');
  const [hasResultOfQuery, setHasResultOfQuery] = useState(false);
  // 無効な key は react-query にまとめてキャッシュさせる
  const additionalKey = zipCodeStr.replace(/\D/g, '').length !== 7 ? '#f' : zipCodeStr.replace(/\D/g, '');
  const { data: ejpcReturnData } = useSuspenseQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['/address-data-by-zip-code?zip_code', additionalKey],
    queryFn: async () => {
      // 非同期通信するまでもない場合の代替エラーオブジェクト
      const dummyEjpcReturnData: ErrorDataType = {
        address: null,
        error: { inValid: true },
      };
      if (additionalKey === '#f') return dummyEjpcReturnData;
      const zodResult = zipCodeSchema.safeParse(zipCodeStr);
      if (!zodResult.success) {
        return dummyEjpcReturnData;
      }
      const zipCode = zodResult.data;
      const result: AxiosResponse<EJPCReturnDataType> = await axiosInst
        .get(`/address-data-by-zip-code?zip_code=${zipCode}`)
        .catch((err: string) => {
          console.error(`💥💥💥 /address-data-by-zip-code?zip_code=${zipCode} からのエラーをキャッチ❢ ${err} 💀💀💀`);
          return Promise.reject(new Error(err));
        });
      setHasResultOfQuery(true);

      return result.data;
    },
  });

  return { ejpcReturnData, setZipCodeStr, hasResultOfQuery, setHasResultOfQuery };
};
