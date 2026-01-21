import { useMemo, type FC } from "react";
import { useComponentConfigStore } from "../stores/component-config";
import { MaterialItem } from "./MaterialItem";

const Material: FC = () => {
    const { componentConfig } = useComponentConfigStore();

    const components = useMemo(() => {
        return Object.values(componentConfig).filter(item => item.name !== 'Page');
    }, [componentConfig])

    return (
        <div>
            {
                components.map((item, index) => {
                    return <MaterialItem name={item.name} desc={item.desc} key={item.name + index} />
                })
            }
        </div>
    )
}

export default Material;