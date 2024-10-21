import Link from 'next/link';
import { Card } from 'components/card';
import { RandomQuote } from 'components/random-quote';
import { Markdown } from 'components/markdown';
import { ContextAlert } from 'components/context-alert';
import { getNetlifyContext } from 'utils';

const cards = [
    //{ text: 'Hello', linkText: 'someLink', href: '/' }
];

const contextExplainer = `
The card below is rendered on the server based on the value of \`process.env.CONTEXT\` 
([docs](https://docs.netlify.com/configure-builds/environment-variables/#build-metadata)):
`;

const preDynamicContentExplainer = `
The card content below is fetched by the client-side from \`/quotes/random\` (see file \`app/quotes/random/route.js\`) with a different quote shown on each page load:
`;

const postDynamicContentExplainer = `
On Netlify, Next.js Route Handlers are automatically deployed as [Serverless Functions](https://docs.netlify.com/functions/overview/).
Alternatively, you can add Serverless Functions to any site regardless of framework, with acccess to the [full context data](https://docs.netlify.com/functions/api/).

And as always with dynamic content, beware of layout shifts & flicker! (here, we aren't...)
`;

const ctx = getNetlifyContext();

const handleShare = async () => {
    try {
        // setMobShareButtonClicked(true);
        console.log("uttam")
        if (navigator.share) {
            const response = await fetch("https://fpstatic.cashstar.com/faceplates/DTTGEEK3Y/MASTER-1.jpg");
            const blob = await response.blob();
            const file = new File([blob], 'egift.jpg', { type: blob.type });

            const message = `Hi Satoru,\nHere’s a Starbucks eGift - enjoy it!\n\n¥1,000 Starbucks eGift 🎁\nhttps://shorturl.at/vzDHK\n\nThis URL is valid for 365 days.`;

            await navigator.share({
                // title: 'Starbucks eGift',
                text: message,
                // url: sharableLink,
                files: [file]
            });
        } else {
            // logError('Web Share API not supported');
        }
    } catch (error) {
        // logError(error);
    }
};

export default function Page() {
    return (
        <div className="App">
            <button style={{marginTop:'100px',width:'200px',height:'100px'}} onClick={handleShare}>Share</button>
        </div>
    );
}

function RuntimeContextCard() {
    const title = `Netlify Context: running in ${ctx} mode.`;
    if (ctx === 'dev') {
        return <Card title={title} text="Next.js will rebuild any page you navigate to, including static pages." />;
    } else {
        return <Card title={title} text="This page was statically-generated at build time." />;
    }
}
