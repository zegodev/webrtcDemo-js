## ZegoWhiteboard Web SDK

### 1、接口定义

#### 1.1.1 获取 SDK 版本号

```typescript
whiteboardManager.getVersion(): string
```

#### 1.1.2 创建白板

```typescript
whiteboardManager.createView(options: {
    roomID: string;
    name: string;
    aspectWidth: number;
    aspectHeight: number;
    pageCount: number;
    fileInfo?: {
        fileID: string;
        fileName: string;
        fileType: number;
        authKey: string;
    };
}): Promise<WhiteboardView>
```

| 字段         | 含义         | 是否必填 |
| ------------ | ------------ | -------- |
| roomID       | roomId       | 是       |
| name         | 白板名称     | 是       |
| aspectWidth  | 等比宽       | 是       |
| aspectHeight | 等比高       | 是       |
| pageCount    | 白板页数     | 是       |
| fileInfo     | 关联文件信息 | 否       |

fileInfo 参数解释：

| 字段     | 含义                | 是否必填 |
| -------- | ------------------- | -------- |
| fileID   | 文件转换完成唯一 ID | 是       |
| fileName | 文件名称            | 是       |
| fileType | 文件类型            | 是       |
| authKey  | 预留字段            | 否       |

#### 1.1.3 销毁白板

```typescript
whiteboardManager.destroyView(whiteboardView: WhiteboardView): Promise<void>
```

| 字段           | 含义           | 是否必填 |
| -------------- | -------------- | -------- |
| whiteboardView | 白板 view 实例 | 是       |

#### 1.1.4 添加白板到视图（渲染）

```typescript
whiteboardManager.attachView(whiteboardView: WhiteboardView, parent: string): Promise<void>
```

| 字段           | 含义                | 是否必填 |
| -------------- | ------------------- | -------- |
| whiteboardView | 白板 view 实例      | 是       |
| parent         | 需要挂载的父容器 id | 是       |

#### 1.1.5 获取白板列表

```typescript
whiteboardManager.getViewList(): Promise<WhiteboardView[]>
```

#### 1.1.6 清空白板 view

```typescript
whiteboardView.clear(): boolean
```

#### 1.1.7 获取该白板 view 关联的文件信息

```typescript
whiteboardView.getFileInfo(): {fileID: string; fileName: string; authKey: string; fileType: number;} | null
```

#### 1.1.8 设置白板允许涂鸦权限

```typescript
whiteboardView.enable(enable: boolean): boolean
```

#### 1.1.9 获取白板允许涂鸦权限

```typescript
whiteboardView.IsEnable(): boolean
```

#### 1.1.10 设置白板背景色（color 支持 16 进制、rgba）

```typescript
whiteboardView.setBackgroundColor(color: string): boolean
```

#### 1.1.11 获取白板页的背景色

```typescript
whiteboardView.getBackgroundColor(): string
```

#### 1.1.12 获取白板页宽高比

```typescript
whiteboardView.getAspectRatio(): string
```

#### 1.1.13 设置要使用的白板工具

```typescript
whiteboardView.setToolType(type: ViewTool): boolean
```

| 字段 | 含义                                                                                                                 | 是否必填 |
| ---- | -------------------------------------------------------------------------------------------------------------------- | -------- |
| type | 工具类型 1:path 涂鸦，2:text 文本框，4:line 线段，8:rect 矩形，16:ellipse 椭圆，32: selector 选择，64: eraser 橡皮擦 | 是       |

#### 1.1.14 获取正在使用的白板工具

```typescript
whiteboardView.getToolType(): ViewTool
```

#### 1.1.15 设置画笔颜色

```typescript
whiteboardView.setBrushColor(color: string): boolean
```

#### 1.1.16 获取画笔颜色

```typescript
whiteboardView.getBrushColor(): string
```

#### 1.1.17 设置画笔粗细

```typescript
whiteboardView.setBrushSize(thin: number): boolean
```

| 字段 | 含义                 | 是否必填 |
| ---- | -------------------- | -------- |
| thin | 画笔粗细，取值 1~100 | 是       |

#### 1.1.18 获取画笔粗细

```typescript
whiteboardView.getBrushSize(): number
```

#### 1.1.19 设置文本大小

```typescript
whiteboardView.setTextSize(thin: number): boolean
```

| 字段 | 含义                  | 是否必填 |
| ---- | --------------------- | -------- |
| thin | 文本大小，取值 12~100 | 是       |

#### 1.1.20 获取文本大小

```typescript
whiteboardView.getTextSize(): number
```

#### 1.1.21 滚动白板页

```typescript
whiteboardView.scroll(horizontalPercent: number, verticalPercent: number): boolean
```

| 字段              | 含义           | 是否必填 |
| ----------------- | -------------- | -------- |
| horizontalPercent | 水平滚动百分比 | 否       |
| verticalPercent   | 垂直滚动百分比 | 否       |

#### 1.1.22 获取滚动百分比

```typescript
whiteboardView.getCurrentScrollPercent(): { horizontalPercent: number; verticalPercent: number; direction: number; }
```

#### 1.1.23 撤销

```typescript
whiteboardView.undo(): void
```

#### 1.1.24 重做

```typescript
whiteboardView.redo(): void
```

#### 1.1.25 获取白板 ID

```typescript
whiteboardView.getID(): string
```

#### 1.1.26 获取关联 roomID

```typescript
whiteboardView.getRoomID(): string
```

#### 1.1.27 获取白板页数

```typescript
whiteboardView.getPageCount(): number
```

#### 1.1.28 获取白板当前页码，从 1 开始

```typescript
whiteboardView.getPage(): number
```

### 2、回调

#### 2.1.1 错误回调

```typescript
whiteboardManager.on("error", (errorData: ErrorData) => {});
```

| 字段 | 含义     |
| ---- | -------- |
| code | 错误码   |
| msg  | 错误描述 |

#### 2.1.2 创建 view

```typescript
whiteboardManager.on("viewAdd", (whiteboardView: WhiteboardView) => {});
```

| 字段           | 含义           |
| -------------- | -------------- |
| whiteboardView | 白板 view 实例 |

#### 2.1.3 销毁 view

```typescript
whiteboardManager.on("viewRemoved", (id: string) => {});
```

| 字段 | 含义    |
| ---- | ------- |
| id   | 白板 ID |

#### 2.1.4 滚动 view

```typescript
whiteboardManager.on(
  "viewScroll",
  (res: {
    id: string;
    horizontalPercent: number;
    verticalPercent: number;
    page: number;
  }) => {}
);
```

| 字段              | 含义                  |
| ----------------- | --------------------- |
| id                | 白板 ID               |
| horizontalPercent | 水平滚动百分比        |
| verticalPercent   | 垂直滚动百分比        |
| page              | 翻页模式时当前页码    |
| step              | 动态 PPT 当前动画步数 |
