# Input 컴포넌트 가이드

`Input`컴포넌트는 일반적으로 사용되는 입력창 입니다.

## 특징

- input과 label 태그 매칭으로 접근성 고려
- type이 password 인경우 비밀번호 보임/숨김 아이콘 표시

## 사용법

```jsx
import Input from '../input/input';

// 기본 입력창
<Input id="common-input" placeholder="Common Input" label="Common Input" />;
```

## 속성(props)

| 속성명      | 타입    | 기본값 | 설명              |
| ----------- | ------- | ------ | ----------------- |
| id          | string  |        | Input ID          |
| className   | string  | ''     | Input 클래스 이름 |
| placeholder | string  | ''     | Input 텍스트      |
| label       | string  | ''     | Input label       |
| type        | string  | text   | Input 타입        |
| isRequired  | boolean | false  | 입력 필수 여부    |
