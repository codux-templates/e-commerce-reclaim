import { useState } from 'react';
import { createBoard } from '@wixc3/react-board';
import { ColorSelect, ColorSelectOption } from '~/components/color-select/color-select';

const options: ColorSelectOption[] = [
    { id: 'color1', color: '#00a400' },
    { id: 'color2', color: 'rgb(214, 122, 127)' },
    { id: 'color3', color: 'hsl(30deg 82% 43%)' },
    { id: 'color4', color: 'rebeccapurple' },
];

export default createBoard({
    name: 'Color Select',
    Board: () => {
        const [color, setColor] = useState('');
        return <ColorSelect options={options} selectedId={color} onChange={setColor} />;
    },
    environmentProps: {
        windowWidth: 400,
        windowHeight: 100,
    },
});
