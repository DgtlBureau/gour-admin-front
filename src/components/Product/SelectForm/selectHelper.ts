import { Product } from './SelectForm';

// eslint-disable-next-line
export const isProductSelected = (productId: number, selectedProductIds: number[]) =>
  selectedProductIds.includes(productId);

export const filterProductBySelects = (
  product: Product,
  selectsValues: Record<string, string | undefined>
) =>
  Object.keys(product.characteristics).every(key => {
    if (!selectsValues[key]) return true;
    return selectsValues[key] === product.characteristics[key];
  });

export const filterProductByTab = (
  tabId: string,
  product: Product,
  selectedProductIds: number[]
) => {
  switch (tabId) {
    case 'selected':
      return isProductSelected(product.id, selectedProductIds);
    default:
      return product.category === tabId || tabId === 'all';
  }
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
  selectsValues: Record<string, string | undefined>,
  selectedTabKey: string,
  selectedProductIds: number[]
) =>
  products.filter(product => {
    const isPassedBySelects = filterProductBySelects(product, selectsValues);
    const isPassedByQuery = filterProductByQuery(product, query);
    const isPassedByTab = filterProductByTab(selectedTabKey, product, selectedProductIds);

    return isPassedBySelects && isPassedByQuery && isPassedByTab;
  });
