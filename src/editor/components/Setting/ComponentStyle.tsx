import { Form, Input, InputNumber, Select } from 'antd';
import { debounce } from 'lodash-es';
import { useEffect, useState, type CSSProperties } from 'react';
import parse from 'style-to-object';
import { useComponentConfigStore, type ComponentSetter } from '../../stores/component-config';
import { useComponetsStore } from '../../stores/components';
import CssEditor from './CssEditor';

export function ComponentStyle() {

    const [form] = Form.useForm();
    const [css, setCss] = useState<string>(`.comp{\n\n}`);

    const { curComponentId, curComponent, updateComponentStyles } = useComponetsStore();
    const { componentConfig } = useComponentConfigStore();

    function toCSSStr(css: Record<string, any>) {
        let str = `.comp {\n`;
        for (let key in css) {
            let value = css[key];
            if (!value) {
                continue;
            }
            if (['width', 'height'].includes(key) && !value.toString().endsWith('px')) {
                value += 'px';
            }

            str += `\t${key}: ${value};\n`
        }
        str += `}`;
        return str;
    }

    useEffect(() => {
        form.resetFields();
        const data = form.getFieldsValue();
        form.setFieldsValue({ ...data, ...curComponent?.styles });
        setCss(toCSSStr(curComponent?.styles!))
    }, [curComponent])

    if (!curComponentId || !curComponent) return null;

    function renderFormElememt(setting: ComponentSetter) {
        const { type, options } = setting;

        if (type === 'select') {
            return <Select options={options} />
        } else if (type === 'input') {
            return <Input />
        } else if (type === 'inputNumber') {
            return <InputNumber />
        }
    }

    function valueChange(changeValues: CSSProperties) {
        if (curComponentId) {
            updateComponentStyles(curComponentId, changeValues);
        }
    }

    const handleEditorChange = debounce((value) => {
        setCss(value);
        let css: Record<string, any> = {};
        try {
            const cssStr = value.replace(/\/\*.*\*\//, '')
                .replace(/(\.?[^{]+{)/, '')
                .replace('}', '');

            parse(cssStr, (name, value) => {
                css[name.replace(/-\w/, (item) => item.toUpperCase().replace('-', ''))] = value;
            });

            console.log('>>>>>>>>>>>>>>>>css', css);
            updateComponentStyles(curComponentId, css);
        } catch (e) { }
    }, 500)

    return (
        <Form
            form={form}
            onValuesChange={valueChange}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
        >
            {
                componentConfig[curComponent.name]?.stylesSetter?.map(setter => (
                    <Form.Item key={setter.name} name={setter.name} label={setter.label}>
                        {renderFormElememt(setter)}
                    </Form.Item>
                ))
            }
            <div className='h-50 border border-[#ccc]'>
                <CssEditor value={css} onChange={handleEditorChange} />
            </div>
        </Form>
    )
}
