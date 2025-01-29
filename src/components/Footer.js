



const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">BLOG APP</h3>
            <p className="text-sm">
              A blog, short for weblog, is a frequently updated web page used for personal commentary or business content.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">PRODUCTS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#ff4d4d] transition-colors">MDBootstrap</a></li>
              <li><a href="#" className="hover:text-[#ff4d4d] transition-colors">MDWordPress</a></li>
              <li><a href="#" className="hover:text-[#ff4d4d] transition-colors">BrandFlow</a></li>
              <li><a href="#" className="hover:text-[#ff4d4d] transition-colors">Bootstrap Angular</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">USEFUL LINKS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#ff4d4d] transition-colors">Your Account</a></li>
              <li><a href="#" className="hover:text-[#ff4d4d] transition-colors">Become an Affiliate</a></li>
              <li><a href="#" className="hover:text-[#ff4d4d] transition-colors">Shipping Rates</a></li>
              <li><a href="#" className="hover:text-[#ff4d4d] transition-colors">Help</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">CONTACT</h3>
            <ul className="space-y-2 text-sm">
              <li>Faisalabaad, Punjab, Pakistan</li>
              <li>muneebnaqvi7212@gmail.com</li>
              <li>+92 3058813045</li>
              <li>0305-8813045</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>&copy; 2025 Designed By Muneeb Naqvi</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;













