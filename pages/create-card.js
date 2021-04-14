import Head from "next/head";
import { loadStripe } from "@stripe/stripe-js";
import styles from "../styles/Home.module.css";

export default function Home() {
  const handleSubmit = (event) => {
    // Get Stripe.js instance
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY).then((stripe) => {
      // Call your backend to create the Checkout Session
      fetch("/api/create-card", { method: "POST" })
        .then((resp) => resp.json())
        .then((session) => {
          stripe
            .redirectToCheckout({
              sessionId: session.id,
            })
            .then((resp) => {
              if (resp.error) {
                console.error(resp.error);
              }
            });
        });
    });
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>{"Charity Cards | Create Card"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{"Create a Charity Card"}</h1>

        <p className={styles.description}>
          {"Fill out the information below to get started"}
        </p>

        <div>
          <form>
            <input type={"number"} name={"amount"} />
            <br />
            <input type={"text"} name={"recipient-name"} />
            <br />
            <input type={"email"} name={"recipient-email"} />
          </form>
          <button onClick={handleSubmit}>{"Create!"}</button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
