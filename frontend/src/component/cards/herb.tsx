import { forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const HerbCard = forwardRef<HTMLDivElement, { herb: any }>(({ herb }, ref) => {
  const navigate = useNavigate();
  return (
    <div
      className="px-2 md:px-5 mt-2 mx-auto"
      ref={ref}
      onClick={() => navigate(`/herb/${herb._id}`)}
    >
      <div className="rounded-lg min-w-[300px] overflow-hidden mx-auto max-w-[400px]">
        <img src={herb.thumbnail} alt="img" className="aspect-video" />
        <div className="border-[1px] border-gray-500 px-2 rounded-b-lg border-t-0 space-y-2">
          <div>
            <h1 className="font-bold text-lg">{herb.name}</h1>
            <div className="flex flex-wrap gap-2 my-2">
              {herb.synonyms.map((synonym: any, index: number) => (
                <span
                  key={index}
                  className="bg-gray-500 text-white px-2 py-0.5 rounded-lg text-sm font-medium"
                >
                  {synonym}
                </span>
              ))}
            </div>
            <div className="my-2">
              <table className="w-full">
                <thead>
                  <tr className="w-full">
                    <th className="text-start">Property</th>
                    <th className="text-start">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Colour</td>
                    <td>{herb.macroScopiccharacters.colour}</td>
                  </tr>
                  <tr>
                    <td>Stems</td>
                    <td>{herb.macroScopiccharacters.stems}</td>
                  </tr>
                  <tr>
                    <td>Odour</td>
                    <td>{herb.macroScopiccharacters.odour}</td>
                  </tr>
                  <tr>
                    <td>Taste</td>
                    <td>{herb.macroScopiccharacters.taste}</td>
                  </tr>
                  <tr>
                    <td>Size</td>
                    <td>{herb.macroScopiccharacters.size}</td>
                  </tr>
                  <tr>
                    <td>Shape</td>
                    <td>{herb.macroScopiccharacters.shape}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Link to="/" className="font-medium text-blue-500 opacity-70">
            More...
          </Link>
        </div>
      </div>
    </div>
  );
});

export default HerbCard;
