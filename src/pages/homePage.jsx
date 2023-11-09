function HomePage() {
  return (
    <>
      <h1>Welcome Back to Vandelay Industries</h1>
      <h2>Please fill out form below to access products</h2>

      {/* About the Founder Section */}
      <section className="about-founder">
        <h2>About the Founder</h2>
        <p>
          Introducing Art Vandelay, the mastermind behind Vandelay Industries.
          Born from a comically inconvenient mix-up at a rubber factory in 1989,
          Art realized he was destined for greatness. Initially, Vandelay
          Industries dipped its toe in the world of latex import/export,
          specializing in all things rubbery. But destiny had other plans; it
          turns out, Art was hilariously allergic to latex! Yes, the founder of
          a latex empire allergic to latex, talk about irony. Amidst sneezes
          and awkwardly timed hiccups, Art swiftly shifted gears and rebranded
          the company into the eccentric world of grocery products. From bouncy
          balloons to bountiful bananas, Vandelay Industries offers it all. Our
          founder's journey from latex to lettuce is an epic tale of unlikely
          twists, and we're here to bring laughter and groceries to your life.
          Welcome to Vandelay Industries, where our sense of humor is as elastic
          as our products!
        </p>
        <img src="https://img.buzzfeed.com/buzzfeed-static/static/2015-03/4/10/campaign_images/webdr06/whats-your-favorite-george-costanza-moment-from-s-2-10542-1425482825-25_dblbig.jpg" alt="Art Vandelay" className="founder-image" />
      </section>
    </>
  );
}

export default HomePage;
