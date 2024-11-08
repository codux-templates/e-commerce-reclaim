import classNames from 'classnames';
import styles from './range-slider.module.scss';
import { useRef, useState } from 'react';

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

type SliderRoles = ['start', 'end'] | ['end', 'start'];

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
    const [[sliderARole, sliderBRole], setSliderRoles] = useState<SliderRoles>(['start', 'end']);

    const swapSliderRoles = () => {
        setSliderRoles((prev) => [...prev].reverse() as SliderRoles);
    };

    const sliderFirstTouchChange = useRef(false);

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

    // When clicking not on one of the thumbs but somewhere on the track,
    // we decide what value to change, start or end,
    // depending on which one is closer to the clicked value on the track.
    // Also, since the track is displayed only by slider A,
    // we have to ensure its role corresponds to the changed value.
    const handleSliderFirstTouchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        const distToStart = Math.abs(newValue - value.start);
        const distToEnd = Math.abs(newValue - value.end);

        if (distToStart < distToEnd || (value.start === value.end && newValue < value.start)) {
            // New value is closer to the start value.
            onChange({ ...value, start: newValue });
            if (sliderARole !== 'start') swapSliderRoles();
        } else {
            // New value is closer to the end value.
            onChange({ ...value, end: newValue });
            if (sliderARole !== 'end') swapSliderRoles();
        }
    };

    const handleSliderAChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (sliderFirstTouchChange.current) {
            handleSliderFirstTouchChange(event);
            sliderFirstTouchChange.current = false;
            return;
        }

        handleSliderChange(sliderARole, Number(event.target.value));
    };

    const handleSliderBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleSliderChange(sliderBRole, Number(event.target.value));
    };

    const getValuePositionOnTrack = (value: number) => {
        return `${((value - minValue) / (maxValue - minValue)) * 100}%`;
    };

    return (
        <div className={classNames(styles.root, className)}>
            {/* The slider is implemented using two native <input type="range" />
                elements stacked on top of each other.
            */}
            <div className={styles.slidersContainer}>
                {/* Slider A. Displays the track and the first thumb. */}
                <input
                    type="range"
                    className={classNames(styles.input, styles.sliderA)}
                    style={
                        {
                            '--start': getValuePositionOnTrack(value.start),
                            '--end': getValuePositionOnTrack(value.end),
                        } as React.CSSProperties
                    }
                    step={step}
                    min={minValue}
                    max={maxValue}
                    value={sliderARole === 'start' ? value.start : value.end}
                    onChange={handleSliderAChange}
                    onMouseDown={() => (sliderFirstTouchChange.current = true)}
                />

                {/* Slider B. Displays the second thumb, the track is hidden. */}
                <input
                    type="range"
                    className={classNames(styles.input, styles.sliderB)}
                    step={step}
                    min={minValue}
                    max={maxValue}
                    value={sliderBRole === 'end' ? value.end : value.start}
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
