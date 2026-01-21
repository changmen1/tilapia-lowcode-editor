import { useMaterailDrop } from "../../hooks/useMaterialDrop";
import type { CommonComponentProps } from "../../interface";

const Container = ({ id, children }: CommonComponentProps) => {

    const { canDrop, drop } = useMaterailDrop(['Button', 'Container'], id);

    return (
        <div
            data-component-id={id}
            ref={drop as any}
            className={`min-h-25 p-5 ${canDrop ? 'border-2 border-[blue]' : 'border border-black'}`}
        >
            {children}
        </div>
    )
}

export default Container;