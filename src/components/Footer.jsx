import { Link } from "wouter";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4" data-testid="footer-logo">Load N Go</h3>
            <p className="text-gray-300 mb-4">
              Professional logistics platform connecting users with trusted delivery partners.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" data-testid="footer-users-title">For Users</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/">
                  <span className="hover:text-white transition-colors cursor-pointer" data-testid="link-send-package">
                    Send Package
                  </span>
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-track-delivery">
                  Track Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-support">
                  Support
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" data-testid="footer-drivers-title">For Drivers</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/driver-registration">
                  <span className="hover:text-white transition-colors cursor-pointer" data-testid="link-become-driver">
                    Become a Driver
                  </span>
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-driver-requirements">
                  Driver Requirements
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-earnings">
                  Earnings
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-driver-support">
                  Driver Support
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" data-testid="footer-company-title">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-about">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-safety">
                  Safety
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-privacy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="link-terms">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p data-testid="footer-copyright">&copy; 2024 Load N Go. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
