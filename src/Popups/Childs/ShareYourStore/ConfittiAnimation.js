import Confetti from "react-confetti";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <div>
      <Confetti
        style={{
          pointerEvents: "none",
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
      />
    </div>
  );
};
