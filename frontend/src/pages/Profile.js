import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong. Please try again later.</p>;
    }
    return this.props.children;
  }
}

const Profile = () => {
  const user = useSelector(state => state.user.user);

  return (
    <ErrorBoundary>
      <div className="container mx-auto mt-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
          {user && user.profilePic ? (
            <img src={user.profilePic} alt="Profile" className="w-full h-full rounded-full object-cover" />
          ) : (
            <FaUserCircle className="text-6xl text-gray-600" />
          )}
        </div>
        <h1 className="text-3xl font-semibold mb-2">{user?.name}</h1>
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <span className="text-gray-900">{user?.email}</span>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
            <span className="text-gray-900">{user?.role}</span>
          </div>
        </div>
    </div>
    </ErrorBoundary>
  );
};

export default Profile;
