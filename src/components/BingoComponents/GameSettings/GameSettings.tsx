import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../../store/game";
import { MusicTab } from "./MusicTab";
import { GameTab } from "./GameTab";
import { getAllUsersPlaylists } from "../../../utils/spotifyUtil";
import { useUserDataStore } from "../../../store/userData";
import { Playlist } from "../../../types";
import { MusicIcon, Gamepad } from "lucide-react";

const allSettings = [
  { icon: <MusicIcon size={18} />, label: "Music", content: MusicTab },
  { icon: <Gamepad size={18} />, label: "Game", content: GameTab },
];

const [Music, Board] = allSettings;
const tabs = [Music, Board];

interface GameSettingsProps {
  handleOpenSettings: () => void;
}

export const GameSettings: React.FC<GameSettingsProps> = ({
  handleOpenSettings,
}) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const navigate = useNavigate();
  const startGame = useGameStore((state) => state.startGame);
  const selectedPlaylists = useGameStore((state) => state.selectedPlaylists);
  const userID = useUserDataStore((state) => state.userData.userID);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const goToBingo = () => {
    if (selectedPlaylists.size === 0) {
      alert("You need to add at least 1 playlist to start a game!");
      return;
    }

    startGame();
    navigate("/bingo");
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getAllUsersPlaylists(userID, offset);
        const mappedPlaylists: Playlist[] = data.items.map((item) => ({
          id: item.id,
          name: item.name,
          owner: item.owner.display_name,
          image: item.images?.[0]?.url || "",
          tracksCount: item.tracks.total,
          type: item.type,
        }));
        setPlaylists((prev) => [...prev, ...mappedPlaylists]);

        // Check if there are more playlists to fetch
        if (mappedPlaylists.length === 50) {
          setOffset((prev) => prev + 50);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    if (hasMore) {
      fetchPlaylists();
    }
  }, [userID, hasMore, offset]);

  return (
    <div style={container}>
      <nav style={nav}>
        <ul style={tabsContainer}>
          {tabs.map((item) => (
            <motion.li
              key={item.label}
              initial={false}
              animate={{
                backgroundColor: item === selectedTab ? "#eee" : "#eee0",
              }}
              style={tab}
              onClick={() => setSelectedTab(item)}
            >
              <div className="flex gap-2 items-end">
                {item.icon}
                {item.label}
              </div>
              {item === selectedTab ? (
                <motion.div
                  style={underline}
                  layoutId="underline"
                  id="underline"
                />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>
      <main style={iconContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={content}
          >
            {selectedTab ? <selectedTab.content playlists={playlists} /> : "😋"}
          </motion.div>
        </AnimatePresence>
      </main>
      <div style={gameButtons}>
        <button
          className="rounded-xl bg-black text-white p-2 w-32"
          onClick={goToBingo}
        >
          START
        </button>
        <button
          className="rounded-xl bg-black text-white p-2 w-32"
          onClick={handleOpenSettings}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
  width: 500,
  height: "70vh",
  borderRadius: 10,
  background: "white",
  overflow: "hidden",
  boxShadow:
    "0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075)",
  display: "flex",
  flexDirection: "column",
};

const nav: React.CSSProperties = {
  background: "#fdfdfd",
  //padding: "5px 5px 0",
  borderRadius: "10px",
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderBottom: "1px solid #eeeeee",
  height: 44,
};

const tabsStyles: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  fontWeight: 500,
  fontSize: 14,
  display: "flex",
  justifyContent: "center",
};

const tabsContainer: React.CSSProperties = {
  ...tabsStyles,
  display: "flex",
  width: "100%",
};

const tab: React.CSSProperties = {
  ...tabsStyles,
  //borderRadius: 5,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  width: "100%",
  padding: "10px 15px",
  position: "relative",
  background: "white",
  cursor: "pointer",
  height: 43,
  display: "flex",
  alignItems: "center",
  flex: 1,
  minWidth: 0,
  userSelect: "none",
  color: "#0f1115",
};

const underline: React.CSSProperties = {
  position: "absolute",
  bottom: -2,
  left: 0,
  right: 0,
  height: 2,
  background: "var(--accent)",
};

const iconContainer: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  //alignItems: "center",
  flex: 1,
};

const content: React.CSSProperties = {
  padding: "15px",
};

const gameButtons: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 90,
  // borderTop: "1px solid #eeeeee",
  height: 50,
};
