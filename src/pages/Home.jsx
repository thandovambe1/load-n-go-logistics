import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-50">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Load-N-Go Logistics</h1>
        <p className="text-lg text-gray-600">
          Fast, affordable, and reliable delivery at your fingertips.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/book">
            <Button className="px-6 py-3 text-lg">Book Now</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="px-6 py-3 text-lg">Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
