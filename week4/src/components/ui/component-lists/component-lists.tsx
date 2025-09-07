import Button from '../button/button';
import Input from '../input/input';
import './component-lists.css';

function ComponentLists() {
  return (
    <>
      <h2 className="description">
        프로젝트 전반에 사용할 수 있는 컴포넌트 입니다.
      </h2>
      <article className="components">
        <h3>Buttons</h3>
        <Button label="Basic" />
        <Button state="Success" label="Success" />
        <Button state="Danger" label="Danger" />
        <Button label="Disabled" disabled />
        <h3>Input</h3>
        <Input
          id="common-input"
          placeholder="Common Input"
          label="Common Input"
          role="search"
        />
      </article>
    </>
  );
}

export default ComponentLists;
