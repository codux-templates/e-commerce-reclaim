import { useState } from 'react';
import { createBoard } from '@wixc3/react-board';
import { RangeSlider, type RangeSliderValue } from '~/src/components/range-slider/range-slider';

import styles from './range-slider.board.module.scss';

export default createBoard({
    name: 'Range Slider',
    Board: () => {
        const [value, setValue] = useState<RangeSliderValue>({ start: 25, end: 75 });

        return (
            <div className={styles.container}>
                <RangeSlider
                    className="rangeSlider"
                    value={value}
                    onChange={setValue}
                    minValue={0}
                    maxValue={100}
                />
            </div>
        );
    },
    environmentProps: {
        windowWidth: 300,
        windowHeight: 150,
    },
});
