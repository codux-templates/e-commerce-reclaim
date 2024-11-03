import { cart, currentCart, orders } from '@wix/ecom';
import { redirects } from '@wix/redirects';
import { IOAuthStrategy, OauthData, WixClient } from '@wix/sdk';
import { collections, products } from '@wix/stores';

export type Product = products.Product;
export type Collection = collections.Collection;
export type CollectionDetails = collections.Collection & collections.CollectionNonNullableFields;
export type Cart = currentCart.Cart & currentCart.CartNonNullableFields;
export type CartItem = cart.LineItem;
export type CartItemDetails = cart.LineItem & cart.CartNonNullableFields['lineItems'][0];
export type CartTotals = currentCart.EstimateTotalsResponse &
    currentCart.EstimateTotalsResponseNonNullableFields;
export type OrderDetails = orders.Order & orders.OrderNonNullableFields;

export enum EcomApiErrorCodes {
    GetProductsFailure = 'GetProductsFailure',
    CategoryNotFound = 'CategoryNotFound',
    GetCategoryFailure = 'GetCategoryFailure',
    GetAllCategoriesFailure = 'GetAllCategoriesFailure',
    GetCartFailure = 'GetCartFailure',
    GetCartTotalsFailure = 'GetCartTotalsFailure',
    UpdateCartItemQuantityFailure = 'UpdateCartItemQuantityFailure',
    RemoveCartItemFailure = 'RemoveCartItemFailure',
    AddCartItemFailure = 'AddCartItemFailure',
    CreateCheckoutFailure = 'CreateCheckoutFailure',
    CreateCheckoutRedirectSessionFailure = 'CreateCheckoutRedirectSessionFailure',
}

export type EcomApiError = { code: EcomApiErrorCodes; message: string };
export type EcomApiSuccessResponse<T> = { status: 'success'; body: T };
export type EcomApiFailureResponse = { status: 'failure'; error: EcomApiError };
export type EcomApiResponse<T> = EcomApiSuccessResponse<T> | EcomApiFailureResponse;

export enum ProductFilter {
    minPrice = 'minPrice',
    maxPrice = 'maxPrice',
}

export interface IProductFilters {
    /**
     * Only products with a price greater than or equal to this value will be included.
     */
    [ProductFilter.minPrice]?: number;
    /**
     * Only products with a price less than or equal to this value will be included.
     */
    [ProductFilter.maxPrice]?: number;
}

export enum ProductSortBy {
    newest = 'newest',
    priceAsc = 'priceAsc',
    priceDesc = 'priceDesc',
    nameAsc = 'nameAsc',
    nameDesc = 'nameDesc',
}

export interface GetProductsOptions {
    categorySlug?: string;
    skip?: number;
    limit?: number;
    filters?: IProductFilters;
    sortBy?: ProductSortBy;
}

export type AddToCartOptions =
    | { variantId: string }
    | { options: Record<string, string | undefined> };

export type WixApiClient = WixClient<
    undefined,
    IOAuthStrategy,
    {
        products: typeof products;
        currentCart: typeof currentCart;
        redirects: typeof redirects;
        collections: typeof collections;
        orders: typeof orders;
    }
>;

export type EcomApi = {
    getWixClient(): WixApiClient;
    getProducts: (
        options?: GetProductsOptions,
    ) => Promise<EcomApiResponse<{ items: Product[]; totalCount: number }>>;
    getProductBySlug: (slug: string) => Promise<Product | undefined>;
    getCart: () => Promise<EcomApiResponse<Cart>>;
    getCartTotals: () => Promise<EcomApiResponse<CartTotals>>;
    updateCartItemQuantity: (
        id: string | undefined | null,
        quantity: number,
    ) => Promise<EcomApiResponse<Cart>>;
    removeItemFromCart: (id: string) => Promise<EcomApiResponse<Cart>>;
    addToCart: (
        id: string,
        quantity: number,
        options?: AddToCartOptions,
    ) => Promise<EcomApiResponse<Cart>>;
    checkout: () => Promise<EcomApiResponse<{ checkoutUrl: string }>>;
    getAllCategories: () => Promise<EcomApiResponse<Collection[]>>;
    getCategoryBySlug: (slug: string) => Promise<EcomApiResponse<CollectionDetails>>;
    getOrder: (id: string) => Promise<OrderDetails | undefined>;
    /**
     * Returns the lowest and the highest product price in the category.
     */
    getProductPriceBounds: (
        categorySlug: string,
    ) => Promise<EcomApiResponse<{ lowest: number; highest: number }>>;
    login: (
        callbackUrl: string,
        returnUrl: string,
    ) => Promise<{
        oAuthData: OauthData;
        authUrl: string;
    }>;
    logout: (returnUrl: string) => Promise<{ logoutUrl: string }>;
};
