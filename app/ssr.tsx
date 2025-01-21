
import { GetServerSideProps } from 'next';

type Post = {
  id: number;
  title: string;
  body: string;
};

type SSRPageProps = {
  posts: Post[];
};

export const getServerSideProps: GetServerSideProps<SSRPageProps> = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();

  return {
    props: { posts: data },
  };
};

const SSRPage: React.FC<SSRPageProps> = ({ posts }) => {
  return (
    <div>
      <h1>Posts (SSR)</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SSRPage;
