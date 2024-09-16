/**
 * It's important to add an appropriate role and a keyboard support
 * for non-interactive HTML elements with click handlers, such as `<div onClick={handler}></div>`.
 * This function returns a basic set of attributes
 * to make the clickable element focusable and handle the Enter keypress.
 */
export function getClickableElementAttributes(handler: () => void) {
    return {
        role: 'button',
        tabIndex: 0,
        onClick: handler,
        onKeyDown: (event: React.KeyboardEvent) => {
            if (event.key === 'Enter') {
                handler();
            }
        },
    };
}

/**
 * Returns URL that contains only origin and pathname of the provided one,
 * that is excludes query string and fragment identifier.
 */
export function getUrlOriginWithPath(url: string) {
    const { origin, pathname } = new URL(url);
    return new URL(pathname, origin).toString();
}
