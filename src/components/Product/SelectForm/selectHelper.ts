import { Product, TabsKeys } from './types';

// eslint-disable-next-line
export const isProductSelected = (productId: number, selectedProductIds: number[]) =>
  selectedProductIds.includes(productId);

export const filterProductBySelects = (
  product: Product,
  selectsValues: Record<string, string | number>
) =>
  Object.values(selectsValues).every(categoryId => {
    if (!categoryId) return true;
    return product.categories.find(productCategory => productCategory.id === categoryId);
  });

export const filterProductByTab = (
  tabId: TabsKeys,
  product: Product,
  selectedProductIds: number[]
) => {
  if (tabId === 'selected') return isProductSelected(product.id, selectedProductIds);

  if (tabId === 'all') return true;

  return product.categories?.some(category => category.id === tabId);
};

// eslint-disable-next-line
export const filterProductByQuery = (product: Product, searchQuery: string) => {
  const query = searchQuery.trim().toLowerCase();
  const title = product.title.toLowerCase();

  return title.includes(query);
};

export const filterByAllParams = (
  products: Product[],
  query: string,
  selectsValues: Record<string, string | number>,
  selectedTabKey: TabsKeys,
  selectedProductIds: number[]
) =>
  products.filter(product => {
    const isPassedBySelects = true || filterProductBySelects(product, selectsValues); // FIXME:
    const isPassedByQuery = filterProductByQuery(product, query);
    const isPassedByTab = filterProductByTab(selectedTabKey, product, selectedProductIds);

    return isPassedBySelects && isPassedByQuery && isPassedByTab;
  });

export const defaultTabs = [
  {
    value: 'all',
    label: 'Все',
  },
  {
    value: 'selected',
    label: 'Выбранные товары',
  },
] as const;
