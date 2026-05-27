import { Link } from '@tanstack/react-router';
import {
  CircleHelp,
  FileText,
  LifeBuoy,
  Mail,
  ShieldCheck,
} from 'lucide-react';

export const FooterSection = () => {
  return (
    <footer className="border-t border-gray-200 py-20">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4">
            <Link to="/" className="text-xl font-bold">
              RENTIFUL
            </Link>
          </div>
          <nav className="mb-4">
            <ul className="flex space-x-6">
              <li>
                <Link to="/">About Us</Link>
              </li>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
              <li>
                <Link to="/">FAQ</Link>
              </li>
              <li>
                <Link to="/">Terms</Link>
              </li>
              <li>
                <Link to="/">Privacy</Link>
              </li>
            </ul>
          </nav>
          <div className="mb-4 flex space-x-4">
            <a href="#" aria-label="Contact" className="hover:text-primary-600">
              <Mail className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Support" className="hover:text-primary-600">
              <LifeBuoy className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Help" className="hover:text-primary-600">
              <CircleHelp className="h-6 w-6" />
            </a>
            <a
              href="#"
              aria-label="Security"
              className="hover:text-primary-600"
            >
              <ShieldCheck className="h-6 w-6" />
            </a>
            <a
              href="#"
              aria-label="Policies"
              className="hover:text-primary-600"
            >
              <FileText className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 flex justify-center space-x-4 text-center text-sm text-gray-500">
          <span>© RENTiful. All rights reserved.</span>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
          <Link to="/">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};
