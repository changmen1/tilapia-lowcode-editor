import React, { type FC } from "react";
import { useComponetsStore, type Component } from "../../TodoList/store";
import { useComponentConfigStore } from "../stores/component-config";

const EditArea: FC = () => {
    const { components } = useComponetsStore();
    const { componentConfig } = useComponentConfigStore();

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
    return (
        <div className="h-full">
            {renderComponents(components)}
        </div>
    )
}

export default EditArea;