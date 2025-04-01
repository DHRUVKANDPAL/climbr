import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const YouTubeRecommendations = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTopic, setSearchTopic] = useState("probability JEE");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://utube-recommendations-api.onrender.com/api/recommendations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ topic: searchTopic }),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch video recommendations");
        }

        const data = await response.json();
        console.log(data);
        // Sort videos by view count (descending) and take top 3
        const sortedVideos = data.videos
          .sort((a, b) => b.viewCount - a.viewCount)
          .slice(0, 3);

        setVideos(sortedVideos);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchTopic]);

  const handleTopicChange = (e) => {
    setSearchTopic(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // This will trigger the useEffect to fetch new videos
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Video Lectures</span>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchTopic}
              onChange={handleTopicChange}
              placeholder="Search topic..."
              className="rounded-md border px-3 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
            <Button type="submit" size="sm">
              Search
            </Button>
          </form>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent"></div>
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">
              <p>Error: {error}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  setError(null);
                  setLoading(true);
                }}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <>
              {videos.map((video) => (
                <div
                  key={video.videoId}
                  className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
                >
                  <h3 className="mb-3 text-lg font-medium">{video.title}</h3>
                  <div className="mb-3 w-full overflow-hidden rounded-md">
                    <iframe
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="aspect-video"
                    ></iframe>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {formatDuration(video.duration)}
                      </span>
                      <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-thumbs-up"
                        >
                          <path d="M7 10v12" />
                          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                        </svg>
                        {new Intl.NumberFormat().format(video.likeCount)}
                      </span>
                    </div>
                    <div className="text-zinc-600 dark:text-zinc-400">
                      {new Intl.NumberFormat().format(video.viewCount)} views
                    </div>
                  </div>
                </div>
              ))}

              <Button className="w-full gap-2">
                Browse All Lectures
                <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default YouTubeRecommendations;
