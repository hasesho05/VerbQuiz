import Head from "next/head"

export default function HeadInfo() {
  return (
    <div>
      <Head>
        <meta property="og:url" content="https://www.doughnut-quiz.com/" />
        <meta name="twitter:site" content="@Osushioshushi" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Doughnut" />
        <meta name="twitter:description" content="Daily English word quiz" />
        <meta
          name="twitter:image"
          content="https://www.doughnut-quiz.com/icon.png"
        ></meta>
      </Head>
    </div>
  )
}

