import React, { useState, type FC, type MouseEventHandler } from "react";
import { useComponentConfigStore } from "../stores/component-config";
import { useComponetsStore, type Component } from "../stores/components";
import HoverMask from "./HoverMask";
import SelectedMask from "./SelectedMask";

const EditArea: FC = () => {
    const { components, curComponentId, setCurComponentId } = useComponetsStore();
    const { componentConfig } = useComponentConfigStore();
    const [hoverComponentId, setHoverComponentId] = useState<number>();

    function renderComponents(components: Component[]): React.ReactNode {
        return components.map((component: Component) => {
            const config = componentConfig?.[component.name]

            if (!config?.component) {
                return null;
            }

            return React.createElement(
                config.component,
                {
                    key: component.id,
                    id: component.id,
                    name: component.name,
                    ...config.defaultProps,
                    ...component.props,
                },
                renderComponents(component.children || [])
            )
        })
    }

    const handleMouseOver: MouseEventHandler = (e) => {
        const path = e.nativeEvent.composedPath();

        for (let i = 0; i < path.length; i++) {
            const ele = path[i] as HTMLElement;
            const componentId = ele.dataset.componentId;
            if (componentId) {
                setHoverComponentId(+componentId);
                return
            }
        }
    }

    const handleClick: MouseEventHandler = (e) => {
        const path = e.nativeEvent.composedPath();

        for (let i = 0; i < path.length; i++) {
            const ele = path[i] as HTMLElement;
            const componentId = ele.dataset.componentId;
            if (componentId) {
                setCurComponentId(+componentId);
                return
            }
        }
    }

    return (
        <div className="h-full edit-area" onMouseOver={handleMouseOver} onMouseLeave={() => { setHoverComponentId(undefined) }} onClick={handleClick}>
            {renderComponents(components)}
            {hoverComponentId && hoverComponentId !== curComponentId && (
                <HoverMask
                    portalWrapperClassName='portal-wrapper'
                    containerClassName='edit-area'
                    componentId={hoverComponentId}
                />
            )}
            {curComponentId && (
                <SelectedMask
                    portalWrapperClassName='portal-wrapper'
                    containerClassName='edit-area'
                    componentId={curComponentId}
                />
            )}
            <div className="portal-wrapper"></div>
        </div>
    )
}

export default EditArea;