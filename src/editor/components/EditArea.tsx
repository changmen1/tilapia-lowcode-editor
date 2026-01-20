import { useEffect, type FC } from "react";
import { useComponetsStore } from "../../TodoList/store";

const EditArea: FC = () => {
    const { components, addComponent, deleteComponent, updateComponentProps } = useComponetsStore();

    useEffect(() => {
        addComponent({
            id: 222,
            name: 'Container',
            props: {},
            children: []
        }, 1);
        addComponent({
            id: 333,
            name: 'Video',
            props: {},
            children: []
        }, 222);
        setTimeout(() => {
            deleteComponent(333);
        }, 3000);
        setTimeout(() => {
            updateComponentProps(222, {
                title: '李瑶'
            })
        }, 3000);
    }, []);
    return (
        <div>
            <pre>
                {
                    JSON.stringify(components, null, 2)
                }
            </pre>
        </div>
    )
}

export default EditArea;