"use client";
import "@livekit/components-styles";
import "@livekit/components-styles/prefabs";
import { useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";
import {
  encodePassphrase,
  generateRoomId,
  randomString,
} from "@/lib/client-utils";

// List of languages to choose from
const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Hindi",
  "Mandarin",
  "Japanese",
  "Korean",
  "Russian",
  "Arabic",
  "Portuguese",
  "Italian",
];

function LanguageLearningTabs() {
  const [activeTab, setActiveTab] = useState("needHelp");

  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-lg">
      <div className="flex border-b">
        <button
          className={`flex-1 py-4 text-center font-medium transition ${
            activeTab === "needHelp"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("needHelp")}
        >
          I Need Help
        </button>
        <button
          className={`flex-1 py-4 text-center font-medium transition ${
            activeTab === "canHelp"
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("canHelp")}
        >
          I Can Help
        </button>
      </div>

      <div className="p-6">
        {activeTab === "needHelp" ? <NeedHelpTab /> : <CanHelpTab />}
      </div>
    </div>
  );
}

function NeedHelpTab() {
  const router = useRouter();
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [availableMeetings, setAvailableMeetings] = useState([
    { id: "demo1", host: "Sarah", languages: ["English", "Spanish", "French"] },
    { id: "demo2", host: "Amit", languages: ["Hindi", "English"] },
    { id: "demo3", host: "Hans", languages: ["German", "English"] },
    { id: "demo4", host: "Chen", languages: ["Mandarin", "English"] },
  ]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleLanguageToggle = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(
        selectedLanguages.filter((lang) => lang !== language),
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const searchMeetings = () => {
    // In a real app, this would fetch from an API
    // For now we'll just filter the demo meetings
    setSearchPerformed(true);
  };

  const joinMeeting = (meetingId) => {
    router.push(`/langRooms/${meetingId}`);
  };

  // Filter meetings based on selected languages
  const filteredMeetings = availableMeetings.filter((meeting) =>
    selectedLanguages.some((lang) => meeting.languages.includes(lang)),
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="mb-4 text-xl font-semibold">
          Select languages you want to learn
        </h2>
        <div className="mb-4 flex flex-wrap gap-2">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => handleLanguageToggle(language)}
              className={`rounded-full px-3 py-1 text-sm ${
                selectedLanguages.includes(language)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {language}
            </button>
          ))}
        </div>
        <button
          onClick={searchMeetings}
          disabled={selectedLanguages.length === 0}
          className={`rounded-lg px-4 py-2 text-white transition ${
            selectedLanguages.length > 0
              ? "bg-blue-500 hover:bg-blue-600"
              : "cursor-not-allowed bg-gray-400"
          }`}
        >
          Find Available Meetings
        </button>
      </div>

      {searchPerformed && (
        <div>
          <h3 className="mb-3 text-lg font-medium">Available Meetings</h3>
          {filteredMeetings.length > 0 ? (
            <div className="space-y-3">
              {filteredMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">Host: {meeting.host}</p>
                    <p className="text-sm text-gray-600">
                      Languages: {meeting.languages.join(", ")}
                    </p>
                  </div>
                  <button
                    onClick={() => joinMeeting(meeting.id)}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                  >
                    Join
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              No meetings available for your selected languages.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function CanHelpTab() {
  const router = useRouter();
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));

  const handleLanguageToggle = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(
        selectedLanguages.filter((lang) => lang !== language),
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const hostMeeting = () => {
    const roomId = generateRoomId();
    const languageParams = selectedLanguages.join(",");

    if (e2ee) {
      router.push(
        `/langRooms/${roomId}?languages=${languageParams}#${encodePassphrase(sharedPassphrase)}`,
      );
    } else {
      router.push(`/langRooms/${roomId}?languages=${languageParams}`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="mb-4 text-xl font-semibold">
          Select languages you can teach
        </h2>
        <div className="mb-4 flex flex-wrap gap-2">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => handleLanguageToggle(language)}
              className={`rounded-full px-3 py-1 text-sm ${
                selectedLanguages.includes(language)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {language}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            id="use-e2ee"
            type="checkbox"
            checked={e2ee}
            onChange={(ev) => setE2ee(ev.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="use-e2ee" className="text-sm">
            Enable end-to-end encryption
          </label>
        </div>

        {e2ee && (
          <div className="flex flex-col gap-2">
            <label htmlFor="passphrase" className="text-sm">
              Passphrase
            </label>
            <input
              id="passphrase"
              type="password"
              value={sharedPassphrase}
              onChange={(ev) => setSharedPassphrase(ev.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
        )}

        <button
          onClick={hostMeeting}
          disabled={selectedLanguages.length === 0}
          className={`rounded-lg px-4 py-2 text-white transition ${
            selectedLanguages.length > 0
              ? "bg-green-500 hover:bg-green-600"
              : "cursor-not-allowed bg-gray-400"
          }`}
        >
          Host Meeting
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Suspense fallback="Loading...">
        <LanguageLearningTabs />
      </Suspense>
    </main>
  );
}
