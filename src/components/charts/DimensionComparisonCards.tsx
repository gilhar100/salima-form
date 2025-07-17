// [...] (keep the rest of the component code above unchanged)

<CardContent className="flex flex-col items-center px-4 sm:px-6" onClick={handleClickOutside}>
  <div className="w-full h-64 sm:h-80 lg:h-96 relative">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        {/* ... existing Pie and Tooltip */}
      </PieChart>
    </ResponsiveContainer>
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      {archetypeBorders.map((border, index) =>
        createArchetypeBorder(
          border.startAngle,
          border.endAngle,
          isMobile ? 35 : 37.5,
          border.color
        )
      )}
    </svg>
  </div>

  {/* Tooltip/Description Box */}
  {selectedDimension && (
    <div className="mt-4 p-4 bg-white border-2 rounded-lg shadow-lg max-w-2xl w-full"
         style={{ borderColor: profileData.find(d => d.dimension === selectedDimension)?.color }}>
      <h3 className="font-bold text-lg mb-3 text-center text-black">
        {profileData.find(d => d.dimension === selectedDimension)?.name}
      </h3>
      <p className="text-sm sm:text-base leading-relaxed text-black text-right" dir="rtl">
        {dimensionDescriptions[selectedDimension as keyof typeof dimensionDescriptions]}
      </p>
    </div>
  )}

  {/* Color Key / Interactive Boxes */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4 w-full max-w-2xl">
    {profileData.map((dimension, index) => (
      <div
        key={index}
        className="flex items-center gap-2 p-2 sm:p-3 rounded-lg border-2 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        style={{
          backgroundColor: 'white',
          borderColor: dimension.color
        }}
        onClick={() => handlePieClick(dimension)}
      >
        <div
          className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-gray-300 shadow-md flex-shrink-0"
          style={{ backgroundColor: dimension.color }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-black font-medium truncate text-xs sm:text-sm">
            {dimension.name}
          </p>
        </div>
      </div>
    ))}
  </div>

  <div className="text-black text-center mt-3 sm:mt-4 max-w-lg text-sm sm:text-base px-2">
    גודל הפרק משקף את חוזק הממד בפרופיל המנהיגות שלך
    <br />
    <span className="text-xs text-gray-600 mt-1 block">
      לחץ על פרק או על שם הממד למידע נוסף
    </span>
  </div>
</CardContent>