import TradeCard from "./TradeCard";

export default function CropContent({ contracts }) {
  return (
    <div className="contentContainer">
      <div className="content">
        {contracts.map((item) => {
          console.log(item);
          return <TradeCard contractAddress={item} key={item} />;
        })}
      </div>
    </div>
  );
}
