import { create } from 'zustand';
import Button from '../materials/Button';
import Container from '../materials/Container';
import Page from '../materials/Page';

export interface ComponentConfig {
    name: string;
    defaultProps: Record<string, any>,
    component: any
}

interface State {
    componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
    registerComponent: (name: string, componentConfig: ComponentConfig) => void
}
// compnent 名字和 Component 实例的映射 状态
export const useComponentConfigStore = create<State & Action>((set) => ({
    componentConfig: {
        Page: {
            name: 'Page',
            defaultProps: {},
            component: Page
        },
        Container: {
            name: 'Container',
            // 组件默认参数
            defaultProps: {},
            // 组件实例
            component: Container
        },
        Button: {
            name: 'Button',
            defaultProps: {
                type: 'primary',
                text: '按钮'
            },
            component: Button
        },
    },
    // 往 componentConfig 里加配置
    registerComponent: (name, componentConfig) => set((state) => {
        return {
            ...state,
            componentConfig: {
                ...state.componentConfig,
                [name]: componentConfig
            }
        }
    })
}));
