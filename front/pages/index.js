import AppLayout from '../components/AppLayout';

const Home = () => {
  return (
    <AppLayout>{/* 레이아웃을 이런식으로 감싸준다. */}
      <div>Hello, Next!</div>
    </AppLayout>
  );
};

export default Home;