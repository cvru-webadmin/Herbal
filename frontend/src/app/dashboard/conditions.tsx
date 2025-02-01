const Conditions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel Terms and Conditions</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mb-6 text-gray-700">
            Welcome to the Herbal Gallery Admin Panel. By accessing and using this admin panel, you agree to be bound by
            the following terms and conditions:
          </p>
          {[
            {
              title: "1. Access and Security",
              items: [
                "You must keep your admin credentials confidential and not share them with anyone.",
                "You are responsible for all activities that occur under your admin account.",
                "You must immediately notify us of any unauthorized use of your account or any other breach of security.",
              ],
            },
            {
              title: "2. Responsible Use",
              items: [
                "You agree to use the admin panel only for its intended purpose of managing the Herbal Gallery application.",
                "You are responsible for the accuracy, completeness, and appropriateness of all content you add or modify through the admin panel.",
                "You must ensure that all data entered is properly formatted and meets the application's requirements.",
              ],
            },
            {
              title: "3. Data Protection",
              items: [
                "You must not disclose or misuse any confidential information or personal data accessed through the admin panel.",
              ],
            },
            {
              title: "4. Monitoring and Auditing",
              items: [
                "Your actions within the admin panel may be logged and monitored for security and compliance purposes.",
                "We reserve the right to audit your use of the admin panel at any time.",
              ],
            },
            {
              title: "5. Modifications to the Admin Panel",
              items: [
                "We reserve the right to modify, suspend, or discontinue any part of the admin panel at any time.",
                "You are responsible for staying informed about any changes to these terms and conditions.",
              ],
            },
            {
              title: "6. Termination of Access",
              items: [
                "We reserve the right to terminate or suspend your access to the admin panel at any time, for any reason, without notice.",
              ],
            },
            {
              title: "7. Liability",
              items: [
                "You agree to indemnify and hold harmless Herbal Gallery and its affiliates from any claims resulting from your use of the admin panel.",
                "We are not liable for any damages or losses resulting from your use of, or inability to use, the admin panel.",
                "AISECT infotech pvt. ltd. is not responsible for any issues, damages, or losses arising from improper data entry, copyright infringement, or the use of unauthorized data.",
              ],
            },
            {
              title: "9. Data Entry and Copyright",
              items: [
                "All data entered through this admin panel must be authorized and free from copyright restrictions.",
                "AISECT infotech pvt. ltd. is not responsible for any copyright infringement or legal issues arising from the data entered by admins.",
                "If you wish to use copyrighted data, you must obtain written permission from the copyright owner before entering it into the system.",
                "You are responsible for entering data accurately and completely. Improper data entry may result in the application not functioning as expected, and AISECT infotech pvt. ltd. will not be held responsible for such issues.",
              ],
            },
          ].map((section, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">{section.title}</h2>
              <ul className="list-disc pl-5 space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms and Conditions, please contact us at{" "}
              <a href="mailto:aayu.r.2003@gmail.com" className="text-blue-600 hover:underline">
                aayu.r.2003@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
  );
};

export default Conditions;
