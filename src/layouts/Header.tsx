import { useHeaderStore } from '../store/headerStore';

const Header = () => {
  const { title, setTitle } = useHeaderStore();

  return (
    <header>
      <h1>{title}</h1>
      <button onClick={() => setTitle('새 제목')}>제목 바꾸기</button>
    </header>
  );
};
