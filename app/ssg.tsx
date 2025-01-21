import { GetStaticProps } from 'next';

type Post = {
  id: number;
  title: string;
  body: string;
};

type SSGPageProps = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps<SSGPageProps> = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();

  return {
    props: { posts: data },
    revalidate: 10, 
  };
};

const SSGPage: React.FC<SSGPageProps> = ({ posts }) => {
  return (
    <div>
      <h1>Posts (SSG)</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SSGPage;
