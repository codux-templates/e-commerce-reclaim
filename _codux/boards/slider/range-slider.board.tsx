import { useState } from 'react';
import { createBoard } from '@wixc3/react-board';
import { Slider } from '~/src/components/slider/slider';

import styles from './slider.board.module.scss';

export default createBoard({
    name: 'Slider',
    Board: () => {
        const [value1, setValue1] = useState([50]);
        const [value2, setValue2] = useState([25, 75]);

        return (
            <div className={styles.container}>
                <Slider
                    className="slider"
                    value={value1}
                    onValueChange={setValue1}
                    min={0}
                    max={100}
                    step={1}
                />

                <Slider
                    className="slider"
                    value={value2}
                    onValueChange={setValue2}
                    min={0}
                    max={100}
                    step={1}
                />
            </div>
        );
    },
    environmentProps: {
        windowWidth: 340,
        windowHeight: 170,
    },
});
