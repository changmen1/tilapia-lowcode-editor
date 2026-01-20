import { useDrag } from "react-dnd";

export interface MaterialItemProps {
    name: string
}

export function MaterialItem(props: MaterialItemProps) {

    const {
        name
    } = props;

    const [_, drag] = useDrag({
        type: name,
        item: {
            type: name
        }
    });

    return <div
        ref={drag as any}
        className='
            border-dashed
            border
            border-black
            py-2 px-2.5 
            m-2.5
            cursor-move
            inline-block
            bg-white
            hover:bg-[#ccc]
            text-blue-800
        '
    >
        {name}
    </div>
}