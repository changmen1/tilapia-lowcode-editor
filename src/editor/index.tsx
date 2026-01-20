/*
 * Author: zxl
 * 文件描述: 布局 
 * 创建时间 2026年1月20日 14:37:48
 */

import { Allotment } from "allotment";
import 'allotment/dist/style.css';
import type { FC } from "react";
import EditArea from "./components/EditArea";
import Header from "./components/Header";
import Material from "./components/Material";
import Setting from "./components/Setting";

const LowcodeEditor: FC = () => {
    return (
        <div className='h-screen flex flex-col'>
            <div className='h-15 flex items-center border-b border-black'>
                <Header />
            </div>
            <Allotment>
                <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
                    <Material />
                </Allotment.Pane>
                <Allotment.Pane>
                    <EditArea />
                </Allotment.Pane>
                <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
                    <Setting />
                </Allotment.Pane>
            </Allotment>
        </div>
    )
}

export default LowcodeEditor;