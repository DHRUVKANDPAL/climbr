import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, ArrowUp, ArrowDown } from "lucide-react";

// Types for our leaderboard data
type Player = {
  id: string;
  name: string;
  avatar: string;
  score: number;
  previousRank?: number;
};

// Initial player data
const initialPlayers: Player[] = [
  { id: "1", name: "Alex Johnson", avatar: "AJ", score: 785 },
  { id: "2", name: "Sam Smith", avatar: "SS", score: 760 },
  { id: "3", name: "Jamie Lee", avatar: "JL", score: 720 },
  { id: "4", name: "Taylor Kim", avatar: "TK", score: 690 },
  { id: "5", name: "Jordan Patel", avatar: "JP", score: 650 },
  { id: "6", name: "Casey Wong", avatar: "CW", score: 625 },
  { id: "7", name: "Riley Garcia", avatar: "RG", score: 600 },
];

export default function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);

  // Initialize with sorted players and set previous ranks
  useEffect(() => {
    const sortedPlayers = [...initialPlayers]
      .sort((a, b) => b.score - a.score)
      .map((player, index) => ({
        ...player,
        previousRank: index,
      }));
    setPlayers(sortedPlayers);
  }, []);

  // Update a random player's score
  const updateRandomPlayer = () => {
    const randomIndex = Math.floor(Math.random() * players.length);
    const updatedPlayers = [...players];

    // Store current ranks before update
    updatedPlayers.forEach((player, index) => {
      player.previousRank = index;
    });

    // Update random player's score
    const scoreChange = Math.floor(Math.random() * 100) + 50;
    updatedPlayers[randomIndex] = {
      ...updatedPlayers[randomIndex],
      score: updatedPlayers[randomIndex].score + scoreChange,
    };

    // Sort by score
    const sortedPlayers = [...updatedPlayers].sort((a, b) => b.score - a.score);
    setPlayers(sortedPlayers);
  };

  // Reset to initial state
  const resetLeaderboard = () => {
    const sortedPlayers = [...initialPlayers]
      .sort((a, b) => b.score - a.score)
      .map((player, index) => ({
        ...player,
        previousRank: index,
      }));
    setPlayers(sortedPlayers);
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center p-4">
      <Card className="w-full shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardTitle className="flex items-center justify-center gap-2 text-center text-2xl font-bold">
            <Trophy className="h-6 w-6" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-12 gap-2 bg-gray-100 p-3 text-sm font-medium">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-7">Player</div>
            <div className="col-span-4 text-right">Score</div>
          </div>

          <AnimatePresence>
            {players.map((player, index) => {
              const rankChange =
                player.previousRank !== undefined
                  ? player.previousRank - index
                  : 0;

              return (
                <motion.div
                  key={player.id}
                  initial={false}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 300, damping: 30 },
                  }}
                  exit={{ opacity: 0 }}
                  layout
                  className={`grid grid-cols-12 items-center gap-2 border-b p-4 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <div className="col-span-1 text-center font-bold">
                    {index === 0 ? (
                      <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-white">
                        1
                      </div>
                    ) : index === 1 ? (
                      <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-white">
                        2
                      </div>
                    ) : index === 2 ? (
                      <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-700 text-white">
                        3
                      </div>
                    ) : (
                      <div className="text-gray-500">{index + 1}</div>
                    )}
                  </div>

                  <div className="col-span-7 flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={`/api/placeholder/32/32`}
                        alt={player.name}
                      />
                      <AvatarFallback className="bg-blue-100 text-blue-800">
                        {player.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{player.name}</div>
                    {rankChange > 0 && (
                      <div className="flex items-center text-xs text-green-500">
                        <ArrowUp className="mr-1 h-3 w-3" />
                        {rankChange}
                      </div>
                    )}
                    {rankChange < 0 && (
                      <div className="flex items-center text-xs text-red-500">
                        <ArrowDown className="mr-1 h-3 w-3" />
                        {Math.abs(rankChange)}
                      </div>
                    )}
                  </div>

                  <div className="col-span-4 text-right">
                    <motion.div
                      key={`score-${player.id}-${player.score}`}
                      initial={{ scale: 1 }}
                      animate={
                        player.previousRank !== undefined &&
                        player.score >
                          initialPlayers.find((p) => p.id === player.id)?.score
                          ? {
                              scale: [1, 1.3, 1],
                              color: ["#000", "#10b981", "#000"],
                            }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                      className="font-bold"
                    >
                      {player.score}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="mt-6 flex gap-4">
        <Button
          onClick={updateRandomPlayer}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          Update Random Score
        </Button>
        <Button onClick={resetLeaderboard} variant="outline">
          Reset
        </Button>
      </div>
    </div>
  );
}
