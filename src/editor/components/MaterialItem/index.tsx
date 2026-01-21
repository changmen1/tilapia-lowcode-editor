import { useDrag } from "react-dnd";

export interface MaterialItemProps {
    name: string
}

export function MaterialItem(props: MaterialItemProps) {

    const {
        name
    } = props;

    const [_, drag] = useDrag({
        // 当前 drag 的元素的标识，drop 的时候根据这个来决定是否 accept。
        type: name,
        // 传递的数据。
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