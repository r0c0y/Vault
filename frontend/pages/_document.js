import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
                <link rel="shortcut icon" href="/favicon.png" type="image/png" />
                <meta name="description" content="Vault - Developer Portfolio & Collaboration Hub" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
