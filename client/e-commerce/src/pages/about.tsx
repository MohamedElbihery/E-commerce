import Head from "next/head";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>About Us | Exclusive</title>
      </Head>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          About Exclusive
        </h1>
        <p className="text-gray-600 mb-8">Discover our story and values</p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Founded in 2023, Exclusive began as a small boutique with a passion
            for bringing unique, high-quality products to discerning customers.
            Today, we have grown into a premier e-commerce destination while
            maintaining our commitment to excellence and customer satisfaction.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To provide an exceptional shopping experience by offering carefully
            curated products, outstanding customer service, and seamless online
            shopping.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Our Values
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li className="leading-relaxed">
              <span className="font-medium">Quality above all else</span> - We
              meticulously select every product
            </li>
            <li className="leading-relaxed">
              <span className="font-medium">Customer-centric approach</span> -
              Your satisfaction is our priority
            </li>
            <li className="leading-relaxed">
              <span className="font-medium">Innovation in e-commerce</span> -
              Constantly improving your experience
            </li>
            <li className="leading-relaxed">
              <span className="font-medium">
                Sustainable business practices
              </span>{" "}
              - Committed to environmental responsibility
            </li>
            <li className="leading-relaxed">
              <span className="font-medium">Transparency and integrity</span> -
              Honest in all our dealings
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
