## ZegoWhiteboard Web SDK

### 1、接口定义

#### 1.1.1 获取SDK版本号

```typescript
whiteboardManager.getVersion(): string
```

#### 1.1.2 创建白板

```typescript
whiteboardManager.createView(options: {roomID: string, pageCount?: number, aspectWidth: number, aspectHeight: number, name: string, fileInfo?: {fileID: string, fileName: string, authKey: string, fileType: number}}): WhiteboardView
```
| 字段                                  | 含义   | 是否必填                   |
| ----------------------------------------- | ------- | ----------------------------- |
| roomID                 | roomId       | 是                          |
| aspectWidth                 | 等比宽       | 是                          |
| aspectHeight                 | 等比高       | 是                          |
| name                 | 白板名称       | 是                          |
| pageCount                 | 白板页数       | 否                          |
| fileInfo                 | 关联文件信息       | 否                          |

fileInfo参数解释：

| 字段                                  | 含义   | 是否必填                   |
| ----------------------------------------- | ------- | ----------------------------- |
| fileID                 | 文件转换完成唯一ID       | 是                          |
| fileName                 | 文件名称       | 是                          |
| authKey                 | 预留字段       | 否                          |
| fileType                 | 文件类型       | 是                          |

#### 1.1.3 销毁白板

```typescript
whiteboardManager.destroyView(whiteboardView: WhiteboardView)
```

| 字段                                  | 含义   | 是否必填                   |
| ----------------------------------------- | ------- | ----------------------------- |
| whiteboardView                 | 白板view实例       | 是                          |


#### 1.1.4 添加白板到视图（渲染）

```typescript
whiteboardManager.attachView(whiteboardView: WhiteboardView, parent: string)
```

| 字段                                  | 含义   | 是否必填                   |
| ----------------------------------------- | ------- | ----------------------------- |
| whiteboardView                 | 白板view实例       | 是                          |
| parent                 | 需要挂载的父容器id       | 是                          |

#### 1.1.5 获取白板列表

```typescript
whiteboardManager.getViewList(): Promise<WhiteboardView[]>
```

#### 1.1.6 清空白板view

```typescript
whiteboardView.clear(): boolean
```

#### 1.1.7 获取该白板view关联的文件信息

```typescript
whiteboardView.getFileInfo(): {fileID: string, fileName: string, authKey: string, fileType: number} | boolean
```

#### 1.1.8 设置白板允许涂鸦权限

```typescript
whiteboardView.enable(enable: boolean): boolean
```

#### 1.1.9 获取白板允许涂鸦权限

```typescript
whiteboardView.IsEnable(): boolean
```

#### 1.1.10 设置白板背景色（color支持16进制、rgba）

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
| 字段                                  | 含义   | 是否必填                   |
| ----------------------------------------- | ------- | ----------------------------- |
| type                 | 工具类型1:path 涂鸦，2:text 文本框，4:line 线段，8:rect 矩形，16:ellipse 椭圆，32: selector 选择       | 是                          |

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

| 字段                                  | 含义   | 是否必填                   |
| ----------------------------------------- | ------- | ----------------------------- |
| thin                 | 画笔粗细，取值1~100       | 是 |

#### 1.1.18 获取画笔粗细

```typescript
whiteboardView.getBrushSize(): number
```

#### 1.1.19 设置文本大小

```typescript
whiteboardView.setTextSize(thin: number): boolean
```

| 字段                                  | 含义   | 是否必填                   |
| ----------------------------------------- | ------- | ----------------------------- |
| thin                 | 文本大小，取值12~100       | 是 |

#### 1.1.20 获取文本大小

```typescript
whiteboardView.getTextSize(): number
```

#### 1.1.21 滚动白板页

```typescript
whiteboardView.scroll(horizontalPercent: number, verticalPercent: number): boolean
```

| 字段                                  | 含义   | 是否必填                   |
| ----------------------------------------- | ------- | ----------------------------- |
| horizontalPercent                 | 水平滚动百分比       | 否 |
| verticalPercent                 | 垂直滚动百分比       | 否 |

#### 1.1.22 获取滚动百分比

```typescript
whiteboardView.getCurrentScrollPercent(): { horizontalPercent: number; verticalPercent: number } 
```

#### 1.1.23 撤销

```typescript
whiteboardView.undo(): void
```

#### 1.1.24 重做

```typescript
whiteboardView.redo(): void
```

#### 1.1.25 获取白板ID

```typescript
whiteboardView.getID(): string
```

### 2、回调
#### 2.1.1 错误回调
```typescript
whiteboardManager.on('error', (errorData: ErrorData) => {})
```

| 字段                                  | 含义   |
| ----------------------------------------- | ------- |
| code                 | 错误码       |
| msg                 | 错误描述       |

#### 2.1.2 创建view
```typescript
whiteboardManager.on('viewAdd', (whiteboardView: WhiteboardView) => {})
```

| 字段                                  | 含义   |
| ----------------------------------------- | ------- |
| whiteboardView                 | 白板view实例       |

#### 2.1.3 销毁view
```typescript
whiteboardManager.on('viewRemoved', (whiteboardID: string) => {})
```

| 字段                                  | 含义   |
| ----------------------------------------- | ------- |
| whiteboardID                 | 白板ID       |

#### 2.1.4 滚动view
```typescript
whiteboardManager.on('viewScroll', (whiteboardID: string, horizontalPercent: number, verticalPercent: number) => {})
```

| 字段                                  | 含义   |
| ----------------------------------------- | ------- |
| whiteboardID                 | 白板ID       |
| horizontalPercent                 | 水平滚动百分比       |
| verticalPercent                 | 垂直滚动百分比       |