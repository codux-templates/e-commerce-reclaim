import { isRouteErrorResponse } from '@remix-run/react';
import { isEcomSDKError, ProductFilter, IProductFilters } from '~/api/types';

/**
 * It's important to add an appropriate role and a keyboard support
 * for non-interactive HTML elements with click handlers, such as `<div onClick={handler}></div>`.
 * This function returns a basic set of attributes
 * to make the clickable element focusable and handle keyboard events.
 */
export function getClickableElementAttributes(handler: () => void) {
    return {
        role: 'button',
        tabIndex: 0,
        onClick: handler,
        onKeyUp: (event: React.KeyboardEvent) => {
            if (event.code === 'Enter' || event.code === 'Space') {
                handler();
            }
        },
    };
}

export function removeQueryStringFromUrl(url: string) {
    const { origin, pathname } = new URL(url);
    return new URL(pathname, origin).toString();
}

/*
 * Retrieves the message from a thrown error.
 * - Handles Remix ErrorResponse (non-Error instance).
 * - Handles Wix eCom SDK errors (non-Error instance).
 * - Handles plain objects structured like an Error.
 * - Converts plain objects with unknown structure into
 *   a JSON string to help in debugging their source.
 * - Falls back to converting the value to a string.
 */
export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    if (isEcomSDKError(error)) {
        return error.message;
    }

    // Remix ErrorResponse thrown from an action or loader:
    // - throw new Response('oops');
    // - throw json('oops')
    // - throw json({message: 'oops'})
    if (isRouteErrorResponse(error)) {
        error = error.data;
    }

    if (typeof error == 'object' && error !== null) {
        if ('message' in error && typeof error.message === 'string') {
            return error.message;
        }

        try {
            return JSON.stringify(error);
        } catch {
            // Fall through.
        }
    }

    return String(error);
}

export function parseProductFiltersFromUrlSearchParams(
    searchParams: URLSearchParams,
): IProductFilters {
    const minPrice = searchParams.get(ProductFilter.minPrice);
    const maxPrice = searchParams.get(ProductFilter.maxPrice);
    const minPriceNumber = Number(minPrice);
    const maxPriceNumber = Number(maxPrice);
    return {
        minPrice: minPrice && !Number.isNaN(minPriceNumber) ? minPriceNumber : undefined,
        maxPrice: maxPrice && !Number.isNaN(maxPriceNumber) ? maxPriceNumber : undefined,
    };
}

export function stringifyProductFiltersToUrlSearchParams({
    minPrice,
    maxPrice,
}: IProductFilters): URLSearchParams {
    const searchParams = new URLSearchParams();
    if (minPrice !== undefined) searchParams.set(ProductFilter.minPrice, minPrice.toString());
    if (maxPrice !== undefined) searchParams.set(ProductFilter.maxPrice, maxPrice.toString());
    return searchParams;
}
