# @chathq-oss/app-sdk-node

The official NodeJS SDK for ChatHQ 3rd party extensions and integrations

## Installation

ChatHQ OSS packages are hosted on [NPMJS] as public packages. In the past we would use GitHub Package registry, which required setting up a personal access token (`PAT`) and adding it to your `.npmrc` file. This is no longer needed.

### Installing with NPM

```shell
npm i -S @chathq-oss/app-sdk-node
```

### Installing with Yarn v2+

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

## Contributing

We welcome contributions to this project in the form of bug reports, comments, discussions, and feature requests. In the future we may considering accepting pull requests. If you are interested in contributing, please open an issue explaining your idea and tag Serge (`@cbnsndwch`) on it.

[NPMJS]: https://www.npmjs.com/search?q=%40chathq-oss
