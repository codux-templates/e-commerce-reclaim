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

export function getUrlOriginWithPath(url: string) {
    const { origin, pathname } = new URL(url);
    return new URL(pathname, origin).toString();
}
