import Button from "../components/ui/Button";


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to My App</h1>
        <p className="mb-4 text-gray-700">React + TypeScript + Tailwind 기반 기본 메인 페이지입니다.</p>
        <Button text="시작하기"/>
      </main>
    </div>
  );
};

export default Home;
