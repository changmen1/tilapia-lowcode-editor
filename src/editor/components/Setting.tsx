import type { FC } from "react";
import { useComponetsStore } from "../stores/components";

const Setting: FC = () => {
    const { components } = useComponetsStore();
    return (
        <div>
            <pre>
                {JSON.stringify(components, null, 2)}
            </pre>
        </div>
    )
}

export default Setting;