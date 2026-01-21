import { useDrop } from "react-dnd";
import { useComponetsStore } from "../../TodoList/store";
import { useComponentConfigStore } from "../stores/component-config";

export function useMaterailDrop(accept: string[], id: number) {
    const { addComponent } = useComponetsStore();
    const { componentConfig } = useComponentConfigStore();

    const [{ canDrop }, drop] = useDrop(() => ({
        // 指定接收的 type，这里接收 Button 和 Container 组件
        accept,
        // drop 的时候显示下传过来的 item 数据。
        drop: (item: { type: string }, monitor) => {
            const didDrop = monitor.didDrop()
            if (didDrop) {
                return;
            }
            const props = componentConfig[item.type].defaultProps;

            addComponent({
                id: new Date().getTime(),
                name: item.type,
                props
            }, id)
        },
        collect: (monitor) => ({
            // canDrop 的话加一个 border 的高亮。
            canDrop: monitor.canDrop(),
        }),
    }));

    return { canDrop, drop }
}