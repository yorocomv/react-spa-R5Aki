import { useState } from 'react';

import type { ViewSkuDetailsRow } from '../../products.dbTable.types';

interface FilterState {
  categories: string[];
  packagingTypes: string[];
}

export function useProductFilter(productSkuDetails: ViewSkuDetailsRow[]) {
  // 初期値はすべて「'0'（全て）」を指定
  const [filters, setFilters] = useState<FilterState>({
    categories: ['0'],
    packagingTypes: ['0'],
  });

  /*
  - カリー化の補足
  - 実際に onChange にセットされるのは、この形になった関数
  * (nextValues: string[]) => {
  * const currentValues = filters['categories']; // groupKeyが固定されている
  - ... ロジック処理 ...
  * setFilters((prev) => ({ ...prev, 'categories': updatedValues }));
  }
  */
  // 全グループ共通のチェンジハンドラー（カリー化関数）
  const handleCheckboxChange = (groupKey: keyof FilterState) => (nextValues: string[]) => {
    const currentValues = filters[groupKey];

    const wasAllSelected = currentValues.includes('0');
    const isAllNowSelected = nextValues.includes('0');

    let updatedValues: string[] = nextValues;

    // 1. 「全て('0')」が新しくチェックされた場合
    if (!wasAllSelected && isAllNowSelected) {
      updatedValues = ['0'];
    }
    // 2. 「全て('0')」以外が選ばれていて、「全て」が含まれている場合（「全て」を外す）
    else if (isAllNowSelected && nextValues.length > 1) {
      updatedValues = nextValues.filter(val => val !== '0');
    }
    // 3. すべてのチェックが外れた場合、自動で「全て('0')」に戻す
    else if (nextValues.length === 0) {
      updatedValues = ['0'];
    }

    // 指定されたグループのステートだけを更新
    setFilters(prev => ({
      ...prev,
      [groupKey]: updatedValues,
    }));
  };

  const filteredProducts = filters.categories.includes('0') ? productSkuDetails : productSkuDetails.filter(product => filters.categories.includes(String(product.category_id)));

  return { filteredProducts, filters, handleCheckboxChange };
}
