import { useEffect } from "react";
import { useMaterailDrop } from "../../hooks/useMaterialDrop";
import type { CommonComponentProps } from "../../interface";

const Container = ({ id, children, styles }: CommonComponentProps) => {

    const { canDrop, drop } = useMaterailDrop(['Button', 'Container'], id);

    useEffect(() => {
        console.log('>>>>>>>>>>>>>>Containerid', id)
    }, [id])

    return (
        <div
            data-component-id={id}
            ref={drop as any}
            className={`min-h-25 p-5 ${canDrop ? 'border-2 border-[blue]' : 'border border-black'}`}
            style={styles}
        >
            {children}
        </div>
    )
}

export default Container;