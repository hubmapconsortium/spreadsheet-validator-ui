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
    <Block sx={{ paddingRight: '40px' }}>
      <a href="https://metadatacenter.org/" target="_blank" rel="noreferrer">
        <img
          src="https://more.metadatacenter.org/sites/default/files/cedar_logo3.png"
          alt="CEDAR logo"
          width="400px"
        />
      </a>
    </Block>
    <Block sx={{ width: '35%' }}>
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
