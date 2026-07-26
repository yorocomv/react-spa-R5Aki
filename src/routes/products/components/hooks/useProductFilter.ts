import { useCallback, useMemo, useState } from 'react';

import type { ViewProductSkusTagCountsArray, ViewSkuDetailsRow } from '../../products.dbTable.types';

interface FilterState {
  categories: string[];
  maxPieceWeight: string[];
  tagIds: string[];
}

export function useProductFilter(
  productSkuDetails: ViewSkuDetailsRow[],
  productSkusTagCounts: ViewProductSkusTagCountsArray,
) {
  // 初期値はすべて「'0'（全て）」を指定
  const [filters, setFilters] = useState<FilterState>({
    categories: ['0'],
    maxPieceWeight: ['0'],
    tagIds: ['0'],
  });

  /*
  - カリー化の補足
  - 実際に onChange にセットされるのは、この形になった関数
  * (nextValues: string[]) => {
  *   const currentValues = filters['categories']; // groupKeyが固定されている
  *   // ... ロジック処理 ...
  *   setFilters((prev) => ({ ...prev, 'categories': updatedValues }));
  * }
  */
  // 全グループ共通のチェンジハンドラー（カリー化関数）
  // ※ useCallbackでメモ化し、子コンポーネントの不要な再レンダリングを防ぐ
  const handleCheckboxChange = useCallback((groupKey: keyof FilterState) => (nextValues: string[]) => {
    setFilters((prev) => {
      const currentValues = prev[groupKey];
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
      return {
        ...prev,
        [groupKey]: updatedValues,
      };
    });
  }, []);

  // useMemoでフィルタリング結果をキャッシュし、商品データやフィルター条件が変わった時のみ再計算する
  const filteredProducts = useMemo(() => {
    // --- 1. カテゴリによる絞り込み ---
    let result = filters.categories.includes('0')
      ? productSkuDetails
      : productSkuDetails.filter(product => filters.categories.includes(String(product.category_id)));

    // --- 2. 重量による絞り込み ---
    // '0'（全て）が含まれていない（＝絞り込みが必要な）場合のみ実行
    if (!filters.maxPieceWeight.includes('0')) {
      // 毎回のループ内で配列を評価しないよう、先に真偽値を出しておく（パフォーマンス改善）
      const hasWeight1 = filters.maxPieceWeight.includes('1');
      const hasWeight2 = filters.maxPieceWeight.includes('2');
      const hasWeight3 = filters.maxPieceWeight.includes('3');

      result = result.filter((product) => {
        const weight = product.max_piece_weight;
        if (hasWeight1 && weight <= 2)
          return true;
        if (hasWeight2 && weight > 2 && weight < 300)
          return true;
        if (hasWeight3 && weight >= 300)
          return true;
        return false;
      });
    }

    // --- 3. タグIDによる絞り込み ---
    // '0'（全て）が含まれていない（＝絞り込みが必要な）場合のみ実行
    if (!filters.tagIds.includes('0')) {
      // 配列のincludes()は遅いため、検索を O(1) にする Set を使って対象の sku_id を集約する
      const validSkuIdsSet = new Set<number>();

      filters.tagIds.forEach((id) => {
        const tagData = productSkusTagCounts.find(tag => tag.tag_id === Number(id));
        if (tagData?.tagged_skus_ids) {
          tagData.tagged_skus_ids.forEach(skuId => validSkuIdsSet.add(skuId));
        }
      });

      // Set.has() を使って高速に判定
      result = result.filter(product => validSkuIdsSet.has(product.sku_id));
    }

    return result;
  }, [filters, productSkuDetails, productSkusTagCounts]);

  return { filteredProducts, filters, handleCheckboxChange };
}
