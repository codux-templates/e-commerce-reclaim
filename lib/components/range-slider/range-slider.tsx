import classNames from 'classnames';
import styles from './range-slider.module.scss';
import { useState } from 'react';

export interface RangeSliderValue {
    start: number;
    end: number;
}

export interface RangeSliderProps {
    value: RangeSliderValue;
    onChange: (value: RangeSliderValue) => void;
    /**
     * The lowest permitted value.
     */
    minValue: number;
    /**
     * The highest permitted value.
     */
    maxValue: number;
    /**
     * The granularity that the values must adhere to. @default 1
     */
    step?: number | 'any';
    /**
     * Allows to format the displayed start and end values. For example, add a currency symbol,
     * format with the specified number of decimal places, etc.
     */
    formatValue?: (value: number) => string;
    className?: string;
}

type SliderRoles = { a: 'start'; b: 'end' } | { a: 'end'; b: 'start' };

/**
 * A slider component for selecting a numeric range.
 */
export const RangeSlider = ({
    value,
    onChange,
    minValue,
    maxValue,
    step,
    formatValue = (value) => value.toString(),
    className,
}: RangeSliderProps) => {
    const [f, setF] = useState(undefined);
    const [sliderRoles, setSliderRoles] = useState<SliderRoles>({ a: 'start', b: 'end' });

    const swapSliderRoles = () => {
        setSliderRoles((prev) => {
            return prev.a === 'start' ? { a: 'end', b: 'start' } : { a: 'start', b: 'end' };
        });
    };

    const handleSliderChange = (role: 'start' | 'end', newValue: number) => {
        if (role === 'start') {
            // Handle start value change. Swap slider roles if it becomes bigger than the end value.
            if (newValue <= value.end) {
                onChange({ ...value, start: newValue });
            } else {
                swapSliderRoles();
                onChange({ start: value.end, end: newValue });
            }
        } else {
            // Handle end value change. Swap slider roles if it becomes smaller than the start value.
            if (newValue >= value.start) {
                onChange({ ...value, end: newValue });
            } else {
                swapSliderRoles();
                onChange({ start: newValue, end: value.start });
            }
        }
    };

    const handleSliderAChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleSliderChange(sliderRoles.a, Number(event.target.value));
    };

    const handleSliderBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleSliderChange(sliderRoles.b, Number(event.target.value));
    };

    const handleChangeByClickingOnTrack = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        // Change the start or end value
        // depending on which one is closer to the clicked value on the track.
        const distToStart = Math.abs(newValue - value.start);
        const distToEnd = Math.abs(newValue - value.end);
        if (distToStart < distToEnd || (value.start === value.end && newValue < value.start)) {
            onChange({ ...value, start: newValue });
        } else {
            onChange({ ...value, end: newValue });
        }
    };

    const getValuePositionOnTrack = (value: number) => {
        return `${((value - minValue) / (maxValue - minValue)) * 100}%`;
    };

    return (
        <div className={classNames(styles.root, className)}>
            {/* The slider is implemented using three native <input type="range" />
                elements stacked on top of each other.
            */}
            <div className={styles.slidersContainer}>
                {/* Displays the track with the highlighted selected range. The thumb is hidden.
                    Handles a change when a user clicks somewhere on the track.
                */}
                <input
                    type="range"
                    tabIndex={-1}
                    className={classNames(styles.input, styles.trackInput)}
                    style={
                        {
                            '--start': getValuePositionOnTrack(value.start),
                            '--end': getValuePositionOnTrack(value.end),
                        } as React.CSSProperties
                    }
                    step={step}
                    min={minValue}
                    max={maxValue}
                    value={value.start}
                    onChange={handleChangeByClickingOnTrack}
                />

                {/* Slider A. Displays only slider thumb, the track is hidden. */}
                <input
                    type="range"
                    className={classNames(styles.input, styles.thumbInput)}
                    step={step}
                    min={minValue}
                    max={maxValue}
                    value={sliderRoles.a === 'start' ? value.start : value.end}
                    onChange={handleSliderAChange}
                />

                {/* Slider B. Displays only slider thumb, the track is hidden. */}
                <input
                    type="range"
                    className={classNames(styles.input, styles.thumbInput)}
                    step={step}
                    min={minValue}
                    max={maxValue}
                    value={sliderRoles.b === 'end' ? value.end : value.start}
                    onChange={handleSliderBChange}
                />
            </div>

            <div className={styles.values}>
                <span>{formatValue(value.start)}</span>
                <span>{formatValue(value.end)}</span>
            </div>
        </div>
    );
};
