import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const mockTrainingVideos = [
  {
    title: 'Proper Waste Segregation',
    duration: '3:45',
    completed: true,
    videoId: '2SoH2d5wru4',
  },
  {
    title: 'Recycling Best Practices',
    duration: '5:20',
    completed: true,
    videoId: 'dBNbA80Snb8',
  },
  {
    title: 'Composting at Home',
    duration: '4:15',
    completed: false,
    videoId: 'otmKoaKBbWk',
  },
  {
    title: 'Hazardous Waste Disposal',
    duration: '6:30',
    completed: false,
    videoId: 'Bb1n_EE-9dQ',
  },
];

const TrainingTab = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emerald-900">
        Training Videos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTrainingVideos.map((video, index) => (
          <div key={index} className="card">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-gray-900">
                {video.title}
              </h3>
              {video.completed && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <Clock className="h-4 w-4" />
              <span>{video.duration}</span>
            </div>

            <button
              className={`w-full ${
                video.completed ? 'btn-secondary' : 'btn-primary'
              }`}
              onClick={() => setSelectedVideo(video)}
            >
              {video.completed ? 'Watch Again' : 'Watch Now'}
            </button>
          </div>
        ))}
      </div>

      {/* VIDEO MODAL – UNCHANGED */}
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