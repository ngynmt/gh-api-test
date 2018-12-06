const ApiInitialization = `
# API Initialization

Following are the values you need to set in the header of your API call

---

## API Endpoint

https://api.synapsefi.com/v3.1

## Headers

Client and user authentication information is expected to be included as header values in your request.

<li>Required</li>

| Key                          | Value                                           | Definition                                                              |
| ---                          | ---                                             | ---                                                                     |
| <li>x-sp-gateway</li>        | \`your_client_id\` &#124; \`your_client_secret\`| Your \`client_id\` and \`client_secret\` separated by a vertical bar.           |
| <li>x-sp-user</li>           | \`user_oauth_key\` &#124; \`user_fingerprint\`  | User's \`oauth_key\` and device fingerprint separated by a vertical bar. |
| <li>x-sp-user-ip</li>        | \`user.ip.addr\`                                | IP Address of the user.                                                 |
| x-sp-idempotency-key         | \`idempotency.key\`                             | \`idempotency_key\` for safely retrying requests. (optional)            |

> **Idempotent Requests**
>
> POST calls support idempotency for safely retrying requests without accidentally performing the same operation twice. For example, if a request
to create a transaction fails due to a network connection error, you can retry the request with the same idempotency key to guarantee that only 
a single charge is charge is created.  
>
> To perform an idempotent request, attach a unique key to any POST request made to the API via the X-SP-IDEMPOTENCY-KEY; \`<key>\` header.
>
> Idempotency keys expire after 24 hours.

## Client App Initialization

Instead of using API directly, you can also use our client libraries. Following is how you initialize the environment for the libraries.

`;

export default ApiInitialization;
