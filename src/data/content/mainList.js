export default [{"header":"Introduction","pages":[]},{"header":"Resources","pages":[{"title":"API Initialization","route":"/docs/api-initialization","components":[{"type":"MARKDOWN","content":"\n# API Initialization\n\nFollowing are the values you need to set in the header of your API call\n\n---\n\n## API Endpoint\n\nhttps://api.synapsefi.com/v3.1\n\n## Headers\n\nClient and user authentication information is expected to be included as header values in your request.\n\n<li>Required</li>\n\n| Key                          | Value                                           | Definition                                                              |\n| ---                          | ---                                             | ---                                                                     |\n| <li>x-sp-gateway</li>        | `your_client_id` &#124; `your_client_secret`| Your `client_id` and `client_secret` separated by a vertical bar.           |\n| <li>x-sp-user</li>           | `user_oauth_key` &#124; `user_fingerprint`  | User's `oauth_key` and device fingerprint separated by a vertical bar. |\n| <li>x-sp-user-ip</li>        | `user.ip.addr`                                | IP Address of the user.                                                 |\n| x-sp-idempotency-key         | `idempotency.key`                             | `idempotency_key` for safely retrying requests. (optional)            |\n\n> **Idempotent Requests**\n>\n> POST calls support idempotency for safely retrying requests without accidentally performing the same operation twice. For example, if a request\nto create a transaction fails due to a network connection error, you can retry the request with the same idempotency key to guarantee that only \na single charge is charge is created.  \n>\n> To perform an idempotent request, attach a unique key to any POST request made to the API via the X-SP-IDEMPOTENCY-KEY; `<key>` header.\n>\n> Idempotency keys expire after 24 hours.\n\n## Client App Initialization\n\nInstead of using API directly, you can also use our client libraries. Following is how you initialize the environment for the libraries.\n\n"},{"type":"CODEBLOCK","content":[{"language":"javascript","content":"let test = Something('pk_test_TYooMQauvdEDq54NiTphI7jx');\nlet elements = something.elements();\n\nlet card = elements.create('card');\ncard.mount('#card-element');\n\nlet promise = stripe.createToken(card);\npromise.then(function(result) {\n  // result.token is the card token.\n});"},{"language":"python","content":"import random\nmin = 1\nmax = 6\n\nroll_again = \"yes\"\n\nwhile roll_again == \"yes\" or roll_again == \"y\":\n    print \"Rolling the dices...\"\n    print \"The values are....\"\n    print random.randint(min, max)\n    print random.randint(min, max)\n\n    roll_again = raw_input(\"Roll the dices again?\")"}]},{"type":"MARKDOWN","content":"\n> **Automatic OAuth Updates**\n>\n> Please note that you do not need to add `oauth_key` in the options dictionary after the user is created and oauth is performed. The libraries \nautomatically do that for you.\n"}]},{"title":"API Map and Rate Limits","route":"/docs/api-map-and-rate-limits","components":[]},{"title":"Transaction Codes","route":"/docs/transaction-codes","components":[]},{"title":"Errors","route":"/docs/errors","components":[]},{"title":"Security Best Practices","route":"/docs/security-best-practices","components":[]}]},{"header":"Users/KYC","pages":[]},{"header":"ACH","pages":[]},{"header":"Wires","pages":[]},{"header":"Checks (Bill Pay)","pages":[]},{"header":"Card Processing","pages":[]},{"header":"Ledgering (IOU)","pages":[]},{"header":"Deposit Accounts","pages":[]},{"header":"FBO Accounts","pages":[]},{"header":"Interest Bearing Accounts","pages":[]},{"header":"Clearing Accounts","pages":[]},{"header":"Custody Accounts","pages":[]},{"header":"Crypto Wallet","pages":[]},{"header":"Loans","pages":[]},{"header":"Issue Account/Routing Number","pages":[]}]