import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const TrainingTab = ({
  mockTrainingModules,
  selectedVideo,
  setSelectedVideo
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">
        Training Modules
      </h2>
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTrainingModules.map((module, index) => (
          <div key={index} className="card">
            
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-gray-900">
                {module.title}
              </h3>
              {module.completed && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <Clock className="h-4 w-4" />
              <span>{module.duration}</span>
            </div>

            <button
              className={`w-full ${
                module.completed ? 'btn-secondary' : 'btn-primary'
              }`}
              onClick={() => setSelectedVideo(module)}
            >
              {module.completed ? 'Review' : 'Start Training'}
            </button>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-blue-900 mb-4">
          Training Progress
        </h3>

        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">
            Overall Completion
          </span>
          <span className="font-medium text-blue-900">
            50%
          </span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: '50%' }}
          ></div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto">
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedVideo.title}
              </h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingTab;
