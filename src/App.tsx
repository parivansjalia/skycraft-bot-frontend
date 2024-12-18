import React, { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import FileUpload from "./components/FileUpload";
import ChartComponent from "./components/chart";

function App() {
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleImageVisibility = () => {
    setIsLoading(true);
    setIsImageVisible(false);
    setTimeout(() => {
      setIsImageVisible(true);
      setIsLoading(false);
    }, 3000);
  };

  // Simulated temperature data collection and Excel export (dummy code)
  const recordTemperatureData = () => {
    console.log("Recording temperature data...");
    setTimeout(() => {
      console.log("Data recorded to Excel...");
      console.log("Generating graph...");
    }, 2000);
  };

  return (
    <div className="w-screen h-screen bg-darkgray-100 relative overflow-hidden">
      <Header />

      <main className="w-full h-full pt-16 flex">
        {/* Sidebar on the left */}
        <div className="flex flex-col">
          <Sidebar />
          {/* FileUpload moved below Sidebar */}
          <div className="mt-44 ml-44">
            <FileUpload />
          </div>
        </div>

        {/* Content with the graph and button */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => {
              recordTemperatureData();
              toggleImageVisibility();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {isLoading ? "Generating..." : "Generate Temperature Graph"}
          </button>

          {isImageVisible && (
            <div className="mt-2">
              <ChartComponent />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
