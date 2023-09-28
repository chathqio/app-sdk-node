# @chathq-oss/app-sdk-node

The official NodeJS SDK for ChatHQ 3rd party extensions and integrations

## Installation

ChatHQ OSS packages are hosted on the GitHub Package Registry, which requires authentication (even to install public packages). Follow the instructions at [Managing your personal access tokens] to generate a GitHub Personal Access Token (`PAT`) if you haven't done so already.

### Installing with NPM

Add the following in the `.npmrc` file at the root of your project (create it if it doesn't exist):

```shell
@chathqio:registry=https://npm.pkg.github.com
```

then run the following in a terminal and follow the instructions to login to the GitHub NPM Registry. Use your GitHub username and your `PAT` as credentials:

```shell
npm login -registry https://npm.pkg.github.com
```

finally, in your repository, run:

```shell
npm i -S @chathq-oss/app-sdk-node
```

### Installing with Yarn v2+

Add the following the `.yarnrc.yml` file at the root of your project:

```shell
npmScopes:
  chathqio:
    npmAuthToken: "${GHCR_AUTH_TOKEN}"
    npmRegistryServer: "https://npm.pkg.github.com"
```

Add a persistent environment variable called `GHCR_AUTH_TOKEN` and set its value to your GitHub `PAT`. Finally, in your repository, run:

```shell
yarn add @chathq-oss/app-sdk-node
```

## How to use

```javascript
import { ChatHQAppClient } from '@chathq-oss/app-sdk-node';

const client = new ChatHQAppClient({
    appClientId: process.env.CHATHQ_APP_CLIENT_ID,
    appClientSecret: process.env.CHATHQ_APP_CLIENT_SECRET,
});

async function getWidgetList() {
    // get this from your integration page in ChatHQ Portal
    const userSsoToken = '...';

    const { accessToken, accountId } = client.generateAccessToken(userSsoToken);

    const widgetList = await client.listEngagementWidgets(accessToken, {
        accountId,
        offset: 0,
        limit: 10,
    });

    console.log(JSON.stringify(widgetList, null, 4));
}
```

[Managing your personal access tokens]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
