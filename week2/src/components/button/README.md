# Button 컴포넌트 가이드

`Button`컴포넌트는 일반적으로 사용되는 버튼입니다.

## 특징

- 속성(props)에 따라 색상 변경
- 비활성화(disabled) 상태 표시

## 사용법

```jsx
import Button from '../button/button';

// 기본 버튼
<Button label="Basic" />

// Success 버튼
<Button state="Success" label="Success" />

// Danger 버튼
<Button state="Danger" label="Danger" />

// 비활성화 상태
<Button label="Disabled" disabled />
```

## 속성(props)

| 속성명    | 타입    | 기본값   | 설명                               |
| --------- | ------- | -------- | ---------------------------------- |
| type      | string  | 'button' | 버튼 타입 (button, submit, reset)  |
| className | string  | ''       | 버튼 클래스 이름                   |
| state     | string  | 'Basic'  | 버튼 상태 (Basic, Success, Danger) |
| disabled  | boolean | false    | 버튼 비활성화 여부                 |
| label     | string  |          | 버튼 라벨                          |

## 의존성

- `BUTTON_STATE` 상수 : 버튼 상태 정의
