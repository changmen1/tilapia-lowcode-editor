/*
 * Author: zxl
 * 文件描述: zustand 
 * 创建时间 2026年1月20日 14:37:34
 */

import type { CSSProperties } from 'react';
import { create } from 'zustand';

/**组件树
 * id、name、props 属性，通过 chiildren、parentId 关联父子节点
 */
export interface Component {
    id: number;
    name: string;
    props: any;
    styles?: CSSProperties;
    desc: string;
    children?: Component[];
    parentId?: number;
}

interface State {
    components: Component[];
    curComponentId?: number | null;
    curComponent: Component | null;
}

interface Action {
    addComponent: (component: Component, parentId?: number) => void;
    deleteComponent: (componentId: number) => void;
    updateComponentProps: (componentId: number, props: any) => void;
    updateComponentStyles: (componentId: number, styles: CSSProperties) => void;
    setCurComponentId: (componentId: number | null) => void;
}

export const useComponetsStore = create<State & Action>(
    ((set, get) => ({
        components: [
            {
                id: 1,
                name: 'Page',
                props: {},
                desc: '页面',
            }
        ],
        // 查找到 parent 之后，在 children 里添加一个 component，并把 parentId 指向这个 parent。
        // 没查到就直接放在 components 下。
        addComponent: (component, parentId) =>
            set((state) => {
                if (parentId) {
                    console.log('>>>>>>>>>>>>有parentId', parentId)
                    const parentComponent = getComponentById(
                        parentId,
                        state.components
                    );

                    if (parentComponent) {
                        if (parentComponent.children) {
                            parentComponent.children.push(component);
                        } else {
                            parentComponent.children = [component];
                        }
                    }

                    component.parentId = parentId;
                    return { components: [...state.components] };
                }
                return { components: [...state.components, component] };
            }),
        // 找到节点的 parent，在 parent.children 里删除当前节点
        deleteComponent: (componentId) => {
            if (!componentId) return;

            const component = getComponentById(componentId, get().components);
            if (component?.parentId) {
                const parentComponent = getComponentById(
                    component.parentId,
                    get().components
                );

                if (parentComponent) {
                    parentComponent.children = parentComponent?.children?.filter(
                        (item) => item.id !== +componentId
                    );

                    set({ components: [...get().components] });
                }
            }
        },
        // 修改 props 也是找到目标 component，修改属性：
        updateComponentProps: (componentId, props) =>
            set((state) => {
                const component = getComponentById(componentId, state.components);
                if (component) {
                    component.props = { ...component.props, ...props };

                    return { components: [...state.components] };
                }

                return { components: [...state.components] };
            }),
        updateComponentStyles: (componentId, styles) =>
            set((state) => {
                const component = getComponentById(componentId, state.components);
                if (component) {
                    component.styles = { ...component.styles, ...styles };

                    return { components: [...state.components] };
                }

                return { components: [...state.components] };
            }),
        curComponentId: null,
        curComponent: null,
        setCurComponentId: (componentId) =>
            set((state) => ({
                curComponentId: componentId,
                curComponent: getComponentById(componentId, state.components),
            })),
    })
    )
);

// 递归查找当前组件
export function getComponentById(
    id: number | null,
    components: Component[]
): Component | null {
    if (!id) return null;

    for (const component of components) {
        if (component.id == id) return component;
        if (component.children && component.children.length > 0) {
            const result = getComponentById(id, component.children);
            if (result !== null) return result;
        }
    }
    return null;
}
// TODO 低代码分析
// 分析了下低代码编辑器 amis，发现核心就是一个 json 的数据结构。
// 这个 json 就是一个通过 children 属性串联的组件对象树。
// 从物料区拖拽组件到画布区，就是在 json 的某一层级加了一个组件对象。
// 选中组件在右侧编辑属性，就是修改 json 里某个组件对象的属性。
// 大纲就是把这个 json 用树形展示。
// 这个数据结构并不复杂，却是低代码编辑器的核心。