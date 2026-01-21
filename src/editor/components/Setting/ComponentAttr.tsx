import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useComponentConfigStore, type ComponentConfig, type ComponentSetter } from '../../stores/component-config';
import { useComponetsStore } from '../../stores/components';

export function ComponentAttr() {

    const [form] = Form.useForm();

    const { curComponentId, curComponent, updateComponentProps } = useComponetsStore();
    const { componentConfig } = useComponentConfigStore();

    // 当 curComponent 变化的时候，把 props 设置到表单用于回显数据：
    useEffect(() => {
        console.log('>>>>>>curComponent', curComponent)
        const data = form.getFieldsValue();
        form.setFieldsValue({ ...data, ...curComponent?.props });
    }, [curComponent])

    // 如果 curComponentId 为 null，也就是没有选中组件的时候，返回 null
    if (!curComponentId || !curComponent) return null;

    function renderFormElememt(setting: ComponentSetter) {
        const { type, options } = setting;
        if (type === 'select') {
            return <Select options={options} />
        } else if (type === 'input') {
            return <Input />
        }
    }

    function valueChange(changeValues: ComponentConfig) {
        if (curComponentId) {
            updateComponentProps(curComponentId, changeValues);
        }
    }

    return (
        <Form
            form={form}
            onValuesChange={valueChange}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
        >
            <Form.Item label="组件id">
                <Input value={curComponent.id} disabled />
            </Form.Item>
            <Form.Item label="组件名称">
                <Input value={curComponent.name} disabled />
            </Form.Item>
            <Form.Item label="组件描述">
                <Input value={curComponent.desc} disabled />
            </Form.Item>
            {
                componentConfig[curComponent.name]?.setter?.map(setter => (
                    <Form.Item key={setter.name} name={setter.name} label={setter.label}>
                        {renderFormElememt(setter)}
                    </Form.Item>
                ))
            }
        </Form>
    )
}
