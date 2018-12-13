import APIInitialization from './content/Resources/api-initialization';
import APIInitialization3 from './content/Resources/api-initialization-3';
import APIInitializationCodeBlock from './content/Resources/api-initialization-cb';

export default [{
  header: 'Introduction', // name of section header
  pages: []
},
{
  header: 'Resources',
  pages: [{
    title: 'API Initialization', // name of page
    route: '/docs/api-initialization', // routes should follow the convention /docs/page-name-here
    components: [ // array of components to be rendered on page. will render in the order that it is passed
      {
        type: 'MARKDOWN', // can be 'MARKDOWN' or 'CODEBLOCK'
        content: APIInitialization // file in /src/markdown-content that has specific content (REMEMBER TO IMPORT ON TOP)
      },
      {
        type: 'CODEBLOCK',
        content: APIInitializationCodeBlock
      },
      {
        type: 'MARKDOWN',
        content: APIInitialization3
      },
    ]
  },
  {
    title: 'API Map and Rate Limits',
    route: '/docs/api-map-and-rate-limits',
    components: []
  },
  {
    title: 'Transaction Codes',
    route: '/docs/transaction-codes',
    components: []
  },
  {
    title: 'Errors',
    route: '/docs/errors',
    components: []
  },
  {
    title: 'Security Best Practices',
    route: '/docs/security-best-practices',
    components: []
  }]
},
{
  header: 'Users/KYC',
  pages: []
},
{
  header: 'ACH',
  pages: []
},
{
  header: 'Wires',
  pages: []
},
{
  header: 'Checks (Bill Pay)',
  pages: []
},
{
  header: 'Card Processing',
  pages: []
},
{
  header: 'Ledgering (IOU)',
  pages: []
},
{
  header: 'Deposit Accounts',
  pages: []
},
{
  header: 'FBO Accounts',
  pages: []
},
{
  header: 'Interest Bearing Accounts',
  pages: []
},
{
  header: 'Clearing Accounts',
  pages: []
},
{
  header: 'Custody Accounts',
  pages: []
},
{
  header: 'Crypto Wallet',
  pages: []
},
{
  header: 'Loans',
  pages: []
},
{
  header: 'Issue Account/Routing Number',
  pages: []
}];
