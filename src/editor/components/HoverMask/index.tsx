import {
    useEffect,
    useMemo,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { getComponentById, useComponetsStore } from '../../../TodoList/store';

// 需要计算按钮和画布区顶部的距离，就需要按钮的 boundingClientRect 还有画布区的 boundingClientRect。
// 所以需要传入 containerClassName 和 componentId。
interface HoverMaskProps {
    portalWrapperClassName: string
    // 画布区的根元素的 className。
    containerClassName: string
    // hover组件的自定义id属性
    componentId: number;
}

function HoverMask({ portalWrapperClassName, containerClassName, componentId }: HoverMaskProps) {

    const { components } = useComponetsStore();

    const [position, setPosition] = useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        labelTop: 0,
        labelLeft: 0
    });

    useEffect(() => {
        updatePosition();
    }, [componentId]);

    // 获取两个元素的 boundingClientRect，计算 top、left 的差值，加上 scrollTop、scrollLeft。
    // 因为 boundingClientRect 只是可视区也就是和视口的距离，要算绝对定位的位置的话要加上已滚动的距离。
    // 然后创建一个 div 挂载在容器下，用于存放 portal：

    function updatePosition() {
        if (!componentId) return;

        const container = document.querySelector(`.${containerClassName}`);
        if (!container) return;

        const node = document.querySelector(`[data-component-id="${componentId}"]`);
        if (!node) return;

        // 获取组件距离浏览器窗口顶部的距离。
        // 组件到视口顶部的距离 - 容器到视口顶部的距离 = 组件相对于容器顶部的相对位置
        // getBoundingClientRect 拿到的值是“静态”的可视区距离，它不包含滚动条滚过的距离。
        // 计算： 加上 scrollTop 才能保证滚动后，遮罩层依然能定位到组件真实的物理位置上。
        const { top, left, width, height } = node.getBoundingClientRect();
        const { top: containerTop, left: containerLeft } = container.getBoundingClientRect();
        let labelTop = top - containerTop + container.scrollTop;
        let labelLeft = left - containerLeft + width;
        if (labelTop <= 0) {
            labelTop -= -20
        }

        setPosition({
            top: top - containerTop + container.scrollTop,
            left: left - containerLeft + container.scrollLeft,
            width,
            height,
            labelTop,
            labelLeft
        });
    }

    const el = useMemo(() => {
        return document.querySelector(`.${portalWrapperClassName}`);
    }, []);

    const curComponent = useMemo(() => {
        return getComponentById(componentId, components);
    }, [componentId]);

    return createPortal((
        <>
            <div
                style={{
                    position: "absolute",
                    left: position.left,
                    top: position.top,
                    backgroundColor: "rgba(0, 0, 255, 0.1)",
                    border: "1px dashed blue",
                    pointerEvents: "none",
                    width: position.width,
                    height: position.height,
                    zIndex: 12,
                    borderRadius: 4,
                    boxSizing: 'border-box',
                }}
            />
            <div
                style={{
                    position: "absolute",
                    left: position.labelLeft,
                    top: position.labelTop,
                    fontSize: "14px",
                    zIndex: 13,
                    display: (!position.width || position.width < 10) ? "none" : "inline",
                    transform: 'translate(-100%, -100%)',
                }}
            >
                <div
                    style={{
                        padding: '0 8px',
                        backgroundColor: 'blue',
                        borderRadius: 4,
                        color: '#fff',
                        cursor: "pointer",
                        whiteSpace: 'nowrap',
                    }}
                >
                    {curComponent?.name}
                </div>
            </div>
        </>
    ), el!)
}

export default HoverMask;