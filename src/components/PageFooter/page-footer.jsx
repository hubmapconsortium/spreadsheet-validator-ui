import Container from '../../styles/Container';
import Block from '../../styles/Block';
import { WHITE } from '../../constants/Color';

const PageFooter = () => (
  <Container
    sx={{
      backgroundColor: WHITE,
      minHeight: '12vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Block sx={{ width: '200px', fontFamily: 'Impact', fontSize: '28pt' }}>
      HuBMAP
    </Block>
    <Block sx={{ width: '30%' }}>
      Copyright @ 2023 The Board of Trustees of Leland Stanford Junior University
    </Block>
    <Block>
      <a href="https://github.com/hubmapconsortium/spreadsheet-validator-ui" target="_blank" rel="noreferrer">
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub logo"
          width="40px"
        />
      </a>
    </Block>
  </Container>
);

export default PageFooter;
