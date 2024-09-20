/**
 * Linearly interpolates between two numbers `a` and `b`, based on the
 * interpolation factor `t`.
 * - When `t = 0` returns `a`.
 * - When `t = 1` return `b`.
 * - When `t = 0.5` returns the midpoint of `a` and `b`.
 */
const lerp = (a: number, b: number, t: number): number => (1 - t) * a + t * b;

/**
 * Restricts the value `x` to a range defined by `min` and `max`.
 */
const clamp = (min: number, max: number, x: number): number => {
    if (x < min) return min;
    if (x > max) return max;
    return x;
};

/**
 * Remaps a number `x` from one range to another.
 *
 * @param inputStart - The start value of the input range.
 * @param inputEnd - The end value of the input range.
 * @param outputStart - The start value of the output range.
 * @param outputEnd - The end value of the output range.
 * @param x - The value to remap from the input range to the output range.
 */
const remap = (
    inputStart: number,
    inputEnd: number,
    outputStart: number,
    outputEnd: number,
    x: number
): number => ((x - inputStart) / (inputEnd - inputStart)) * (outputEnd - outputStart) + outputStart;

/**
 * Calculates the `background-position-y` of an element to create a parallax
 * effect as the page is scrolled. The function expects the background image to
 * have `background-attachment: fixed` and `background-size: cover`, which
 * ensures the background image has a minimum height of 100vh and is positioned
 * relative to the viewport rather than the element itself.
 *
 * @param viewportHeight - The height of the viewport in pixels.
 * @param elementHeight - The height of the element in pixels.
 * @param elementTop - The distance from the top of the viewport to the top of the element.
 * @param parallaxStrength - A value between 0 and 1, where 0 means no parallax,
 *                           and 1 means full parallax (background fixed to viewport).
 * @return The `y` position of the background in pixels to achieve the parallax effect.
 */
export const calculateBackgroundParallax = ({
    viewportHeight,
    elementHeight,
    elementTop,
    parallaxStrength,
}: {
    viewportHeight: number;
    elementHeight: number;
    elementTop: number;
    parallaxStrength: number;
}) => {
    // scrollProgress = 0, when the element is fully below the bottom edge of the viewport.
    // scrollProgress = 1, when the element is fully above the top edge of the viewport.
    const scrollProgress = clamp(0, 1, remap(viewportHeight, -elementHeight, 0, 1, elementTop));

    // If the element's height exceeds the viewport height, the background
    // (which has minimum height of 100vh) cannot scroll along with the element
    // without creating gaps. In this case, we force `parallaxStrength = 1` to
    // keep the background fixed to the viewport.
    if (elementHeight > viewportHeight) parallaxStrength = 1;

    const maxBackgroundY = ((viewportHeight + elementHeight) / 2) * (1 - parallaxStrength);
    return lerp(maxBackgroundY, -maxBackgroundY, scrollProgress);
};