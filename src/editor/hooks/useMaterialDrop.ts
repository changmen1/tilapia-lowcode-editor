import { useDrop } from "react-dnd";
import { useComponentConfigStore } from "../stores/component-config";
import { useComponetsStore } from "../stores/components";

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
            const config = componentConfig[item.type];
            addComponent({
                id: new Date().getTime(),
                name: item.type,
                desc: config.desc,
                props: config.defaultProps,
                styles: {
                    // background: '#fff'
                }
            }, id)
        },
        collect: (monitor) => ({
            // canDrop 的话加一个 border 的高亮。
            canDrop: monitor.canDrop(),
        }),
    }));

    return { canDrop, drop }
}