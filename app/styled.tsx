import styled from 'styled-components';

const Title = styled.h1`
  color: #3498db;
  text-align: center;
`;

const StyledPage: React.FC = () => {
  return (
    <div>
      <Title>Estilos com Styled-components</Title>
      <p>Este texto está estilizado usando CSS-in-JS!</p>
    </div>
  );
};

export default StyledPage;
