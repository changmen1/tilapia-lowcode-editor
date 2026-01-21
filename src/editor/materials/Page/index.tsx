import { useMaterailDrop } from "../../hooks/useMaterialDrop";
import type { CommonComponentProps } from "../../interface";

function Page({ id, children, styles }: CommonComponentProps) {

    const { canDrop, drop } = useMaterailDrop(['Button', 'Container'], id);

    return (
        <div
            data-component-id={id}
            ref={drop as any}
            className='p-5 h-full box-border'
            style={{ ...styles, border: canDrop ? '2px solid blue' : 'none' }}
        >
            {children}
        </div>
    )
}

export default Page;