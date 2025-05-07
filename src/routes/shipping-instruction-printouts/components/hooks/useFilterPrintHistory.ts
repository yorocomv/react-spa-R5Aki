import jaconv from 'jaconv';
import { useCallback, useMemo, useState } from 'react';

import type { ShippingInstructionHistoryTbRow } from '../../shippingInstructionPrintouts.types';

export function useFilterPrintHistory(printHistory: ShippingInstructionHistoryTbRow[]) {
  const [filterString, setFilterString] = useState('');

  function recursiveFilter(
    objArr: ShippingInstructionHistoryTbRow[],
    filterStrings: string[],
  ): ShippingInstructionHistoryTbRow[] {
    const filterFunc = (obj: ShippingInstructionHistoryTbRow, filter: string): boolean => {
      let target =
        obj.carrier + obj.customer_address + obj.customer_name + obj.items_of_order + obj.order_number + obj.wholesaler;
      // https://blog.foresta.me/posts/replace-hyphen-for-js
      target = target.replace(/[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━]/g, '');
      // 全角ひらがなを全角カタカナに
      target = jaconv.toKatakana(target);
      // 全角英数記号を半角に、半角カタカナを全角に
      target = jaconv.normalize(target);
      target = target.toUpperCase();

      let filterCopy = filter;
      filterCopy = filterCopy.replace(/[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━]/g, '');
      filterCopy = jaconv.toKatakana(filterCopy);
      filterCopy = jaconv.normalize(filterCopy);
      filterCopy = filterCopy.toUpperCase();

      const regex = new RegExp(filterCopy);

      return regex.test(target);
    };

    if (objArr.length < 2) {
      return objArr;
    }
    if (filterStrings.length < 2) {
      return objArr.filter(o => filterFunc(o, filterStrings[0]));
    }
    const filteredArray = objArr.filter(o => filterFunc(o, filterStrings[0]));
    const results = recursiveFilter(filteredArray, filterStrings.slice(1));
    return results;
  }

  const cacheFn = useCallback(recursiveFilter, [recursiveFilter]);

  // 全角スペースを含む空白文字列でスプリット
  const filterStringArray = filterString.trim().split(/\s+/);
  const filteredPrintHistories = useMemo(
    () => (/^\s*$/.test(filterString) ? printHistory : cacheFn(printHistory, filterStringArray)),
    [cacheFn, filterString, filterStringArray, printHistory],
  );

  return { filterString, setFilterString, filteredPrintHistories };
}
