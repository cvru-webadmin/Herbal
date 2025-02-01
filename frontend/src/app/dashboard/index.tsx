import { Camera, Info, Leaf, Search, TriangleAlert, Users } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="text-green-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const IndexPage = () => {
  const features = [
    {
      icon: <Camera className="w-10 h-10" />,
      title: "Extensive Collection",
      description:
        "Browse through our vast collection of high-quality herbal images.",
    },
    {
      icon: <Info className="w-10 h-10" />,
      title: "Detailed Information",
      description:
        "Access comprehensive details about each herb and its benefits.",
    },
    {
      icon: <Search className="w-10 h-10" />,
      title: "Easy Search",
      description:
        "Find the herbs you're looking for with our powerful search feature.",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "User-Friendly",
      description: "Enjoy a seamless experience with our intuitive interface.",
    },
  ];

  return (
    <>
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Leaf className="w-16 h-16 mx-auto mb-6 text-green-300" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Herbal Gallery
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore the world of natural remedies and herbal wonders. Our
            gallery showcases a diverse collection of herbs and their benefits.
          </p>
          <button className="bg-white text-green-700 font-bold py-2 px-6 rounded-full hover:bg-green-100 transition duration-300">
            <Link to="/all">Explore Gallery</Link>
          </button>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-yellow-50 py-10">
        <div className="container mx-auto px-4">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-r-lg flex items-start">
            <TriangleAlert className="w-6 h-6 text-yellow-500 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold mb-2">
                Development in Progress
              </h3>
              <p className="text-gray-700">
                This project is currently under development. There might be some
                bugs or incomplete features. If you encounter any issues, please
                contact the developer using the information provided below.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IndexPage;
