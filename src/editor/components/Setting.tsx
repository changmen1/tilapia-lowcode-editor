import { Segmented } from "antd";
import { useState, type FC } from "react";
import { useComponetsStore } from "../stores/components";
import { ComponentAttr } from "./Setting/ComponentAttr";
import { ComponentEvent } from "./Setting/ComponentEvent";
import { ComponentStyle } from "./Setting/ComponentStyle";

const Setting: FC = () => {
    const { curComponentId } = useComponetsStore();
    const [key, setKey] = useState<string>('属性');

    if (!curComponentId) return null;
    return (
        <div>
            <Segmented value={key} onChange={setKey} block options={['属性', '样式', '事件']} />
            <div className="pt-5">
                {
                    key === '属性' && <ComponentAttr />
                }
                {
                    key === '样式' && <ComponentStyle />
                }
                {
                    key === '事件' && <ComponentEvent />
                }
            </div>
        </div>
    )
}

export default Setting;