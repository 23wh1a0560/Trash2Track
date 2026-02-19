import React from 'react';
import { Award, Star, Leaf } from 'lucide-react';

const RewardsTab = ({ user }) => {
  return (
    <div className="space-y-6">
      {/* POINTS CARD */}
      <div className="card text-center">
        <Award className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-emerald-900 mb-2">
          {user?.eco_points || 0} Points
        </h2>
        <p className="text-emerald-600">
          Your Environmental Impact Score
        </p>
      </div>

      {/* BADGES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ECO WARRIOR */}
        <div className="card text-center">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
            <Star className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">
            Eco Warrior
          </h3>
          <p className="text-sm text-gray-600">
            Reported 5+ issues
          </p>
        </div>

        {/* GREEN GUARDIAN */}
        <div className="card text-center opacity-50">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
            <Award className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">
            Green Guardian
          </h3>
          <p className="text-sm text-gray-600">
            Report 10+ issues
          </p>
        </div>

        {/* PLANET PROTECTOR */}
        <div className="card text-center opacity-50">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">
            Planet Protector
          </h3>
          <p className="text-sm text-gray-600">
            Report 25+ issues
          </p>
        </div>
      </div>
    </div>
  );
};

export default RewardsTab;