import Loaders from "./Loaders";

const CentralLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: "100px",
      }}
    >
      <Loaders />
    </div>
  );
};

export default CentralLoader;
