import classNames from 'classnames';
import { FC, HTMLAttributes, useEffect, useRef } from 'react';
import { calculateBackgroundParallax } from '~/utils/effects';
import styles from './background-parallax.module.scss';

interface BackgroundParallaxProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A number between 0 and 1 that defines the strength of the parallax
     * effect, default: 0.75.
     * - 0: No parallax effect, the background scrolls at the same rate as the
     *   content, similar to `background-attachment: scroll`.
     * - 1: Maximum parallax effect, the background remains fixed relative to
     *   the viewport, similar to `background-attachment: fixed`.
     */
    parallaxStrength?: number;
    imageUrl?: string;
    className?: string;
}

/**
 * A visual effect where the container's background image (set via CSS or inline
 * styles) scrolls at a slower rate than the foreground content, creating a
 * parallax effect. The background image is guaranteed to fully cover the
 * visible area of the container at all times, with no gaps, regardless of the
 * container size, background image dimensions, or viewport size.
 */
export const BackgroundParallax: FC<BackgroundParallaxProps> = ({
    parallaxStrength = 0.75,
    imageUrl,
    className,
    ...props
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleLayoutChange = () => {
            const elementRect = element.getBoundingClientRect();
            const backgroundPositionY = calculateBackgroundParallax({
                viewportHeight: window.innerHeight,
                elementTop: elementRect.top,
                elementHeight: elementRect.height,
                parallaxStrength,
            });
            element.style.backgroundPositionY = backgroundPositionY + 'px';
        };

        window.addEventListener('scroll', handleLayoutChange);
        window.addEventListener('resize', handleLayoutChange);
        const resizeObserver = new ResizeObserver(handleLayoutChange);
        resizeObserver.observe(element);

        return () => {
            window.removeEventListener('scroll', handleLayoutChange);
            window.removeEventListener('resize', handleLayoutChange);
            resizeObserver.disconnect();
        };
    }, [parallaxStrength]);

    console.log('imageUrl', imageUrl);
    return (
        <div
            ref={ref}
            className={classNames(styles.root, className)}
            style={{ backgroundImage: `url("${imageUrl}")` }}
            {...props}
        />
    );
};
