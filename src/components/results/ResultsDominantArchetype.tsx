
interface ResultsDominantArchetypeProps {
  dominantArchetype: string | null | undefined;
}

const ResultsDominantArchetype: React.FC<ResultsDominantArchetypeProps> = ({ dominantArchetype }) => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-bold text-black">
        סגנון המנהיגות שלך:
      </h2>
      <div className="text-2xl font-bold text-black">
        {dominantArchetype || "טוען..."}
      </div>
    </div>
  );
};

export default ResultsDominantArchetype;
